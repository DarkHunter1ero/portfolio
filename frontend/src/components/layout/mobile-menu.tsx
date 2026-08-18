"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const anchorTranslationKeys = {
  "#specialties": "specialties",
  "#experience": "experience",
  "#tech-stack": "techStack",
} as const;

type AnchorKey = (typeof anchorTranslationKeys)[keyof typeof anchorTranslationKeys];

interface NavLink {
  label: string;
  anchor: string;
  page?: string;
}

function getNavLinks(basePath: string): NavLink[] {
  return [
    { label: "Perfil Profesional", anchor: "", page: `${basePath}/perfil-profesional` },
    { label: "Servicios", anchor: `${basePath}#specialties` },
    { label: "Experiencia", anchor: `${basePath}#experience` },
    { label: "Herramientas", anchor: `${basePath}#tech-stack` },
    { label: "Formación", anchor: "", page: `${basePath}/formacion` },
    { label: "Contacto", anchor: "", page: `${basePath}/contacto` },
  ];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  basePath: string;
}

export function MobileMenu({ isOpen, onClose, activeSection, basePath }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const navLinks = getNavLinks(basePath);

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
          const isPage = !!link.page;
          const href = isPage ? link.page! : link.anchor;
          const isAnchor = !isPage;
          const sectionKey = isAnchor ? link.anchor.slice(link.anchor.indexOf("#")) : null;
          const isActive = isAnchor && activeSection === sectionKey;

          return (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "text-2xl font-[family-name:var(--font-playfair)] transition-colors duration-200",
                isAnchor
                  ? isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {sectionKey
                ? t(anchorTranslationKeys[sectionKey as keyof typeof anchorTranslationKeys] as AnchorKey)
                : link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}