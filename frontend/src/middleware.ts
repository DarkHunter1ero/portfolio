import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight middleware that labels the current route group so that
 * server components and next-intl's getRequestConfig can load the
 * portfolio-specific messages (LANDING, WEB_DEVELOPER, TI_SERVICES).
 *
 * Labels:
 *  - `pathname` starts with `/dev`     → "dev"
 *  - `pathname` starts with `/soporte` → "soporte"
 *  - otherwise (incl. `/`, `/api`, unknown) → "landing"
 *
 * The header is consumed by:
 *  - src/app/layout.tsx        → NextIntlClientProvider messages
 *  - src/i18n/request.ts       → getTranslations / getMessages (server)
 *  - src/lib/i18n.ts           → getMessagesForRequest helper
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let portfolioRoute: string;
  if (pathname.startsWith("/dev")) {
    portfolioRoute = "dev";
  } else if (pathname.startsWith("/soporte")) {
    portfolioRoute = "soporte";
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
