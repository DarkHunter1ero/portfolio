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

  const isSoporte = pathname.startsWith("/soporte");
  const basePath = isSoporte ? "/soporte" : "/dev";
  const isHome = pathname === basePath;

  const navLinks = [
    { key: "home", href: basePath, label: tHeader("home") },
    {
      key: "professionalProfile",
      href: `${basePath}/perfil-profesional`,
      label: tNav("professionalProfile"),
    },
    { key: "formation", href: `${basePath}/formacion`, label: tNav("formation") },
    { key: "contact", href: `${basePath}/contacto`, label: tNav("contact") },
  ];

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
              className="group flex items-center gap-3"
              aria-label={tNav("professionalProfile")}
              title={tNav("professionalProfile")}
            >
              <span className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-border/50 transition-colors duration-300 group-hover:border-accent/50">
                <Image
                  src="/images/my-foto.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="36px"
                  priority
                />
              </span>

              <span className="relative flex items-center">
                <span className="overflow-hidden whitespace-nowrap font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground transition-all duration-200 ease-out group-hover:opacity-0 group-hover:scale-95">
                  {tHeader("logo")}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center whitespace-nowrap text-foreground opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
                >
                  <span className="flex font-[family-name:var(--font-playfair)] text-lg font-semibold">
                    {"Diego".split("").map((ch, i) => (
                      <span
                        key={i}
                        className="inline-block translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ transitionDelay: `${i * 45}ms` }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                  <span className="w-1.5" />
                  <span className="flex font-[family-name:var(--font-playfair)] text-lg font-semibold">
                    {"Silva".split("").map((ch, i) => (
                      <span
                        key={i}
                        className="inline-block translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ transitionDelay: `${(5 + i) * 45}ms` }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-accent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
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
        pathname={pathname}
      />
    </>
  );
}