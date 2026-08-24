import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../src/db";
import { errorHandler } from "../src/middleware/error-handler";
import { createLoginLimiter } from "../src/middleware/rate-limiter";
import { createAdminAuthRouter } from "../src/routes/admin/auth";
import { adminAnalyticsRouter } from "../src/routes/admin/analytics";
import { signAdminSession } from "../src/services/admin-auth";

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
  app.use("/api", createAdminAuthRouter(createLoginLimiter()));
  app.use("/api", adminAnalyticsRouter);
  app.use(errorHandler);
  return app;
}

const ADMIN_PASSWORD = "session-password";
const ADMIN = {
  id: 1,
  email: "admin@example.com",
  passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 4),
  role: "admin",
};

function mockAdminSession(admin = ADMIN) {
  // requireAdmin re-checks the admin user in the DB via select()
  vi.mocked(db.select).mockReturnValue({
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([admin]),
  } as never);
}

async function sessionCookie(app: express.Express): Promise<string> {
  const login = await request(app)
    .post("/api/admin/auth/login")
    .send({ email: "admin@example.com", password: ADMIN_PASSWORD });
  const setCookie = login.headers["set-cookie"] as string[];
  return setCookie.find((c) => c.startsWith("admin_session="))!.split(";")[0];
}

describe("admin analytics endpoints with a valid session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with admin info on /me", async () => {
    const app = buildApp();
    mockAdminSession();
    const cookie = await sessionCookie(app);

    const res = await request(app)
      .get("/api/admin/auth/me")
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      admin: { email: "admin@example.com", role: "admin" },
    });
  });

  it("returns 401 when the admin no longer exists in the DB", async () => {
    const app = buildApp();
    // Session signed for id 1, but the DB lookup returns nothing.
    mockAdminSession();
    const cookie = await sessionCookie(app);
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
    } as never);

    const res = await request(app)
      .get("/api/admin/analytics/overview")
      .set("Cookie", cookie);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ success: false, error: "Unauthorized" });
  });

  it("returns 200 with shaped overview data", async () => {
    const app = buildApp();
    mockAdminSession();
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        { pageViews: "10", uniqueVisitors: "4", sessions: "5", events: "20" },
      ],
    } as never);

    const res = await request(app)
      .get("/api/admin/analytics/overview")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: { pageViews: 10, uniqueVisitors: 4, sessions: 5, events: 20 },
    });
  });

  it("returns 400 for invalid date query params", async () => {
    const app = buildApp();
    mockAdminSession();

    const res = await request(app)
      .get("/api/admin/analytics/overview?from=yesterday")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.fieldErrors).toBeDefined();
  });

  it("returns 200 with devices data (three grouped queries)", async () => {
    const app = buildApp();
    mockAdminSession();
    // Each of the three queries (devices/browsers/os) gets its own rows.
    vi.mocked(db.execute).mockImplementation(async () => {
      const callIndex = vi.mocked(db.execute).mock.calls.length;
      const rows =
        callIndex === 1
          ? [{ deviceType: "desktop", count: "9" }]
          : callIndex === 2
            ? [{ browser: "Chrome", count: "6" }]
            : [{ os: "Windows", count: "5" }];
      return { rows } as never;
    });

    const res = await request(app)
      .get("/api/admin/analytics/devices")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      devices: [{ deviceType: "desktop", count: 9 }],
      browsers: [{ browser: "Chrome", count: 6 }],
      operatingSystems: [{ os: "Windows", count: 5 }],
    });
    expect(db.execute).toHaveBeenCalledTimes(3);
  });
});

describe("admin analytics endpoints with empty results", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns zero counts for overview (no NaN) and [] for list endpoints", async () => {
    const app = buildApp();
    mockAdminSession();
    vi.mocked(db.execute).mockResolvedValue({ rows: [] } as never);
    // One login — the cookie is reused (the login limiter caps at 5).
    const cookie = await sessionCookie(app);

    const overview = await request(app)
      .get("/api/admin/analytics/overview")
      .set("Cookie", cookie);
    expect(overview.status).toBe(200);
    expect(overview.body).toEqual({
      success: true,
      data: { pageViews: 0, uniqueVisitors: 0, sessions: 0, events: 0 },
    });

    for (const path of [
      "/api/admin/analytics/timeseries",
      "/api/admin/analytics/pages",
      "/api/admin/analytics/events",
      "/api/admin/analytics/geography",
      "/api/admin/analytics/referrers",
    ]) {
      const res = await request(app).get(path).set("Cookie", cookie);
      expect(res.status, `${path} should be 200`).toBe(200);
      expect(res.body.success, `${path} should succeed`).toBe(true);
      expect(res.body.data, `${path} should be an empty list`).toEqual([]);
    }

    const devices = await request(app)
      .get("/api/admin/analytics/devices")
      .set("Cookie", cookie);
    expect(devices.status).toBe(200);
    expect(devices.body.data).toEqual({
      devices: [],
      browsers: [],
      operatingSystems: [],
    });
  });
});

describe("admin analytics response shaping from mocked rows", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps /pages rows to { page, pageViews, uniqueVisitors }", async () => {
    const app = buildApp();
    mockAdminSession();
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        { page: "/", pageViews: "10", uniqueVisitors: "4" },
        { page: "/projects", pageViews: "6", uniqueVisitors: "2" },
      ],
    } as never);

    const res = await request(app)
      .get("/api/admin/analytics/pages")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      { page: "/", pageViews: 10, uniqueVisitors: 4 },
      { page: "/projects", pageViews: 6, uniqueVisitors: 2 },
    ]);
  });

  it("maps /events rows to { eventType, count }", async () => {
    const app = buildApp();
    mockAdminSession();
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        { eventType: "page_view", count: "9" },
        { eventType: "github_click", count: "3" },
      ],
    } as never);

    const res = await request(app)
      .get("/api/admin/analytics/events")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      { eventType: "page_view", count: 9 },
      { eventType: "github_click", count: 3 },
    ]);
  });

  it("maps /geography rows, preserving null country/region as JSON nulls", async () => {
    const app = buildApp();
    mockAdminSession();
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        { country: "US", region: "California", uniqueVisitors: "9", events: "12" },
        { country: null, region: null, uniqueVisitors: "3", events: "5" },
      ],
    } as never);

    const res = await request(app)
      .get("/api/admin/analytics/geography")
      .set("Cookie", await sessionCookie(app));

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      { country: "US", region: "California", uniqueVisitors: 9, events: 12 },
      // Unknown geo (private/unresolvable IPs) stays null, not "unknown".
      { country: null, region: null, uniqueVisitors: 3, events: 5 },
    ]);
  });
});
