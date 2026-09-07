"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const { t } = useLanguage();

  const STORY_STEPS = [
    {
      id: "2006",
      year: t("aboutPage.story.s1Year"),
      title: t("aboutPage.story.s1Title"),
      description: t("aboutPage.story.s1Desc"),
      image: "/ganeshotsav_award_group.jpg",
      position: "object-top",
    },
    {
      id: "2012",
      year: t("aboutPage.story.s2Year"),
      title: t("aboutPage.story.s2Title"),
      description: t("aboutPage.story.s2Desc"),
      image: "/dahihandi_2018.jpg",
      position: "object-center",
    },
    {
      id: "2018",
      year: t("aboutPage.story.s3Year"),
      title: t("aboutPage.story.s3Title"),
      description: t("aboutPage.story.s3Desc"),
      image: "/trust_seal.png",
      fit: "contain",
      position: "object-center",
    },
    {
      id: "present",
      year: t("aboutPage.story.s4Year"),
      title: t("aboutPage.story.s4Title"),
      description: t("aboutPage.story.s4Desc"),
      image: "/ganeshotsav_2017_jaipur.jpg",
      position: "object-center",
    },
  ];

  const [activeYear, setActiveYear] = useState(STORY_STEPS[0].year);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeYearRef = useRef(activeYear);

  // Sync ref with state
  useEffect(() => {
    activeYearRef.current = activeYear;
    gsap.fromTo(
      ".story-year-text",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [activeYear]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardItems = gsap.utils.toArray<HTMLElement>(".story-card-item");
      
      cardItems.forEach((card) => {
        const year = card.getAttribute("data-year");
        if (!year) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => {
            if (self.isActive && activeYearRef.current !== year) {
              setActiveYear(year);
            }
          },
          onEnter: () => {
            setActiveYear(year);
          },
          onEnterBack: () => {
            setActiveYear(year);
          },
        });
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#FFFDF9] dark:bg-background py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24 border-t border-saffron/10 dark:border-white/10 z-10 select-none"
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

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Sticky Sidebar Info & Giant Year */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-[16vh] flex flex-col items-start gap-4 sm:gap-6 z-20 will-change-transform">

          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-slate-800 dark:text-neutral-100 tracking-tight uppercase font-heading leading-snug py-1">
            {t("aboutPage.story.heading")}
          </h2>
          
          <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 max-w-md leading-[1.75] font-sans font-normal">
            {t("aboutPage.story.subtitle")}
          </p>

          {/* Giant Active Year Indicator display */}
          <div className="relative overflow-hidden h-[70px] sm:h-[100px] md:h-[130px] w-full mt-2 sm:mt-4 flex items-center justify-start border-t border-saffron/15 dark:border-white/10 pt-3 sm:pt-6">
            {/* Outline Shadow Text */}
            <div className="absolute left-0 text-5xl sm:text-7xl md:text-8xl font-normal text-saffron/10 font-heading select-none uppercase tracking-tight leading-none">
              {activeYear}
            </div>
            {/* Animated Solid Text */}
            <div 
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-saffron font-heading uppercase tracking-tight leading-none story-year-text relative z-10"
            >
              {activeYear}
            </div>
          </div>

        </div>

        {/* Right Column: Editorial Cards Feed (Natural Y scroll) */}
        <div className="w-full lg:w-7/12 flex flex-col gap-6 sm:gap-10 md:gap-16 relative z-10">
          {STORY_STEPS.map((step) => {
            return (
              <div
                key={step.year}
                className="story-card-item w-full bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-xl shadow-saffron/5 flex flex-col gap-4 sm:gap-6 transition-all duration-300 hover:border-saffron/30 hover:shadow-2xl will-change-transform"
                data-year={step.year}
              >
                {/* Card Image Frame */}
                <div className="w-full aspect-[16/10] relative overflow-hidden rounded-xl sm:rounded-[1.8rem] border border-saffron/10 dark:border-white/10 shadow-md bg-slate-950">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className={cn(
                      "transition-transform duration-700 hover:scale-103",
                      step.fit === "contain" ? "object-contain p-4 sm:p-8" : "object-cover",
                      step.position || "object-center"
                    )}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Text Content */}
                <div className="flex flex-col items-start gap-2 sm:gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg sm:text-xl font-normal text-saffron font-heading leading-none">
                      {step.year}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-normal text-slate-800 dark:text-neutral-100 uppercase tracking-tight font-heading leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal">
                    {step.description}
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
