import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale() as Locale;
  const t = getMetadataFor("dev", locale);

  return {
    title: { template: `%s | ${t.ogSiteName}`, default: t.title },
    description: t.description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_LA" : "en_US",
      siteName: t.ogSiteName,
      title: t.ogTitle,
      description: t.ogDescription,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: t.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      images: ["/opengraph-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
