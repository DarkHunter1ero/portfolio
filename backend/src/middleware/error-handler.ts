import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("[API Error]", err);
  res.status(500).json({
    success: false,
    error: "Failed to send message. Please try again or email directly.",
  });
};
