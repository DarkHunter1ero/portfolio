import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import { GraduationCap, Wrench, BookOpen } from "lucide-react";

const iconMap = {
  tertiary: GraduationCap,
  technical: Wrench,
  secondary: BookOpen,
} as const;

export async function EducationSection() {
  const t = await getTranslations("Education");
  const items = t.raw("items") as Array<{
    institution: string;
    degree: string;
    period: string;
    type: keyof typeof iconMap;
    description: string;
  }>;

  return (
    <section
      id="education"
      className="py-24 sm:py-32 bg-card/30"
      aria-labelledby="education-heading"
    >
      <Container>
        <SectionHeading id="education-heading" title={t("heading")} subtitle={t("subheading")} />

        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {items.map((item, _index) => {
              const Icon = iconMap[item.type] ?? GraduationCap;
              return (
                <article key={item.institution} className="relative pl-14">
                  {/* Icon on the timeline */}
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 border-2 border-background">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-accent">
                      {item.period}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mt-1">
                      {item.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
