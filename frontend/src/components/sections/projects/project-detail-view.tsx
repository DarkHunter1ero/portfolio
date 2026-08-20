"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { backToProjectsHref, SOPORTE_PATH } from "@/lib/routes";
import type { ProjectDetail } from "@/types";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Shield,
  Key,
  FileText,
  Clock,
  Users,
  Cloud,
  Server,
  Database,
  Globe,
  Lock,
  CheckCircle,
  Zap,
  Smartphone,
  CreditCard,
  Fingerprint,
  FileSignature,
  HardDrive,
  ArrowLeft,
  Monitor,
  type LucideIcon,
} from "lucide-react";

// ─── Icon Map ─────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Key,
  FileText,
  Clock,
  Users,
  Cloud,
  Server,
  Database,
  Globe,
  Lock,
  CheckCircle,
  Zap,
  Smartphone,
  CreditCard,
  Fingerprint,
  FileSignature,
  HardDrive,
  Monitor,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Shield;
}

// ─── Mermaid (lazy) ───────────────────────────────────────────

const MermaidDiagram = dynamic(
  () =>
    import("@/components/sections/architecture/mermaid-diagram").then((mod) => mod.MermaidDiagram),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full min-h-[300px] rounded-2xl" />,
  }
);

// ─── YouTube Embed ────────────────────────────────────────────

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }
  } catch {
    // Invalid URL
  }
  return null;
}

function VideoEmbed({ url, className }: { url: string; className?: string }) {
  const t = useTranslations("ProjectDetail");
  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  return (
    <div
      className={cn(
        "relative aspect-video rounded-xl overflow-hidden border border-border bg-black/40",
        className
      )}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={t("demoVideoTitle")}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}

// ─── Animation Helpers ────────────────────────────────────────

const sectionAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.5, ease: "easeOut" as const },
};

// ─── ProjectHero ──────────────────────────────────────────────

