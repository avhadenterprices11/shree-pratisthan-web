"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function BloodDonation() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const PAST_CAMPS = [
    {
      location: t("communityPage.bloodDonation.camp1Location"),
      date: t("communityPage.bloodDonation.camp1Date"),
      units: t("communityPage.bloodDonation.camp1Units"),
      partner: t("communityPage.bloodDonation.camp1Partner"),
    },
    {
      location: t("communityPage.bloodDonation.camp2Location"),
      date: t("communityPage.bloodDonation.camp2Date"),
      units: t("communityPage.bloodDonation.camp2Units"),
      partner: t("communityPage.bloodDonation.camp2Partner"),
    },
    {
      location: t("communityPage.bloodDonation.camp3Location"),
      date: t("communityPage.bloodDonation.camp3Date"),
      units: t("communityPage.bloodDonation.camp3Units"),
      partner: t("communityPage.bloodDonation.camp3Partner"),
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left column text slide
      gsap.fromTo(
        ".blood-animate-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right column card 3D Scroll Flip (clockwise)
      gsap.fromTo(
        ".blood-animate-right",
        {
          opacity: 0,
          rotationY: 45,
          rotationX: 12,
          z: -180,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scrollTrigger: {
            trigger: ".blood-animate-right",
            start: "top 95%",
            end: "top 50%",
            scrub: 1.8, // Smooth slow catch-up lag
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blood-donation"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5 dark:border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {/* Left Column: Info & Stats */}
          <div className="blood-animate-left space-y-4 sm:space-y-6">
            <span className="text-red-600 font-bold text-xs uppercase tracking-[0.25em] block mb-1 font-sans">
              {t("communityPage.bloodDonation.badge")}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("communityPage.bloodDonation.heading")}
            </h2>
            <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("communityPage.bloodDonation.description")}
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-normal text-red-600 font-heading">50+</span>
                <span className="text-xs uppercase font-bold tracking-[0.18em] text-slate-grey dark:text-neutral-400 font-sans">
                  {t("communityPage.impact.s1Label")}
                </span>
              </div>
            </div>
            <div className="pt-2 sm:pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 text-white font-bold text-xs uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-block font-sans"
              >
                {t("communityPage.bloodDonation.donorButton")}
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Log Card */}
          <div className="blood-animate-right glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-red-500/10 dark:border-red-500/20 shadow-xl relative">
            <div className="flex items-start justify-between gap-3 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase leading-snug">
                {t("communityPage.bloodDonation.recentDrivesTitle")}
              </h3>
              <span className="shrink-0 text-xs uppercase font-bold tracking-[0.18em] text-red-600 bg-red-50 dark:bg-red-950/40 px-2.5 sm:px-3 py-1 rounded-full border border-red-100 dark:border-red-800/40 font-sans">
                {t("communityPage.bloodDonation.verifiedTag")}
              </span>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {PAST_CAMPS.map((camp, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-red-50/30 dark:hover:bg-red-950/20 border border-slate-100 dark:border-white/10 transition-colors duration-300"
                >
                  <div>
                    <h4 className="text-sm sm:text-base font-normal text-neutral-900 dark:text-neutral-100 font-heading">
                      {camp.location}
                    </h4>
                    <p className="text-xs text-slate-grey dark:text-neutral-400 font-normal mt-0.5 sm:mt-1 font-sans">
                      {t("communityPage.bloodDonation.partnerLabel")}: {camp.partner}
                    </p>
                  </div>
                  <div className="text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end gap-1">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-grey dark:text-neutral-400 font-sans">{camp.date}</span>
                    <span className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-sans">
                      {camp.units}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center text-xs text-slate-grey dark:text-neutral-400 font-normal font-sans">
              ❤️ Donation drives are monitored under medical guidance. 100% safe.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
