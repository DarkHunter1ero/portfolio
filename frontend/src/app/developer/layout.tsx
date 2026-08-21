import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await detectLocale()) as Locale;
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

export default async function DevLayout({ children }: { children: React.ReactNode }) {
  // Per-route intl provider: the root layout is preserved across client-side
  // navigations, so its provider can hold another portfolio's messages. This
  // subtree re-provides the messages resolved for THIS request
  // (getRequestConfig reads the x-portfolio-route header), keeping
  // useTranslations() in client components correct on every navigation.
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
