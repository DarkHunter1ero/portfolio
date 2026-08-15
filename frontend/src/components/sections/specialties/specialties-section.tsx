import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Container } from "@/components/shared/container";
import {
  Server,
  Cpu,
  Globe,
  Key,
  Shield,
  Database,
  Container as ContainerIcon,
  Zap,
  Terminal,
  Cloud,
  Layout,
  Monitor,
  type LucideIcon,
} from "lucide-react";

type SpecialtyItem = {
  name: string;
  description: string;
};

const iconMap: Record<string, LucideIcon> = {
  Server,
  Cpu,
  Globe,
  Key,
  Shield,
  Database,
  ContainerIcon,
  Zap,
  Terminal,
  Cloud,
  Layout,
  Monitor,
};

const specialtyIcons = [
  "Server",
  "Cpu",
  "Globe",
  "Key",
  "Shield",
  "Database",
  "ContainerIcon",
  "Zap",
  "Terminal",
  "Cloud",
  "Layout",
  "Monitor",
];

// Fallback: import from dev data if no items prop provided
import { specialties as devSpecialties } from "@/data/dev/specialties";

export async function SpecialtiesSection({ items }: { items?: SpecialtyItem[] }) {
  const t = await getTranslations("Specialties");
  const specialtyItems = items || devSpecialties;

  return (
    <section id="specialties" className="py-24 sm:py-32" aria-labelledby="specialties-heading">
      <Container>
        <SectionHeading id="specialties-heading" title={t("heading")} subtitle={t("subheading")} />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {specialtyItems.map((specialty, i) => {
            const iconName = specialtyIcons[i] ?? "Server";
            const Icon = iconMap[iconName] ?? Server;
            return (
              <article
                key={specialty.name}
                className="group rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:border-accent/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-foreground mb-1">
                      {specialty.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}