"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  offsetClass: string;
}

export default function VolunteerTestimonials() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const VOLUNTEER_TESTIMONIALS: TestimonialItem[] = [
    {
      quote: t("volunteerPage.testimonials.tm1Quote"),
      name: t("volunteerPage.testimonials.tm1Name"),
      role: t("volunteerPage.testimonials.tm1Role"),
      avatar: "SP",
      offsetClass: "md:rotate-2 md:translate-y-6 hover:rotate-0 hover:translate-y-2",
    },
    {
      quote: t("volunteerPage.testimonials.tm2Quote"),
      name: t("volunteerPage.testimonials.tm2Name"),
      role: t("volunteerPage.testimonials.tm2Role"),
      avatar: "PJ",
      offsetClass: "md:-rotate-2 md:-translate-y-2 hover:rotate-0 hover:-translate-y-6",
    },
    {
      quote: t("volunteerPage.testimonials.tm3Quote"),
      name: t("volunteerPage.testimonials.tm3Name"),
      role: t("volunteerPage.testimonials.tm3Role"),
      avatar: "RS",
      offsetClass: "md:rotate-3 md:translate-y-10 hover:rotate-0 hover:translate-y-6",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Apply 3D perspective to parent grid
      gsap.set(".perspective-grid", { perspective: 1200 });

      // Staggered 3D rotation slide up
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50, rotateX: 12, rotateY: -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          stagger: 0.18,
          duration: 0.9,
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50 z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.testimonials.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 3D Perspective Speech Cards Grid */}
        <div className="perspective-grid grid grid-cols-1 md:grid-cols-3 gap-y-12 sm:gap-y-16 md:gap-x-6 lg:gap-x-8 items-start pb-6 sm:pb-12">
          {VOLUNTEER_TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className={`testimonial-card relative glass-panel pt-10 sm:pt-12 pb-6 sm:pb-8 px-5 sm:px-8 rounded-2xl sm:rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#121214] min-h-[220px] cursor-default border border-saffron/10 dark:border-white/10 shadow-md ${item.offsetClass}`}
            >
              {/* Floating Avatar overlaps top edge */}
              <div className="absolute -top-5 sm:-top-6 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-saffron bg-white dark:bg-[#18181b] flex items-center justify-center text-xs font-normal font-heading text-saffron shadow-lg z-20">
                {item.avatar}
              </div>

              {/* Speech bubble pointer block */}
              <div className="absolute -bottom-2.5 sm:-bottom-3 left-8 sm:left-10 w-5 h-5 sm:w-6 sm:h-6 rotate-45 border-r border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#121214] z-0" />

              <div className="relative z-10">
                {/* Decorative Quote Icon */}
                <div className="text-4xl sm:text-5xl text-saffron/15 font-serif leading-none absolute top-0 right-0 pointer-events-none select-none">
                  “
                </div>
                
                {/* Quote description */}
                <p className="text-slate-grey dark:text-neutral-300 leading-snug italic text-base font-heading font-normal mb-4 sm:mb-6 pt-1 sm:pt-2">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info footer */}
              <div className="relative z-10 border-t border-saffron/10 dark:border-white/10 pt-3 sm:pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-grey dark:text-neutral-400 uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium mt-0.5 font-sans">
                    {item.role}
                  </p>
                </div>
                <span className="text-saffron text-xs sm:text-sm">★</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
