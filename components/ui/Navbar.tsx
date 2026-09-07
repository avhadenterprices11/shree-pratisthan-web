"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Entrance reveal: detect when the Hero portal intro overlay finishes
  useEffect(() => {
    const portal = document.querySelector('.portal-intro') as HTMLElement;
    if (!portal) {
      // If no portal (e.g. on subpages), show Navbar immediately
      gsap.to(navRef.current, { opacity: 1, duration: 0.5 });
      return;
    }

    // Check if it's already hidden (in case we mounted after it finished)
    if (portal.style.display === 'none') {
      gsap.to(navRef.current, { opacity: 1, duration: 0.5 });
      return;
    }

    const observer = new MutationObserver(() => {
      if (portal.style.display === 'none') {
        gsap.to(navRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
        observer.disconnect();
      }
    });

    observer.observe(portal, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Slide-in and fade animations for drawer elements
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".nav-drawer-link",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".nav-drawer-info",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.15 }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { label: t("navbar.about"), href: "/about" },
    { label: t("navbar.community"), href: "/community" },
    { label: t("navbar.volunteer"), href: "/volunteer" },
    { label: t("navbar.events"), href: "/events" },
    { label: t("navbar.gallery"), href: "/gallery" },
    { label: t("navbar.contact"), href: "/contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6 px-4 sm:px-6 md:px-12 bg-transparent pointer-events-none transition-opacity opacity-0"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-start">
          {/* Left: Genuine Official Emblem inside Floating Glass Pill */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-saffron/10 dark:border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg pointer-events-auto hover:border-saffron/30 hover:scale-[1.02] transition-all duration-300 select-none"
            onClick={() => setIsOpen(false)}
            data-hover="pointer"
          >
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 border border-saffron/20 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Shree Pratisthan Official Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[11px] sm:text-sm font-normal tracking-wider text-neutral-900 dark:text-neutral-100 font-heading uppercase">
              {t("common.trustName")}
            </span>
          </Link>

          {/* Right: Floating Dark Glassmorphic Menu Button + Language Switcher Directly Below */}
          <div className="flex flex-col items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group flex flex-col items-end justify-center w-12 sm:w-14 h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-neutral-950/95 border border-white/10 hover:border-saffron/30 transition-all duration-300 pointer-events-auto shadow-lg z-50 relative gap-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
              data-hover="pointer"
            >
              <span className={cn(
                "h-[2px] bg-white transition-all duration-300 origin-center",
                isOpen ? "w-5 sm:w-6 rotate-45 translate-y-[4px] bg-saffron" : "w-5 sm:w-6 group-hover:bg-saffron"
              )} />
              <span className={cn(
                "h-[2px] bg-white transition-all duration-300 origin-center",
                isOpen ? "w-5 sm:w-6 -rotate-45 -translate-y-[4px] bg-saffron" : "w-3 sm:w-4 group-hover:w-5 sm:group-hover:w-6 group-hover:bg-saffron"
              )} />
            </button>

            {/* Language Switcher & Theme Toggle below menu button on pages; hidden when drawer menu is open */}
            {!isOpen && (
              <div className="flex flex-col items-center gap-1.5">
                <LanguageSwitcher variant="header" />
                <ThemeToggle variant="header" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Next-Level Full-Screen Menu Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 dark:bg-neutral-950/98 backdrop-blur-2xl flex flex-col md:flex-row p-6 pt-24 pb-12 sm:p-12 md:p-24 overflow-y-auto max-h-screen text-foreground">
          {/* Ambient decorative glows */}
          <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-40 opacity-5" />

          {/* Left Column: Branding Showcase */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-saffron/10 dark:border-white/10 pb-6 md:pb-0 md:pr-16 mb-6 md:mb-0 relative z-10 pt-6 md:pt-0">
            {/* Clean Logo Emblem & Drawer Language Switcher + Theme Switcher */}
            <div className="nav-drawer-info flex flex-col items-center md:items-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-saffron/30 shadow-xl bg-white/90 dark:bg-neutral-900/90 p-1 group transition-transform duration-500 hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Shree Pratisthan Official Logo"
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="w-full max-w-[300px] pt-3 flex flex-col gap-2.5">
                <LanguageSwitcher variant="drawer" />
                <ThemeToggle variant="drawer" />
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Giant Menu Links */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-16 relative z-10 pt-2 md:pt-0">
            <nav className="flex flex-col gap-3 sm:gap-4 md:gap-6 text-center md:text-left">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="nav-drawer-link group relative block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-heading tracking-tight uppercase transition-all duration-300"
                    data-hover="pointer"
                  >
                    <span className={`inline-block transition-transform duration-300 md:group-hover:translate-x-3 ${isActive ? "text-saffron" : "text-neutral-900 dark:text-neutral-100 hover:text-saffron"
                      }`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
