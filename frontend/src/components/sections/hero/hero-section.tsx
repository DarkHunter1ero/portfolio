import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroBackground } from "./hero-background";
import { HeroCTA } from "./hero-cta";

/**
 * Hero with the portfolio's working photo to the right of the copy.
 * The section background color matches the photo's edge color (dark navy),
 * and the photo carries a radial mask that fades its edges, so it reads
 * as part of the background rather than a framed picture. Falls back to
 * the site background when no image is provided.
 */
export async function HeroSection({
  workingImage,
  bgColor = "#03021c",
}: {
  workingImage?: string;
  bgColor?: string;
} = {}) {
  const t = await getTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={workingImage ? { backgroundColor: bgColor } : undefined}
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-center">
          <div className="text-center lg:text-left">
            <h1
              id="hero-heading"
              className="relative font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white drop-shadow-lg"
            >
              {t("welcome")}
            </h1>

            <p className="relative mt-6 text-lg text-neutral-200 max-w-xl leading-relaxed mx-auto lg:mx-0 drop-shadow">
              {t("summary")}
            </p>

            <div className="relative mt-10">
              <HeroCTA />
            </div>
          </div>

          {/* Working photo — right of the copy, edges faded into the
              section background so it blends seamlessly. Decorative. */}
          {workingImage && (
            <div
              className="relative w-full max-w-sm sm:max-w-md lg:w-[30rem] shrink-0 pointer-events-none"
              aria-hidden="true"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={workingImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 384px, (max-width: 1024px) 448px, 480px"
                  className="object-cover [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_80%)]"
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
