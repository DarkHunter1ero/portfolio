import { sql, type SQL } from "drizzle-orm";
import { db } from "../db";
import type { ResolvedAnalyticsQuery } from "../schemas/analytics-query";

/**
 * All aggregation happens in SQL (date_trunc / count / group by) —
 * we never fetch raw events and aggregate in JS.
 */

interface RawRow {
  [column: string]: unknown;
}

/** Max rows returned by /pages (top pages by view count). */
const TOP_PAGES_LIMIT = 20;

/** Shared WHERE clause built from the validated query filters. */
function buildWhere(query: ResolvedAnalyticsQuery): SQL {
  const conditions: SQL[] = [
    sql`created_at >= ${query.from}`,
    sql`created_at <= ${query.to}`,
  ];
  if (query.eventType) {
    conditions.push(sql`event_type = ${query.eventType}`);
  }
  if (query.page) {
    conditions.push(sql`page = ${query.page}`);
  }
  return sql.join(conditions, sql` and `);
}

async function runQuery(query: SQL): Promise<RawRow[]> {
  const result = await db.execute(query);
  return result.rows as RawRow[];
}

function toCount(value: unknown): number {
  return Number(value ?? 0);
}

export interface OverviewStats {
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  events: number;
}

export async function getOverview(
  query: ResolvedAnalyticsQuery,
): Promise<OverviewStats> {
  const rows = await runQuery(sql`
    select
      count(*) filter (where event_type = 'page_view') as "pageViews",
      count(distinct visitor_id) as "uniqueVisitors",
      count(distinct session_id) as "sessions",
      count(*) as "events"
    from analytics_events
    where ${buildWhere(query)}
  `);
  const row = rows[0] ?? {};
  return {
    pageViews: toCount(row.pageViews),
    uniqueVisitors: toCount(row.uniqueVisitors),
    sessions: toCount(row.sessions),
    events: toCount(row.events),
  };
}

/** Formats a date_trunc bucket (UTC) as an ISO string. */
export function formatBucket(bucket: Date | string): string {
  const date = bucket instanceof Date ? bucket : new Date(bucket);
  return date.toISOString();
}

export interface TimeseriesRow {
  bucket: string;
  events: number;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
}

export async function getTimeseries(
  query: ResolvedAnalyticsQuery,
): Promise<TimeseriesRow[]> {
  const rows = await runQuery(sql`
    select
      date_trunc(${query.granularity}, created_at) as "bucket",
      count(*) as "events",
      count(*) filter (where event_type = 'page_view') as "pageViews",
      count(distinct visitor_id) as "uniqueVisitors",
      count(distinct session_id) as "sessions"
    from analytics_events
    where ${buildWhere(query)}
    group by 1
    order by 1
  `);
  return rows.map((row) => ({
    bucket: formatBucket(row.bucket as Date),
    events: toCount(row.events),
    pageViews: toCount(row.pageViews),
    uniqueVisitors: toCount(row.uniqueVisitors),
    sessions: toCount(row.sessions),
  }));
}

export interface PageStatsRow {
  page: string;
  pageViews: number;
  uniqueVisitors: number;
}

export async function getTopPages(
  query: ResolvedAnalyticsQuery,
): Promise<PageStatsRow[]> {
  const rows = await runQuery(sql`
    select
      page,
      count(*) as "pageViews",
      count(distinct visitor_id) as "uniqueVisitors"
    from analytics_events
    where ${buildWhere(query)} and event_type = 'page_view' and page is not null
    group by page
    order by "pageViews" desc, page asc
    limit ${TOP_PAGES_LIMIT}
  `);
  return rows.map((row) => ({
    page: String(row.page),
    pageViews: toCount(row.pageViews),
    uniqueVisitors: toCount(row.uniqueVisitors),
  }));
}

export interface EventTypeCount {
  eventType: string;
  count: number;
}

export async function getEventCounts(
  query: ResolvedAnalyticsQuery,
): Promise<EventTypeCount[]> {
  const rows = await runQuery(sql`
    select event_type as "eventType", count(*) as "count"
    from analytics_events
    where ${buildWhere(query)}
    group by 1
    order by "count" desc
  `);
  return rows.map((row) => ({
    eventType: String(row.eventType),
    count: toCount(row.count),
  }));
}

export interface GeographyRow {
  country: string | null;
  region: string | null;
  uniqueVisitors: number;
  events: number;
}

export async function getGeography(
  query: ResolvedAnalyticsQuery,
): Promise<GeographyRow[]> {
  const rows = await runQuery(sql`
    select
      country,
      region,
      count(distinct visitor_id) as "uniqueVisitors",
      count(*) as "events"
    from analytics_events
    where ${buildWhere(query)}
    group by country, region
    order by "uniqueVisitors" desc
  `);
  return rows.map((row) => ({
    country: (row.country as string | null) ?? null,
    region: (row.region as string | null) ?? null,
    uniqueVisitors: toCount(row.uniqueVisitors),
    events: toCount(row.events),
  }));
}

export interface ReferrerRow {
  referrer: string;
  events: number;
  uniqueVisitors: number;
}

export async function getReferrers(
  query: ResolvedAnalyticsQuery,
): Promise<ReferrerRow[]> {
  const rows = await runQuery(sql`
    select
      referrer,
      count(*) as "events",
      count(distinct visitor_id) as "uniqueVisitors"
    from analytics_events
    where ${buildWhere(query)}
    group by 1
    order by "events" desc
  `);
  return rows.map((row) => ({
    // Null referrers (no Referer header) are reported as "direct".
    referrer: row.referrer === null || row.referrer === undefined
      ? "direct"
      : String(row.referrer),
    events: toCount(row.events),
    uniqueVisitors: toCount(row.uniqueVisitors),
  }));
}

export interface DevicesStats {
  devices: { deviceType: string; count: number }[];
  browsers: { browser: string; count: number }[];
  operatingSystems: { os: string; count: number }[];
}

export async function getDevices(
  query: ResolvedAnalyticsQuery,
): Promise<DevicesStats> {
  const [devices, browsers, operatingSystems] = await Promise.all([
    runQuery(sql`
      select coalesce(device_type, 'unknown') as "deviceType", count(*) as "count"
      from analytics_events
      where ${buildWhere(query)}
      group by 1
      order by "count" desc
    `),
    runQuery(sql`
      select coalesce(browser, 'unknown') as "browser", count(*) as "count"
      from analytics_events
      where ${buildWhere(query)}
      group by 1
      order by "count" desc
    `),
    runQuery(sql`
      select coalesce(os, 'unknown') as "os", count(*) as "count"
      from analytics_events
      where ${buildWhere(query)}
      group by 1
      order by "count" desc
    `),
  ]);

  return {
    devices: devices.map((row) => ({
      deviceType: String(row.deviceType),
      count: toCount(row.count),
    })),
    browsers: browsers.map((row) => ({
      browser: String(row.browser),
      count: toCount(row.count),
    })),
    operatingSystems: operatingSystems.map((row) => ({
      os: String(row.os),
      count: toCount(row.count),
    })),
  };
}
