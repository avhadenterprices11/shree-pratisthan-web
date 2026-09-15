"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTimeline() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const HISTORY = [
    {
      id: "2006",
      year: t("aboutPage.timeline.t1Year"),
      title: t("aboutPage.timeline.t1Title"),
      desc: t("aboutPage.timeline.t1Desc"),
    },
    {
      id: "2012",
      year: t("aboutPage.timeline.t2Year"),
      title: t("aboutPage.timeline.t2Title"),
      desc: t("aboutPage.timeline.t2Desc"),
    },
    {
      id: "2018",
      year: t("aboutPage.timeline.t3Year"),
      title: t("aboutPage.timeline.t3Title"),
      desc: t("aboutPage.timeline.t3Desc"),
    },
    {
      id: "2021",
      year: t("aboutPage.timeline.t4Year"),
      title: t("aboutPage.timeline.t4Title"),
      desc: t("aboutPage.timeline.t4Desc"),
    },
    {
      id: "present",
      year: t("aboutPage.timeline.t5Year"),
      title: t("aboutPage.timeline.t5Title"),
      desc: t("aboutPage.timeline.t5Desc"),
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row");
      
      rows.forEach((row) => {
        const fillMask = row.querySelector(".timeline-fill-mask");
        const detail = row.querySelector(".timeline-detail-content");
        
        // 1. Scrub Liquid Height Fill on scroll (bottom-to-top flood)
        if (fillMask) {
          gsap.fromTo(
            fillMask,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 88%", // Starts filling as row enters from bottom
                end: "center 48%", // 100% filled when centered in view
                scrub: 0.3,
                invalidateOnRefresh: true,
              }
            }
          );
        }

        // 2. Smooth Slide Reveal for details on enter
        if (detail) {
          gsap.fromTo(
            detail,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[#FFFDF9] dark:bg-background border-t border-saffron/10 dark:border-white/10 z-10 select-none"
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

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-saffron/15 dark:border-white/10 mb-8 sm:mb-16 relative z-10">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-snug tracking-tight py-1">
              {t("aboutPage.timeline.heading")}
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 max-w-md font-sans font-normal leading-[1.75]">
            {t("aboutPage.timeline.subtitle")}
          </p>
        </div>

        {/* Timeline Rows List */}
        <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-10 md:gap-14 relative z-10">
          {HISTORY.map((item) => {
            const isLongLabel = item.year.length > 4;
            const textSizeClass = isLongLabel
              ? "text-4xl sm:text-6xl md:text-7xl"
              : "text-5xl sm:text-7xl md:text-8xl";

            return (
              <div 
                key={item.year}
                className="timeline-row w-full grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-6 md:gap-12 py-4 sm:py-8 border-b border-saffron/10 dark:border-white/10 last:border-0 relative"
              >
                {/* Left Column: Giant Year outlines */}
                <div className="md:col-span-5 relative select-none leading-none h-[50px] sm:h-[80px] md:h-[120px] flex items-center justify-start">
                  
                  {/* Outline Year Background */}
                  <div 
                    className={`${textSizeClass} font-normal font-heading tracking-tight leading-none whitespace-nowrap select-none`}
                    style={{
                      WebkitTextStroke: "2px rgba(226, 106, 54, 0.28)",
                      color: "transparent",
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Solid Reveal Year (Driven by GSAP Scrub from bottom-to-top) */}
                  <div 
                    className="timeline-fill-mask absolute left-0 bottom-0 w-full overflow-hidden h-0 pointer-events-none select-none will-change-[height]"
                  >
                    <div className="absolute left-0 bottom-0 h-[50px] sm:h-[80px] md:h-[120px] flex items-center">
                      <span className={`${textSizeClass} font-normal font-heading text-saffron tracking-tight leading-none whitespace-nowrap`}>
                        {item.year}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Title and details */}
                <div className="timeline-detail-content md:col-span-7 flex flex-col items-start gap-2 sm:gap-3 text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-slate-800 dark:text-neutral-100 uppercase tracking-tight font-heading leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
