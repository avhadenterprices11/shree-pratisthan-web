"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Users, Heart, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export default function VolunteerHero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const STATS: StatItem[] = [
    {
      number: t("volunteerPage.hero.stat1Number"),
      label: t("volunteerPage.hero.stat1Label"),
      description: t("volunteerPage.hero.stat1Desc"),
      icon: <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-saffron" />
    },
    {
      number: t("volunteerPage.hero.stat2Number"),
      label: t("volunteerPage.hero.stat2Label"),
      description: t("volunteerPage.hero.stat2Desc"),
      icon: <Heart className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-saffron" />
    },
    {
      number: t("volunteerPage.hero.stat3Number"),
      label: t("volunteerPage.hero.stat3Label"),
      description: t("volunteerPage.hero.stat3Desc"),
      icon: <Shield className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-saffron" />
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      ).fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      ).fromTo(
        ".stat-item-row",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center pt-20 pb-10 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-neutral-950"
    >
      {/* Fullscreen Ken Burns Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/volunteer_hero.jpg"
          alt="Volunteer Drive Background"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-100 scale-105 animate-ken-burns"
        />
        {/* Semi-transparent dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 sm:via-transparent via-50% to-black/90 z-10" />
        <div className="absolute inset-0 ambient-saffron-glow opacity-30 pointer-events-none z-10" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Heading text content */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-6 text-left">

          <h1 className="text-[24px] sm:text-[36px] md:text-[48px] font-normal text-white leading-[1.25] tracking-tight font-heading uppercase">
            <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-2 sm:py-3.5">
              <span className="block reveal-line py-1">{t("volunteerPage.hero.titleLine1")}</span>
            </div>
            <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-2 sm:py-3.5">
              <span className="block reveal-line py-1 text-saffron text-outline-festive font-heading">{t("volunteerPage.hero.titleLine2")}</span>
            </div>
          </h1>

          <p className="hero-subtitle text-sm sm:text-base md:text-lg text-slate-200 max-w-xl leading-relaxed sm:leading-[1.75] font-normal font-sans [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
            {t("volunteerPage.hero.subtitle")}
          </p>
        </div>

        {/* Right Column: Text-Only Impact Stats Stack */}
        <div className="lg:col-span-7 w-full z-20 flex flex-col justify-center space-y-3.5 sm:space-y-8 text-left sm:text-right items-start sm:items-end">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-item-row border-b border-white/20 pb-2.5 sm:pb-6 w-full group cursor-pointer transition-all duration-300 pr-0 hover:pr-4"
            >
              <div className="flex flex-col sm:flex-row-reverse sm:items-baseline gap-1 sm:gap-4 mb-1 sm:mb-2 justify-start">
                <span className="text-2xl sm:text-4xl lg:text-[48px] font-normal text-white group-hover:text-saffron transition-colors duration-300 font-heading tracking-tight leading-snug py-1 [text-shadow:_0_2px_10px_rgba(0,0,0,0.6)]">
                  {stat.number}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 justify-start sm:justify-start">
                  {stat.icon}
                  <span className="text-xs sm:text-sm font-bold text-saffron uppercase tracking-[0.2em] font-sans [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                    {stat.label}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-xl ml-0 sm:ml-auto font-sans leading-snug sm:leading-relaxed transition-colors duration-300 group-hover:text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] font-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
