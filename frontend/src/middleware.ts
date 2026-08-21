import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

/**
 * Lightweight middleware that labels the current route group so that
 * server components and next-intl's getRequestConfig can load the
 * portfolio-specific messages (LANDING, WEB_DEVELOPER, TI_SERVICES).
 *
 * Labels:
 *  - `pathname` starts with `/developer` → "dev"
 *  - `pathname` starts with `/support`    → "soporte"
 *  - `pathname` starts with `/companies` or `/projects` → "dev" (global detail pages)
 *  - otherwise (incl. `/`, `/api`, unknown) → "landing"
 *
 * The header is consumed by:
 *  - src/app/layout.tsx        → NextIntlClientProvider messages
 *  - src/i18n/request.ts       → getTranslations / getMessages (server)
 *  - src/lib/i18n.ts           → getMessagesForRequest helper
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Permanent redirect for legacy `/soporte*` URIs → `/support*`.
  if (pathname === "/soporte" || pathname.startsWith("/soporte/")) {
    const target = LEGACY_SOPORTE_TO_SUPPORT[pathname] ?? "/support";
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 308);
  }

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
