"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface StageItem {
  step: string;
  title: string;
  desc: string;
}

// Exact coordinates along quadratic curve M 50 30 Q 180 180 50 330
const ARC_NODE_POSITIONS = [
  { left: 40, top: 25 },
  { left: 110, top: 120 },
  { left: 110, top: 220 },
  { left: 40, top: 315 },
];

export default function VolunteerProcess() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const STAGES: StageItem[] = [
    {
      step: t("volunteerPage.process.p1Step"),
      title: t("volunteerPage.process.p1Title"),
      desc: t("volunteerPage.process.p1Desc"),
    },
    {
      step: t("volunteerPage.process.p2Step"),
      title: t("volunteerPage.process.p2Title"),
      desc: t("volunteerPage.process.p2Desc"),
    },
    {
      step: t("volunteerPage.process.p3Step"),
      title: t("volunteerPage.process.p3Title"),
      desc: t("volunteerPage.process.p3Desc"),
    },
    {
      step: t("volunteerPage.process.p4Step"),
      title: t("volunteerPage.process.p4Title"),
      desc: t("volunteerPage.process.p4Desc"),
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollTriggerInstance = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Mobile: Smooth natural scroll-triggered progression (no intrusive pinning)
    mm.add("(max-width: 767px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: "#processPinContainer",
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.3,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * STAGES.length),
            STAGES.length - 1
          );
          if (index !== activeIdxRef.current) {
            activeIdxRef.current = index;
            setActiveIdx(index);
          }
        },
      });
      scrollTriggerInstance.current = trigger;
    });

    // Desktop: Compact, elegant pinned scrub
    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: "#processPinContainer",
        start: "top 12%",
        end: "+=450",
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * STAGES.length),
            STAGES.length - 1
          );
          if (index !== activeIdxRef.current) {
            activeIdxRef.current = index;
            setActiveIdx(index);
          }
        },
      });
      scrollTriggerInstance.current = trigger;
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  // Micro fade-and-slide up animation when activeIdx switches
  useEffect(() => {
    if (!detailsRef.current) return;
    
    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeIdx]);

  const handleStepClick = (idx: number) => {
    if (scrollTriggerInstance.current && window.innerWidth >= 768) {
      const start = scrollTriggerInstance.current.start;
      const end = scrollTriggerInstance.current.end;
      const progress = (idx + 0.1) / STAGES.length;
      const scrollPos = start + (end - start) * progress;
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <section 
      id="processPinContainer" 
      ref={containerRef} 
      className="bg-background relative w-full py-12 sm:py-16 md:py-20 flex flex-col justify-center overflow-hidden select-none border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="relative z-10 w-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-8 md:mb-12 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.process.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-2 sm:mt-4 rounded-full" />
        </div>

        {/* Scroll Instruction Banner */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="text-xs text-slate-grey/70 dark:text-neutral-300 font-bold uppercase tracking-[0.2em] bg-black/5 dark:bg-white/10 px-3.5 sm:px-4 py-1.5 rounded-full inline-block font-sans select-none">
            {t("volunteerPage.process.scrollInstruction")}
          </span>
        </div>

        {/* 2-Column Arc Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-12 max-w-6xl mx-auto w-full">
          
          {/* Left Column: Visual Arc Track (Desktop) */}
          <div className="hidden md:col-span-5 md:flex items-center justify-center relative h-[360px] w-full max-w-[280px] mx-auto">
            
            {/* SVG Arc Curved Path */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 240 360"
            >
              {/* Background Dashed Arc Track */}
              <path 
                d="M 50 30 Q 170 180 50 330" 
                fill="none" 
                stroke="#E26A36" 
                strokeOpacity="0.25" 
                strokeWidth="2.5" 
                strokeDasharray="6 6" 
              />
              {/* Active Segment Solid Arc Accent */}
              <path 
                d="M 50 30 Q 170 180 50 330" 
                fill="none" 
                stroke="#E26A36" 
                strokeWidth="3.5" 
                strokeDasharray="360"
                strokeDashoffset={360 - (activeIdx / 3) * 360}
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Arc Step Node Buttons */}
            {STAGES.map((stage, index) => {
              const isActive = activeIdx === index;
              const pos = ARC_NODE_POSITIONS[index];
              
              return (
                <button
                  key={stage.step}
                  onClick={() => handleStepClick(index)}
                  style={{
                    left: `${pos.left}px`,
                    top: `${pos.top}px`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center text-sm font-normal font-heading shadow-md cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "bg-saffron text-white border-saffron scale-115 shadow-xl shadow-saffron/40 z-20 ring-4 ring-saffron/20" 
                      : "bg-white dark:bg-[#121214] text-slate-grey dark:text-neutral-300 border-saffron/20 dark:border-white/10 hover:border-saffron hover:text-saffron z-10 hover:scale-105"
                  }`}
                >
                  {stage.step}
                </button>
              );
            })}
          </div>

          {/* Mobile: Interactive Step Gauge with Progress Line */}
          <div className="flex md:hidden flex-col gap-3 w-full">
            <div className="grid grid-cols-4 gap-2 w-full">
              {STAGES.map((stage, index) => {
                const isActive = activeIdx === index;
                const isPassed = activeIdx > index;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all duration-300 font-sans cursor-pointer ${
                      isActive 
                        ? "bg-saffron border-saffron text-white shadow-lg scale-102" 
                        : isPassed
                        ? "bg-saffron/10 border-saffron/30 text-saffron"
                        : "bg-white/90 dark:bg-[#121214] border-black/8 dark:border-white/10 text-slate-grey dark:text-neutral-300"
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider font-heading leading-none">
                      {stage.step}
                    </span>
                    <span className="text-[9px] font-semibold tracking-tight truncate max-w-full">
                      {stage.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Progress bar line */}
            <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-saffron h-full transition-all duration-300 rounded-full"
                style={{ width: `${((activeIdx + 1) / STAGES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right Column: Display Card Panel */}
          <div className="md:col-span-7 w-full">
            <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-2xl relative min-h-[190px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-20 z-0" />
              
              <div ref={detailsRef} className="relative z-10 text-left">
                {/* Stage Title */}
                <h3 className="text-lg sm:text-2xl md:text-3xl font-normal text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3 font-heading leading-snug uppercase">
                  {STAGES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-grey dark:text-neutral-300 text-base leading-[1.7] sm:leading-[1.75] font-sans font-normal">
                  {STAGES[activeIdx].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
