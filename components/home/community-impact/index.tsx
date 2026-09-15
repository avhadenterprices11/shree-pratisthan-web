"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityImpact() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const statsData = [
    { 
      id: "members", 
      value: 100, 
      suffix: t("communityImpact.s1Suffix"), 
      label: t("communityImpact.s1Label"), 
      image: "/images/ganesh.jpg",
      description: t("communityImpact.s1Desc") 
    },
    { 
      id: "legacy", 
      value: 20, 
      suffix: t("communityImpact.s2Suffix"), 
      label: t("communityImpact.s2Label"), 
      image: "/images/dahi-handi.jpg",
      description: t("communityImpact.s2Desc") 
    },
    { 
      id: "founders", 
      value: 20, 
      suffix: t("communityImpact.s3Suffix"), 
      label: t("communityImpact.s3Label"), 
      image: "/founding_members.jpg",
      position: "object-top",
      description: t("communityImpact.s3Desc") 
    },
    { 
      id: "drives", 
      value: 50, 
      suffix: t("communityImpact.s4Suffix"), 
      label: t("communityImpact.s4Label"), 
      image: "/images/social-work.jpg",
      description: t("communityImpact.s4Desc") 
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      statsData.forEach((stat, idx) => {
        // Slide card up on scroll reveal
        gsap.fromTo(
          `.stat-column-${idx}`,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: idx * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Count up number in sync with entrance
        const targetEl = document.getElementById(`stat-val-${idx}`);
        if (targetEl) {
          gsap.fromTo(
            targetEl,
            { textContent: 0 },
            {
              textContent: stat.value,
              duration: 1.6,
              delay: idx * 0.12,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true,
              },
              onComplete: () => {
                targetEl.textContent = stat.value.toString();
              },
            }
          );
        }
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background z-20"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Heading Section */}
        <div className="max-w-3xl mb-8 sm:mb-14 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug uppercase py-1">
            {t("communityImpact.title")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mt-3 sm:mt-6 rounded-full" />
        </div>

        {/* Asymmetrical Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10 xl:gap-12 items-start lg:pb-12">
          {statsData.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "stat-column group flex flex-col items-start text-left w-full transition-transform duration-500",
                `stat-column-${index}`,
                index % 2 === 1 ? "lg:translate-y-12" : ""
              )}
            >
              {/* Giant Metric Number */}
              <div className="text-3xl sm:text-4xl lg:text-[48px] font-normal text-saffron font-heading tracking-tight leading-tight py-1 flex items-baseline select-none">
                <span id={`stat-val-${index}`} className={`count-number count-number-${index}`} data-target={item.value}>
                  {item.value}
                </span>
                <span className={cn(
                  "font-heading font-normal tracking-tight ml-1 text-saffron",
                  item.suffix.length > 2 ? "text-lg sm:text-xl lg:text-2xl" : "text-2xl sm:text-3xl lg:text-4xl"
                )}>
                  {item.suffix}
                </span>
              </div>

              {/* Title label */}
              <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.2em] text-slate-800 dark:text-neutral-200 mt-3 sm:mt-4 block font-sans">
                {item.label}
              </span>

              {/* Styled Image Capsule/Frame */}
              <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-saffron/10 dark:border-white/10 mt-3 sm:mt-5 mb-3 sm:mb-5 shadow-md">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={cn(
                    "object-cover group-hover:scale-105 transition-transform duration-700 ease-out",
                    item.position || "object-center"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
              </div>

              {/* Short Description */}
              <p className="text-slate-grey text-base leading-[1.7] font-normal font-sans pr-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
