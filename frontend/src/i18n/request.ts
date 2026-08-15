import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { cookies, headers } from "next/headers";
import { routing } from "./routing";

// Static imports so Next.js output file tracing includes these in standalone builds
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  es: esMessages,
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

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await resolveLocale(await requestLocale);

  return {
    locale,
    messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
  };
});
