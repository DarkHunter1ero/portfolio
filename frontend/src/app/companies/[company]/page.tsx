import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { experience } from "@/data/dev/experience";
import { projects } from "@/data/dev/projects";
import { CompanyDetailView } from "@/components/sections/projects/company-detail-view";
import { companySlug } from "@/lib/utils";

interface CompanyPageProps {
  params: Promise<{ company: string }>;
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { company: slug } = await params;
  const t = await getTranslations("Error");

  const exp = experience.find((e) => companySlug(e.company) === slug);
  if (!exp) return { title: t("title") };

  return {
    title: `${exp.company} — Diego Silva`,
    description: exp.description,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { company: slug } = await params;

  const exp = experience.find((e) => companySlug(e.company) === slug);
  if (!exp) notFound();

  const companyProjects = projects.filter((p) => {
    const pc = (p.company ?? "").toLowerCase();
    const ec = exp.company.toLowerCase();
    return pc === ec || pc.startsWith(ec);
  });

  return <CompanyDetailView company={exp} companyProjects={companyProjects} />;
}
