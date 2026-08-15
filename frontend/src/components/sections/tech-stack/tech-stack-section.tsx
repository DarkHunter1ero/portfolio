import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { TechStackGrid } from "./tech-category-card";
import type { TechCategory } from "@/types";

// Fallback: dev tech stack data
import { techStack as devTechStack } from "@/data/dev/tech-stack";

export async function TechStackSection({ categories }: { categories?: TechCategory[] }) {
  const t = await getTranslations("TechStack");
  const techStackToUse = categories || devTechStack;

  return (
    <section
      id="tech-stack"
      className="py-24 sm:py-32 bg-card/30"
      aria-labelledby="tech-stack-heading"
    >
      <Container>
        <SectionHeading id="tech-stack-heading" title={t("heading")} subtitle={t("subheading")} />
        <TechStackGrid categories={techStackToUse} />
      </Container>
    </section>
  );
}