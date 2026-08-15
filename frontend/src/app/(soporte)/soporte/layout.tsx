import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale() as Locale;
  const t = getMetadataFor("soporte", locale);

  return {
    title: { template: `%s | ${t.ogSiteName}`, default: t.title },
    description: t.description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_LA" : "en_US",
      siteName: t.ogSiteName,
      title: t.ogTitle,
      description: t.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default function SoporteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
