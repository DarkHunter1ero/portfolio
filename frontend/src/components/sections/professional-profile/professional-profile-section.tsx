import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { Briefcase, Lightbulb, Scale, Wrench } from "lucide-react";

const softSkills = [
  { label: "problemSolving", icon: Lightbulb },
  { label: "continuousLearning", icon: Briefcase },
  { label: "softwareQuality", icon: Scale },
  { label: "cleanCode", icon: Wrench },
];

export async function ProfessionalProfileSection() {
  const t = await getTranslations("ProfessionalProfile");
  const paragraphs = t("summary").split("\n\n");

  return (
    <section
      id="professional-profile"
      className="py-24 sm:py-32 bg-card/30"
      aria-labelledby="professional-profile-heading"
    >
      <Container>
        <SectionHeading
          id="professional-profile-heading"
          title={t("heading")}
          subtitle={t("subheading")}
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Soft skills badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {softSkills.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-accent" />
              {t(label)}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
