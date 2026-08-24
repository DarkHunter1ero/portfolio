import { z } from "zod";

/** The only event types the ingestion endpoint accepts. */
export const EVENT_TYPES = [
  "page_view",
  "project_view",
  "github_click",
  "linkedin_click",
  "cv_download",
  "contact_submit",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

/** Metadata keys allowed per event type. Unknown keys are rejected. */
export const METADATA_ALLOWED_KEYS: Record<EventType, readonly string[]> = {
  page_view: [],
  project_view: ["slug"],
  github_click: ["source", "project"],
  linkedin_click: ["source"],
  cv_download: ["lang"],
  contact_submit: [],
};

/** Page path must start with "/" and contain only URL-safe characters. */
export const PAGE_REGEX = /^\/[A-Za-z0-9\-._~\/]{0,180}$/;

/** UUID v4 only (older uuid versions are rejected). */
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Metadata values: short URL-safe strings. Rejects HTML/scripts/junk. */
const METADATA_VALUE_REGEX = /^[A-Za-z0-9\-._~:@ \/]{0,100}$/;

const MAX_METADATA_KEYS = 5;

/** Strips any query string and fragment from a page path. */
function stripQueryAndFragment(value: string): string {
  return value.split(/[?#]/)[0];
}

const baseEventSchema = z
  .object({
    event: z.enum(EVENT_TYPES),
    sessionId: z.string().regex(UUID_V4_REGEX, "sessionId must be a UUID v4"),
    visitorId: z.string().regex(UUID_V4_REGEX, "visitorId must be a UUID v4"),
    page: z
      .string()
      .transform(stripQueryAndFragment)
      .pipe(z.string().regex(PAGE_REGEX, "page must be a path starting with '/'"))
      .optional(),
    metadata: z
      .record(
        z
          .string()
          .max(100, "Metadata values must be at most 100 characters")
          .regex(METADATA_VALUE_REGEX, "Metadata values contain invalid characters"),
      )
      .optional(),
  })
  .strict();

export const analyticsEventSchema = baseEventSchema.superRefine((data, ctx) => {
  // page is required for page navigation events
  if (
    (data.event === "page_view" || data.event === "project_view") &&
    data.page === undefined
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["page"],
      message: `page is required for ${data.event} events`,
    });
  }

  if (data.metadata !== undefined) {
    const allowed = METADATA_ALLOWED_KEYS[data.event];

    const keys = Object.keys(data.metadata);
    if (keys.length > MAX_METADATA_KEYS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["metadata"],
        message: `Metadata must have at most ${MAX_METADATA_KEYS} keys`,
      });
    }

    for (const key of keys) {
      if (!allowed.includes(key)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["metadata"],
          message: `Metadata key "${key}" is not allowed for ${data.event} events`,
        });
      }
    }
  }
});
