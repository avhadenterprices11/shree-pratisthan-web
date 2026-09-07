"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface UpcomingItem {
  day: string;
  month: string;
  time: string;
  title: string;
  location: string;
  category: string;
  colorClass: string;
}

export default function UpcomingEvents() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const UPCOMING: UpcomingItem[] = [
    {
      day: "27",
      month: "AUG",
      time: t("eventsPage.upcoming.u1Time"),
      title: t("eventsPage.upcoming.u1Title"),
      location: t("eventsPage.upcoming.u1Location"),
      category: t("eventsPage.upcoming.u1Category"),
      colorClass: "bg-saffron/10 text-saffron border border-saffron/20",
    },
    {
      day: "30",
      month: "AUG",
      time: t("eventsPage.upcoming.u2Time"),
      title: t("eventsPage.upcoming.u2Title"),
      location: t("eventsPage.upcoming.u2Location"),
      category: t("eventsPage.upcoming.u2Category"),
      colorClass: "bg-red-50 text-red-600 border border-red-200/50",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal agenda cards
      gsap.fromTo(
        ".upcoming-agenda-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      {/* Hardware-accelerated transitions for text outlines */}
      <style>{`
        .text-outline-date {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.35);
          color: transparent;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dark .text-outline-date {
          -webkit-text-stroke: 1.5px rgba(244, 244, 244, 0.35);
        }
        .group:hover .text-outline-date {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("eventsPage.upcoming.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 2-Column Typographic Agenda Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 max-w-6xl mx-auto">
          {UPCOMING.map((item, index) => (
            <div 
              key={index}
              className="upcoming-agenda-card group relative glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-black/5 dark:border-white/10 hover:border-saffron/20 hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start cursor-pointer select-none overflow-hidden min-h-[220px] sm:min-h-[240px]"
              onClick={() => {
                const regForm = document.getElementById("register");
                if (regForm) {
                  regForm.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {/* Background scale vertical shutter accent */}
              <div className="absolute inset-0 bg-saffron/5 rounded-2xl sm:rounded-block scale-y-90 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 origin-bottom z-0" />

              {/* Date stamp column */}
              <div className="relative z-10 flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 sm:gap-0 shrink-0 min-w-[55px] sm:min-w-[70px]">
                <span className="text-5xl sm:text-6xl md:text-7xl font-normal font-heading text-outline-date tracking-tight leading-none block">
                  {item.day}
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-slate-grey dark:text-neutral-400 mt-0 sm:mt-2 block select-none uppercase font-sans">
                  {item.month}
                </span>
              </div>

              {/* Content description column */}
              <div className="relative z-10 flex-1 flex flex-col justify-between h-full text-left">
                <div>
                  {/* Category */}
                  <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded font-sans ${item.colorClass}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 group-hover:text-saffron transition-colors duration-300 font-heading mb-3 sm:mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* Time & Location details */}
                  <div className="space-y-1.5 sm:space-y-2 text-base text-slate-grey dark:text-neutral-300 font-medium font-sans">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-saffron stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Floating Arrow CTA */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-saffron font-sans group-hover:border-saffron/10">
                  <span>{t("eventsPage.upcoming.registerBtn")}</span>
                  <span className="text-sm sm:text-base transform transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
