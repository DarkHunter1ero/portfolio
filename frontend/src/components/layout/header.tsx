"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const navTranslationKeys = {
  "#professional-profile": "professionalProfile",
  "#about": "about",
  "#experience": "experience",
  "#tech-stack": "techStack",
  "#architecture": "architecture",
  "#github": "github",
  "#contact": "contact",
} as const;

type NavKey = (typeof navTranslationKeys)[keyof typeof navTranslationKeys];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const isHome = pathname === "/" || pathname === "/es";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Only observe sections on the home page
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-header shadow-lg shadow-black/5"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
          aria-label={tHeader("mainNav")}
        >
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground hover:text-accent transition-colors"
          >
            {tHeader("logo")}
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionKey = link.href.replace(/^\//, ""); // "/#about" → "#about"
              return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  activeSection && link.href.endsWith(activeSection)
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                )}
              >
        {t(navTranslationKeys[sectionKey as keyof typeof navTranslationKeys] as NavKey)}
              </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label={tHeader("openMenu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
