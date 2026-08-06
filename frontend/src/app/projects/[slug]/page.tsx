import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ProjectDetailView } from "@/components/sections/projects/project-detail-view";
import type { ProjectDetail } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectDetails(locale: string): Promise<ProjectDetail[]> {
  if (locale === "es") {
    const mod = await import("@/data/project-details-es");
    return mod.projectDetailsEs;
  }
  const mod = await import("@/data/project-details-en");
  return mod.projectDetailsEn;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("NotFound");
  const projectDetails = await getProjectDetails(locale);
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) {
    return { title: t("title") };
  }

  return {
    title: project.metadata.title,
    description: project.metadata.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const projectDetails = await getProjectDetails(locale);
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
