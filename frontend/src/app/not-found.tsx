import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="min-h-screen flex flex-col items-center justify-center text-center">
      <span className="font-[family-name:var(--font-playfair)] text-8xl font-bold text-accent/30 mb-4">
        404
      </span>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        {t("title")}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t("description")}
      </p>
      <Button variant="accent" asChild>
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </Container>
  );
}
