"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types";
import { projectDetails } from "@/data/dev/project-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { buttonTap } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface TranslatedProjectItem {
  name: string;
  description: string;
  problem: string;
  architecture: string;
  challenges: string[];
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
      className="group rounded-2xl border border-border bg-card shadow-lg shadow-black/10 overflow-hidden hover:shadow-xl hover:shadow-black/20 transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-secondary/30">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            !prefersReduced && "group-hover:scale-105"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground mb-2">
          {project.name}
        </h3>

        {project.company && (
          <p className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">
            {project.company}
          </p>
        )}

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 6).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 6 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 6}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
          {hasDetailPage && (
            <motion.div {...buttonTap}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-accent hover:text-accent"
              >
                  <Link href={`/dev/projects/${slug}`}>
                  {td("viewProject")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          )}
          {project.githubUrl && (
            <motion.div {...buttonTap}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-accent"
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  {t("viewOnGithub")}
                </a>
              </Button>
            </motion.div>
          )}
          {project.liveUrl && (
            <motion.div {...buttonTap}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-accent"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("liveDemo")}
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
