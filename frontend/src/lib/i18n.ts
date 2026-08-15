import { cookies, headers } from "next/headers";
import enDevMessages from "../../messages/WEB_DEVELOPER/en.json";
import esDevMessages from "../../messages/WEB_DEVELOPER/es.json";
import enSoporteMessages from "../../messages/TI_SERVICES/en.json";
import esSoporteMessages from "../../messages/TI_SERVICES/es.json";

export type PortfolioRoute = "dev" | "soporte";
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

/**
 * Returns the portfolio route for the current request, read from the
 * `x-portfolio-route` header set by middleware. Defaults to "dev".
 */
export async function getPortfolioRoute(): Promise<PortfolioRoute> {
  try {
    const headersList = await headers();
    const route = headersList.get("x-portfolio-route");
    if (route === "soporte" || route === "dev") return route;
  } catch {
    // headers() not available (static generation)
  }
  return "dev";
}

/**
 * Returns the messages object for a given portfolio route and locale.
 */
export function getMessagesFor(route: PortfolioRoute, locale: Locale) {
  const map = route === "soporte" ? soporteMessagesMap : devMessagesMap;
  return map[locale] ?? map.en;
}

/**
 * Strongly-typed shape of the "Metadata" section present in all message files.
 * Both WEB_DEVELOPER and TI_SERVICES share this structure.
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
export async function getMessagesForRequest(): Promise<{ locale: Locale; messages: Messages; route: PortfolioRoute }> {
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
