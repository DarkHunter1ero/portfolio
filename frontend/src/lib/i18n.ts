import { cookies, headers } from "next/headers";
import enDevMessages from "../../messages/WEB_DEVELOPER/en.json";
import esDevMessages from "../../messages/WEB_DEVELOPER/es.json";
import enSoporteMessages from "../../messages/TI_SERVICES/en.json";
import esSoporteMessages from "../../messages/TI_SERVICES/es.json";
import enLandingMessages from "../../messages/LANDING/en.json";
import esLandingMessages from "../../messages/LANDING/es.json";

export type PortfolioRoute = "dev" | "soporte" | "landing";
export type Locale = "en" | "es";

// All message files share the same key structure; use a general type to avoid
// type mismatches when swapping between portfolios at runtime.
type Messages = Record<string, Record<string, unknown> | unknown>;

export const devMessagesMap: Record<Locale, Messages> = {
  en: enDevMessages,
  es: esDevMessages,
};
export const soporteMessagesMap: Record<Locale, Messages> = {
  en: enSoporteMessages,
  es: esSoporteMessages,
};
export const landingMessagesMap: Record<Locale, Messages> = {
  en: enLandingMessages,
  es: esLandingMessages,
};

/**
 * Returns the portfolio route for the current request, read from the
 * `x-portfolio-route` header set by middleware. Defaults to "landing" so
 * unknown/missing labels never silently fall back to the dev portfolio.
 */
export async function getPortfolioRoute(): Promise<PortfolioRoute> {
  try {
    const headersList = await headers();
    const route = headersList.get("x-portfolio-route");
    if (route === "soporte" || route === "dev" || route === "landing") return route;
  } catch {
    // headers() not available (static generation)
  }
  return "landing";
}

/**
 * Returns the messages object for a given portfolio route and locale.
 * The switch is intentionally exhaustive over `PortfolioRoute` with no
 * `default` arm so `tsc` surfaces any unhandled branch at compile time.
 */
export function getMessagesFor(route: PortfolioRoute, locale: Locale) {
  switch (route) {
    case "dev":
      return devMessagesMap[locale] ?? devMessagesMap.en;
    case "soporte":
      return soporteMessagesMap[locale] ?? soporteMessagesMap.en;
    case "landing":
      return landingMessagesMap[locale] ?? landingMessagesMap.en;
  }
}

/**
 * Strongly-typed shape of the "Metadata" section present in all message files.
 * WEB_DEVELOPER, TI_SERVICES, and LANDING all share this structure.
 */
export interface MetadataMessages {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogSiteName: string;
  ogImageAlt: string;
}

/**
 * Returns the Metadata section for a portfolio route + locale, strongly typed.
 */
export function getMetadataFor(route: PortfolioRoute, locale: Locale): MetadataMessages {
  const msgs = getMessagesFor(route, locale);
  return msgs.Metadata as unknown as MetadataMessages;
}

/**
 * Returns the messages object for the current request by reading the
 * `x-portfolio-route` header and the locale cookie/header.
 */
export async function getMessagesForRequest(): Promise<{
  locale: Locale;
  messages: Messages;
  route: PortfolioRoute;
}> {
  const route = await getPortfolioRoute();
  const locale = await detectLocale();
  const messages = getMessagesFor(route, locale);
  return { locale, messages, route };
}

/**
 * Detects the user's locale:
 * 1. NEXT_LOCALE cookie (manual switch)
 * 2. Accept-Language header (browser preference)
 * 3. Default: English
 */
export async function detectLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLocale === "en" || cookieLocale === "es") return cookieLocale;
  } catch {
    // cookies() not available (static generation)
  }

  try {
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language") || "";
    if (acceptLang.toLowerCase().startsWith("es")) return "es";
  } catch {
    // headers() not available
  }

  return "en";
}

// Backward-compat: export a combined messagesMap that defaults to dev messages.
// New code should use getMessagesFor / getMessagesForRequest instead.
/** @deprecated Use getMessagesForRequest() instead */
export const messagesMap = devMessagesMap;
