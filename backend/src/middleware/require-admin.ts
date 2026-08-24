import { eq } from "drizzle-orm";
import type { RequestHandler, Response } from "express";
import { db } from "../db";
import { adminUsers } from "../db/schema";
import { verifyAdminSession } from "../services/admin-auth";

export interface AdminInfo {
  id: number;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminInfo;
  }
}

const unauthorized = (res: Response) => {
  res.status(401).json({ success: false, error: "Unauthorized" });
};

/**
 * Guards admin endpoints: verifies the admin_session cookie JWT and
 * confirms the admin user still exists in the database.
 */
export const requireAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.admin_session;
    if (!token) {
      unauthorized(res);
      return;
    }

    const claims = await verifyAdminSession(token);
    if (!claims) {
      unauthorized(res);
      return;
    }

    const adminId = Number(claims.sub);
    if (!Number.isInteger(adminId)) {
      unauthorized(res);
      return;
    }

    const rows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId))
      .limit(1);

    const admin = rows[0];
    if (!admin) {
      unauthorized(res);
      return;
    }

    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    next();
  } catch (error) {
    next(error);
  }
};
