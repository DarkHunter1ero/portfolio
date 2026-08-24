import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { z } from "zod";
import { db } from "../db";
import { adminUsers } from "../db/schema";
// Must match the cost embedded in DUMMY_PASSWORD_HASH (routes/admin/auth.ts).
import { BCRYPT_COST } from "../services/admin-auth";

const seedSchema = z.object({
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email address"),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "ADMIN_PASSWORD must be at least 8 characters"),
});

/**
 * Seeds (or updates) the admin user from ADMIN_EMAIL / ADMIN_PASSWORD env
 * vars. Idempotent: re-running with the same email updates the password
 * hash. The password itself is never logged.
 */
async function seedAdmin(): Promise<void> {
  const parsed = seedSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "[Seed] Invalid or missing environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    console.error(
      "[Seed] Set ADMIN_EMAIL and ADMIN_PASSWORD before running db:seed.",
    );
    process.exit(1);
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
    console.log(`[Seed] Updated password hash for admin "${email}"`);
  } else {
    await db.insert(adminUsers).values({ email, passwordHash });
    console.log(`[Seed] Created admin "${email}"`);
  }
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[Seed] Failed:", error);
    process.exit(1);
  });
