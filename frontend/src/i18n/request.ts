import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Static imports so Next.js output file tracing includes these in standalone builds
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  es: esMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: messagesMap[locale] || messagesMap[routing.defaultLocale],
  };
});
