"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, HeartPulse, Leaf, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OpportunityTrack {
  title: string;
  desc: string;
  skills: string;
  icon: React.ReactNode;
}

export default function VolunteerOpportunities() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const TRACKS: OpportunityTrack[] = [
    {
      title: t("volunteerPage.opportunities.t1Title"),
      desc: t("volunteerPage.opportunities.t1Desc"),
      skills: t("volunteerPage.opportunities.t1Skills"),
      icon: <Users className="w-6 h-6 text-saffron" />,
    },
    {
      title: t("volunteerPage.opportunities.t2Title"),
      desc: t("volunteerPage.opportunities.t2Desc"),
      skills: t("volunteerPage.opportunities.t2Skills"),
      icon: <HeartPulse className="w-6 h-6 text-saffron" />,
    },
    {
      title: t("volunteerPage.opportunities.t3Title"),
      desc: t("volunteerPage.opportunities.t3Desc"),
      skills: t("volunteerPage.opportunities.t3Skills"),
      icon: <Leaf className="w-6 h-6 text-saffron" />,
    },
    {
      title: t("volunteerPage.opportunities.t4Title"),
      desc: t("volunteerPage.opportunities.t4Desc"),
      skills: t("volunteerPage.opportunities.t4Skills"),
      icon: <Gift className="w-6 h-6 text-saffron" />,
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal columns on scroll
      gsap.fromTo(
        ".opportunity-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToForm = () => {
    const el = document.querySelector("#registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("volunteerPage.opportunities.heading")}
          </h2>
          <p className="text-slate-grey dark:text-neutral-300 mt-2.5 sm:mt-4 font-sans leading-[1.7] sm:leading-relaxed text-base font-normal">
            {t("volunteerPage.opportunities.subtitle")}
          </p>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Liquid Column Flex Accordion Container */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch w-full min-h-[auto] md:h-[420px] group/container">
          {TRACKS.map((item, index) => (
            <div
              key={index}
              onClick={handleScrollToForm}
              className="opportunity-col glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block flex flex-col justify-between cursor-pointer bg-white dark:bg-[#121214] transition-all duration-500 border border-black/8 dark:border-white/10 hover:border-saffron/30 hover:shadow-2xl flex-1 md:group-hover/container:flex-[0.8] md:hover:flex-[1.6] overflow-hidden relative group"
            >
              <div className="w-full">
                {/* Column Card Header */}
                <div className="flex justify-between items-center w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-saffron/5 flex items-center justify-center text-saffron flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg] border border-saffron/5">
                    {item.icon}
                  </div>
                  
                  <span className="text-xl sm:text-2xl font-normal text-neutral-200 dark:text-neutral-700 group-hover:text-saffron/20 transition-colors duration-500 font-heading select-none pointer-events-none">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Column Card Title */}
                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 font-heading mt-4 sm:mt-6 leading-snug uppercase">
                  {item.title}
                </h3>
                
                {/* Expandable Description (Immediately readable on mobile, animated on desktop) */}
                <p className="text-base text-slate-grey dark:text-neutral-300 mt-2.5 sm:mt-4 leading-[1.7] font-sans font-normal opacity-100 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-[140px] transition-all duration-500 ease-in-out overflow-hidden">
                  {item.desc}
                </p>
              </div>

              {/* Skills Footer */}
              <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-saffron/10 dark:border-white/10 w-full">
                <span className="text-xs uppercase font-bold tracking-[0.16em] sm:tracking-[0.2em] text-saffron bg-saffron/5 dark:bg-saffron/10 border border-saffron/10 dark:border-saffron/30 px-2.5 py-1 rounded inline-block font-sans">
                  Skills: {item.skills}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
