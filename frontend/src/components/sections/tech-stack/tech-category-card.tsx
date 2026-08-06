"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import type { TechCategory } from "@/types";
import {
  Server,
  Layout,
  Database,
  Container,
  Shield,
  Cpu,
  FlaskConical,
  Wrench,
  Users,
  Activity,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Layout,
  Database,
  Container,
  Shield,
  Cpu,
  FlaskConical,
  Wrench,
  Users,
  Activity,
};

interface TechBadgeProps {
  name: string;
  level?: number;
}

function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full border border-border text-xs font-[family-name:var(--font-mono)] text-muted-foreground bg-secondary/50 transition-colors hover:border-accent/50 hover:text-foreground">
      {name}
    </span>
  );
}

interface TechCategoryCardProps {
  category: TechCategory;
  index: number;
}

function TechCategoryCard({ category, index }: TechCategoryCardProps) {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("TechStack.categories");
  const Icon = iconMap[category.icon] || Server;

  const displayName = (() => {
    try {
      const translated = t(category.name);
      if (translated && translated !== category.name) return translated;
    } catch {
      // key not found, fall back to data name
    }
    return category.name;
  })();

  return (
    <motion.article
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      whileHover={prefersReduced ? undefined : { scale: 1.02, y: -2 }}
      className="rounded-2xl border border-border bg-card shadow-lg shadow-black/10 p-6 transition-shadow hover:shadow-xl hover:shadow-black/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
          {displayName}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <TechBadge key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </motion.article>
  );
}

interface TechStackGridProps {
  categories: TechCategory[];
}

export function TechStackGrid({ categories }: TechStackGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {categories.map((category, index) => (
        <TechCategoryCard key={category.name} category={category} index={index} />
      ))}
    </div>
  );
}
