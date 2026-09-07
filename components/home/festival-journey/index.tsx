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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [slideSize, setSlideSize] = useState(440);

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

  // Responsive card slide sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlideSize(440);
      } else if (width >= 640) {
        setSlideSize(380);
      } else {
        setSlideSize(Math.min(width - 40, 320));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Pinned Scroll Scrub: Cards change with scrolling, locked full screen with zero gaps
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const travelDistance = (totalMilestones - 1) * slideSize;
      const isMobile = window.innerWidth < 768;
      // Ample scroll distance so all cards show off completely before unpinning
      const scrollDistance = isMobile ? 1300 : 1700;

      const anim = gsap.to(track, {
        x: -travelDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          pinType: "fixed",
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 0.3,
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
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      scrollTriggerRef.current = null;
    };
  }, [totalMilestones, slideSize]);

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
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-background flex flex-col justify-between pt-8 pb-6 sm:pt-12 sm:pb-8 px-4 sm:px-6 select-none"
    >
      {/* Ambient Brand Glows */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-30" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-20" />

      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto relative z-20 space-y-1 sm:space-y-2 shrink-0">
        <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug uppercase py-1">
          {t("festivalJourney.title")}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-1.5 rounded-full" />
      </div>

      {/* Middle Carousel Viewport: Cards change with scrolling */}
      <div className="relative w-full h-[370px] sm:h-[410px] lg:h-[450px] flex items-center justify-center overflow-hidden shrink-0 my-auto">
        <div
          ref={trackRef}
          className="absolute left-[50%] flex w-fit items-center will-change-transform"
          style={{
            marginLeft: -slideSize / 2,
          }}
        >
          {milestonesData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center will-change-transform px-2 sm:px-4"
                style={{ width: slideSize }}
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

      {/* Bottom Year Buttons */}
      <div className="flex justify-center gap-2 relative z-20 shrink-0">
        {milestonesData.map((item, idx) => (
          <button
            key={item.year}
            onClick={() => scrollToMilestone(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider font-sans transition-all cursor-pointer ${
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
  );
}
