import { z } from "zod";
import "dotenv/config";

/**
 * TRUST_PROXY: enables Express `trust proxy` for deployments behind a
 * reverse proxy. Accepts a boolean ("1"/"true"/"0"/"false") or a proxy
 * hop count (non-negative integer). Undefined or empty = disabled
 * (direct exposure — X-Forwarded-For is then ignored and req.ip is the
 * socket address).
 */
const trustProxySchema = z.preprocess(
  (value) => {
    if (value === undefined || value === "") return undefined;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "true" || normalized === "1") return true;
      if (normalized === "false" || normalized === "0") return false;
      const parsed = Number(normalized);
      if (Number.isInteger(parsed) && parsed >= 0) return parsed;
    }
    return value;
  },
  z.union([z.boolean(), z.number().int().nonnegative()]).optional(),
);

const configSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().default(""),
  EMAIL_FROM: z.string().default("Portfolio Contact <onboarding@resend.dev>"),
  EMAIL_TO: z.string().default("diego1silva2@gmail.com"),
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/portfolio"),
  ADMIN_JWT_SECRET: z
    .string()
    .min(32, "ADMIN_JWT_SECRET must be at least 32 characters"),
  ANALYTICS_IP_SALT: z
    .string()
    .min(32, "ANALYTICS_IP_SALT must be at least 32 characters"),
  TRUST_PROXY: trustProxySchema,
  COOKIE_SAMESITE: z.enum(["strict", "lax", "none"]).default("strict"),
  SESSION_TTL_HOURS: z.coerce.number().int().positive().default(24),
});

export const config = configSchema.parse(process.env);
