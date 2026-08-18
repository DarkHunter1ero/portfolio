import type { Metadata } from "next";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Menu } from "lucide-react";

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
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LandingPage() {
  const tHero = await getTranslations("Hero");
  const tCta = await getTranslations("Landing-CTA");

  const devCta = {
    label: tCta("dev.label"),
    description: tCta("dev.description"),
    href: "/dev",
  };

  const soporteCta = {
    label: tCta("soporte.label"),
    description: tCta("soporte.description"),
    href: "/soporte",
  };

  return (
    <div className="min-h-screen bg-background">
      <header
        className="fixed top-0 left-0 right-0 z-50 glass-header shadow-lg shadow-black/5"
        role="banner"
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              DS
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/dev"
                className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent"
              >
                {tCta("dev.label")}
              </Link>
              <Link
                href="/soporte"
                className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent"
              >
                {tCta("soporte.label")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <button
              className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <main id="main-content" className="pt-16">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-card/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5,transparent_70%)]" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              {tHero("title")}
            </h1>
            <p className="text-accent font-[family-name:var(--font-mono)] text-sm mb-4 tracking-wider uppercase">
              {tHero("eyebrow")}
            </p>
            <p className="text-lg text-foreground/90 font-medium mb-6 leading-relaxed">
              {tHero("subtitle")}
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                {
                  label: devCta.label,
                  description: devCta.description,
                  href: devCta.href,
                  icon: "Developer",
                },
                {
                  label: soporteCta.label,
                  description: soporteCta.description,
                  href: soporteCta.href,
                  icon: "Soporte",
                },
              ].map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="rounded-2xl border border-border bg-card p-8 text-left shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:border-accent/40 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                      {cta.label}
                    </h2>
                    <ArrowRight className="h-5 w-5 text-accent transition-transform" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cta.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
