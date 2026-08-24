import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Honor the status code set by body-parser / http-errors:
  // - 413 for `entity.too.large` (request body over the 10kb limit)
  // - 400 for JSON parse failures (SyntaxError from express.json)
  // Anything else falls back to 500.
  const status =
    err.statusCode ??
    (err.type === "entity.too.large"
      ? 413
      : err instanceof SyntaxError
        ? 400
        : 500);

  const message =
    status === 413
      ? "Payload too large"
      : status === 400
        ? "Bad request"
        : "Internal server error";

  // Log the real error server-side; never leak internals to the client.
  console.error("[API Error]", err);
  res.status(status).json({
    success: false,
    error: message,
  });
};
