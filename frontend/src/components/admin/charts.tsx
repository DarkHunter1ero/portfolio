/**
 * Lightweight chart primitives for the admin analytics dashboard.
 * Built with plain SVG + Tailwind (no chart library) and styled with the
 * site's design tokens (CSS custom properties) so they follow the theme.
 */

import type { TimeseriesRow } from "@/lib/admin/api";

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

// ─── Timeseries (grouped bar chart) ───────────────────────────────────────

const CHART_WIDTH = 800;
const CHART_HEIGHT = 220;
const PLOT_LEFT = 42;
const PLOT_RIGHT = 8;
const PLOT_TOP = 10;
const PLOT_BOTTOM = 26;

function formatBucketLabel(bucket: string, granularity: "day" | "week" | "month"): string {
  const date = new Date(bucket);
  if (granularity === "month") {
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface TimeseriesChartProps {
  rows: TimeseriesRow[];
  granularity: "day" | "week" | "month";
}

/**
 * Grouped bar chart: page views + unique visitors per time bucket.
 */
export function TimeseriesChart({ rows, granularity }: TimeseriesChartProps) {
  const plotWidth = CHART_WIDTH - PLOT_LEFT - PLOT_RIGHT;
  const plotHeight = CHART_HEIGHT - PLOT_TOP - PLOT_BOTTOM;
  const max = Math.max(1, ...rows.map((r) => Math.max(r.pageViews, r.uniqueVisitors)));
  const groupWidth = plotWidth / Math.max(1, rows.length);
  const barWidth = Math.max(2, Math.min(14, groupWidth * 0.32));

  // Label at most ~10 buckets on the x axis.
  const labelStep = Math.max(1, Math.ceil(rows.length / 10));

  return (
    <div>
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent" aria-hidden />
          Page views
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-muted-foreground" aria-hidden />
          Unique visitors
        </span>
      </div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label="Page views and unique visitors over time"
        className="w-full h-auto text-muted-foreground"
      >
        {/* Horizontal gridlines + y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = PLOT_TOP + plotHeight * frac;
          const value = Math.round(max * (1 - frac));
          return (
            <g key={frac}>
              <line
                x1={PLOT_LEFT}
                x2={CHART_WIDTH - PLOT_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth={frac === 1 ? 1 : 0.5}
              />
              <text x={PLOT_LEFT - 6} y={y + 3} textAnchor="end" fontSize={10} fill="currentColor">
                {formatNumber(value)}
              </text>
            </g>
          );
        })}

        {/* Grouped bars per bucket */}
        {rows.map((row, i) => {
          const groupX = PLOT_LEFT + i * groupWidth + groupWidth / 2;
          const pageViewsHeight = (row.pageViews / max) * plotHeight;
          const visitorsHeight = (row.uniqueVisitors / max) * plotHeight;
          return (
            <g key={row.bucket}>
              <rect
                x={groupX - barWidth - 1}
                y={PLOT_TOP + plotHeight - pageViewsHeight}
                width={barWidth}
                height={pageViewsHeight}
                fill="var(--color-accent)"
                rx={1}
              />
              <rect
                x={groupX + 1}
                y={PLOT_TOP + plotHeight - visitorsHeight}
                width={barWidth}
                height={visitorsHeight}
                fill="var(--color-muted-foreground)"
                rx={1}
              />
              {i % labelStep === 0 && (
                <text
                  x={groupX}
                  y={CHART_HEIGHT - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fill="currentColor"
                >
                  {formatBucketLabel(row.bucket, granularity)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Horizontal bar list ──────────────────────────────────────────────────

export interface BarListItem {
  label: string;
  value: number;
  /** Optional secondary text shown under the label (e.g. region). */
  sublabel?: string;
}

interface BarListProps {
  items: BarListItem[];
}

/**
 * Horizontal bar list used for events, geography, referrers, and devices.
 */
export function BarList({ items }: BarListProps) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={`${item.label}-${item.sublabel ?? ""}`} className="text-sm">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <span className="min-w-0 truncate text-foreground" title={item.label}>
              {item.label}
              {item.sublabel && (
                <span className="text-muted-foreground"> · {item.sublabel}</span>
              )}
            </span>
            <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
              {formatNumber(item.value)}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max(1.5, (item.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
