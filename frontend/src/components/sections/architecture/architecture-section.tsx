import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { DiagramTabs } from "./diagram-tabs";
import { architectureDiagrams } from "@/data/architecture";

export async function ArchitectureSection() {
  const t = await getTranslations("Architecture");

  return (
    <section id="architecture" className="py-24 sm:py-32" aria-labelledby="architecture-heading">
      <Container>
        <SectionHeading id="architecture-heading" title={t("heading")} subtitle={t("subheading")} />
        <DiagramTabs diagrams={architectureDiagrams} />
      </Container>
    </section>
  );
}
