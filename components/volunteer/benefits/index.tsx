"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface BenefitItem {
  title: string;
  desc: string;
  icon: string;
}

export default function VolunteerBenefits() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const BENEFITS: BenefitItem[] = [
    {
      title: t("volunteerPage.benefits.b1Title"),
      desc: t("volunteerPage.benefits.b1Desc"),
      icon: "Cert",
    },
    {
      title: t("volunteerPage.benefits.b2Title"),
      desc: t("volunteerPage.benefits.b2Desc"),
      icon: "Skill",
    },
    {
      title: t("volunteerPage.benefits.b3Title"),
      desc: t("volunteerPage.benefits.b3Desc"),
      icon: "Lead",
    },
    {
      title: t("volunteerPage.benefits.b4Title"),
      desc: t("volunteerPage.benefits.b4Desc"),
      icon: "Net",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal rows on scroll
      gsap.fromTo(
        ".benefit-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-45 z-0" />
      
      {/* Local styles for transition outlines */}
      <style>{`
        .text-outline-row-benefit {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.4);
          color: transparent;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dark .text-outline-row-benefit {
          -webkit-text-stroke: 1.5px rgba(244, 244, 244, 0.35);
        }
        .group:hover .text-outline-row-benefit,
        .text-outline-row-benefit.is-active-mobile {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.benefits.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Typographic Accordion List Container */}
        <div className="flex flex-col border-t border-neutral-300 dark:border-white/10">
          {BENEFITS.map((item, index) => {
            const isOpen = activeIdx === index;

            return (
              <div
                key={index}
                onClick={() => handleToggle(index)}
                className={cn(
                  "benefit-row group border-b border-neutral-300 dark:border-white/10 py-5 sm:py-8 cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-start relative px-2 sm:px-4",
                  isOpen ? "bg-saffron/[0.02]" : ""
                )}
              >
                {/* Row Header Block */}
                <div className="flex items-center justify-between z-10 w-full">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className="text-base sm:text-2xl font-normal tracking-wider font-heading text-saffron transition-colors">
                      0{index + 1}
                    </span>
                    
                    <h3 className={cn(
                      "text-lg sm:text-3xl md:text-4xl lg:text-5xl font-normal font-heading text-outline-row-benefit tracking-tight uppercase flex items-center gap-2.5 sm:gap-4",
                      isOpen && "is-active-mobile"
                    )}>
                      <span>{item.title}</span>
                      <span className={cn(
                        "text-xs uppercase font-bold tracking-[0.16em] sm:tracking-[0.2em] bg-saffron/10 text-saffron border border-saffron/20 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full font-sans select-none transition-all duration-500",
                        isOpen ? "opacity-100 inline-block" : "opacity-0 sm:opacity-0 group-hover:sm:opacity-100 hidden sm:inline-block"
                      )}>
                        {item.icon}
                      </span>
                    </h3>
                  </div>

                  {/* Mobile Animated Chevron */}
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 sm:hidden",
                    isOpen ? "rotate-180 bg-saffron text-white shadow-sm" : "bg-saffron/10 text-saffron"
                  )}>
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Row Expandable Description Container */}
                <div className={cn(
                  "max-w-4xl overflow-hidden transition-all duration-500 ease-out pl-6 sm:pl-10 md:pl-14",
                  isOpen
                    ? "max-h-[160px] opacity-100 mt-2.5 sm:mt-4"
                    : "max-h-0 opacity-0 mt-0 sm:max-h-0 sm:opacity-0 group-hover:sm:max-h-[120px] group-hover:sm:opacity-100 group-hover:sm:mt-4"
                )}>
                  <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] max-w-3xl font-sans font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

