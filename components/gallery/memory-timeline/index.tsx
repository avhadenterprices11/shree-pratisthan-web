"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function MemoryTimeline() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const LOGS = [
    { year: t("galleryPage.timeline.t1Year"), title: t("galleryPage.timeline.t1Title"), desc: t("galleryPage.timeline.t1Desc"), emoji: "🏏" },
    { year: t("galleryPage.timeline.t2Year"), title: t("galleryPage.timeline.t2Title"), desc: t("galleryPage.timeline.t2Desc"), emoji: "🚩" },
    { year: t("galleryPage.timeline.t3Year"), title: t("galleryPage.timeline.t3Title"), desc: t("galleryPage.timeline.t3Desc"), emoji: "📜" },
    { year: t("galleryPage.timeline.t4Year"), title: t("galleryPage.timeline.t4Title"), desc: t("galleryPage.timeline.t4Desc"), emoji: "🩸" },
  ];

  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return;

    const ctx = gsap.context(() => {
      // Connect timeline progress line to scroll position
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Stagger timeline node reveals
      gsap.fromTo(
        ".mem-timeline-node",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-white/40 dark:bg-transparent border-y border-saffron/10 dark:border-white/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16 md:mb-20">
          <span className="text-saffron font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] block mb-2 sm:mb-3 font-sans">Milestones</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("galleryPage.timeline.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Timeline Core */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
            <div 
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-b from-saffron to-gold origin-top scale-y-0"
            />
          </div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {LOGS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className="mem-timeline-node flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Saffron bullet */}
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-[#121214] border-4 border-saffron -translate-x-1/2 z-10" />

                  {/* Left block */}
                  <div className={`w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 md:px-12 ${isEven ? "md:order-1 md:text-right" : "md:order-2 md:text-left"}`}>
                    <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-block border border-saffron/10 dark:border-white/10 bg-white dark:bg-[#121214]">
                      <span className="text-xs font-bold text-saffron uppercase tracking-[0.2em] font-sans">{item.year}</span>
                      <h3 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 mt-1 mb-2 font-heading flex items-center justify-start md:justify-end gap-2 leading-snug uppercase">
                        {!isEven && <span className="text-xl sm:text-2xl">{item.emoji}</span>}
                        {item.title}
                        {isEven && <span className="text-xl sm:text-2xl">{item.emoji}</span>}
                      </h3>
                      <p className="text-base md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">{item.desc}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className={`hidden md:block w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
