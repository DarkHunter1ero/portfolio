"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, Inbox, Layers, LogOut, RefreshCw, Users, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarList, TimeseriesChart } from "@/components/admin/charts";
import {
  AdminApiError,
  adminLogout,
  getDevices,
  getEventCounts,
  getGeography,
  getOverview,
  getReferrers,
  getTimeseries,
  getTopPages,
  type DevicesStats,
  type EventTypeCount,
  type GeographyRow,
  type Granularity,
  type OverviewStats,
  type PageStatsRow,
  type ReferrerRow,
  type TimeseriesRow,
} from "@/lib/admin/api";

// ─── Range handling ───────────────────────────────────────────────────────

type RangePreset = "today" | "7d" | "30d" | "90d" | "custom";

const RANGE_PRESETS: { value: RangePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "custom", label: "Custom" },
];

const GRANULARITIES: { value: Granularity; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

interface ResolvedRange {
  from: Date;
  to: Date;
}

/** Computes the from/to window for the active preset. Null = not fetchable yet. */
function resolveRange(
  preset: RangePreset,
  customFrom: string,
  customTo: string
): ResolvedRange | null {
  const now = new Date();

  if (preset === "custom") {
    if (!customFrom || !customTo) return null;
    const from = new Date(`${customFrom}T00:00:00`);
    const to = new Date(`${customTo}T23:59:59.999`);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
    if (from.getTime() > to.getTime()) return null;
    return { from, to };
  }

  if (preset === "today") {
    const from = new Date(now);
    from.setHours(0, 0, 0, 0);
    return { from, to: now };
  }

  const days = preset === "7d" ? 7 : preset === "90d" ? 90 : 30;
  return { from: new Date(now.getTime() - days * 24 * 60 * 60 * 1000), to: now };
}

// ─── Data ─────────────────────────────────────────────────────────────────

interface DashboardData {
  overview: OverviewStats;
  timeseries: TimeseriesRow[];
  pages: PageStatsRow[];
  events: EventTypeCount[];
  geography: GeographyRow[];
  referrers: ReferrerRow[];
  devices: DevicesStats;
}

async function fetchDashboard(
  from: string,
  to: string,
  granularity: Granularity
): Promise<DashboardData> {
  const params = { from, to, granularity };
  // All aggregation happens server-side — this only fetches aggregates.
  const [overview, timeseries, pages, events, geography, referrers, devices] = await Promise.all([
    getOverview(params),
    getTimeseries(params),
    getTopPages(params),
    getEventCounts(params),
    getGeography(params),
    getReferrers(params),
    getDevices(params),
  ]);
  return { overview, timeseries, pages, events, geography, referrers, devices };
}

// ─── Formatting helpers ───────────────────────────────────────────────────

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

function humanizeEventType(eventType: string): string {
  return eventType
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// ─── Presentational helpers ───────────────────────────────────────────────

function SectionCard({
  title,
  children,
  hint,
}: {
  title: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function LoadingBlock() {
  return (
    <div className="space-y-2.5" aria-label="Loading">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function EmptyState({ label = "No data for this period." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
      <Inbox className="h-6 w-6" aria-hidden />
      <p className="text-sm">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const router = useRouter();

  const [preset, setPreset] = useState<RangePreset>("30d");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [granularity, setGranularity] = useState<Granularity>("day");

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Monotonic request id: guards against stale-response races where a slow
  // earlier fetch resolves AFTER a newer one and would overwrite fresh data
  // (e.g. rapid filter changes). Each effect run takes the next id; only the
  // response carrying the LATEST id is allowed to update state.
  const latestRequestIdRef = useRef(0);

  const range = useMemo(
    () => resolveRange(preset, customFrom, customTo),
    [preset, customFrom, customTo]
  );

  useEffect(() => {
    if (!range) return;

    const requestId = ++latestRequestIdRef.current;
    setLoading(true);
    setError(null);

    fetchDashboard(range.from.toISOString(), range.to.toISOString(), granularity)
      .then((result) => {
        // Ignore stale responses from an earlier request round.
        if (requestId !== latestRequestIdRef.current) return;
        setData(result);
      })
      .catch((err: unknown) => {
        if (requestId !== latestRequestIdRef.current) return;
        if (err instanceof AdminApiError && err.status === 401) {
          // Session expired or missing — back to the login screen.
          router.replace("/admin/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load analytics.");
      })
      .finally(() => {
        // Keep the spinner on if a newer request is already in flight.
        if (requestId === latestRequestIdRef.current) setLoading(false);
      });
  }, [range, granularity, retryCount, router]);

  async function handleLogout() {
    await adminLogout();
    router.replace("/admin/login");
  }

  const customRangeInvalid = preset === "custom" && range === null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground">Portfolio traffic dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-xs text-muted-foreground" role="status">
              Loading…
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setRetryCount((c) => c + 1)}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-border bg-card/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {RANGE_PRESETS.map((option) => (
            <Button
              key={option.value}
              variant={preset === option.value ? "accent" : "outline"}
              size="sm"
              onClick={() => setPreset(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {preset === "custom" && (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              From
              <input
                type="date"
                value={customFrom}
                max={customTo || undefined}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"
              />
            </label>
            <label className="flex items-center gap-2 text-muted-foreground">
              To
              <input
                type="date"
                value={customTo}
                min={customFrom || undefined}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"
              />
            </label>
            {customRangeInvalid && (
              <span className="text-xs text-destructive">Select a valid start and end date.</span>
            )}
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-wrap items-center justify-between gap-2">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setRetryCount((c) => c + 1)}
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* 1. Overview cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(data
          ? [
              { label: "Visitors", value: data.overview.uniqueVisitors, icon: Users },
              { label: "Sessions", value: data.overview.sessions, icon: Layers },
              { label: "Page views", value: data.overview.pageViews, icon: Eye },
              { label: "Events", value: data.overview.events, icon: Zap },
            ]
          : [
              { label: "Visitors", value: null, icon: Users },
              { label: "Sessions", value: null, icon: Layers },
              { label: "Page views", value: null, icon: Eye },
              { label: "Events", value: null, icon: Zap },
            ]
        ).map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-card/50 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <card.icon className="h-4 w-4" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-widest">{card.label}</span>
            </div>
            {card.value !== null ? (
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground">
                {formatNumber(card.value)}
              </p>
            ) : (
              <Skeleton className="mt-2 h-9 w-20" />
            )}
          </div>
        ))}
      </div>

      {/* 2. Timeseries */}
      <SectionCard title="Traffic over time">
        <div className="mb-4 flex flex-wrap gap-2">
          {GRANULARITIES.map((option) => (
            <Button
              key={option.value}
              variant={granularity === option.value ? "accent" : "outline"}
              size="sm"
              onClick={() => setGranularity(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {!data && loading && <LoadingBlock />}
        {data &&
          (data.timeseries.length > 0 ? (
            <TimeseriesChart rows={data.timeseries} granularity={granularity} />
          ) : (
            <EmptyState />
          ))}
      </SectionCard>

      {/* 3. Pages */}
      <SectionCard title="Top pages" hint="By page views">
        {!data && loading && <LoadingBlock />}
        {data &&
          (data.pages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="pb-2 pr-4 font-medium">
                      Page
                    </th>
                    <th scope="col" className="pb-2 pr-4 text-right font-medium">
                      Views
                    </th>
                    <th scope="col" className="pb-2 text-right font-medium">
                      Unique visitors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.pages.map((row) => (
                    <tr key={row.page} className="border-b border-border/60 last:border-0">
                      <td className="py-2.5 pr-4">
                        <span className="font-[family-name:var(--font-mono)] text-xs text-foreground">
                          {row.page}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-right text-foreground">
                        {formatNumber(row.pageViews)}
                      </td>
                      <td className="py-2.5 text-right text-muted-foreground">
                        {formatNumber(row.uniqueVisitors)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          ))}
      </SectionCard>

      {/* 4. Events */}
      <SectionCard title="Events" hint="All tracked event types">
        {!data && loading && <LoadingBlock />}
        {data &&
          (data.events.length > 0 ? (
            <BarList
              items={data.events.map((row) => ({
                label: humanizeEventType(row.eventType),
                value: row.count,
              }))}
            />
          ) : (
            <EmptyState />
          ))}
      </SectionCard>

      {/* 5. Geography */}
      <SectionCard
        title="Geography"
        hint="Approximate — country and region are derived from IP geolocation"
      >
        {!data && loading && <LoadingBlock />}
        {data &&
          (data.geography.length > 0 ? (
            <BarList
              items={data.geography.map((row) => ({
                label: row.country ?? "Unknown",
                sublabel: row.region ?? undefined,
                value: row.uniqueVisitors,
              }))}
            />
          ) : (
            <EmptyState />
          ))}
      </SectionCard>

      {/* 6. Referrers */}
      <SectionCard title="Referrers" hint="Where visitors came from">
        {!data && loading && <LoadingBlock />}
        {data &&
          (data.referrers.length > 0 ? (
            <BarList
              items={data.referrers.map((row) => ({
                label: row.referrer,
                sublabel: `${formatNumber(row.uniqueVisitors)} visitors`,
                value: row.events,
              }))}
            />
          ) : (
            <EmptyState />
          ))}
      </SectionCard>

      {/* 7. Devices */}
      <SectionCard title="Devices" hint="Device type, browser, and operating system">
        {!data && loading && <LoadingBlock />}
        {data && (
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Device type
              </h3>
              {data.devices.devices.length > 0 ? (
                <BarList
                  items={data.devices.devices.map((row) => ({
                    label: row.deviceType,
                    value: row.count,
                  }))}
                />
              ) : (
                <EmptyState />
              )}
            </div>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Browsers
              </h3>
              {data.devices.browsers.length > 0 ? (
                <BarList
                  items={data.devices.browsers.map((row) => ({
                    label: row.browser,
                    value: row.count,
                  }))}
                />
              ) : (
                <EmptyState />
              )}
            </div>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Operating systems
              </h3>
              {data.devices.operatingSystems.length > 0 ? (
                <BarList
                  items={data.devices.operatingSystems.map((row) => ({
                    label: row.os,
                    value: row.count,
                  }))}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        )}
      </SectionCard>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        All metrics are aggregated server-side from anonymous, cookie-free analytics events.
      </p>
    </main>
  );
}
