import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { config } from "./config";
import { runMigrations } from "./db/migrate";
import { errorHandler } from "./middleware/error-handler";
import { adminAnalyticsRouter } from "./routes/admin/analytics";
import { adminAuthRouter } from "./routes/admin/auth";
import { contactRouter } from "./routes/contact";
import { healthRouter } from "./routes/health";
import { analyticsEventsRouter } from "./routes/analytics/events";
import { seedAdminFromEnv } from "./services/admin-seed";

const app = express();

// When running behind a reverse proxy, TRUST_PROXY must be set so
// Express derives req.ip from X-Forwarded-For (otherwise every visitor
// appears to come from the proxy IP and shares one rate-limit bucket).
// Without it (direct exposure) X-Forwarded-For is ignored and req.ip is
// the socket address, which prevents header spoofing.
if (config.TRUST_PROXY !== undefined) {
  app.set("trust proxy", config.TRUST_PROXY);
}

// credentials: true so the admin session cookie works cross-origin
// (frontend :3000 -> backend :4000).
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api", healthRouter);
app.use("/api", contactRouter);
app.use("/api", analyticsEventsRouter);
app.use("/api", adminAuthRouter);
app.use("/api", adminAnalyticsRouter);

app.use(errorHandler);

async function main(): Promise<void> {
  try {
    await runMigrations();
    console.log("[DB] Migrations applied");
  } catch (error) {
    // Exit on failure so orchestrators (docker compose, CI) see the crash.
    console.error("[DB] Migration failed:", error);
    process.exit(1);
  }

  // Auto-seed the admin user from ADMIN_EMAIL/ADMIN_PASSWORD when both are
  // set, so deploys need zero manual commands. Idempotent; skips silently
  // when unset; exits on invalid configuration.
  try {
    const result = await seedAdminFromEnv();
    console.log(`[Seed] ${result.message}`);
  } catch (error) {
    console.error(
      "[Seed] Failed:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }

  app.listen(config.PORT, () => {
    console.log(`Backend running on port ${config.PORT}`);
  });
}

void main();

export default app;
