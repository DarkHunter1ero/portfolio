import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { ExperienceTimeline } from "./timeline-item";
import { experience } from "@/data/experience";

export async function ExperienceSection() {
  const t = await getTranslations("Experience");

  return (
    <section id="experience" className="py-24 sm:py-32" aria-labelledby="experience-heading">
      <Container>
        <SectionHeading id="experience-heading" title={t("heading")} subtitle={t("subheading")} />
        <ExperienceTimeline items={experience} tPresent={t("present")} />
      </Container>
    </section>
  );
}
