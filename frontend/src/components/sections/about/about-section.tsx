import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="text-center p-6 rounded-2xl border border-border bg-card/50">
      <span className="block font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-accent mb-1">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section id="about" className="py-24 sm:py-32" aria-labelledby="about-heading">
      <Container>
        <SectionHeading id="about-heading" title={t("heading")} subtitle={t("subheading")} />

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {t("bio")
              .split("\n\n")
              .map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="flex flex-col gap-4">
            <StatCard label={t("statYears")} value={t("statYearsValue")} />
            <StatCard label={t("statProjects")} value={t("statProjectsValue")} />
            <StatCard label={t("statTechs")} value={t("statTechsValue")} />
          </div>
        </div>
      </Container>
    </section>
  );
}
