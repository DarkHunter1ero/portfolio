"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error("[Page Error]", error);
  }, [error]);

  return (
    <Container className="min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("title")}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{t("description")}</p>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-muted-foreground mb-6 p-4 rounded-lg bg-card border border-border max-w-xl overflow-x-auto text-left">
          {error.message}
          {"\n"}
          {error.stack}
        </pre>
      )}
      <Button variant="accent" onClick={reset}>
        {t("retry")}
      </Button>
    </Container>
  );
}
