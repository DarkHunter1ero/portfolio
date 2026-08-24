import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./index";

/**
 * Runs pending SQL migrations from the ./drizzle folder.
 * Uses process.cwd() so it works both in dev (backend/) and in the
 * Docker runner stage (/app), where the drizzle folder is copied.
 */
export async function runMigrations(): Promise<void> {
  const migrationsFolder = path.join(process.cwd(), "drizzle");
  await migrate(db, { migrationsFolder });
}

// Allow standalone execution: `npm run db:migrate` (tsx).
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log("[DB] Migrations applied");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[DB] Migration failed:", error);
      process.exit(1);
    });
}
