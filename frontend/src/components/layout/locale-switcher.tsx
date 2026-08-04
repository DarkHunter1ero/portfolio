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
      router.replace(window.location.pathname);
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
