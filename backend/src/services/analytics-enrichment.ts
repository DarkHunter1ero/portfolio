import { createHash } from "node:crypto";
import type { Request } from "express";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { config } from "../config";

export interface EventEnrichment {
  ipHash: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  deviceType: "desktop" | "mobile" | "tablet" | "other";
  browser: string | null;
  os: string | null;
  referrer: string | null;
}

/** Strips the IPv6-mapped prefix so checks work on plain IPv4. */
function normalizeIp(ip: string): string {
  return ip.replace(/^::ffff:/, "");
}

/** True for loopback/private-range IPs (local dev, tests, internal networks). */
function isPrivateIp(ip: string): boolean {
  return (
    ip === "::1" ||
    ip.startsWith("fe80:") ||
    ip.startsWith("fc") ||
    ip.startsWith("fd") ||
    /^127\./.test(ip) ||
    /^10\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

/**
 * Returns the client IP for enrichment, derived from `req.ip`.
 *
 * Two deployment modes:
 * - Direct exposure (default — TRUST_PROXY unset): Express ignores
 *   X-Forwarded-For and `req.ip` is the socket address. A spoofed
 *   XFF header therefore cannot alter geo lookups, IP hashes, or
 *   rate-limit keys.
 * - Behind a reverse proxy (TRUST_PROXY set in config): Express
 *   derives `req.ip` from X-Forwarded-For using the configured trust
 *   setting (boolean or hop count), so the leftmost untrusted entry
 *   is the real client IP.
 *
 * The header is never parsed manually here — trusting raw
 * X-Forwarded-For values is only safe through Express's proxy trust
 * machinery.
 */
export function getClientIp(req: Request): string | null {
  if (req.ip) return normalizeIp(req.ip);
  return null;
}

/**
 * Privacy: raw IPs are NEVER stored. We keep only a salted SHA-256 hash
 * so approximate deduplication is possible without identifying users.
 * Private/local IPs (localhost, tests) hash to null.
 */
export function hashIp(ip: string | null): string | null {
  if (!ip || isPrivateIp(ip)) return null;
  return createHash("sha256")
    .update(ip + config.ANALYTICS_IP_SALT)
    .digest("hex");
}

/**
 * Approximate geo lookup via geoip-lite (local MaxMind database).
 * Results are coarse country/region/city guesses — NOT precise locations.
 * Unknown or private IPs resolve to nulls.
 */
export function lookupGeo(ip: string | null): {
  country: string | null;
  region: string | null;
  city: string | null;
} {
  if (!ip || isPrivateIp(ip)) {
    return { country: null, region: null, city: null };
  }
  const geo = geoip.lookup(ip);
  if (!geo) return { country: null, region: null, city: null };
  return {
    country: geo.country ?? null,
    region: geo.region || null,
    city: geo.city || null,
  };
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

/**
 * Parses the User-Agent into normalized device/browser/OS strings.
 * Note: user agents are client-controlled, so these are best-effort labels.
 */
export function parseUserAgent(userAgent: string | undefined): {
  deviceType: "desktop" | "mobile" | "tablet" | "other";
  browser: string | null;
  os: string | null;
} {
  if (!userAgent) {
    return { deviceType: "other", browser: null, os: null };
  }
  const result = UAParser(userAgent);
  const rawType = result.device?.type;
  const deviceType: EventEnrichment["deviceType"] =
    rawType === "mobile"
      ? "mobile"
      : rawType === "tablet"
        ? "tablet"
        : rawType === undefined
          ? "desktop"
          : "other";
  return {
    deviceType,
    browser: result.browser?.name ? truncate(result.browser.name, 50) : null,
    os: result.os?.name ? truncate(result.os.name, 50) : null,
  };
}

/**
 * Extracts only the hostname from the Referer header (lowercase, max 255).
 * Full URLs are never stored. Null when absent or unparsable.
 */
export function extractReferrerHost(referer: string | undefined): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const host = url.hostname.toLowerCase();
    if (!host) return null;
    return host.length > 255 ? host.slice(0, 255) : host;
  } catch {
    return null;
  }
}

/** Builds all server-side enrichment fields for an analytics event. */
export function enrichEvent(req: Request): EventEnrichment {
  const ip = getClientIp(req);
  const geo = lookupGeo(ip);
  const { deviceType, browser, os } = parseUserAgent(
    req.headers["user-agent"],
  );
  const refererHeader = req.headers.referer;
  return {
    ipHash: hashIp(ip),
    country: geo.country,
    region: geo.region,
    city: geo.city,
    deviceType,
    browser,
    os,
    referrer: extractReferrerHost(
      typeof refererHeader === "string" ? refererHeader : undefined,
    ),
  };
}
