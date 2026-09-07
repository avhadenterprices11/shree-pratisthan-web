"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface FAQItem {
  q: string;
  a: string;
  category: string;
  desc: string;
}

export default function VolunteerFAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(0); // Defaults to first item for active vertical gauge tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const leftStickyRef = useRef<HTMLDivElement>(null);

  const FAQS: FAQItem[] = [
    {
      q: t("volunteerPage.faq.q1"),
      a: t("volunteerPage.faq.a1"),
      category: t("volunteerPage.faq.cat1"),
      desc: t("volunteerPage.faq.desc1"),
    },
    {
      q: t("volunteerPage.faq.q2"),
      a: t("volunteerPage.faq.a2"),
      category: t("volunteerPage.faq.cat2"),
      desc: t("volunteerPage.faq.desc2"),
    },
    {
      q: t("volunteerPage.faq.q3"),
      a: t("volunteerPage.faq.a3"),
      category: t("volunteerPage.faq.cat3"),
      desc: t("volunteerPage.faq.desc3"),
    },
    {
      q: t("volunteerPage.faq.q4"),
      a: t("volunteerPage.faq.a4"),
      category: t("volunteerPage.faq.cat4"),
      desc: t("volunteerPage.faq.desc4"),
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger accordion rows entrance
      gsap.fromTo(
        ".faq-row-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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

  // Fade transition on left sticky panel when details swap
  useEffect(() => {
    if (!leftStickyRef.current) return;

    gsap.fromTo(
      leftStickyRef.current,
      { opacity: 0.8, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [openIdx]);

  const toggleFAQ = (index: number) => {
    // Always keep one accordion open to preserve the visual gauge connection
    setOpenIdx(index);
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.faq.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 2-Column Split Visual Board */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 items-start">
          
          {/* Left Column: Sticky Gauge & Info Panel */}
          <div className="md:col-span-5 md:sticky md:top-28 flex flex-col md:flex-row gap-4 sm:gap-8 items-center md:items-start text-center md:text-left">
            
            {/* The Vertical Gauge Track (Hidden on mobile) */}
            <div className="hidden md:flex relative h-64 w-12 flex-col justify-between items-center py-2 shrink-0 select-none">
              {/* Central Track Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              
              {/* Glowing active indicator dot */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-saffron rounded-full transition-all duration-500 ease-out shadow-lg shadow-saffron/40 border-2 border-white dark:border-[#121214] z-20"
                style={{ top: `calc(${(openIdx) * 31.5}% + 16px)` }}
              />

              {/* Node Number steps */}
              {[0, 1, 2, 3].map((idx) => {
                const isActive = openIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleFAQ(idx)}
                    className={`relative z-10 text-[10px] font-normal font-heading transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer ${
                      isActive 
                        ? "text-saffron border-saffron bg-saffron/5 font-bold scale-110 shadow-sm" 
                        : "text-slate-grey dark:text-neutral-300 border-black/8 dark:border-white/10 bg-white dark:bg-[#121214] hover:text-saffron hover:border-saffron/30"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Sticky info block details */}
            <div ref={leftStickyRef} className="flex-1 md:pt-2">
              <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading mb-2 sm:mb-3 leading-snug uppercase">
                {FAQS[openIdx].category}
              </h3>
              
              <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal max-w-sm">
                {FAQS[openIdx].desc}
              </p>
            </div>

          </div>

          {/* Right Column: Accordion stack list */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div
                  key={index}
                  className={`faq-row-item glass-panel rounded-xl sm:rounded-interactive overflow-hidden bg-white dark:bg-[#121214] border transition-all duration-300 ${
                    isOpen ? "border-saffron/25 dark:border-saffron/40 shadow-xl shadow-saffron/5" : "border-black/5 dark:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 sm:p-6 text-left font-normal text-neutral-900 dark:text-neutral-100 font-heading hover:text-saffron transition-colors cursor-pointer uppercase"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg leading-snug pr-4">{faq.q}</span>
                    <span className={`text-lg sm:text-xl font-light transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45 text-saffron" : "text-slate-grey dark:text-neutral-400"}`}>
                      ＋
                    </span>
                  </button>
                  
                  {/* Dynamic Shutter container */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[260px] border-t border-saffron/10 dark:border-white/10" : "max-h-0"
                    }`}
                  >
                    <p className="p-4 sm:p-6 text-base text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal bg-slate-50/15 dark:bg-white/5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
