import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";

export async function ProfessionalProfileSection({
  summary: customSummary,
}: {
  summary?: string;
} = {}) {
  const t = await getTranslations("ProfessionalProfile");
  const rawSummary = customSummary || t("summary");
  const paragraphs = rawSummary.split("\n\n");

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
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}