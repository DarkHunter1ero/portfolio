import Link from "next/link";
import { Github, Linkedin, ArrowUp, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@/data/dev/profile";

export async function Footer() {
  const t = await getTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/dev"
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

          <a
            href="#hero"
            className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-card transition-colors"
            aria-label={t("backToTop")}
          >
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
