import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await detectLocale()) as Locale;
  const t = getMetadataFor("landing", locale);

  return {
    title: t.title,
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

export default async function LandingPage() {
  const tHero = await getTranslations("Hero");
  const tCta = await getTranslations("Landing-CTA");

  const ctas = [
    {
      key: "dev" as const,
      label: tCta("dev.label"),
      description: tCta("dev.description"),
      href: tCta("dev.href"),
    },
    {
      key: "soporte" as const,
      label: tCta("soporte.label"),
      description: tCta("soporte.description"),
      href: tCta("soporte.href"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Minimal landing header: logo → /dev, locale switcher, theme toggle.
          Intentionally does NOT reuse the dev <Header /> (no isHome observer,
          no dev navLinks anchored to /). */}
      <header
        className="fixed top-0 left-0 right-0 z-50 glass-header shadow-lg shadow-black/5"
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
          aria-label="Landing navigation"
        >
          <Link
            href="/dev"
            className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground hover:text-accent transition-colors"
          >
            DS
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content" className="relative">
        <section
          className="min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
          aria-labelledby="landing-hero-heading"
        >
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-accent font-[family-name:var(--font-mono)] text-sm mb-4 tracking-wider uppercase">
              {tHero("eyebrow")}
            </p>
            <h1
              id="landing-hero-heading"
              className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              {tHero("title")}
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/90 font-medium mb-4">
              {tHero("subtitle")}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {tHero("bio")}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {ctas.map((cta) => (
                <Link key={cta.key} href={cta.href} className="group block">
                  <div className="rounded-2xl border border-border bg-card p-8 text-left shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:border-accent/40 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                        {cta.label}
                      </h2>
                      <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cta.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
