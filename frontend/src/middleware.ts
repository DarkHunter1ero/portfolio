import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Legacy Spanish URIs under `/soporte` → permanent (308) redirect to the
 * current `/support` URIs. Covers the hub plus the known Spanish subpages
 * (perfil-profesional / formacion / contacto); any other unknown `/soporte/*`
 * falls back to the `/support` hub so old links never land on a 404.
 */
const LEGACY_SOPORTE_TO_SUPPORT: Record<string, string> = {
  "/soporte": "/support",
  "/soporte/perfil-profesional": "/support/professional-profile",
  "/soporte/formacion": "/support/education",
  "/soporte/contacto": "/support/contact",
};

const ADMIN_JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? "");

/**
 * Verifies the admin session JWT from the cookie.
 * Returns the payload if valid, null otherwise.
 */
async function verifyAdminSession(token: string): Promise<{ email: string; role: string; sub: string } | null> {
  if (!ADMIN_JWT_SECRET.length) return null;
  try {
    const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET);
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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1) Admin area protection — runs BEFORE portfolio route labeling
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      // If already authenticated, redirect to dashboard
      const token = request.cookies.get("admin_session")?.value;
      if (token && (await verifyAdminSession(token))) {
        return NextResponse.redirect(new URL("/admin/analytics", request.url));
      }
      // Continue to login page
    } else {
      // Protect all other /admin/* routes
      const token = request.cookies.get("admin_session")?.value;
      if (!token || !(await verifyAdminSession(token))) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 2) Legacy Spanish URIs redirect
  if (pathname === "/soporte" || pathname.startsWith("/soporte/")) {
    const target = LEGACY_SOPORTE_TO_SUPPORT[pathname] ?? "/support";
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 308);
  }

  // 3) Portfolio route labeling for i18n
  let portfolioRoute: string;
  if (pathname.startsWith("/developer")) {
    portfolioRoute = "dev";
  } else if (pathname.startsWith("/support")) {
    portfolioRoute = "soporte";
  } else if (pathname.startsWith("/companies") || pathname.startsWith("/projects")) {
    portfolioRoute = "dev";
  } else {
    portfolioRoute = "landing";
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-route", portfolioRoute);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Run on all paths except static assets, API routes, and Next internals
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|CV).*)"],
};