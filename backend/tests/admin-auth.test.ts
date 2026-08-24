import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";
import { SignJWT } from "jose";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../src/db";
import { errorHandler } from "../src/middleware/error-handler";
import { createLoginLimiter } from "../src/middleware/rate-limiter";
import { createAdminAuthRouter } from "../src/routes/admin/auth";
import { adminAnalyticsRouter } from "../src/routes/admin/analytics";

vi.mock("../src/db", () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    execute: vi.fn(),
  },
}));

function buildApp() {
  const app = express();
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());
  // Fresh limiter per app so tests do not interfere with each other.
  app.use("/api", createAdminAuthRouter(createLoginLimiter()));
  app.use("/api", adminAnalyticsRouter);
  app.use(errorHandler);
  return app;
}

const ADMIN = {
  id: 1,
  email: "admin@example.com",
  passwordHash: bcrypt.hashSync("correct-password", 4),
  role: "admin",
};

function mockSelectResult(rows: unknown[]) {
  vi.mocked(db.select).mockReturnValue({
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(rows),
  } as never);
}

describe("POST /api/admin/auth/login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sets an httpOnly cookie and returns success for valid credentials", async () => {
    mockSelectResult([ADMIN]);
    const app = buildApp();

    const res = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: "admin@example.com", password: "correct-password" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });

    const setCookie = res.headers["set-cookie"] as string[];
    const sessionCookie = setCookie.find((c) => c.startsWith("admin_session="));
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie).toMatch(/HttpOnly/i);
    expect(sessionCookie).toMatch(/SameSite=Strict/i);
    expect(sessionCookie).toMatch(/Path=\//);
  });

  it("returns 401 for a wrong password", async () => {
    mockSelectResult([ADMIN]);
    const app = buildApp();

    const res = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: "admin@example.com", password: "wrong-password" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Invalid credentials" });
  });

  it("returns an identical 401 for an unknown email (no user enumeration)", async () => {
    mockSelectResult([]);
    const app = buildApp();

    const unknown = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: "ghost@example.com", password: "whatever" });

    mockSelectResult([ADMIN]);
    const wrongPassword = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: "admin@example.com", password: "wrong-password" });

    expect(unknown.status).toBe(401);
    expect(unknown.body).toEqual({ success: false, error: "Invalid credentials" });
    expect(unknown.body).toEqual(wrongPassword.body);
  });

  it("returns 429 after too many login attempts", async () => {
    mockSelectResult([ADMIN]);
    const app = buildApp();

    let last;
    for (let i = 0; i < 6; i++) {
      last = await request(app)
        .post("/api/admin/auth/login")
        .send({ email: "admin@example.com", password: "wrong-password" });
    }

    expect(last!.status).toBe(429);
    expect(last!.body).toEqual({ success: false, error: "Too many requests" });
  });
});

describe("admin endpoints without a session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 for /me without a cookie", async () => {
    const app = buildApp();
    const res = await request(app).get("/api/admin/auth/me");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Unauthorized" });
  });

  it("returns 401 for admin analytics endpoints without a cookie", async () => {
    const app = buildApp();
    for (const path of [
      "/api/admin/analytics/overview",
      "/api/admin/analytics/timeseries",
      "/api/admin/analytics/pages",
      "/api/admin/analytics/events",
      "/api/admin/analytics/geography",
      "/api/admin/analytics/referrers",
      "/api/admin/analytics/devices",
    ]) {
      const res = await request(app).get(path);
      expect(res.status, `${path} should be 401`).toBe(401);
    }
  });

  it("clears the cookie on logout", async () => {
    const app = buildApp();
    const res = await request(app).post("/api/admin/auth/logout");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
    const setCookie = res.headers["set-cookie"] as string[];
    expect(
      setCookie.find((c) => c.startsWith("admin_session=;")),
    ).toBeDefined();
  });
});

describe("admin endpoints with invalid session tokens", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  async function signToken(
    secret: string,
    expiresAt: string | number,
  ): Promise<string> {
    return new SignJWT({ email: "admin@example.com", role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("1")
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(secret));
  }

  it("returns 401 for a garbage JWT cookie", async () => {
    const app = buildApp();
    const res = await request(app)
      .get("/api/admin/auth/me")
      .set("Cookie", "admin_session=garbage.token.value");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Unauthorized" });
  });

  it("returns 401 for a JWT signed with the wrong secret", async () => {
    const app = buildApp();
    const token = await signToken(
      "not-the-real-secret-at-all-not-even-close-32",
      "1h",
    );

    const res = await request(app)
      .get("/api/admin/auth/me")
      .set("Cookie", `admin_session=${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Unauthorized" });
  });

  it("returns 401 for an expired JWT signed with the real secret", async () => {
    const app = buildApp();
    const token = await signToken(
      process.env.ADMIN_JWT_SECRET!,
      Math.floor(Date.now() / 1000) - 3600,
    );

    const res = await request(app)
      .get("/api/admin/auth/me")
      .set("Cookie", `admin_session=${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Unauthorized" });
  });
});
