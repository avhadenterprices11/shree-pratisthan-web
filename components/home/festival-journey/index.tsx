"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function FestivalJourney() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const milestonesData = useMemo(() => [
    {
      year: t("festivalJourney.m1.year"),
      title: t("festivalJourney.m1.title"),
      description: t("festivalJourney.m1.description"),
      tag: t("festivalJourney.m1.tag"),
      image: "/ganeshotsav_award_group.jpg",
      fit: "cover",
    },
    {
      year: t("festivalJourney.m2.year"),
      title: t("festivalJourney.m2.title"),
      description: t("festivalJourney.m2.description"),
      tag: t("festivalJourney.m2.tag"),
      image: "/dahihandi_2018.jpg",
      fit: "cover",
    },
    {
      year: t("festivalJourney.m3.year"),
      title: t("festivalJourney.m3.title"),
      description: t("festivalJourney.m3.description"),
      tag: t("festivalJourney.m3.tag"),
      image: "/trust_seal.png",
      fit: "contain",
    },
    {
      year: t("festivalJourney.m4.year"),
      title: t("festivalJourney.m4.title"),
      description: t("festivalJourney.m4.description"),
      tag: t("festivalJourney.m4.tag"),
      image: "/ganeshotsav_2017_jaipur.jpg",
      fit: "cover",
    },
  ], [t]);

  const totalMilestones = milestonesData.length;

  // GSAP Scrubbing: Cards come one by one vertically on Mobile, and horizontally on PC
  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Mobile Phone (< 768px): Vertical scrub — clean single-card layered stage
      mm.add("(max-width: 767px)", () => {
        const scrollDistance = 700;

        const anim = gsap.to({}, {
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 0.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const rawIndex = self.progress * (totalMilestones - 1);
              const clampedIndex = Math.min(
                totalMilestones - 1,
                Math.max(0, Math.round(rawIndex))
              );
              if (clampedIndex !== activeIndexRef.current) {
                activeIndexRef.current = clampedIndex;
                setActiveIndex(clampedIndex);
              }
            },
          },
        });

        scrollTriggerRef.current = anim.scrollTrigger ?? null;
      });

      // 2. Desktop PC (>= 768px): Horizontal scrub — cards come ONE BY ONE horizontally
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const dynamicSlideSize = window.innerWidth >= 1024 ? 440 : 380;
        const travelDistance = (totalMilestones - 1) * dynamicSlideSize;
        const scrollDistance = 700;

        const anim = gsap.to(track, {
          x: -travelDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 0.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const rawIndex = self.progress * (totalMilestones - 1);
              const clampedIndex = Math.min(
                totalMilestones - 1,
                Math.max(0, Math.round(rawIndex))
              );
              if (clampedIndex !== activeIndexRef.current) {
                activeIndexRef.current = clampedIndex;
                setActiveIndex(clampedIndex);
              }
            },
          },
        });

        scrollTriggerRef.current = anim.scrollTrigger ?? null;
      });
    }, container);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [totalMilestones]);

  // Click year button: smoothly scrolls page to target milestone
  const scrollToMilestone = useCallback((targetIndex: number) => {
    activeIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
    const st = scrollTriggerRef.current;
    if (st) {
      const targetScroll = st.start + (targetIndex / (totalMilestones - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  }, [totalMilestones]);

  return (
    <div ref={containerRef} className="relative w-full">
      <section
        ref={sectionRef}
        className="relative w-full h-[100dvh] overflow-hidden bg-background flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6 select-none"
      >
        {/* Ambient Brand Glows */}
        <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-30" />
        <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-20" />

        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto relative z-20 space-y-1 sm:space-y-2 shrink-0 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug uppercase py-1">
            {t("festivalJourney.title")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-1.5 rounded-full" />
        </div>

        {/* ── Mobile Clean Single-Card Stage: Cards transition one by one vertically with zero edge bleeding ── */}
        <div className="flex md:hidden relative w-full max-w-[340px] h-[340px] items-center justify-center shrink-0">
          {milestonesData.map((item, index) => {
            const isActive = activeIndex === index;
            const isPast = index < activeIndex;

            return (
              <div
                key={item.year}
                className={cn(
                  "absolute inset-0 w-full h-[340px] rounded-2xl overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-500 ease-out cursor-pointer",
                  isActive
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto border-saffron/60 shadow-saffron/25 ring-2 ring-saffron/30 z-10"
                    : isPast
                      ? "opacity-0 scale-95 -translate-y-6 pointer-events-none border-slate-800/80 z-0"
                      : "opacity-0 scale-95 translate-y-6 pointer-events-none border-slate-800/80 z-0"
                )}
                onClick={() => scrollToMilestone(index)}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 340px, 440px"
                  priority={index === 0}
                  className={cn(
                    "transition-transform duration-700 ease-out",
                    item.fit === "contain"
                      ? "object-contain p-6 -translate-y-3"
                      : "object-cover"
                  )}
                />

                {/* Gradient Backplate */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Card Top: Milestone Tag & Year */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-300 font-sans">
                    {item.tag}
                  </span>
                  <span className="text-xl font-bold font-heading text-white/95">
                    {item.year}
                  </span>
                </div>

                {/* Card Bottom: Content info */}
                <div className="relative z-10 p-4 space-y-1.5">
                  <h3 className="text-lg font-bold font-heading text-white leading-snug py-0.5 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-300 line-clamp-3 font-sans font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Desktop Carousel Viewport: Cards come one by one horizontally as user scrolls ── */}
        <div className="hidden md:flex relative w-full h-[360px] sm:h-[400px] lg:h-[430px] items-center justify-center overflow-hidden shrink-0">
          <div
            ref={trackRef}
            className="absolute left-[50%] -ml-[190px] lg:-ml-[220px] flex w-fit items-center will-change-transform"
          >
            {milestonesData.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.year}
                  className="flex shrink-0 flex-col items-center justify-center will-change-transform px-2 sm:px-4 w-[380px] lg:w-[440px]"
                  onClick={() => scrollToMilestone(index)}
                >
                  {/* Milestone Detail Card */}
                  <div
                    className={cn(
                      "w-full h-[350px] sm:h-[390px] lg:h-[420px] rounded-2xl sm:rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-300 relative cursor-pointer",
                      isActive
                        ? "border-saffron/60 shadow-saffron/25 ring-2 ring-saffron/30 scale-100 opacity-100"
                        : "border-slate-800/80 shadow-slate-950/60 scale-[0.94] opacity-40 hover:opacity-75"
                    )}
                  >
                    {/* Background Image */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 340px, 440px"
                      priority={index === 0}
                      className={cn(
                        "transition-transform duration-700 ease-out group-hover:scale-105",
                        item.fit === "contain"
                          ? "object-contain p-6 sm:p-8 -translate-y-3"
                          : "object-cover"
                      )}
                    />

                    {/* Gradient Backplate */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Card Top: Milestone Tag */}
                    <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300 font-sans">
                        {item.tag}
                      </span>
                      <span className="text-xl sm:text-2xl font-normal font-heading text-white/90">
                        {item.year}
                      </span>
                    </div>

                    {/* Card Bottom: Content info */}
                    <div className="relative z-10 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                      <h3 className="text-lg sm:text-xl md:text-[24px] font-normal font-heading text-white leading-snug py-0.5 uppercase">
                        {item.title}
                      </h3>
                      <p className="text-base text-neutral-300 line-clamp-3 font-sans font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Year Buttons directly grouped below the cards (no empty gap) */}
        <div className="flex justify-center gap-1.5 sm:gap-2 relative z-20 shrink-0 mt-5 sm:mt-7">
          {milestonesData.map((item, idx) => (
            <button
              key={item.year}
              onClick={() => scrollToMilestone(idx)}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider font-sans transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-saffron text-white shadow-md shadow-saffron/30 scale-105"
                  : "bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/20"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
