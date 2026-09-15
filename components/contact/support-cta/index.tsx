"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSupportCTA() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-animate",
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
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

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-5xl mx-auto relative z-10 cta-animate">
        <div className="glass-panel p-6 sm:p-12 rounded-2xl sm:rounded-block text-center space-y-6 sm:space-y-8 bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-30" />
          
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("contactPage.cta.heading")}
            </h2>
            <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("contactPage.cta.desc")}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link
              href="/volunteer"
              className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-bold text-xs uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-95 text-center font-sans"
            >
              {t("contactPage.cta.volunteerBtn")}
            </Link>
            <Link
              href="/all-events"
              className="w-full sm:w-auto bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-foreground font-bold text-xs uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-95 text-center border border-slate-200 dark:border-neutral-700 font-sans"
            >
              {t("contactPage.cta.viewEventsBtn")}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
