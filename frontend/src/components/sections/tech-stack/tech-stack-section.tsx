import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { TechStackGrid } from "./tech-category-card";
import { techStack } from "@/data/tech-stack";

export async function TechStackSection() {
  const t = await getTranslations("TechStack");

  return (
    <section
      id="tech-stack"
      className="py-24 sm:py-32 bg-card/30"
      aria-labelledby="tech-stack-heading"
    >
      <Container>
        <SectionHeading
          id="tech-stack-heading"
          title={t("heading")}
          subtitle={t("subheading")}
        />
        <TechStackGrid categories={techStack} />
      </Container>
    </section>
  );
}
