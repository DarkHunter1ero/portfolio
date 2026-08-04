import { cookies, headers } from "next/headers";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

export const messagesMap = { en: enMessages, es: esMessages } as const;
export type Locale = keyof typeof messagesMap;

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
