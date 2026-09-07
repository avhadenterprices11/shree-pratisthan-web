"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedFestivals() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // General section fade in
      gsap.fromTo(
        ".fest-section-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Disable on tablet/mobile screens

    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = ((e.clientX - rect.left) / rect.width) * 100;

    // Direct Intuitive Mapping: Hovering on the LEFT opens the LEFT; hovering on the RIGHT opens the RIGHT.
    // Constrained range so hovering expands each section cleanly ("This Much Only") without clipping either card's text.
    // Center: top 47%, bottom 53%
    // Left hover: expands up to top 55%, bottom 63%
    // Right hover: expands up to top 39%, bottom 47%
    const targetSplitX = 100 - xVal;
    const topPct = gsap.utils.clamp(39, 55, targetSplitX - 4);
    const bottomPct = gsap.utils.clamp(47, 63, targetSplitX + 4);

    // Morphs dividing diagonal path smoothly
    gsap.to(".split-clip-target", {
      clipPath: `polygon(${topPct}% 0%, 100% 0%, 100% 100%, ${bottomPct}% 100%)`,
      duration: 0.5,
      ease: "power2.out",
    });

    // Subtle horizontal parallax
    const moveX = (e.clientX - rect.left - rect.width / 2) * 0.012;
    const moveY = (e.clientY - rect.top - rect.height / 2) * 0.008;

    gsap.to(".parallax-content-left", {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(".parallax-content-right", {
      x: -moveX,
      y: -moveY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset to perfectly balanced diagonal split
    gsap.to(".split-clip-target", {
      clipPath: `polygon(47% 0%, 100% 0%, 100% 100%, 53% 100%)`,
      duration: 0.7,
      ease: "power2.out",
    });

    // Reset parallax text transforms
    gsap.to([".parallax-content-left", ".parallax-content-right"], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background w-full select-none border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 fest-section-reveal">
        {/* Section Heading & Subheading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("eventsPage.featured.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 1. Desktop Interface (Bright Theme Liquid Diagonal Masking Split) */}
        <div 
          className="hidden lg:block relative w-full h-[660px] xl:h-[680px] bg-neutral-100 dark:bg-[#121214] overflow-hidden cursor-default border border-black/5 dark:border-white/10 rounded-block shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* L1 Pane: Ganeshotsav (Base layer - Left) */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/ganeshotsav_bright.png')" }}>
            {/* Very soft color filter */}
            <div className="absolute inset-0 bg-saffron/5 mix-blend-multiply z-0 pointer-events-none" />

            {/* Saffron Content Overlay - Floating Card on the Left */}
            <div className="absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-10 w-[39%] max-w-[460px] parallax-content-left select-none">
              <div className="glass-panel p-6 xl:p-8 rounded-block bg-white/95 dark:bg-[#121214]/95 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-2xl space-y-3.5 xl:space-y-4">
                <h3 className="text-xl sm:text-2xl xl:text-3xl font-normal text-neutral-900 dark:text-neutral-100 font-heading leading-snug uppercase">
                  {t("eventsPage.featured.f1Title")}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-normal">
                  {t("eventsPage.featured.f1Desc")}
                </p>
                
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    <span>{t("eventsPage.featured.f1P1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    <span>{t("eventsPage.featured.f1P2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                    <span>{t("eventsPage.featured.f1P3")}</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="/event-booking"
                    className="w-full text-center inline-block bg-saffron hover:bg-saffron/90 text-white font-bold py-3 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-md shadow-saffron/20 transition-transform hover:scale-102 font-sans cursor-pointer"
                  >
                    {t("eventsPage.featured.f1Btn")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* L2 Pane: Sports & Cricket (Overlay layer - Right, clipped diagonally) */}
          <div 
            className="split-clip-target absolute inset-0 w-full h-full bg-cover bg-center z-20"
            style={{ 
              backgroundImage: "url('/dahihandi_bright.png')",
              clipPath: "polygon(47% 0%, 100% 0%, 100% 100%, 53% 100%)" 
            }}
          >
            {/* Very soft color filter */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-multiply z-0 pointer-events-none" />

            {/* Sports Content Overlay - Floating Card on the Right */}
            <div className="absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-10 w-[39%] max-w-[460px] parallax-content-right select-none">
              <div className="glass-panel p-6 xl:p-8 rounded-block bg-white/95 dark:bg-[#121214]/95 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-2xl space-y-3.5 xl:space-y-4">
                <h3 className="text-xl sm:text-2xl xl:text-3xl font-normal text-neutral-900 dark:text-neutral-100 font-heading leading-snug uppercase">
                  {t("eventsPage.featured.f2Title")}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-normal">
                  {t("eventsPage.featured.f2Desc")}
                </p>
                
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{t("eventsPage.featured.f2P1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{t("eventsPage.featured.f2P2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{t("eventsPage.featured.f2P3")}</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="/event-booking"
                    className="w-full text-center inline-block bg-neutral-900 hover:bg-saffron hover:text-white text-white font-bold py-3 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-md shadow-neutral-900/10 transition-transform hover:scale-102 font-sans cursor-pointer"
                  >
                    {t("eventsPage.featured.f2Btn")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mobile & Tablet Interface (Stacked Cards Grid Layout) */}
        <div className="block lg:hidden space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Ganeshotsav */}
            <div 
              className="relative p-5 sm:p-8 rounded-2xl sm:rounded-block overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between bg-cover bg-center border border-black/5 dark:border-white/10 shadow-lg"
              style={{ backgroundImage: "url('/ganeshotsav_bright.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95 dark:from-[#121214]/85 dark:to-[#121214]/95 z-0" />
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase leading-snug">
                  {t("eventsPage.featured.f1Title")}
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-normal">
                  {t("eventsPage.featured.f1Desc")}
                </p>
                
                <ul className="space-y-1.5 sm:space-y-2 text-base text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    {t("eventsPage.featured.f1P1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    {t("eventsPage.featured.f1P2")}
                  </li>
                </ul>
              </div>

              <div className="pt-4 sm:pt-6 relative z-10">
                <a
                  href="/event-booking"
                  className="w-full inline-block text-center bg-saffron hover:bg-saffron/90 text-white font-bold py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-saffron/15 font-sans"
                >
                  {t("eventsPage.featured.f1Btn")}
                </a>
              </div>
            </div>

            {/* Card 2: Sports & Cricket */}
            <div 
              className="relative p-5 sm:p-8 rounded-2xl sm:rounded-block overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between bg-cover bg-center border border-black/5 dark:border-white/10 shadow-lg"
              style={{ backgroundImage: "url('/dahihandi_bright.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95 dark:from-[#121214]/85 dark:to-[#121214]/95 z-0" />
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase leading-snug">
                  {t("eventsPage.featured.f2Title")}
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-normal">
                  {t("eventsPage.featured.f2Desc")}
                </p>
                
                <ul className="space-y-1.5 sm:space-y-2 text-base text-neutral-700 dark:text-neutral-300 font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {t("eventsPage.featured.f2P1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {t("eventsPage.featured.f2P2")}
                  </li>
                </ul>
              </div>

              <div className="pt-4 sm:pt-6 relative z-10">
                <a
                  href="/event-booking"
                  className="w-full inline-block text-center bg-neutral-900 hover:bg-saffron hover:text-white text-white font-bold py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-neutral-900/15 font-sans"
                >
                  {t("eventsPage.featured.f2Btn")}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
