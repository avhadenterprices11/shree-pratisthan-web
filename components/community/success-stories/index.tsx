"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface StoryItem {
  title: string;
  beneficiary: string;
  location: string;
  story: string;
  imageText: string;
  accent: string;
}

export default function SuccessStories() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const STORIES: StoryItem[] = [
    {
      title: t("communityPage.successStories.s1Title"),
      beneficiary: t("communityPage.successStories.s1Beneficiary"),
      location: t("communityPage.successStories.s1Location"),
      story: t("communityPage.successStories.s1Story"),
      imageText: "Edu",
      accent: "border-saffron/30 text-saffron bg-saffron/5",
    },
    {
      title: t("communityPage.successStories.s2Title"),
      beneficiary: t("communityPage.successStories.s2Beneficiary"),
      location: t("communityPage.successStories.s2Location"),
      story: t("communityPage.successStories.s2Story"),
      imageText: "Med",
      accent: "border-red-500/30 text-red-500 bg-red-500/5",
    },
    {
      title: t("communityPage.successStories.s3Title"),
      beneficiary: t("communityPage.successStories.s3Beneficiary"),
      location: t("communityPage.successStories.s3Location"),
      story: t("communityPage.successStories.s3Story"),
      imageText: "Eco",
      accent: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stories-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    // Set up automatic slide interval (4 seconds)
    const timer = setInterval(() => {
      const activeCard = document.querySelector(".active-deck-card");
      if (activeCard) {
        gsap.to(activeCard, {
          x: -360,
          rotation: -12,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setActiveIdx((prev) => (prev + 1) % STORIES.length);
            gsap.set(activeCard, { x: 0, rotation: 0, opacity: 1, scale: 1 });
          }
        });
      }
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-10 pb-12 sm:pt-12 sm:pb-14 md:py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 dark:border-white/10"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-5xl mx-auto relative z-10 stories-reveal">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-10">
          <span className="text-saffron font-bold text-xs sm:text-sm uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
            {t("communityPage.successStories.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-snug uppercase py-1">
            {t("communityPage.successStories.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 3D Stacked Deck Slider Container */}
        <div 
          className="relative w-full max-w-4xl mx-auto h-[360px] sm:h-[300px] md:h-[240px] flex items-center justify-center"
          style={{ perspective: 1500, transformStyle: "preserve-3d" }}
        >
          {STORIES.map((story, index) => {
            // Calculate relative index position in the stack loop
            const position = (index - activeIdx + STORIES.length) % STORIES.length;
            const isActive = position === 0;
            const isNext = position === 1;
            const isFar = position === 2;

            // Apply different stack translation styles based on stack order
            let transformClass = "opacity-0 scale-90 translate-y-16 translate-x-16 pointer-events-none z-0";
            if (isActive) {
              transformClass = "active-deck-card opacity-100 scale-100 translate-y-0 translate-x-0 rotate-0 pointer-events-auto z-30";
            } else if (isNext) {
              transformClass = "opacity-75 scale-95 translate-y-4 translate-x-4 rotate-2 pointer-events-none z-20";
            } else if (isFar) {
              transformClass = "opacity-35 scale-90 translate-y-8 translate-x-8 rotate-4 pointer-events-none z-10";
            }

            return (
              <div
                key={index}
                className={`absolute w-full p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block flex flex-col md:flex-row gap-4 sm:gap-8 items-center bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-xl transition-all duration-700 ease-out ${transformClass}`}
              >
                {/* Story Icon/Avatar */}
                <div className={`w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-normal font-heading shadow-md ${story.accent} flex-shrink-0`}>
                  {story.imageText}
                </div>

                {/* Content block */}
                <div className="flex-grow space-y-2 sm:space-y-3 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.18em] bg-saffron/10 text-saffron px-2.5 py-0.5 sm:py-1 rounded font-sans">
                      {story.location}
                    </span>
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.18em] bg-slate-100 dark:bg-white/10 text-slate-grey dark:text-neutral-300 px-2.5 py-0.5 sm:py-1 rounded font-sans">
                      {story.beneficiary}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-[24px] font-normal text-neutral-900 dark:text-neutral-100 font-heading leading-snug py-1 uppercase">
                    {story.title}
                  </h3>
                  
                  <p className="text-slate-grey dark:text-neutral-300 leading-relaxed text-base md:text-lg italic font-heading font-normal">
                    &ldquo;{story.story}&rdquo;
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
