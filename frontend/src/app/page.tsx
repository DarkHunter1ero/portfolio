import type { Metadata } from "next";
import { detectLocale, getMetadataFor, type Locale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
    href: "/developer",
  };

  const soporteCta = {
    label: tCta("soporte.label"),
    description: tCta("soporte.description"),
    href: "/support",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main id="main-content" className="pt-16 flex-1">
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
                  image: "/images/working_on_web_developer.jpg",
                },
                {
                  label: soporteCta.label,
                  description: soporteCta.description,
                  href: soporteCta.href,
                  image: "/images/working_on_TI_sopport.jpg",
                },
              ].map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:border-accent/40 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Background image (photo of the actual work) */}
                  <Image
                    src={cta.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 384px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Scrim so the text stays readable over the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />

                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                      {cta.label}
                    </h2>
                    <ArrowRight className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="relative z-10 text-sm text-foreground/85 leading-relaxed">
                    {cta.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
