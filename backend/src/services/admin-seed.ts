import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { adminUsers } from "../db/schema";
// Must match the cost embedded in DUMMY_PASSWORD_HASH (routes/admin/auth.ts).
import { BCRYPT_COST } from "./admin-auth";

const seedSchema = z.object({
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email address"),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "ADMIN_PASSWORD must be at least 8 characters"),
});

export interface SeedResult {
  seeded: boolean;
  message: string;
}

/**
 * Upserts the admin user from ADMIN_EMAIL / ADMIN_PASSWORD. Called both by
 * the backend at startup (zero manual steps on deploy) and by the
 * `npm run db:seed` CLI. Idempotent: re-running with the same email updates
 * the password hash. Skips silently when neither variable is set; throws on
 * a partial/invalid configuration so misconfiguration fails fast. The
 * password itself is never logged.
 */
export async function seedAdminFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): Promise<SeedResult> {
  const hasEmail = Boolean(env.ADMIN_EMAIL);
  const hasPassword = Boolean(env.ADMIN_PASSWORD);

  if (!hasEmail && !hasPassword) {
    return {
      seeded: false,
      message: "ADMIN_EMAIL/ADMIN_PASSWORD not set — admin login disabled",
    };
  }

  const parsed = seedSchema.safeParse({
    ADMIN_EMAIL: env.ADMIN_EMAIL,
    ADMIN_PASSWORD: env.ADMIN_PASSWORD,
  });
  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    throw new Error(`Invalid admin seed configuration: ${JSON.stringify(details)}`);
  }

  const email = parsed.data.ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(parsed.data.ADMIN_PASSWORD, BCRYPT_COST);

  const existing = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(adminUsers)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminUsers.email, email));
    return { seeded: true, message: `updated password hash for admin "${email}"` };
  }

  await db.insert(adminUsers).values({ email, passwordHash });
  return { seeded: true, message: `created admin "${email}"` };
}
