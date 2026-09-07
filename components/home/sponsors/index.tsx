"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const CORPORATES = [
  "Samarth Sahakari Bank",
  "Late Dharmaraj Badode Sanstha",
  "Indira Nagar Citizens Forum",
  "Nashik Blood Bank Network",
  "Nashik Sports & Cricket Association",
  "Nashik Cultural Utsav Samiti",
];

export default function Sponsors() {
  const { t, tArray } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Direct GSAP infinite scroll animation from 0% to -50% (looping the duplicate set)
    const anim = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    let isAccelerated = false;
    let stopTimer: NodeJS.Timeout | null = null;

    // Velocity observer to scale marquee animation speed smoothly on scroll speed
    const trigger = ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        if (velocity < 80) return;
        const targetScale = Math.min(1 + velocity / 350, 2.5);
        anim.timeScale(targetScale);
        isAccelerated = true;

        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
          if (isAccelerated) {
            gsap.to(anim, {
              timeScale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                isAccelerated = false;
              },
            });
          }
        }, 100);
      },
    });

    return () => {
      anim.kill();
      trigger.kill();
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []);

  const sponsorsList = tArray("sponsors.list");
  const listToUse = sponsorsList.length > 0 ? sponsorsList : CORPORATES;
  const LIST_ITEMS = [...listToUse, ...listToUse];

  return (
    <section className="pt-8 sm:pt-12 pb-4 sm:pb-6 bg-background overflow-hidden relative select-none">
      {/* Background soft ambient halo */}
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />

      {/* Capsule Badge Header Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 mb-6 sm:mb-8 flex items-center justify-between gap-3 sm:gap-6">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-saffron/20" />
        <span className="text-saffron font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.22em] font-sans bg-background px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-saffron/12 shadow-sm whitespace-nowrap">
          {t("sponsors.title")}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-saffron/20" />
      </div>

      {/* Responsive Marquee Ticker Row */}
      <div className="w-full flex relative overflow-hidden py-3 sm:py-4">
        {/* Edge gradient masks for seamless visual blend */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Triple clone timeline container */}
        <div ref={marqueeRef} className="flex gap-10 sm:gap-20 items-center whitespace-nowrap cursor-default md:cursor-none">
          {LIST_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`text-base sm:text-2xl font-normal font-heading tracking-widest uppercase transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  isEven
                    ? "text-saffron hover:text-gold"
                    : "text-slate-grey dark:text-neutral-300 hover:text-saffron"
                }`}
                data-hover="pointer"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
