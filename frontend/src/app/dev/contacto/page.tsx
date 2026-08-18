import type { Metadata } from "next";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { ContactSection } from "@/components/sections/contact/contact-section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await detectLocale()) as Locale;
  const t = getMetadataFor("dev", locale);

  return {
    title: { template: `%s | ${t.ogSiteName}`, default: "Contacto" },
    description:
      "Contacta a Diego Silva — Desarrollador Full Stack y Técnico en Soporte Informático. Servicios para empresas y particulares. Remoto y presencial.",
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_LA" : "en_US",
      siteName: t.ogSiteName,
      title: "Contacto — Diego Silva",
      description:
        "Consúltame sin compromiso por tu equipo o tu empresa. Soporte TI, desarrollo de software, automatizaciones a medida.",
    },
  };
}

export default async function ContactoPage() {
  return (
    <main id="main-content" className="pt-16">
      <ContactSection />
    </main>
  );
}
