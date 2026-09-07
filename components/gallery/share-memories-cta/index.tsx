"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ShareMemoriesCTA() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".share-trigger-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setBtnCoords({ x: x * 0.45, y: y * 0.45 });
  };

  const handleMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10 share-trigger-content">
        <div className="glass-panel p-6 sm:p-12 md:p-16 rounded-2xl sm:rounded-block text-center border border-saffron/20 dark:border-white/10 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white dark:from-[#1a1412] dark:via-[#141416] dark:to-[#121214]">
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 leading-tight mb-3 sm:mb-6 font-heading tracking-tight uppercase">
              {t("galleryPage.cta.heading")}
            </h2>
            <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 max-w-xl mx-auto mb-6 sm:mb-10 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("galleryPage.cta.subtitle")}
            </p>

            <button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)`,
                transition: btnCoords.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
              }}
              className="bg-saffron hover:bg-saffron/90 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full shadow-lg shadow-saffron/20 text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans"
              data-hover="pointer"
            >
              {t("galleryPage.cta.shareBtn")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
