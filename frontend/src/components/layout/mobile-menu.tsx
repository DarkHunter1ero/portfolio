"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { navLinks } from "@/data/dev/navigation";
import { cn } from "@/lib/utils";

const navTranslationKeys = {
  "#professional-profile": "professionalProfile",
  "#specialties": "specialties",
  "#experience": "experience",
  "#tech-stack": "techStack",
  "#education": "education",
  "#contact": "contact",
} as const;

type NavKey = (typeof navTranslationKeys)[keyof typeof navTranslationKeys];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={tHeader("mobileNav")}
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <button
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
          onClick={onClose}
          aria-label={tHeader("closeMenu")}
        >
          <X className="h-6 w-6" />
        </button>

        {navLinks.map((link) => {
          const sectionKey = link.href.replace(/^\//, ""); // "/#about" → "#about"
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "text-2xl font-[family-name:var(--font-playfair)] transition-colors duration-200",
                activeSection === sectionKey
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(navTranslationKeys[sectionKey as keyof typeof navTranslationKeys] as NavKey)}
            </a>
          );
        })}
      </div>
    </div>
  );
}
