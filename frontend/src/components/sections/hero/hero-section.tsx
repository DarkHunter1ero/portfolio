import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroBackground } from "./hero-background";
import { HeroCTA } from "./hero-cta";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-center">
          <div className="text-center lg:text-left">
            <h1
              id="hero-heading"
              className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground"
            >
              {t("welcome")}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
              {t("summary")}
            </p>

            <div className="mt-10">
              <HeroCTA />
            </div>
          </div>

          {/* Isometric illustration (dark-background PNG). The radial mask fades
              the edges so it blends into the hero background, like the reference
              design, instead of looking like a framed picture. Decorative. */}
          <div className="relative w-64 sm:w-80 lg:w-[26rem] shrink-0">
            <Image
              src="/images/hero-image.png"
              alt=""
              width={1402}
              height={1122}
              className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 416px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
