"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const tNav = useTranslations("Nav");
  const tHeader = useTranslations("Header");

  const basePath = pathname.startsWith("/soporte") ? "/soporte" : "/dev";
  const isHome = pathname === basePath;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
          isScrolled ? "glass-header shadow-lg shadow-black/5" : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16"
          aria-label={tHeader("mainNav")}
        >
          <div className="flex items-center gap-3">
            <Link
              href={basePath}
              className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground hover:text-accent transition-colors"
            >
              {tHeader("logo")}
            </Link>

            <Link
              href={basePath}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-border/50 hover:border-accent/50 transition-colors"
              aria-label={tNav("professionalProfile")}
              title={tNav("professionalProfile")}
            >
              <Image
                src="/images/my-foto.png"
                alt=""
                fill
                className="object-cover"
                sizes="36px"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* Home - always links to current portfolio home */}
            <Link
              href={basePath}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent bg-accent/10"
            >
              {tHeader("home")}
            </Link>

            {/* Perfil Profesional - always a page link */}
            <Link
              href={`${basePath}/perfil-profesional`}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent"
            >
              {tNav("professionalProfile")}
            </Link>

            {/* Formación - always a page link */}
            <Link
              href={`${basePath}/formacion`}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent"
            >
              {tNav("formation")}
            </Link>

            {/* Contacto - always a page link */}
            <Link
              href={`${basePath}/contacto`}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-accent"
            >
              {tNav("contact")}
            </Link>

            
            
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
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
        basePath={basePath}
      />
    </>
  );
}