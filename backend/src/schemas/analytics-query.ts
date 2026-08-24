import { z } from "zod";
import { EVENT_TYPES, PAGE_REGEX } from "./analytics";

export const GRANULARITIES = ["day", "week", "month"] as const;
export type Granularity = (typeof GRANULARITIES)[number];

const MAX_RANGE_DAYS = 366;
const DEFAULT_RANGE_DAYS = 30;

const queryBaseSchema = z
  .object({
    from: z
      .string()
      .datetime({ offset: true, message: "from must be an ISO date string" })
      .optional(),
    to: z
      .string()
      .datetime({ offset: true, message: "to must be an ISO date string" })
      .optional(),
    eventType: z.enum(EVENT_TYPES).optional(),
    page: z.string().regex(PAGE_REGEX, "page must be a path starting with '/'").optional(),
    granularity: z.enum(GRANULARITIES).optional(),
  })
  .strict();

export interface ResolvedAnalyticsQuery {
  from: Date;
  to: Date;
  eventType?: string;
  page?: string;
  granularity: Granularity;
}

export interface AnalyticsQueryResult {
  success: boolean;
  data?: ResolvedAnalyticsQuery;
  fieldErrors?: z.inferFlattenedErrors<
    typeof queryBaseSchema
  >["fieldErrors"];
}

/**
 * Validates and resolves the shared query params for admin analytics
 * endpoints. Applies defaults (last 30 days, day granularity) when absent.
 */
export function resolveAnalyticsQuery(
  query: Record<string, unknown>,
): AnalyticsQueryResult {
  const parsed = queryBaseSchema.safeParse(query);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const now = new Date();
  const to = parsed.data.to ? new Date(parsed.data.to) : now;
  const from = parsed.data.from
    ? new Date(parsed.data.from)
    : new Date(to.getTime() - DEFAULT_RANGE_DAYS * 24 * 60 * 60 * 1000);

  if (from > to) {
    return {
      success: false,
      fieldErrors: { from: ["from must be before or equal to to"] },
    };
  }

  const rangeDays = (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
  if (rangeDays > MAX_RANGE_DAYS) {
    return {
      success: false,
      fieldErrors: {
        from: [`Range must be at most ${MAX_RANGE_DAYS} days`],
      },
    };
  }

  return {
    success: true,
    data: {
      from,
      to,
      eventType: parsed.data.eventType,
      page: parsed.data.page,
      granularity: parsed.data.granularity ?? "day",
    },
  };
}
