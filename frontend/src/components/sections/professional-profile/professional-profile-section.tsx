import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { Brain, BookOpen, CheckCircle, Code } from "lucide-react";

const cardConfig = [
  { key: "problemSolving", icon: Brain },
  { key: "continuousLearning", icon: BookOpen },
  { key: "softwareQuality", icon: CheckCircle },
  { key: "cleanCode", icon: Code },
] as const;

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

        {/* Feature cards */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cardConfig.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">
                  {t(key)}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(key)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}