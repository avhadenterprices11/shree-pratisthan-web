"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCommittee() {
  const { t, tArray } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance staggered fade reveal
      gsap.fromTo(
        ".committee-member-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Interactive mouse tilt & magnetic pulls on cards (Desktop only)
      const cards = gsap.utils.toArray<HTMLElement>(".committee-member-card");
      cards.forEach((card) => {
        const avatar = card.querySelector(".committee-avatar");
        const watermark = card.querySelector(".committee-watermark");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2;
          const mouseY = e.clientY - rect.top - rect.height / 2;

          // 3D Card Tilt
          gsap.to(card, {
            rotateY: mouseX * 0.05,
            rotateX: -mouseY * 0.05,
            transformPerspective: 800,
            duration: 0.5,
            ease: "power2.out",
          });

          // Parallax background watermark shift
          if (watermark) {
            gsap.to(watermark, {
              x: -mouseX * 0.12,
              y: -mouseY * 0.12,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Magnetic Avatar pull
          if (avatar) {
            gsap.to(avatar, {
              x: mouseX * 0.15,
              y: mouseY * 0.15,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          // Reset elements smoothly
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          if (watermark) gsap.to(watermark, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          if (avatar) gsap.to(avatar, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
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
              {t("aboutPage.committee.heading")}
            </h2>
          </div>
          <p className="text-base text-slate-grey dark:text-neutral-300 max-w-md font-sans font-normal leading-[1.75]">
            {t("aboutPage.committee.subtitle")}
          </p>
        </div>

        {/* Asymmetrical Split Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch w-full">
          
          {/* Left Column: Founder & President Card (Taller Focus Frame) */}
          <div className="w-full lg:w-1/2 flex">
            <div className="committee-member-card w-full min-h-auto sm:min-h-[440px] bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[3rem] p-5 sm:p-8 md:p-10 flex flex-col justify-between items-start shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              
              {/* Saffron Initials Watermark */}
              <div className="committee-watermark absolute right-0 top-0 text-[10rem] sm:text-[14rem] md:text-[18rem] font-normal text-saffron/5 select-none leading-none -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-12 font-heading pointer-events-none transition-colors duration-500">
                S
              </div>

              {/* Avatar Indicator */}
              <div className="committee-avatar w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-orange-50 dark:bg-saffron/10 border border-orange-200 dark:border-saffron/30 flex items-center justify-center text-lg sm:text-xl font-normal font-heading text-saffron shadow-md relative z-10">
                SB
              </div>

              {/* Founder Text */}
              <div className="relative z-10 mt-6 sm:mt-12 text-left">
                <span className="text-xs font-bold text-saffron uppercase tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                  {t("aboutPage.committee.presidentBadge")}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight mb-2 group-hover:text-saffron transition-colors duration-300">
                  {t("aboutPage.committee.presidentName")}
                </h3>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-[0.18em] mb-3 sm:mb-4 font-sans">
                  {t("aboutPage.committee.presidentRole")}
                </p>
                <p className="text-base text-slate-grey dark:text-neutral-300 font-sans font-normal leading-[1.75] max-w-md">
                  {t("aboutPage.committee.presidentDesc")}
                </p>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-saffron/10 dark:border-white/10 w-full pt-3 sm:pt-4 mt-5 sm:mt-6 text-xs text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.18em] font-sans relative z-10 text-left">
                {t("aboutPage.committee.presidentFooter")}
              </div>

            </div>
          </div>

          {/* Right Column: Stacked Trustees & 20 Founders Honor Roll */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
            
            {/* 20 Founding Pillars (संस्थापक सदस्य) */}
            <div className="committee-member-card w-full min-h-auto sm:min-h-[220px] bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 flex flex-col justify-between items-start gap-4 sm:gap-5 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[8rem] sm:text-[12rem] font-normal text-saffron/5 select-none leading-none -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8 font-heading pointer-events-none">
                20
              </div>

              <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                <div className="committee-avatar w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-xs sm:text-sm font-normal font-heading text-emerald-600 dark:text-emerald-400 shadow-sm shrink-0">
                  20
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-bold text-saffron uppercase tracking-[0.18em] font-sans">
                    {t("aboutPage.committee.pillarsBadge")}
                  </span>
                  <h3 className="text-lg sm:text-xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    {t("aboutPage.committee.pillarsHeading")}
                  </h3>
                </div>
              </div>

              {/* 20 Founders Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 relative z-10 max-w-lg font-sans">
                {(tArray("aboutPage.committee.pillarsList").length > 0
                  ? tArray("aboutPage.committee.pillarsList")
                  : [
                      "Shyam Badode", "Gopal Avhad", "Jaywant Takke", "Ganesh Ratnaparkhe",
                      "Manish Patil", "Bharat Shirsath", "Yogesh Revgade", "Satish Yadav",
                      "Ashish Dabholkar", "Paresh Patil", "Prashant Patil", "Nitin Bande",
                      "Kiran Patil", "Pankaj Sonar", "Ram Nagare", "Ghanshyam Bachaw",
                      "Prakash Sonawane", "Manoj Vayal", "Adil Shaikh", "Somnath Suryawanshi"
                    ]
                ).map((name, i) => (
                  <span key={i} className="text-xs font-medium bg-saffron/5 dark:bg-saffron/10 border border-saffron/15 dark:border-saffron/30 text-slate-700 dark:text-neutral-200 px-2 sm:px-2.5 py-0.5 rounded-full">
                    {name}
                  </span>
                ))}
              </div>

              <div className="text-xs text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.18em] font-sans relative z-10 pt-2 border-t border-saffron/10 dark:border-white/10 w-full text-left">
                {t("aboutPage.committee.pillarsFooter")}
              </div>
            </div>

            {/* 100+ Active Members & Youth Force */}
            <div className="committee-member-card w-full min-h-auto sm:min-h-[160px] bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[8rem] sm:text-[12rem] font-normal text-saffron/5 select-none leading-none -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8 font-heading pointer-events-none">
                100+
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 relative z-10">
                <div className="committee-avatar w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-sm sm:text-base font-normal font-heading text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
                  100+
                </div>
                <div className="flex flex-col items-start text-left max-w-sm">
                  <span className="text-xs font-bold text-saffron uppercase tracking-[0.18em] font-sans mb-0.5 sm:mb-1">
                    {t("aboutPage.committee.youthBadge")}
                  </span>
                  <h3 className="text-lg sm:text-xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    {t("aboutPage.committee.youthHeading")}
                  </h3>
                  <p className="text-base text-slate-grey dark:text-neutral-300 font-sans font-normal leading-[1.7] mt-1">
                    {t("aboutPage.committee.youthDesc")}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-grey uppercase font-bold tracking-[0.18em] font-sans self-start sm:self-center relative z-10 pt-3 sm:pt-0 sm:border-l border-saffron/15 sm:pl-6">
                {t("aboutPage.committee.youthTenure")}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
