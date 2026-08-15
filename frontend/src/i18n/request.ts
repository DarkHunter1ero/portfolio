import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { cookies, headers } from "next/headers";
import { routing } from "./routing";
import { type Locale, type PortfolioRoute } from "@/lib/i18n";

// Static imports so Next.js output file tracing includes these in standalone builds
import enDevMessages from "../../messages/WEB_DEVELOPER/en.json";
import esDevMessages from "../../messages/WEB_DEVELOPER/es.json";
import enSoporteMessages from "../../messages/TI_SERVICES/en.json";
import esSoporteMessages from "../../messages/TI_SERVICES/es.json";

// Cast to a general type so the dev/soporte message union doesn't break
// the IntlProvider / getRequestConfig type contracts.
type Messages = Record<string, Record<string, unknown> | unknown>;

const devMessages: Record<string, Messages> = {
  en: enDevMessages as Messages,
  es: esDevMessages as Messages,
};
const soporteMessages: Record<string, Messages> = {
  en: enSoporteMessages as Messages,
  es: esSoporteMessages as Messages,
};

async function resolveLocale(requestLocale: string | undefined): Promise<string> {
  // 1. Locale set via setRequestLocale() (full renders from the root layout)
  if (hasLocale(routing.locales, requestLocale)) return requestLocale;

  // 2. NEXT_LOCALE cookie (manual switch). Required for renders where the root
  // layout does not re-run (client navigations), otherwise every server
  // component would fall back to the default locale.
  try {
    const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
    if (hasLocale(routing.locales, cookieLocale)) return cookieLocale;
  } catch {
    // cookies() is not available during static generation
  }

  // 3. Browser preference
  try {
    const acceptLang = ((await headers()).get("accept-language") || "").toLowerCase();
    if (acceptLang.startsWith("es")) return "es";
  } catch {
    // headers() is not available during static generation
  }

  return routing.defaultLocale;
}

async function resolvePortfolioRoute(): Promise<PortfolioRoute> {
  try {
    const route = (await headers()).get("x-portfolio-route");
    if (route === "soporte" || route === "dev") return route;
  } catch {
    // headers() is not available during static generation
  }
  return "dev";
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await resolveLocale(await requestLocale) as Locale;
  const route = await resolvePortfolioRoute();

  const messages =
    route === "soporte"
      ? (soporteMessages[locale] ?? soporteMessages.en)
      : (devMessages[locale] ?? devMessages.en);

  return {
    locale,
    messages,
  };
});
