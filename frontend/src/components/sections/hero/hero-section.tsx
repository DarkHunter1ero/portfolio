import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HeroBackground } from "./hero-background";
import { HeroCTA } from "./hero-cta";
import { profile } from "@/data/profile";
import { calculateAge } from "@/lib/utils";

export async function HeroSection() {
  const t = await getTranslations("Hero");
  const age = calculateAge(profile.birthDate);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent font-[family-name:var(--font-mono)] text-sm mb-4 tracking-wider uppercase">
          {t("subtitle")}
        </p>

        <h1
          id="hero-heading"
          className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          {t("title")}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {t("tagline")}
        </p>

        <div className="mb-10">
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-border shadow-xl shadow-accent/10">
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 128px, 160px"
              priority
            />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {age} {t("years")}
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="https://flagcdn.com/w20/uy.png"
                alt="Uruguay"
                width={16}
                height={12}
                className="rounded-sm"
                unoptimized
              />
              {t("nationality")}
            </span>
          </div>
        </div>

        <HeroCTA />
      </div>
    </section>
  );
}
