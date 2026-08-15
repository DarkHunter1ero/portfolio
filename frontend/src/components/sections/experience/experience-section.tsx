import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { ExperienceTimeline } from "./timeline-item";
import type { Experience } from "@/types";

// Fallback: dev experience data
import { experience as devExperience } from "@/data/dev/experience";

export async function ExperienceSection({ items }: { items?: Experience[] }) {
  const t = await getTranslations("Experience");
  const experienceItems = items || devExperience;
  // When explicit items are passed, the data file is the source of truth;
  // skip pulling dev i18n item translations (which mismatch by index).
  const useDataValues = Boolean(items);

  return (
    <section id="experience" className="py-24 sm:py-32" aria-labelledby="experience-heading">
      <Container>
        <SectionHeading id="experience-heading" title={t("heading")} subtitle={t("subheading")} />
        <ExperienceTimeline items={experienceItems} tPresent={t("present")} useDataValues={useDataValues} />
      </Container>
    </section>
  );
}