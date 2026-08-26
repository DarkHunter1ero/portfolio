"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { buttonTap } from "@/lib/animations";
import { Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/dev/profile";
import { track } from "@/lib/analytics/tracker";

export function HeroCTA() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const cvUrl = locale === "es" ? profile.cvUrlEs : profile.cvUrlEn;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
      <motion.div {...buttonTap}>
        <Button asChild variant="accent" size="lg" className="gap-2 font-medium">
          <Link href={cvUrl} download onClick={() => track("cv_download", { metadata: { lang: locale } })}>
            <Download className="h-4 w-4" />
            {t("downloadCV")}
          </Link>
        </Button>
      </motion.div>

      <motion.div {...buttonTap}>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 font-medium text-white border-white/40 hover:bg-white/10 hover:text-white"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("github_click", { metadata: { source: "hero" } })}
          >
            <Github className="h-4 w-4" />
            {t("github")}
          </a>
        </Button>
      </motion.div>

      <motion.div {...buttonTap}>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 font-medium text-white border-white/40 hover:bg-white/10 hover:text-white"
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("linkedin_click", { metadata: { source: "hero" } })}
          >
            <Linkedin className="h-4 w-4" />
            {t("linkedin")}
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
