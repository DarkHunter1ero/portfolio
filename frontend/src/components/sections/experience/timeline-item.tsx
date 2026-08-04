"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMessages, useTranslations } from "next-intl";
import type { Experience } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: Experience;
  index: number;
  tPresent: string;
}

function TimelineItem({ item, index, tPresent }: TimelineItemProps) {
  const prefersReduced = useReducedMotion();
  const isLeft = index % 2 === 0;
  const messages = useMessages();
  const tCommon = useTranslations("Common");
  const expItems = (messages as Record<string, unknown>).Experience as Record<string, unknown> | undefined;
  const expItem = (expItems?.items as Array<Record<string, unknown>> | undefined)?.[index];
  const translatedDescription = typeof expItem?.description === "string" ? expItem.description : item.description;
  const translatedHighlights = Array.isArray(expItem?.highlights) ? (expItem.highlights as string[]) : item.highlights;

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
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute w-3 h-3 rounded-full bg-accent border-2 border-background",
          "top-6",
          "md:top-6",
          isLeft ? "md:-right-[6.5px]" : "md:-left-[6.5px]",
          "left-[-6.5px] md:left-auto"
        )}
      />

      <article className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10">
        <span className="text-xs font-[family-name:var(--font-mono)] text-accent">
          {item.period.replace(/Present/gi, tPresent)}
        </span>

        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground mt-1">
          {item.role}
        </h3>

        <p className="text-sm text-muted-foreground mb-1">{item.company}</p>

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

        <div className="flex flex-wrap gap-1.5">
          {item.technologies.slice(0, 8).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {item.technologies.length > 8 && (
            <Badge variant="secondary" className="text-xs">
              +{item.technologies.length - 8} {tCommon("more")}
            </Badge>
          )}
        </div>
      </article>
    </motion.div>
  );
}

interface ExperienceTimelineProps {
  items: Experience[];
  tPresent: string;
}

export function ExperienceTimeline({ items, tPresent }: ExperienceTimelineProps) {
  return (
    <div className="relative mt-16">
      {/* Vertical line — visible on desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />

      {/* Vertical line — visible on mobile */}
      <div className="md:hidden absolute left-[3px] top-0 bottom-0 w-px bg-border" />

      <div className="flex flex-col gap-12">
        {items.map((item, index) => (
          <TimelineItem key={item.company} item={item} index={index} tPresent={tPresent} />
        ))}
      </div>
    </div>
  );
}
