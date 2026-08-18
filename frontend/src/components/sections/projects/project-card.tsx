"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { projectDetails } from "@/data/dev/project-details";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  companySlug?: string | undefined;
  companyPeriod?: string | undefined;
}

interface TranslatedProjectItem {
  name: string;
  description: string;
  problem: string;
  architecture: string;
  challenges: string[];
}

export function ProjectCard({ project, index, companySlug, companyPeriod }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("Projects");
  const td = useTranslations("ProjectDetail");
  const messages = useMessages();
  const projectItems = ((messages as Record<string, unknown>).Projects as Record<string, unknown>)
    ?.items as Array<TranslatedProjectItem> | undefined;

  const translatedItem = projectItems?.find((p) => p.name === project.name);
  const description = translatedItem?.description ?? project.description;
  const slug = project.slug ?? project.name.toLowerCase().replace(/\s+/g, "-");
  const hasDetailPage = project.slug != null && projectDetails.some((p) => p.slug === project.slug);
  const projectHref = `/dev/projects/${slug}`;

  const image = (
    <div className="relative h-48 overflow-hidden bg-slate-100">
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={cn(
          "object-cover transition-transform duration-500",
          !prefersReduced && "group-hover:scale-105"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );

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
      whileHover={
        prefersReduced ? undefined : { y: -4, transition: { duration: 0.3, ease: "easeOut" } }
      }
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-lg shadow-black/5 overflow-hidden hover:shadow-xl transition-shadow"
    >
      {hasDetailPage ? (
        <Link href={projectHref} className="block" aria-label={project.name}>
          {image}
        </Link>
      ) : (
        image
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-slate-900">
          {hasDetailPage ? (
            <Link href={projectHref} className="hover:text-slate-600 transition-colors">
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>

        {project.company && (
          <p className="mt-1">
            {companySlug ? (
              <Link
                href={`/dev/companies/${companySlug}`}
                className="text-xs font-medium uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:underline underline-offset-4 transition-colors"
              >
                {project.company}
              </Link>
            ) : (
              <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                {project.company}
              </span>
            )}
          </p>
        )}

        <p className="mt-3 mb-4 text-sm text-slate-600 leading-relaxed line-clamp-4">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3">
            {companyPeriod && (
              <span className="text-xs font-[family-name:var(--font-mono)] text-slate-500">
                {companyPeriod}
              </span>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("viewOnGithub")}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("liveDemo")}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {hasDetailPage && (
            <Link
              href={projectHref}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-900 transition-all hover:gap-2"
            >
              {td("viewProject")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
