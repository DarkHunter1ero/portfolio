import type { Request, Response } from "express";
import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin";
import {
  resolveAnalyticsQuery,
  type ResolvedAnalyticsQuery,
} from "../../schemas/analytics-query";
import {
  getDevices,
  getEventCounts,
  getGeography,
  getOverview,
  getReferrers,
  getTimeseries,
  getTopPages,
} from "../../services/analytics-stats";

/**
 * Admin analytics endpoints. All routes are behind requireAdmin and all
 * aggregation happens in SQL.
 */
export const adminAnalyticsRouter = Router();

adminAnalyticsRouter.use(requireAdmin);

/**
 * Shared handler body: validates the query params (shared from/to/eventType/
 * page/granularity filters with sane defaults) and renders the response.
 */
function withQuery(
  fetch: (query: ResolvedAnalyticsQuery) => Promise<unknown>,
): (req: Request, res: Response, next: (err: unknown) => void) => Promise<void> {
  return async (req, res, next) => {
    try {
      const query = resolveAnalyticsQuery(req.query as Record<string, unknown>);
      if (!query.success || !query.data) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          fieldErrors: query.fieldErrors ?? {},
        });
        return;
      }
      const data = await fetch(query.data);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}

adminAnalyticsRouter.get("/admin/analytics/overview", withQuery(getOverview));

adminAnalyticsRouter.get("/admin/analytics/timeseries", withQuery(getTimeseries));

adminAnalyticsRouter.get("/admin/analytics/pages", withQuery(getTopPages));

adminAnalyticsRouter.get("/admin/analytics/events", withQuery(getEventCounts));

adminAnalyticsRouter.get("/admin/analytics/geography", withQuery(getGeography));

adminAnalyticsRouter.get("/admin/analytics/referrers", withQuery(getReferrers));

adminAnalyticsRouter.get("/admin/analytics/devices", withQuery(getDevices));
