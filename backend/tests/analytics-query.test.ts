import { describe, expect, it } from "vitest";
import { resolveAnalyticsQuery } from "../src/schemas/analytics-query";
import { formatBucket, getReferrers, getTimeseries } from "../src/services/analytics-stats";
import { db } from "../src/db";
import { vi } from "vitest";

vi.mock("../src/db", () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    execute: vi.fn(),
  },
}));

const DAY_MS = 24 * 60 * 60 * 1000;

function iso(date: Date): string {
  return date.toISOString();
}

describe("resolveAnalyticsQuery", () => {
  it("rejects invalid dates", () => {
    expect(resolveAnalyticsQuery({ from: "not-a-date" }).success).toBe(false);
    expect(resolveAnalyticsQuery({ to: "2026-13-01" }).success).toBe(false);
  });

  it("rejects from > to", () => {
    const result = resolveAnalyticsQuery({
      from: "2026-02-01T00:00:00Z",
      to: "2026-01-01T00:00:00Z",
    });
    expect(result.success).toBe(false);
    expect(result.fieldErrors?.from).toBeDefined();
  });

  it("rejects ranges longer than 366 days", () => {
    const to = new Date();
    const from = new Date(to.getTime() - 400 * DAY_MS);
    expect(
      resolveAnalyticsQuery({ from: iso(from), to: iso(to) }).success,
    ).toBe(false);
  });

  it("accepts a range of exactly 366 days", () => {
    const to = new Date();
    const from = new Date(to.getTime() - 366 * DAY_MS);
    expect(
      resolveAnalyticsQuery({ from: iso(from), to: iso(to) }).success,
    ).toBe(true);
  });

  it("applies defaults (last 30 days, day granularity) when absent", () => {
    const before = Date.now();
    const result = resolveAnalyticsQuery({});
    expect(result.success).toBe(true);
    if (result.success && result.data) {
      const after = Date.now();
      expect(result.data.to.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.data.to.getTime()).toBeLessThanOrEqual(after);
      const expectedFrom = result.data.to.getTime() - 30 * DAY_MS;
      expect(result.data.from.getTime()).toBeCloseTo(expectedFrom, -3);
      expect(result.data.granularity).toBe("day");
    }
  });

  it("rejects unknown granularity values", () => {
    expect(resolveAnalyticsQuery({ granularity: "hour" }).success).toBe(false);
  });

  it("accepts valid granularity values and unknown eventType is rejected", () => {
    expect(
      resolveAnalyticsQuery({ granularity: "week" }).success,
    ).toBe(true);
    expect(
      resolveAnalyticsQuery({ granularity: "month" }).success,
    ).toBe(true);
    expect(
      resolveAnalyticsQuery({ eventType: "not_an_event" }).success,
    ).toBe(false);
  });

  it("rejects invalid page filters", () => {
    expect(resolveAnalyticsQuery({ page: "no-slash" }).success).toBe(false);
  });
});

describe("metrics shaping", () => {
  it("formats buckets as ISO strings", () => {
    expect(formatBucket(new Date("2026-01-02T03:04:05Z"))).toBe(
      "2026-01-02T03:04:05.000Z",
    );
  });

  it("maps timeseries rows, converting counts to numbers", async () => {
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        {
          bucket: new Date("2026-01-01T00:00:00Z"),
          events: "10",
          pageViews: "7",
          uniqueVisitors: "3",
          sessions: "4",
        },
      ],
    } as never);

    const result = await getTimeseries({
      from: new Date("2026-01-01T00:00:00Z"),
      to: new Date("2026-01-31T00:00:00Z"),
      granularity: "day",
    });

    expect(result).toEqual([
      {
        bucket: "2026-01-01T00:00:00.000Z",
        events: 10,
        pageViews: 7,
        uniqueVisitors: 3,
        sessions: 4,
      },
    ]);
  });

  it("maps null referrer rows to 'direct'", async () => {
    vi.mocked(db.execute).mockResolvedValue({
      rows: [
        { referrer: null, events: "7", uniqueVisitors: "3" },
        { referrer: "google.com", events: "2", uniqueVisitors: "1" },
      ],
    } as never);

    const result = await getReferrers({
      from: new Date("2026-01-01T00:00:00Z"),
      to: new Date("2026-01-31T00:00:00Z"),
      granularity: "day",
    });

    expect(result).toEqual([
      { referrer: "direct", events: 7, uniqueVisitors: 3 },
      { referrer: "google.com", events: 2, uniqueVisitors: 1 },
    ]);
  });
});
