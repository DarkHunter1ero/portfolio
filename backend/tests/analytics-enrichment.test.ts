import { describe, expect, it } from "vitest";
import type { Request } from "express";
import {
  getClientIp,
  hashIp,
} from "../src/services/analytics-enrichment";

/** Minimal mock of an Express request (direct exposure, no trust proxy). */
function mockReq(overrides: Partial<Request> = {}): Request {
  return {
    headers: {},
    ip: "203.0.113.7",
    ...overrides,
  } as unknown as Request;
}

describe("getClientIp (enrichment derives the client IP from req.ip)", () => {
  it("uses req.ip and ignores a spoofed X-Forwarded-For when trust proxy is unset", () => {
    // Direct exposure: Express does not populate req.ip from
    // X-Forwarded-For, so a client-supplied header must not change the
    // derived client IP (protects geo, IP hash, and rate-limit keys).
    const req = mockReq({
      headers: { "x-forwarded-for": "8.8.8.8, 10.0.0.1" },
      ip: "203.0.113.7",
    });

    expect(getClientIp(req)).toBe("203.0.113.7");
  });

  it("strips the IPv6-mapped prefix from req.ip", () => {
    const req = mockReq({ ip: "::ffff:192.0.2.10" });
    expect(getClientIp(req)).toBe("192.0.2.10");
  });

  it("returns null when req.ip is unavailable", () => {
    const req = mockReq({
      headers: { "x-forwarded-for": "8.8.8.8" },
      ip: undefined,
    });
    expect(getClientIp(req)).toBeNull();
  });

  it("does not derive an IP hash from a spoofed X-Forwarded-For", () => {
    const req = mockReq({
      headers: { "x-forwarded-for": "8.8.8.8" },
      ip: "127.0.0.1",
    });

    const ip = getClientIp(req);
    // Loopback is private → no hash, even though XFF claims a public IP.
    expect(hashIp(ip)).toBeNull();
  });
});
