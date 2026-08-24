import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Router } from "express";
import type { RateLimitRequestHandler } from "express-rate-limit";
import { config } from "../../config";
import { db } from "../../db";
import { adminUsers } from "../../db/schema";
import { loginLimiter } from "../../middleware/rate-limiter";
import { requireAdmin } from "../../middleware/require-admin";
import { loginSchema } from "../../schemas/admin";
import { BCRYPT_COST, signAdminSession } from "../../services/admin-auth";

/**
 * Hash of an unusable password, compared when the email is unknown so
 * that login timing does not reveal whether an account exists. It is
 * hashed with BCRYPT_COST (12, "$2b$12$...") — if that constant
 * changes, regenerate this hash to match or unknown-email comparisons
 * will throw on the cost mismatch.
 */
const DUMMY_PASSWORD_HASH =
  "$2b$12$wdeh0dnNQK6tM3SmxrwtOuDSGAKb5V.ok6bnZPMayPx8rxCn0oP/e";

// Fail fast at startup if the dummy hash no longer matches the shared
// bcrypt cost (a mismatch would throw inside bcrypt.compare for
// unknown emails, turning a timing defense into a 500).
if (!DUMMY_PASSWORD_HASH.startsWith(`$2b$${BCRYPT_COST}$`)) {
  throw new Error(
    "DUMMY_PASSWORD_HASH cost does not match BCRYPT_COST — regenerate the dummy hash",
  );
}

const COOKIE_NAME = "admin_session";

/**
 * Cookie `secure` flag. sameSite=none only works over HTTPS — browsers
 * reject non-secure SameSite=None cookies outright — so it forces
 * `secure: true` regardless of NODE_ENV.
 */
function cookieSecure(): boolean {
  return config.COOKIE_SAMESITE === "none"
    ? true
    : config.NODE_ENV === "production";
}

export function createAdminAuthRouter(
  limiter: RateLimitRequestHandler = loginLimiter,
): Router {
  const router = Router();

  router.post("/admin/auth/login", limiter, async (req, res, next) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      const email = parsed.data.email.toLowerCase();
      const rows = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.email, email))
        .limit(1);
      const admin = rows[0];

      // Always run a bcrypt compare so unknown email and wrong password
      // take the same time and return the same generic response.
      const passwordMatches = await bcrypt.compare(
        parsed.data.password,
        admin?.passwordHash ?? DUMMY_PASSWORD_HASH,
      );

      if (!admin || !passwordMatches) {
        res.status(401).json({ success: false, error: "Invalid credentials" });
        return;
      }

      const token = await signAdminSession(admin);

      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: config.COOKIE_SAMESITE,
        secure: cookieSecure(),
        path: "/",
        maxAge: config.SESSION_TTL_HOURS * 60 * 60 * 1000,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  });

  router.post("/admin/auth/logout", (_req, res) => {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: config.COOKIE_SAMESITE,
      secure: cookieSecure(),
      path: "/",
    });
    res.status(200).json({ success: true });
  });

  router.get("/admin/auth/me", requireAdmin, (req, res) => {
    res.status(200).json({
      success: true,
      admin: { email: req.admin?.email, role: req.admin?.role },
    });
  });

  return router;
}

export const adminAuthRouter = createAdminAuthRouter();
