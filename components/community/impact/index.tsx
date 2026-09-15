"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityImpact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const STATS = [
    { value: 50, suffix: t("communityPage.impact.s1Suffix"), label: t("communityPage.impact.s1Label") },
    { value: 5000, suffix: t("communityPage.impact.s2Suffix"), label: t("communityPage.impact.s2Label") },
    { value: 10000, suffix: t("communityPage.impact.s3Suffix"), label: t("communityPage.impact.s3Label") },
    { value: 20, suffix: t("communityPage.impact.s4Suffix", ""), label: t("communityPage.impact.s4Label") },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger stats reveal
      gsap.fromTo(
        ".stat-box",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Trigger count-up numbers
      const targets = gsap.utils.toArray(".count-number");
      targets.forEach((target: any) => {
        const val = parseInt(target.getAttribute("data-target") || "0", 10);
        gsap.fromTo(
          target,
          { textContent: 0 },
          {
            textContent: val,
            duration: 2.0,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
            },
            onComplete: () => {
              target.textContent = val.toString();
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
            {t("communityPage.impact.badge")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("communityPage.impact.heading")}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {STATS.map((item, index) => (
            <div
              key={index}
              className="stat-box glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-block text-center flex flex-col justify-center items-center bg-white dark:bg-[#121214] border border-saffron/15 dark:border-white/10 shadow-md"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-saffron font-heading flex items-center justify-center">
                <span className="count-number" data-target={item.value}>{item.value}</span>
                {item.suffix ? <span>{item.suffix}</span> : null}
              </div>
              <div className="w-8 sm:w-10 h-0.5 bg-gold my-2.5 sm:my-4 rounded-full" />
              <div className="text-xs md:text-sm font-bold text-slate-grey dark:text-neutral-300 uppercase tracking-[0.16em] sm:tracking-[0.18em] font-sans">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
