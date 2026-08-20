"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  isAnchor: boolean;
}

function getNavLinks(basePath: string, t: (key: string) => string): NavLink[] {
  return [
    {
      label: t("professionalProfile"),
      href: `${basePath}/professional-profile`,
      isAnchor: false,
    },
    {
      label: t("specialties"),
      href: `${basePath}#specialties`,
      isAnchor: true,
    },
    {
      label: t("experience"),
      href: `${basePath}/education`,
      isAnchor: false,
    },
    {
      label: t("techStack"),
      href: `${basePath}#tech-stack`,
      isAnchor: true,
    },
    {
      label: t("formation"),
      href: `${basePath}/education`,
      isAnchor: false,
    },
    {
      label: t("contact"),
      href: `${basePath}/contact`,
      isAnchor: false,
    },
  ];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  basePath: string;
  pathname: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  basePath,
  pathname,
}: MobileMenuProps) {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const navLinks = getNavLinks(basePath, t);

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
          const isActive = link.isAnchor
            ? activeSection === link.href.slice(link.href.indexOf("#"))
            : pathname === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "text-2xl font-[family-name:var(--font-playfair)] transition-colors duration-200",
                isActive
                  ? "text-accent"
                  : link.isAnchor
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground hover:text-accent"
              )}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
