/**
 * Fire-and-forget analytics tracker for the public ingestion endpoint
 * (POST /analytics/events).
 *
 * Rules:
 * - Never awaits the request in the caller's critical path (navigation and
 *   clicks must never be delayed or blocked by analytics).
 * - Fails silently: every error is swallowed.
 * - Dedupes identical event+page sends within a short window to protect
 *   against React strict-mode double effects and accidental double clicks.
 * - Strips query strings and fragments from page paths (mirrors the backend
 *   transform, but keeps the request payload clean too).
 */

import type { AnalyticsEventBody, AnalyticsEventName, AnalyticsEventPayloads } from "./events";
import { getSessionId, getVisitorId } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

/** Window in which an identical event+page pair is considered a duplicate. */
const DEDUPE_WINDOW_MS = 1500;

/** Timestamps of recent sends, keyed by `${event}:${page}`. */
const recentSends = new Map<string, number>();

/** Removes query string and fragment from a path. */
function stripQueryAndFragment(path: string): string {
  return path.split(/[?#]/)[0];
}

function isDuplicate(key: string): boolean {
  const now = Date.now();
  const last = recentSends.get(key);
  if (last !== undefined && now - last < DEDUPE_WINDOW_MS) return true;

  // Prune expired entries so the map never grows unbounded.
  if (recentSends.size > 64) {
    for (const [k, ts] of recentSends) {
      if (now - ts >= DEDUPE_WINDOW_MS) recentSends.delete(k);
    }
  }

  recentSends.set(key, now);
  return false;
}

/**
 * Sends an analytics event. Auto-attaches sessionId + visitorId and defaults
 * `page` to the current pathname when omitted. Fire-and-forget: returns void
 * and never throws.
 */
export function track<E extends AnalyticsEventName>(
  event: E,
  data?: AnalyticsEventPayloads[E],
): void {
  try {
    if (typeof window === "undefined") return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    if (!visitorId || !sessionId) return;

    const page = stripQueryAndFragment(
      data && "page" in data && data.page !== undefined ? data.page : window.location.pathname,
    );

    const metadata =
      data && "metadata" in data && data.metadata !== undefined
        ? (data.metadata as Record<string, string>)
        : undefined;

    if (isDuplicate(`${event}:${page}`)) return;

    const body: AnalyticsEventBody = {
      event,
      sessionId,
      visitorId,
      page,
      ...(metadata !== undefined ? { metadata } : {}),
    };

    void fetch(`${API_URL}/analytics/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
      credentials: "omit",
    }).catch(() => {
      // Analytics must never surface errors to the user.
    });
  } catch {
    // Defensive: never let analytics break UX.
  }
}
