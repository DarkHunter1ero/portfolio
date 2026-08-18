import type { Metadata } from "next";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { ProfessionalProfileSection } from "@/components/sections/professional-profile/professional-profile-section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await detectLocale()) as Locale;
  const t = getMetadataFor("dev", locale);

  return {
    title: { template: `%s | ${t.ogSiteName}`, default: "Perfil Profesional" },
    description: t.description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_LA" : "en_US",
      siteName: t.ogSiteName,
      title: `Perfil Profesional | ${t.ogSiteName}`,
      description: t.ogDescription,
    },
  };
}

export default async function DevPerfilProfesionalPage() {
  return (
    <>
      <div className="h-16" aria-hidden="true" />
      <ProfessionalProfileSection />
    </>
  );
}
