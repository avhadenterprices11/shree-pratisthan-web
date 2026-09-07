"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutVision() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-wipe",
        { 
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          opacity: 0,
          y: 20 
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.4,
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
      className="relative min-h-[50vh] sm:min-h-[70vh] flex items-center py-12 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 xl:px-24 overflow-hidden bg-[#FFFDF9] dark:bg-background border-t border-saffron/10 dark:border-white/10"
    >
      {/* 1. Subtle Ambient Heritage Glow */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5 z-0" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-16 opacity-5 z-0" />

      {/* 2. Layout Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* 3. Content Grid Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center relative z-10">
        
        {/* Left Side: Tag & Header */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">

          <h2 className="reveal-wipe text-2xl sm:text-4xl md:text-6xl font-normal text-slate-800 dark:text-neutral-100 leading-[1.08] tracking-tight uppercase font-heading">
            {t("aboutPage.vision.titlePart1")} <br />
            {t("aboutPage.vision.titlePart2")} <br />
            <span className="text-saffron font-heading">{t("aboutPage.vision.titlePart3")}</span>
          </h2>
          <div className="reveal-wipe w-12 sm:w-16 h-1 bg-saffron mt-4 sm:mt-6 rounded-full" />
        </div>

        {/* Right Side: High-legibility Text */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6 max-w-3xl">
          
          <div className="reveal-wipe overflow-hidden">
            <p className="text-base sm:text-xl md:text-2xl text-slate-800 dark:text-neutral-100 leading-relaxed font-heading font-normal tracking-normal">
              &ldquo;{t("aboutPage.vision.quote")}&rdquo;
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
