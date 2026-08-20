import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroBackground } from "./hero-background";
import { HeroCTA } from "./hero-cta";

export async function HeroSection({ workingImage }: { workingImage?: string } = {}) {
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
          <div className="relative text-center lg:text-left">
            {/* Isometric illustration behind the text. Dark-background PNG that
                blends into the hero background; the radial mask fades the edges
                so it reads as a soft backdrop instead of a framed picture.
                Decorative. */}
            <div
              className="absolute -top-24 -right-10 sm:-right-16 w-72 sm:w-96 lg:w-[30rem] pointer-events-none"
              aria-hidden="true"
            >
              <Image
                src="/images/hero-image.png"
                alt=""
                width={1402}
                height={1122}
                className="h-auto w-full opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]"
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 480px"
                priority
              />
            </div>

            <h1
              id="hero-heading"
              className="relative font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground"
            >
              {t("welcome")}
            </h1>

            <p className="relative mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
              {t("summary")}
            </p>

            <div className="relative mt-10">
              <HeroCTA />
            </div>
          </div>

          {/* Working photo — large hero media, differentiates each portfolio */}
          {workingImage && (
            <div className="relative w-full max-w-sm sm:max-w-md lg:w-[28rem] shrink-0">
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border-4 border-background shadow-2xl shadow-black/30 rotate-1">
                <Image
                  src={workingImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 384px, (max-width: 1024px) 448px, 448px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
