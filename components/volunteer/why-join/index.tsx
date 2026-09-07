"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface ValueItem {
  title: string;
  desc: string;
  badge: string;
}

export default function VolunteerWhyJoin() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  const VALUES: ValueItem[] = [
    {
      title: t("volunteerPage.whyJoin.v1Title"),
      desc: t("volunteerPage.whyJoin.v1Desc"),
      badge: "🤝",
    },
    {
      title: t("volunteerPage.whyJoin.v2Title"),
      desc: t("volunteerPage.whyJoin.v2Desc"),
      badge: "📈",
    },
    {
      title: t("volunteerPage.whyJoin.v3Title"),
      desc: t("volunteerPage.whyJoin.v3Desc"),
      badge: "🚩",
    },
    {
      title: t("volunteerPage.whyJoin.v4Title"),
      desc: t("volunteerPage.whyJoin.v4Desc"),
      badge: "🌐",
    },
  ];

  // Stagger reveal section elements on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Automatic slide interval (3.5 seconds) - restarts whenever timerKey changes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % VALUES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [timerKey]);

  // Micro fade-and-slide up animation when activeIdx switches
  useEffect(() => {
    if (!cardContentRef.current) return;
    
    gsap.fromTo(
      cardContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIdx]);

  const handleTabClick = (idx: number) => {
    setActiveIdx(idx);
    setTimerKey((prev) => prev + 1); // Reset auto-play timer key
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-45 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10 split-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.whyJoin.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Interactive Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Tab list (All 4 points visible simultaneously on both mobile & desktop) */}
          <div className="md:col-span-5 flex flex-col gap-2 sm:gap-3 w-full">
            {VALUES.map((item, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-3 sm:p-5 rounded-xl border transition-all duration-300 flex items-center gap-2.5 sm:gap-4 group cursor-pointer w-full ${
                    isActive 
                      ? "bg-white dark:bg-[#121214] border-saffron/20 dark:border-white/10 shadow-lg scale-[1.01]" 
                      : "bg-white/40 dark:bg-white/5 md:bg-transparent border-black/5 dark:border-white/5 md:border-transparent hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  <span className={`text-base font-normal font-heading transition-colors duration-300 ${isActive ? "text-saffron" : "text-slate-grey dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"}`}>
                    0{index + 1}
                  </span>
                  <span className={`text-base font-normal font-heading transition-colors duration-300 uppercase ${isActive ? "text-neutral-900 dark:text-neutral-100" : "text-slate-grey dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Card Portal */}
          <div className="md:col-span-7">
            <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-2xl relative min-h-[220px] sm:min-h-[280px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-20 z-0" />
              
              <div ref={cardContentRef} className="relative z-10">
                {/* Title */}
                <h3 className="text-lg sm:text-3xl font-normal text-neutral-900 dark:text-neutral-100 mb-2.5 sm:mb-4 font-heading leading-snug uppercase">
                  {VALUES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-grey dark:text-neutral-300 text-base leading-[1.7] sm:leading-[1.75] font-sans font-normal">
                  {VALUES[activeIdx].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
