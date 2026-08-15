"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition, useCallback } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("LocaleSwitcher");

  const switchTo = locale === "en" ? "es" : "en";

  const handleSwitch = useCallback(() => {
    document.cookie = `NEXT_LOCALE=${switchTo};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      // router.replace() only re-renders the page segment; layouts persist across
      // navigations, so the root layout (which owns locale detection and the
      // NextIntlClientProvider) would never re-run. router.refresh() re-fetches
      // the whole route from the server, layout included.
      router.refresh();
    });
  }, [switchTo, router]);

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="px-3 py-1.5 rounded-full text-xs font-medium bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
      aria-label={t("label")}
      type="button"
    >
      {isPending ? "..." : switchTo.toUpperCase()}
    </button>
  );
}
