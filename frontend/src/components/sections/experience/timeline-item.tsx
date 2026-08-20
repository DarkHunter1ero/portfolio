"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useMessages, useTranslations } from "next-intl";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Experience } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/dev/projects";
import { companyDetailHref, projectDetailHref, withFrom } from "@/lib/routes";
import { companySlug, cn } from "@/lib/utils";

interface TimelineItemProps {
  item: Experience;
  index: number;
  tPresent: string;
  tViewCompany: string;
  tViewDetails: string;
  useDataValues?: boolean;
}

function TimelineItem({
  item,
  index,
  tPresent,
  tViewCompany,
  tViewDetails,
  useDataValues,
}: TimelineItemProps) {
  const prefersReduced = useReducedMotion();
  const isLeft = index % 2 === 0;
  const pathname = usePathname();
  const from = pathname.startsWith("/support") ? "support" : undefined;
  const messages = useMessages();
  const tCommon = useTranslations("Common");
  const expItems = (messages as Record<string, unknown>).Experience as
    Record<string, unknown> | undefined;
  const expItem = (expItems?.items as Array<Record<string, unknown>> | undefined)?.[index];
  const translatedDescription = useDataValues
    ? item.description
    : typeof expItem?.description === "string"
      ? expItem.description
      : item.description;
  const translatedHighlights = useDataValues
    ? item.highlights
    : Array.isArray(expItem?.highlights)
      ? (expItem.highlights as string[])
      : item.highlights;

  // Translated project descriptions
  const projectsMessages = (messages as Record<string, unknown>).Projects as
    Record<string, unknown> | undefined;
  const translatedProjectsItems =
    (projectsMessages?.items as Array<Record<string, string>> | undefined) ?? [];

  function getTranslatedProjectDesc(name: string): string {
    const tItem = translatedProjectsItems.find((p) => p.name === name);
    return tItem?.description ?? "";
  }

  // Match projects to this company
  const companyProjects = projects.filter((p) => {
    const pc = (p.company ?? "").toLowerCase();
    const ec = item.company.toLowerCase();
    return pc === ec || pc.startsWith(ec);
  });

  const slug = companySlug(item.company);

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      className={cn(
        "relative pl-8 md:pl-0 md:w-1/2",
        isLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
      )}
    >
      {/* Timeline dot — on the center line (right edge for left cards, left edge for right cards) */}
      <div
        className={cn(
          "absolute w-3 h-3 rounded-full bg-accent border-2 border-background",
          "top-6",
          "left-[-6px]",
          isLeft ? "md:left-auto md:-right-[6px]" : "md:-left-[6px]"
        )}
      />

      <article className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10">
        {/* Company logo + header info */}
        <div className="flex items-start gap-4 mb-4">
          {item.logo ? (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border bg-secondary/30 shrink-0">
              <Image
                src={item.logo}
                alt={item.company}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <span className="text-accent font-[family-name:var(--font-playfair)] text-sm font-bold tracking-tight">
                {item.company.match(/\b\w/g)?.slice(0, 2).join("") ?? item.company.charAt(0)}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
              {item.role}
            </h3>
            <p className="text-sm text-muted-foreground">
              <a
                href={withFrom(companyDetailHref(slug), from)}
                className="hover:text-accent hover:underline underline-offset-4 transition-colors"
              >
                {item.company}
              </a>
            </p>
          </div>
          <span className="text-xs font-[family-name:var(--font-mono)] text-accent ml-auto shrink-0">
            {item.period.replace(/Present/gi, tPresent)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {translatedDescription}
        </p>

        <ul className="space-y-2 mb-4">
          {translatedHighlights.map((highlight, i) => (
            <li key={i} className="text-sm text-foreground/80 flex gap-2">
              <span className="text-accent mt-1 shrink-0">▹</span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.technologies.slice(0, 12).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {item.technologies.length > 12 && (
            <Badge variant="secondary" className="text-xs">
              +{item.technologies.length - 12} {tCommon("more")}
            </Badge>
          )}
        </div>

        {/* Inline projects */}
        {companyProjects.length > 0 && (
          <div className="border-t border-border pt-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {companyProjects.map((project) => (
                <div
                  key={project.name}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border bg-background shrink-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{project.name}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 leading-snug mt-0.5">
                      {getTranslatedProjectDesc(project.name) || project.description}
                    </p>
                    {project.slug && (
                      <a
                        href={withFrom(projectDetailHref(project.slug), from)}
                        className="inline-flex items-center gap-1 text-[10px] text-accent hover:underline mt-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {tViewDetails}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="gap-1 text-xs" asChild>
              <a href={withFrom(companyDetailHref(slug), from)}>
                {tViewCompany.replace("{company}", item.company)}
                <ArrowRight className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}
      </article>
    </motion.div>
  );
}

interface ExperienceTimelineProps {
  items: Experience[];
  tPresent: string;
  useDataValues?: boolean;
}

export function ExperienceTimeline({ items, tPresent, useDataValues }: ExperienceTimelineProps) {
  const t = useTranslations("Experience");

  return (
    <div className="relative mt-16">
      {/* Vertical line — visible on desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />

      {/* Vertical line — visible on mobile */}
      <div className="md:hidden absolute left-[3px] top-0 bottom-0 w-px bg-border" />

      <div className="flex flex-col gap-12">
        {items.map((item, index) => (
          <TimelineItem
            key={item.company}
            item={item}
            index={index}
            tPresent={tPresent}
            tViewCompany={t("viewCompany")}
            tViewDetails={t("viewDetails")}
            useDataValues={useDataValues}
          />
        ))}
      </div>
    </div>
  );
}
