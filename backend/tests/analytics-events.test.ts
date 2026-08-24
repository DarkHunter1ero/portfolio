import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../src/db";
import { errorHandler } from "../src/middleware/error-handler";
import { createEventsLimiter } from "../src/middleware/rate-limiter";
import { createAnalyticsEventsRouter } from "../src/routes/analytics/events";

vi.mock("../src/db", () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    execute: vi.fn(),
  },
}));

function buildApp(limit = 120, options: { trustProxy?: boolean } = {}) {
  const app = express();
  if (options.trustProxy) {
    // Simulate the "behind a reverse proxy with TRUST_PROXY set" mode:
    // Express then derives req.ip from X-Forwarded-For.
    app.set("trust proxy", true);
  }
  app.use(express.json({ limit: "10kb" }));
  app.use("/api", createAnalyticsEventsRouter(createEventsLimiter({ limit })));
  app.use(errorHandler);
  return app;
}

const UUID = "123e4567-e89b-42d3-a456-426614174000";
const UUID2 = "123e4567-e89b-42d3-a456-426614174111";

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    event: "page_view",
    sessionId: UUID,
    visitorId: UUID2,
    page: "/",
    ...overrides,
  };
}

function mockInsert() {
  const values = vi.fn().mockResolvedValue(undefined);
  vi.mocked(db.insert).mockReturnValue({ values } as never);
  return values;
}

const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

describe("POST /api/analytics/events", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and stores a server-enriched payload for a valid event", async () => {
    const values = mockInsert();
    // Behind a trusted reverse proxy (TRUST_PROXY set) the forwarded
    // client IP is honored.
    const app = buildApp(120, { trustProxy: true });

    const res = await request(app)
      .post("/api/analytics/events")
      .set("User-Agent", DESKTOP_UA)
      .set("Referer", "https://www.google.com/search?q=portfolio")
      .set("X-Forwarded-For", "8.8.8.8")
      .send(validPayload({ event: "project_view", page: "/projects", metadata: { slug: "portfolio" } }));

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });

    expect(values).toHaveBeenCalledTimes(1);
    const stored = values.mock.calls[0][0];

    // Server-side enrichment
    expect(stored.eventType).toBe("project_view");
    expect(stored.ipHash).toMatch(/^[0-9a-f]{64}$/);
    expect(stored.createdAt).toBeInstanceOf(Date);
    expect(stored.deviceType).toBe("desktop");
    expect(stored.browser).toBe("Chrome");
    expect(stored.os).toBe("Windows");
    expect(stored.referrer).toBe("www.google.com");
    expect(stored.metadata).toEqual({ slug: "portfolio" });

    // Privacy: the raw IP must never reach the stored payload
    expect(JSON.stringify(stored)).not.toContain("8.8.8.8");
  });

  it("stores null ip_hash for local/private IPs", async () => {
    const values = mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .send(validPayload());

    expect(res.status).toBe(200);
    const stored = values.mock.calls[0][0];
    expect(stored.ipHash).toBeNull();
    expect(stored.country).toBeNull();
  });

  it("ignores a spoofed X-Forwarded-For when trust proxy is unset (direct exposure)", async () => {
    const values = mockInsert();
    // No trust proxy: req.ip is the socket address (loopback here), so a
    // client-supplied X-Forwarded-For must NOT influence the stored data.
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .set("X-Forwarded-For", "8.8.8.8")
      .send(validPayload());

    expect(res.status).toBe(200);
    const stored = values.mock.calls[0][0];
    // Loopback is private → null hash; the spoofed public IP is not used.
    expect(stored.ipHash).toBeNull();
    expect(stored.country).toBeNull();
    expect(JSON.stringify(stored)).not.toContain("8.8.8.8");
  });

  it("returns 400 with fieldErrors for invalid payloads", async () => {
    mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .send({ event: "page_view", sessionId: "nope", visitorId: UUID2 });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.fieldErrors).toBeDefined();
  });

  it("returns 400 with fieldErrors for an unknown event type (HTTP-level)", async () => {
    mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .send(validPayload({ event: "password_reset" }));

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.fieldErrors).toBeDefined();
    expect(res.body.fieldErrors.event).toBeDefined();
  });

  it("returns 400 for payloads with injection keys (ip, ip_hash, country)", async () => {
    mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .send(
        validPayload({
          ip: "1.2.3.4",
          ip_hash: "client-side-hash",
          country: "US",
        }),
      );

    // Strict schema: client-supplied enrichment fields are rejected.
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON bodies", async () => {
    mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .set("Content-Type", "application/json")
      .send('{"event": "page_view", invalid');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ success: false, error: "Bad request" });
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("returns 413 for request bodies over the 10kb limit", async () => {
    mockInsert();
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .set("Content-Type", "application/json")
      .send(validPayload({ metadata: { pad: "x".repeat(11 * 1024) } }));

    expect(res.status).toBe(413);
    expect(res.body).toEqual({ success: false, error: "Payload too large" });
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("returns 429 after exceeding the rate limit", async () => {
    mockInsert();
    const app = buildApp(2);

    const first = await request(app).post("/api/analytics/events").send(validPayload());
    const second = await request(app).post("/api/analytics/events").send(validPayload());
    const third = await request(app).post("/api/analytics/events").send(validPayload());

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(third.status).toBe(429);
    expect(third.body).toEqual({ success: false, error: "Too many requests" });
  });

  it("returns a generic 500 without SQL details when the insert fails", async () => {
    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockRejectedValue(new Error("SQL error: connection refused")),
    } as never);
    const app = buildApp();

    const res = await request(app)
      .post("/api/analytics/events")
      .send(validPayload());

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, error: "Internal server error" });
    expect(JSON.stringify(res.body)).not.toContain("SQL");
  });
});
