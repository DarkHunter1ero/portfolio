import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ProjectDetailView } from "@/components/sections/projects/project-detail-view";
import { ProjectViewTracker } from "@/components/analytics/project-view-tracker";
import { projects, projectDetailsEn, projectDetailsEs } from "@/data/shared";
import { resolveCompanyExperience, toCompanyRef, type CompanyRef } from "@/lib/company";
import type { ProjectDetail } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}

function getProjectDetails(locale: string): ProjectDetail[] {
  return locale === "es" ? projectDetailsEs : projectDetailsEn;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("NotFound");
  const projectDetails = getProjectDetails(locale);
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) {
    return { title: t("title") };
  }

  return {
    title: project.metadata.title,
    description: project.metadata.description,
  };
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params;
  const { from } = await searchParams;
  const locale = await getLocale();
  const projectDetails = getProjectDetails(locale);
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Company attribution: project listing data carries the company name, and
  // the shared resolver maps it to the experience entry (logo + detail slug).
  const projectEntry = projects.find((p) => p.slug === slug);
  const companyExp = projectEntry ? resolveCompanyExperience(projectEntry) : undefined;
  const company: CompanyRef | undefined = companyExp ? toCompanyRef(companyExp) : undefined;

  return (
    <>
      {/* Fires project_view with the slug for analytics. */}
      <ProjectViewTracker slug={slug} />
      <ProjectDetailView project={project} from={from} company={company} />
    </>
  );
}
