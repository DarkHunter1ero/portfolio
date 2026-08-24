/**
 * Client for the backend admin analytics API.
 *
 * All requests send `credentials: "include"` because the admin session
 * lives in an httpOnly `admin_session` cookie set by the (cross-origin)
 * Express backend. All aggregation happens server-side — this client only
 * fetches pre-aggregated responses.
 */

import type { AnalyticsEventName } from "@/lib/analytics/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type Granularity = "day" | "week" | "month";

/** Query params shared by all admin analytics endpoints. */
export interface AnalyticsQueryParams {
  from?: string;
  to?: string;
  eventType?: AnalyticsEventName;
  page?: string;
  granularity?: Granularity;
}

// ─── Response types (mirror backend/src/services/analytics-stats.ts) ──────

export interface OverviewStats {
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  events: number;
}

export interface TimeseriesRow {
  bucket: string;
  events: number;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
}

export interface PageStatsRow {
  page: string;
  pageViews: number;
  uniqueVisitors: number;
}

export interface EventTypeCount {
  eventType: string;
  count: number;
}

export interface GeographyRow {
  country: string | null;
  region: string | null;
  uniqueVisitors: number;
  events: number;
}

export interface ReferrerRow {
  referrer: string;
  events: number;
  uniqueVisitors: number;
}

export interface DevicesStats {
  devices: { deviceType: string; count: number }[];
  browsers: { browser: string; count: number }[];
  operatingSystems: { os: string; count: number }[];
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// ─── Errors ───────────────────────────────────────────────────────────────

/** Error thrown for non-2xx admin API responses. */
export class AdminApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

/** Extracts a human-readable message from an error response body. */
function errorMessage(body: ApiEnvelope<unknown> | null): string {
  if (!body) return "Request failed";
  const parts: string[] = [];
  if (body.error) parts.push(body.error);
  if (body.fieldErrors) {
    for (const msgs of Object.values(body.fieldErrors)) {
      if (Array.isArray(msgs) && msgs.length > 0) parts.push(msgs[0]);
    }
  }
  return parts.length > 0 ? parts.join(" — ") : "Request failed";
}

// ─── Core fetch helpers ───────────────────────────────────────────────────

async function parseBody(res: Response): Promise<ApiEnvelope<unknown> | null> {
  try {
    return (await res.json()) as ApiEnvelope<unknown>;
  } catch {
    return null;
  }
}

/** GET an authenticated admin analytics endpoint. */
export async function adminGet<T>(
  path: string,
  params?: AnalyticsQueryParams,
): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  }

  const res = await fetch(url, { credentials: "include" });
  const body = await parseBody(res);

  if (!res.ok) throw new AdminApiError(res.status, errorMessage(body));
  if (!body?.success || body.data === undefined) {
    throw new AdminApiError(res.status, "Unexpected response shape");
  }
  return body.data as T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────

/** Logs in; the backend sets the httpOnly admin_session cookie. */
export async function adminLogin(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  const body = await parseBody(res);
  if (!res.ok) throw new AdminApiError(res.status, errorMessage(body));
}

/** Logs out (clears the admin_session cookie). */
export async function adminLogout(): Promise<void> {
  try {
    await fetch(`${API_URL}/admin/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Logout is best-effort: the cookie will expire on its own anyway.
  }
}

// ─── Analytics endpoints ──────────────────────────────────────────────────

export function getOverview(params: AnalyticsQueryParams): Promise<OverviewStats> {
  return adminGet<OverviewStats>("/admin/analytics/overview", params);
}

export function getTimeseries(params: AnalyticsQueryParams): Promise<TimeseriesRow[]> {
  return adminGet<TimeseriesRow[]>("/admin/analytics/timeseries", params);
}

export function getTopPages(params: AnalyticsQueryParams): Promise<PageStatsRow[]> {
  return adminGet<PageStatsRow[]>("/admin/analytics/pages", params);
}

export function getEventCounts(params: AnalyticsQueryParams): Promise<EventTypeCount[]> {
  return adminGet<EventTypeCount[]>("/admin/analytics/events", params);
}

export function getGeography(params: AnalyticsQueryParams): Promise<GeographyRow[]> {
  return adminGet<GeographyRow[]>("/admin/analytics/geography", params);
}

export function getReferrers(params: AnalyticsQueryParams): Promise<ReferrerRow[]> {
  return adminGet<ReferrerRow[]>("/admin/analytics/referrers", params);
}

export function getDevices(params: AnalyticsQueryParams): Promise<DevicesStats> {
  return adminGet<DevicesStats>("/admin/analytics/devices", params);
}
