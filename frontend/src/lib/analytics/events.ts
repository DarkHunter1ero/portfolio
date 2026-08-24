/**
 * Analytics event names and payload types, mirroring the backend ingestion
 * whitelist exactly (backend/src/schemas/analytics.ts).
 *
 * The backend rejects unknown event names, unknown metadata keys, and
 * metadata values outside /^[A-Za-z0-9\-._~:@ \/]{0,100}$/ — keep these
 * types in sync with that schema.
 */

export const ANALYTICS_EVENT_NAMES = [
  "page_view",
  "project_view",
  "github_click",
  "linkedin_click",
  "cv_download",
  "contact_submit",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

/** Metadata allowed per event, keyed by event name. */
export interface AnalyticsEventPayloads {
  /** Requires `page`. No metadata allowed. */
  page_view: {
    page: string;
  };
  /** Requires `page` + metadata `{ slug }`. */
  project_view: {
    page: string;
    metadata: { slug: string };
  };
  /** Metadata keys allowed: `source`, `project`. */
  github_click: {
    page?: string;
    metadata?: { source?: string; project?: string };
  };
  /** Metadata keys allowed: `source`. */
  linkedin_click: {
    page?: string;
    metadata?: { source?: string };
  };
  /** Metadata keys allowed: `lang`. */
  cv_download: {
    page?: string;
    metadata?: { lang?: string };
  };
  /** No metadata allowed. */
  contact_submit: {
    page?: string;
  };
}

export type AnalyticsEventData<E extends AnalyticsEventName> = AnalyticsEventPayloads[E];

/** Wire format of the POST /analytics/events body. */
export interface AnalyticsEventBody {
  event: AnalyticsEventName;
  sessionId: string;
  visitorId: string;
  page?: string;
  metadata?: Record<string, string>;
}
