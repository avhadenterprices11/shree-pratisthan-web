"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutAchievements() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const AWARDS = [
    {
      title: t("aboutPage.achievements.a1Title"),
      desc: t("aboutPage.achievements.a1Desc"),
      badge: t("aboutPage.achievements.a1Badge"),
    },
    {
      title: t("aboutPage.achievements.a2Title"),
      desc: t("aboutPage.achievements.a2Desc"),
      badge: t("aboutPage.achievements.a2Badge"),
    },
    {
      title: t("aboutPage.achievements.a3Title"),
      desc: t("aboutPage.achievements.a3Desc"),
      badge: t("aboutPage.achievements.a3Badge"),
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance elastic scale reveal
      gsap.fromTo(
        ".achievement-badge-card",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "elastic.out(1.0, 0.75)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Magnetic Dial Pull on hover (Desktop only)
      const cards = gsap.utils.toArray<HTMLElement>(".achievement-badge-card");
      cards.forEach((card) => {
        const dial = card.querySelector(".achievement-badge-dial");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2;
          const mouseY = e.clientY - rect.top - rect.height / 2;

          // Pull emblem dial toward mouse cursor
          if (dial) {
            gsap.to(dial, {
              x: mouseX * 0.18,
              y: mouseY * 0.18,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          if (dial) {
            gsap.to(dial, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 bg-[#FFFDF9] dark:bg-background border-t border-saffron/10 dark:border-white/10 relative overflow-hidden select-none z-10"
    >
      {/* Animation keyframes for badge spin are defined in globals.css */}

      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-saffron/15 dark:border-white/10 mb-8 sm:mb-16 relative z-10">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight tracking-tight">
              {t("aboutPage.achievements.heading")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey dark:text-neutral-300 max-w-md font-sans font-normal leading-[1.75]">
            {t("aboutPage.achievements.subtitle")}
          </p>
        </div>

        {/* Badge Dials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 w-full justify-center items-start">
          {AWARDS.map((item, index) => (
            <div 
              key={index}
              className="achievement-badge-card flex flex-col items-center text-center p-6 sm:p-8 md:p-10 bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[3rem] shadow-xl shadow-saffron/5 hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 group relative cursor-default"
            >
              
              {/* Emblem Badge Dial */}
              <div className="achievement-badge-dial w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FFFDF9] dark:bg-[#18181b] border border-saffron/15 dark:border-white/10 flex items-center justify-center relative overflow-visible mb-5 sm:mb-8 shadow-inner">
                
                {/* Rotating SVG Curved Label */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow-badge opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 100 100">
                  <path id={`badge-path-${index}`} d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="text-[6.5px] fill-saffron uppercase font-bold tracking-[0.2em] font-sans">
                    <textPath href={`#badge-path-${index}`} startOffset="50%" textAnchor="middle">
                      {t("aboutPage.achievements.credentialDial")}
                    </textPath>
                  </text>
                </svg>

                {/* Inner Icon */}
                <div className="text-xl sm:text-2xl font-normal font-heading text-saffron relative z-10 group-hover:scale-108 transition-transform duration-500">
                  {item.badge}
                </div>

              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-lg md:text-xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase tracking-tight mb-2 sm:mb-3 group-hover:text-saffron transition-colors duration-350 leading-snug">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal max-w-xs transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
                {item.desc}
              </p>

              {/* Verified Stamp tag */}
              <div className="mt-5 sm:mt-8 text-xs text-saffron uppercase font-bold tracking-[0.2em] border border-saffron/20 dark:border-saffron/30 bg-saffron/5 dark:bg-saffron/10 px-3.5 sm:px-4.5 py-1.5 rounded-full font-sans shadow-sm transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                {t("aboutPage.achievements.validationTag")}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
