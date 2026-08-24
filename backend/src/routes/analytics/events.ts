import { Router } from "express";
import type { RateLimitRequestHandler } from "express-rate-limit";
import { db } from "../../db";
import { analyticsEvents } from "../../db/schema";
import { eventsLimiter } from "../../middleware/rate-limiter";
import { analyticsEventSchema } from "../../schemas/analytics";
import { enrichEvent } from "../../services/analytics-enrichment";

/**
 * Public analytics ingestion endpoint. All enrichment (IP hash, geo,
 * user agent, referrer, timestamp) happens server-side — client data
 * is never trusted for those fields.
 */
export function createAnalyticsEventsRouter(
  limiter: RateLimitRequestHandler = eventsLimiter,
): Router {
  const router = Router();

  router.post("/analytics/events", limiter, async (req, res, next) => {
    try {
      const parsed = analyticsEventSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      const enrichment = enrichEvent(req);

      await db.insert(analyticsEvents).values({
        eventType: parsed.data.event,
        visitorId: parsed.data.visitorId,
        sessionId: parsed.data.sessionId,
        page: parsed.data.page ?? null,
        metadata: parsed.data.metadata ?? null,
        createdAt: new Date(),
        ...enrichment,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      // Insert errors are logged by the global error handler; the
      // response stays generic so SQL details never leak.
      next(error);
    }
  });

  return router;
}

export const analyticsEventsRouter = createAnalyticsEventsRouter();
