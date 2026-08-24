import rateLimit, { type RateLimitRequestHandler } from "express-rate-limit";
import type { Options } from "express-rate-limit";

const TOO_MANY_REQUESTS = {
  success: false,
  error: "Too many requests",
};

// Events ingestion: 120 requests per 5 minutes per IP.
const EVENTS_WINDOW_MS = 5 * 60 * 1000;
const EVENTS_LIMIT = 120;

// Admin login: 5 attempts per 15 minutes per IP (brute-force protection).
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_LIMIT = 5;

/** Rate limiter for the public analytics ingestion endpoint. */
export function createEventsLimiter(
  overrides: Partial<Options> = {},
): RateLimitRequestHandler {
  return rateLimit({
    windowMs: EVENTS_WINDOW_MS,
    limit: EVENTS_LIMIT,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json(TOO_MANY_REQUESTS);
    },
    ...overrides,
  });
}

/** Rate limiter for admin login attempts (brute-force protection). */
export function createLoginLimiter(
  overrides: Partial<Options> = {},
): RateLimitRequestHandler {
  return rateLimit({
    windowMs: LOGIN_WINDOW_MS,
    limit: LOGIN_LIMIT,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json(TOO_MANY_REQUESTS);
    },
    ...overrides,
  });
}

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact submissions. Please try again in 15 minutes.",
  },
});

export const eventsLimiter = createEventsLimiter();
export const loginLimiter = createLoginLimiter();
