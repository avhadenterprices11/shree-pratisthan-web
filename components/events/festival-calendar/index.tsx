"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface CalendarItem {
  num: string;
  month: string;
  title: string;
  desc: string;
  type: string;
  badgeClass: string;
}

export default function FestivalCalendar() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const CALENDAR_ITEMS: CalendarItem[] = [
    {
      num: "1",
      month: t("eventsPage.calendar.c1Month"),
      title: t("eventsPage.calendar.c1Title"),
      desc: t("eventsPage.calendar.c1Desc"),
      type: t("eventsPage.calendar.c1Type"),
      badgeClass: "bg-saffron/10 border-saffron/30 text-saffron",
    },
    {
      num: "2",
      month: t("eventsPage.calendar.c2Month"),
      title: t("eventsPage.calendar.c2Title"),
      desc: t("eventsPage.calendar.c2Desc"),
      type: t("eventsPage.calendar.c2Type"),
      badgeClass: "bg-amber-50 border-amber-200 text-amber-600",
    },
    {
      num: "3",
      month: t("eventsPage.calendar.c3Month"),
      title: t("eventsPage.calendar.c3Title"),
      desc: t("eventsPage.calendar.c3Desc"),
      type: t("eventsPage.calendar.c3Type"),
      badgeClass: "bg-rose-50 border-rose-200 text-rose-600",
    },
    {
      num: "4",
      month: t("eventsPage.calendar.c4Month"),
      title: t("eventsPage.calendar.c4Title"),
      desc: t("eventsPage.calendar.c4Desc"),
      type: t("eventsPage.calendar.c4Type"),
      badgeClass: "bg-saffron/10 border-saffron/30 text-saffron",
    },
    {
      num: "5",
      month: t("eventsPage.calendar.c6Month"),
      title: t("eventsPage.calendar.c6Title"),
      desc: t("eventsPage.calendar.c6Desc"),
      type: t("eventsPage.calendar.c6Type"),
      badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
    },
    {
      num: "6",
      month: t("eventsPage.calendar.c7Month"),
      title: t("eventsPage.calendar.c7Title"),
      desc: t("eventsPage.calendar.c7Desc"),
      type: t("eventsPage.calendar.c7Type"),
      badgeClass: "bg-gold/10 border-gold/30 text-amber-700",
    },
  ];

  // GSAP Pinned Scroll Scrub: Cards change with scrolling across unique festival months
  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;

    const mm = gsap.matchMedia();

    // Universal MatchMedia for Mobile & Desktop
    mm.add("(min-width: 0px)", () => {
      const slider = sliderRef.current;
      const container = containerRef.current;
      if (!slider || !container) return;

      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 280 : 340;
      const gap = isMobile ? 16 : 28;
      const step = cardWidth + gap;

      const W = container.clientWidth || window.innerWidth;
      const offset = (W - cardWidth) / 2;

      const startX = offset;
      const endX = offset - (CALENDAR_ITEMS.length - 1) * step;
      // Natural, proportional scroll distance matching card travel width
      const scrollDistance = Math.round((CALENDAR_ITEMS.length - 1) * step * (isMobile ? 1.15 : 1.25));

      const tween = gsap.fromTo(
        slider,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: "#calendarPinContainer",
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: isMobile ? 0.4 : 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const currentX = startX + (endX - startX) * progress;
              const index = Math.round((offset - currentX) / step);
              const boundedIndex = Math.max(0, Math.min(index, CALENDAR_ITEMS.length - 1));
              setActiveIdx(boundedIndex);
            },
          },
        }
      );

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
      scrollTriggerRef.current = null;
    };
  }, []);

  const handleCardClick = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const targetScroll = st.start + (idx / (CALENDAR_ITEMS.length - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <section 
      id="calendarPinContainer" 
      ref={containerRef}
      className="bg-background relative w-full h-[100dvh] flex flex-col justify-between pt-6 pb-4 sm:pt-10 sm:pb-6 overflow-hidden select-none border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-30 z-0" />

      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto relative z-10 px-4 sm:px-6 shrink-0 space-y-1 sm:space-y-1.5">
        <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-neutral-900 dark:text-neutral-100 font-heading leading-snug uppercase tracking-tight py-1">
          {t("eventsPage.calendar.heading")}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-1 rounded-full" />
        <div className="pt-1">
          <span className="text-xs sm:text-sm text-slate-grey/80 dark:text-neutral-300 font-bold uppercase tracking-[0.18em] bg-black/5 dark:bg-white/10 px-3.5 sm:px-4 py-1.5 rounded-full inline-block font-sans">
            {t("eventsPage.calendar.scrollInstruction")}
          </span>
        </div>
      </div>

      {/* Middle Animated Track: Cards change with scrolling */}
      <div className="relative w-full h-[360px] sm:h-[390px] md:h-[420px] flex items-center justify-start overflow-hidden shrink-0 my-auto">
        <div 
          ref={sliderRef}
          className="flex gap-4 sm:gap-7 w-max will-change-transform transform-gpu"
        >
          {CALENDAR_ITEMS.map((item, index) => {
            const isActive = activeIdx === index;
            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-[280px] sm:w-[340px] shrink-0 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121214] border transition-all duration-300 min-h-[330px] sm:min-h-[360px] flex flex-col justify-between cursor-pointer select-none transform-gpu will-change-transform ${
                  isActive 
                    ? "border-saffron/60 dark:border-saffron/80 shadow-2xl opacity-100 z-10 shadow-saffron/20 ring-2 ring-saffron/30 scale-100" 
                    : "border-neutral-200/80 dark:border-white/10 opacity-50 hover:opacity-75 z-0 shadow-sm scale-[0.95]"
                }`}
              >
                <div>
                  {/* Month Title */}
                  <span className="text-xl sm:text-2xl md:text-[24px] font-normal font-heading text-neutral-900 dark:text-neutral-100 block mb-1 leading-snug py-0.5 uppercase">
                    {item.month}
                  </span>

                  {/* Event Title */}
                  <h3 className="text-base sm:text-lg md:text-[20px] font-normal text-neutral-900 dark:text-neutral-100 font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.65] font-sans select-none pointer-events-none line-clamp-4">
                    {item.desc}
                  </p>
                </div>

                {/* Indicator stamp */}
                <div className="mt-4 pt-3 border-t border-saffron/10 dark:border-white/10 flex justify-between items-center text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-saffron font-sans">
                  <span>{t("eventsPage.calendar.activeDriveLocation")}</span>
                  <span>★</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Milestone Indicator Dots */}
      <div className="flex justify-center gap-2 relative z-10 shrink-0 pb-1 sm:pb-2">
        {CALENDAR_ITEMS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleCardClick(idx)}
            aria-label={`Month ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIdx === idx ? "w-7 sm:w-8 bg-saffron" : "w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
