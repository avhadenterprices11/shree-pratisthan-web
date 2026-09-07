"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function TreePlantation() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const SPECIES = [
    { name: t("communityPage.treePlantation.s1Name"), type: t("communityPage.treePlantation.s1Type"), count: t("communityPage.treePlantation.s1Count") },
    { name: t("communityPage.treePlantation.s2Name"), type: t("communityPage.treePlantation.s2Type"), count: t("communityPage.treePlantation.s2Count") },
    { name: t("communityPage.treePlantation.s3Name"), type: t("communityPage.treePlantation.s3Type"), count: t("communityPage.treePlantation.s3Count") },
    { name: t("communityPage.treePlantation.s4Name"), type: t("communityPage.treePlantation.s4Type"), count: t("communityPage.treePlantation.s4Count") },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left column card 3D Scroll Flip (counter-clockwise / opposite)
      gsap.fromTo(
        ".tree-animate-left",
        {
          opacity: 0,
          rotationY: -45,
          rotationX: -12,
          z: -180,
          transformOrigin: "right center",
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scrollTrigger: {
            trigger: ".tree-animate-left",
            start: "top 95%",
            end: "top 50%",
            scrub: 1.8, // Smooth slow catch-up lag
          },
        }
      );

      // Right column text slide
      gsap.fromTo(
        ".tree-animate-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tree-plantation"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5 dark:border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          
          {/* Left Column: Visual Species Selection */}
          <div className="tree-animate-left order-2 lg:order-1 glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-emerald-500/10 dark:border-emerald-500/20 shadow-xl relative">
            <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase leading-snug">
                {t("communityPage.treePlantation.speciesTitle")}
              </h3>
              <span className="shrink-0 text-xs uppercase font-bold tracking-[0.18em] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/40 font-sans">
                {t("communityPage.treePlantation.ecologyTag")}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {SPECIES.map((spec, index) => (
                <div
                  key={index}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-[#18181b] hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/20 transition-all duration-300"
                >
                  <span className="text-lg sm:text-2xl font-normal text-emerald-600 block font-heading">
                    {spec.count}
                  </span>
                  <h4 className="text-sm font-normal text-neutral-900 dark:text-neutral-100 mt-1 font-heading uppercase">
                    {spec.name}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-grey dark:text-neutral-400 font-medium mt-0.5 sm:mt-1 font-sans">
                    {spec.type}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center text-xs text-slate-grey dark:text-neutral-400 font-normal font-sans">
              {t("communityPage.treePlantation.careNote")}
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div className="tree-animate-right order-1 lg:order-2 space-y-4 sm:space-y-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.25em] block mb-1 font-sans">
              {t("communityPage.treePlantation.badge")}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("communityPage.treePlantation.heading")}
            </h2>
            <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("communityPage.treePlantation.description")}
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-normal text-emerald-600 font-heading">5,000+</span>
                <span className="text-xs uppercase font-bold tracking-[0.18em] text-slate-grey dark:text-neutral-400 font-sans">
                  {t("communityPage.impact.s2Label")}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
