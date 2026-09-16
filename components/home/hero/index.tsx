"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, tArray } = useLanguage();
  const portalRef = useRef<HTMLDivElement>(null);

  // 1. Entrance Preloader Zoom Animation (Restores previous iconic preloader)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".portal-text", { scale: 0.85, opacity: 0 });

      entryTl
        .to(".portal-text", { scale: 1, opacity: 1, duration: 0.65 })
        .to({}, { duration: 0.15 })
        .to(".portal-text", {
          scale: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.in",
        }, "+=0.06")
        .to(".portal-intro", {
          opacity: 0,
          duration: 0.55,
          ease: "power2.inOut",
        }, "-=0.75")
        .set(".portal-intro", { display: "none" });
    });

    return () => ctx.revert();
  }, []);

  const slides: HeroCarouselItem[] = useMemo(() => [
    {
      id: "ganesh-utsav",
      title: t("hero.slide1.title", "Shree\nGanpati"),
      image: "/hero_ganesh.png",
      credit: t("hero.slide1.credit", "Indira Nagar, Nashik"),
      meta: tArray("hero.slide1.meta").length > 0
        ? tArray("hero.slide1.meta")
        : ["Bhadrapada Shuddha", "10 Days", "Grand Dekhava"],
      accent: "#e8590c",
      href: "/events/ganesh-utsav-2026",
    },
    {
      id: "swagat-yatra",
      title: t("hero.slide2.title", "Swagat\nYatra"),
      image: "/swagat_yatra.jpg",
      credit: t("hero.slide2.credit", "Marathi New Year"),
      meta: tArray("hero.slide2.meta").length > 0
        ? tArray("hero.slide2.meta")
        : ["Chaitra Pratipada", "Dhol Tasha", "Traditional Costumes"],
      accent: "#d97706",
      href: "/events/gudipadwa-swagat-yatra-2026",
    },
    {
      id: "dahi-handi",
      title: t("hero.slide3.title", "Dahi\nHandi"),
      image: "/hero_dahihandi.png",
      credit: t("hero.slide3.credit", "Youth Energy & Unity"),
      meta: tArray("hero.slide3.meta").length > 0
        ? tArray("hero.slide3.meta")
        : ["Gokulashtami", "Human Pyramids", "Rhythmic Beats"],
      accent: "#0284c7",
      href: "/events",
    },
    {
      id: "maha-shivratri",
      title: t("hero.slide4.title", "Maha\nShivratri"),
      image: "/images/mahashivratri.jpg",
      credit: t("hero.slide4.credit", "Sacred Devotion"),
      meta: tArray("hero.slide4.meta").length > 0
        ? tArray("hero.slide4.meta")
        : ["108-Ft Shivling", "Maha Aarti", "Mass Congregation"],
      accent: "#7c3aed",
      href: "/events",
    },
    {
      id: "navratri-utsav",
      title: t("hero.slide5.title", "Navratri\nMahotsav"),
      image: "/hero_navratri.png",
      credit: t("hero.slide5.credit", "9 Nights of Shakti"),
      meta: tArray("hero.slide5.meta").length > 0
        ? tArray("hero.slide5.meta")
        : ["Garba & Dandiya", "Maha Pooja", "Cultural Unity"],
      accent: "#db2777",
      href: "/events",
    },
    {
      id: "samajik-seva",
      title: t("hero.slide6.title", "Samajik\nSeva"),
      image: "/hero_service.png",
      credit: t("hero.slide6.credit", "Dedicated Community Service"),
      meta: tArray("hero.slide6.meta").length > 0
        ? tArray("hero.slide6.meta")
        : ["Blood Donation", "Tree Plantation", "Relief Drives"],
      accent: "#059669",
      href: "/community",
    },
  ], [t, tArray]);

  return (
    <section className="relative w-full h-[100dvh] min-h-[560px] max-h-[1080px] overflow-hidden bg-black select-none">
      {/* ── Typographic Portal Zoom Preloader Overlay ── */}
      <div
        ref={portalRef}
        className="fixed inset-0 z-[100] bg-saffron flex flex-col items-center justify-center text-center portal-intro pointer-events-none px-4"
      >
        <h2 className="portal-text text-3xl sm:text-5xl md:text-[6.5vw] font-black text-white select-none uppercase font-heading leading-tight sm:leading-snug tracking-normal text-center whitespace-pre-line py-2">
          {t("hero.portalText", "SHREE\nPRATHISHTHAN")}
        </h2>
      </div>

      <HeroCarousel
        items={slides}
        defaultIndex={0}
        autoplay={true}
        autoplayDelay={3500}
        className="h-full w-full"
        cta={
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 shadow-md whitespace-nowrap"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-saffron" />
              <span>{t("common.exploreMore", "Explore Events")}</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-saffron hover:bg-saffron-dark text-black font-bold text-[9px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md whitespace-nowrap"
            >
              <span>{t("common.becomeVolunteer", "Join As Volunteer")}</span>
            </Link>
          </div>
        }
      />
    </section>
  );
}
