import type { Metadata } from "next";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { EducationSection } from "@/components/sections/education/education-section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await detectLocale()) as Locale;
  const t = getMetadataFor("dev", locale);

  return {
    title: { template: `%s | ${t.ogSiteName}`, default: "Formación" },
    description: t.description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_LA" : "en_US",
      siteName: t.ogSiteName,
      title: `Formación | ${t.ogSiteName}`,
      description: t.ogDescription,
    },
  };
}

export default async function DevFormacionPage() {
  return (
    <>
      <div className="h-16" aria-hidden="true" />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