function ProjectHero({
  project,
  t,
  from,
}: {
  project: ProjectDetail;
  t: (key: string) => string;
  from?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background pointer-events-none" />

      <Container className="relative z-10">
        {/* Back link */}
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="mb-8">
          <Link
            href={backToProjectsHref(from)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToProjects")}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <motion.div {...(prefersReduced ? {} : sectionAnim)} className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {project.role}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {project.duration}
              </Badge>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {project.name}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {project.subtitle}
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl">
              {project.shortDescription}
            </p>
          </motion.div>

          {/* Media column (video or image) */}
          <motion.div
            {...(prefersReduced
              ? {}
              : {
                  ...sectionAnim,
                  transition: { ...sectionAnim.transition, delay: 0.15 },
                })}
            className="relative"
          >
            {project.videoUrl ? (
              <VideoEmbed url={project.videoUrl} className="shadow-2xl shadow-accent/5" />
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl shadow-accent/5">
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ─── InstancesSection ─────────────────────────────────────────

function InstancesSection({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  if (!project.instances || project.instances.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("instancesHeading")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {project.instances.map((instance, idx) => (
            <motion.div
              key={instance.country}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.1 },
                  })}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-black/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" role="img" aria-label={instance.country}>
                  {instance.flag}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
                  {instance.country}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {instance.description}
              </p>

              {instance.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-secondary/20 mb-6">
                  <Image
                    src={instance.image}
                    alt={`${instance.country} — ${project.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {instance.highlights.map((h) => (
                  <Badge key={h} variant="default" className="text-xs">
                    {h}
                  </Badge>
                ))}
              </div>

              {instance.videoUrl && <VideoEmbed url={instance.videoUrl} />}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectAbout ─────────────────────────────────────────────

function ProjectAbout({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("aboutHeading")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* About text */}
          <div className="space-y-4">
            {project.about.split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                {...(prefersReduced
                  ? {}
                  : {
                      ...sectionAnim,
                      transition: { ...sectionAnim.transition, delay: i * 0.1 },
                    })}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Sidebar info */}
          <motion.aside
            {...(prefersReduced
              ? {}
              : {
                  ...sectionAnim,
                  transition: { ...sectionAnim.transition, delay: 0.2 },
                })}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-4">
                {t("role")}
              </h3>
              <p className="text-sm text-muted-foreground">{project.role}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-4">
                {t("duration")}
              </h3>
              <p className="text-sm text-muted-foreground">{project.duration}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10">
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-4">
                {t("technologiesHeading")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectProblemSolution ────────────────────────────────────

function ProjectProblemSolution({
  project,
  t,
}: {
  project: ProjectDetail;
  t: (key: string) => string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem */}
          <motion.div
            {...(prefersReduced ? {} : sectionAnim)}
            className="rounded-2xl border border-red-500/20 bg-card p-8 shadow-lg shadow-black/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangleIcon />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
                {t("problemHeading")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </motion.div>

          {/* Solution */}
          <motion.div
            {...(prefersReduced
              ? {}
              : {
                  ...sectionAnim,
                  transition: { ...sectionAnim.transition, delay: 0.1 },
                })}
            className="rounded-2xl border border-emerald-500/20 bg-card p-8 shadow-lg shadow-black/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <LightbulbIcon />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
                {t("solutionHeading")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ─── Inline SVG icons for Problem/Solution ────────────────────

function AlertTriangleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgb(239, 68, 68)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgb(52, 211, 153)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

// ─── ProjectFeatures ──────────────────────────────────────────

function ProjectFeatures({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("featuresHeading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature, idx) => {
            const Icon = getIcon(feature.icon);
            return (
              <motion.div
                key={feature.title}
                {...(prefersReduced
                  ? {}
                  : {
                      ...sectionAnim,
                      transition: { ...sectionAnim.transition, delay: idx * 0.05 },
                    })}
                whileHover={
                  prefersReduced
                    ? undefined
                    : { y: -4, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="group rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectParticipation ─────────────────────────────────────

function ProjectParticipation({
  project,
  t,
}: {
  project: ProjectDetail;
  t: (key: string) => string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("participationHeading")}
          </h2>
        </motion.div>

        <motion.div
          {...(prefersReduced
            ? {}
            : {
                ...sectionAnim,
                transition: { ...sectionAnim.transition, delay: 0.1 },
              })}
          className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-lg shadow-black/10"
        >
          <ul className="space-y-4">
            {project.participation.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── ProjectChallenges ────────────────────────────────────────

function ProjectChallenges({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("challengesHeading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {project.technicalChallenges.map((challenge, idx) => (
            <motion.div
              key={challenge.title}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.07 },
                  })}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-3">
                {challenge.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectSecurity ──────────────────────────────────────────

function ProjectSecurity({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("securityHeading")}
          </h2>
          {project.security.description && (
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {project.security.description}
            </p>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.security.items.map((item, idx) => (
            <motion.div
              key={item.title}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.06 },
                  })}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Lock className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectImpact ────────────────────────────────────────────

function ProjectImpact({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("impactHeading")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.impact.map((metric, idx) => {
            const Icon = metric.icon ? getIcon(metric.icon) : null;
            return (
              <motion.div
                key={metric.label}
                {...(prefersReduced
                  ? {}
                  : {
                      ...sectionAnim,
                      transition: { ...sectionAnim.transition, delay: idx * 0.08 },
                    })}
                className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 text-center"
              >
                {Icon && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                )}
                <div className="font-[family-name:var(--font-mono)] text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectArchitecture ──────────────────────────────────────

function ProjectArchitecture({
  project,
  t,
}: {
  project: ProjectDetail;
  t: (key: string) => string;
}) {
  const prefersReduced = useReducedMotion();

  if (!project.architecture) return null;

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("architectureHeading")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {project.architecture.description}
          </p>
        </motion.div>

        {project.architecture.mermaidCode && (
          <motion.div
            {...(prefersReduced
              ? {}
              : {
                  ...sectionAnim,
                  transition: { ...sectionAnim.transition, delay: 0.1 },
                })}
          >
            <MermaidDiagram code={project.architecture.mermaidCode} />
          </motion.div>
        )}
      </Container>
    </section>
  );
}

// ─── ProjectLessons ───────────────────────────────────────────

function ProjectLessons({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("lessonsHeading")}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {project.lessonsLearned.map((lesson, idx) => (
            <motion.div
              key={idx}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.07 },
                  })}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10"
            >
              <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 mt-0.5">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{lesson}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectUseCases ──────────────────────────────────────────

function ProjectUseCases({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  if (!project.useCases || project.useCases.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("useCasesHeading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.useCases.map((uc, idx) => (
            <motion.div
              key={uc.title}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.06 },
                  })}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground mb-2">
                {uc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectDemoVideos ────────────────────────────────────────

function ProjectDemoVideos({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  if (!project.demoVideos || project.demoVideos.length === 0) return null;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("demoVideosHeading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {project.demoVideos.map((video, idx) => (
            <motion.div
              key={video.url}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.1 },
                  })}
            >
              <VideoEmbed url={video.url} className="shadow-lg shadow-black/10" />
              <p className="mt-3 text-sm text-muted-foreground text-center">{video.title}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectGallery ───────────────────────────────────────────

function ProjectGallery({ project, t }: { project: ProjectDetail; t: (key: string) => string }) {
  const prefersReduced = useReducedMotion();

  // Placeholder images represent "no image available" — filter them out so the
  // gallery only renders real images. If nothing real remains, hide the section.
  const galleryImages = (project.gallery ?? []).filter(
    (img) => !img.src.endsWith("/placeholder.svg")
  );

  if (galleryImages.length === 0) return null;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("galleryHeading")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.alt}
              {...(prefersReduced
                ? {}
                : {
                    ...sectionAnim,
                    transition: { ...sectionAnim.transition, delay: idx * 0.08 },
                  })}
              className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-secondary/30"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── ProjectCTA ───────────────────────────────────────────────

function ProjectCTA({ project, from }: { project: ProjectDetail; from?: string }) {
  const prefersReduced = useReducedMotion();
  const ctaHref = from === "support" ? `${SOPORTE_PATH}/education` : project.callToAction.link;

  return (
    <section className="py-24 sm:py-32 bg-card/30">
      <Container>
        <motion.div {...(prefersReduced ? {} : sectionAnim)} className="text-center">
          <Separator className="mb-12" />
          <Link href={ctaHref}>
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {project.callToAction.text}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────

interface ProjectDetailViewProps {
  project: ProjectDetail;
  from?: string;
}

export function ProjectDetailView({ project, from }: ProjectDetailViewProps) {
  const t = useTranslations("ProjectDetail");

  return (
    <>
      <ProjectHero project={project} t={t} from={from} />
      <InstancesSection project={project} t={t} />
      <ProjectAbout project={project} t={t} />
      <ProjectProblemSolution project={project} t={t} />
      <ProjectFeatures project={project} t={t} />
      <ProjectParticipation project={project} t={t} />
      <ProjectChallenges project={project} t={t} />
      <ProjectSecurity project={project} t={t} />
      <ProjectImpact project={project} t={t} />
      <ProjectArchitecture project={project} t={t} />
      <ProjectUseCases project={project} t={t} />
      <ProjectDemoVideos project={project} t={t} />
      <ProjectLessons project={project} t={t} />
      <ProjectGallery project={project} t={t} />
      <ProjectCTA project={project} from={from} />
    </>
  );
}
