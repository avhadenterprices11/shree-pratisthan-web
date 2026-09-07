"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMission() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const MISSION_PILLARS = [
    {
      title: t("aboutPage.mission.p1Title"),
      subtitle: t("aboutPage.mission.p1Sub"),
      description: t("aboutPage.mission.p1Desc"),
      image: "/images/social-work.jpg",
      stats: [
        { label: t("aboutPage.mission.p1Stat1Label"), val: t("aboutPage.mission.p1Stat1Val") },
        { label: t("aboutPage.mission.p1Stat2Label"), val: t("aboutPage.mission.p1Stat2Val") },
      ]
    },
    {
      title: t("aboutPage.mission.p2Title"),
      subtitle: t("aboutPage.mission.p2Sub"),
      description: t("aboutPage.mission.p2Desc"),
      image: "/images/ganesh.jpg",
      stats: [
        { label: t("aboutPage.mission.p2Stat1Label"), val: t("aboutPage.mission.p2Stat1Val") },
        { label: t("aboutPage.mission.p2Stat2Label"), val: t("aboutPage.mission.p2Stat2Val") },
      ]
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 overflow-hidden bg-[#FFFDF9] dark:bg-background border-t border-saffron/10 dark:border-white/10"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8 sm:gap-12">
        
        {/* Top title header */}
        <div className="mission-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-saffron/15 dark:border-white/10">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight tracking-tight">
              {t("aboutPage.mission.heading")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey dark:text-neutral-300 max-w-md font-sans font-normal leading-[1.75]">
            {t("aboutPage.mission.subtitle")}
          </p>
        </div>

        {/* Interactive Split Columns Grid */}
        <div className="mission-reveal flex flex-col lg:flex-row gap-5 sm:gap-6 w-full items-stretch">
          {MISSION_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={cn(
                "relative min-h-[340px] sm:min-h-[420px] rounded-2xl sm:rounded-[2.5rem] border border-saffron/15 dark:border-white/10 bg-white dark:bg-[#121214] overflow-hidden flex flex-col justify-end p-5 sm:p-8 md:p-12 shadow-xl shadow-saffron/5 transition-all duration-700 ease-out cursor-default group",
                activeIdx === idx 
                  ? "w-full lg:w-[62%]" 
                  : activeIdx !== null 
                    ? "w-full lg:w-[38%]" 
                    : "w-full lg:w-[50%]"
              )}
            >
              {/* Pillar Image Background with hover scaling */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-[1.2s] ease-out"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
              </div>

              {/* Pillar Content Overlay */}
              <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-4 text-left">

                {/* Pillar Heading */}
                <h3 className="text-lg sm:text-2xl md:text-3xl font-normal text-white font-heading uppercase leading-snug drop-shadow-sm">
                  {pillar.title}
                </h3>

                {/* Pillar Paragraph */}
                <p className="text-base text-white/90 leading-[1.7] max-w-lg font-sans font-normal drop-shadow-sm">
                  {pillar.description}
                </p>

                {/* Sub-stats Panel (Mobile: always visible; Desktop: expands on hover) */}
                <div className="w-full mt-2 sm:mt-4 border-t border-white/20 pt-3 sm:pt-4 lg:hidden">
                  <div className="flex gap-6 sm:gap-8">
                    {pillar.stats.map((st, i) => (
                      <div key={i} className="flex flex-col items-start">
                        <span className="text-xl sm:text-2xl font-normal text-saffron leading-none font-heading mb-1">
                          {st.val}
                        </span>
                        <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/80 font-sans">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className={cn(
                    "hidden lg:block transition-all duration-700 ease-out overflow-hidden w-full",
                    activeIdx === idx ? "max-h-[150px] opacity-100 mt-4 border-t border-white/20 pt-4" : "max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  <div className="flex gap-8">
                    {pillar.stats.map((st, i) => (
                      <div key={i} className="flex flex-col items-start">
                        <span className="text-2xl font-normal text-saffron leading-none font-heading mb-1">
                          {st.val}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/80 font-sans">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
