import { SignJWT, jwtVerify } from "jose";
import { config } from "../config";

export interface AdminSessionPayload {
  sub: string;
  email: string;
  role: string;
}

const secret = new TextEncoder().encode(config.ADMIN_JWT_SECRET);

/**
 * bcrypt cost shared by src/scripts/seed-admin.ts (hashing seeded
 * passwords) and src/routes/admin/auth.ts (whose DUMMY_PASSWORD_HASH
 * embeds this cost and must match it).
 */
export const BCRYPT_COST = 12;

/** Signs a short-lived HS256 session JWT for an admin user. */
export async function signAdminSession(admin: {
  id: number;
  email: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ email: admin.email, role: admin.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(admin.id))
    .setIssuedAt()
    .setExpirationTime(`${config.SESSION_TTL_HOURS}h`)
    .sign(secret);
}

/**
 * Verifies and decodes an admin session JWT.
 * Returns null for invalid, expired, or malformed tokens.
 */
export async function verifyAdminSession(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return { sub: payload.sub, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
