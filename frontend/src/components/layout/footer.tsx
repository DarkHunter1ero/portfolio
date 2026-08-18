"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { profile } from "@/data/dev/profile";

export function Footer() {
  const pathname = usePathname();
  const isSoporte = pathname.startsWith("/soporte");
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const otherPortfolioPath = isSoporte ? "/dev" : "/soporte";
  const otherPortfolioLabel = isSoporte ? "Portafolio Dev" : "Portafolio Soporte";

  return (
    <footer className="border-t border-border bg-card/30" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href={isSoporte ? "/dev" : "/soporte"}
              className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              DS
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {profile.name}. {t("copyright")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-card transition-colors"
              aria-label={t("sendEmail")}
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-card transition-colors"
              aria-label={t("githubProfile")}
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-card transition-colors"
              aria-label={t("linkedinProfile")}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-card transition-colors"
            aria-label={t("backToTop")}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{t("builtWith")}</p>
          {/* Portfolio switcher link */}
          <p className="mt-2 text-sm text-muted-foreground">
            <Link
              href={otherPortfolioPath}
              className="text-accent hover:text-foreground transition-colors"
            >
              {otherPortfolioLabel}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}