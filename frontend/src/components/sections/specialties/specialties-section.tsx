import Image from "next/image";
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
  image?: string | null;
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

  // Prefer translated items from i18n messages when available; keep images from TS data.
  const i18nItems = t.has("items")
    ? (t.raw("items") as Array<{ name: string; description: string }>)
    : null;

  const displayItems = specialtyItems.map((item, i) => ({
    name: i18nItems?.[i]?.name ?? item.name,
    description: i18nItems?.[i]?.description ?? item.description,
    image: "image" in item ? (item.image ?? null) : null,
  }));

  return (
    <section id="specialties" className="py-24 sm:py-32" aria-labelledby="specialties-heading">
      <Container>
        <SectionHeading id="specialties-heading" title={t("heading")} subtitle={t("subheading")} />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayItems.map((item, i) => {
            const iconName = specialtyIcons[i] ?? "Server";
            const Icon = iconMap[iconName] ?? Server;
            return (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:border-accent/30 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 via-card to-card flex items-center justify-center">
                      <Icon className="h-12 w-12 text-accent/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
