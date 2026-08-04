import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { JsonLd } from "@/components/seo/JsonLd";
import { detectLocale, messagesMap } from "@/lib/i18n";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const t = messagesMap[locale].Metadata;

  return {
    metadataBase: new URL("https://diegosilva.dev"),
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
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.ogDescription, images: ["/opengraph-image.png"] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await detectLocale();
  // Enable next-intl Server Component APIs (getTranslations, etc.)
  setRequestLocale(locale);
  const messages = messagesMap[locale];

  return (
    <html lang={locale} suppressHydrationWarning className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head><JsonLd /></head>
      <body className="min-h-screen bg-background font-[family-name:var(--font-inter)] antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <SkipLink />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
