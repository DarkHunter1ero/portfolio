import "dotenv/config";
import { seedAdminFromEnv } from "../services/admin-seed";

/**
 * CLI wrapper for `npm run db:seed`. The seed logic lives in
 * services/admin-seed.ts so the backend can also seed automatically at
 * startup (see src/index.ts) with zero manual steps.
 */
seedAdminFromEnv()
  .then((result) => {
    console.log(`[Seed] ${result.message}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("[Seed] Failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  });
