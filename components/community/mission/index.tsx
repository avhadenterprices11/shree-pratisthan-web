"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface PhraseItem {
  text: string;
  highlight: boolean;
}

export default function CommunityMission() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraph1Phrases: PhraseItem[] = [
    { text: t("communityPage.mission.p1Text1"), highlight: false },
    { text: t("communityPage.mission.p1Text2"), highlight: true },
    { text: t("communityPage.mission.p1Text3"), highlight: false },
    { text: t("communityPage.mission.p1Text4"), highlight: true },
    { text: t("communityPage.mission.p1Text5"), highlight: true },
    { text: t("communityPage.mission.p1Text6"), highlight: false },
    { text: t("communityPage.mission.p1Text7"), highlight: true },
    { text: t("communityPage.mission.p1Text8"), highlight: false },
  ];

  const paragraph2Phrases: PhraseItem[] = [
    { text: t("communityPage.mission.p2Text1"), highlight: false },
    { text: t("communityPage.mission.p2Text2"), highlight: true },
    { text: t("communityPage.mission.p2Text3"), highlight: false },
    { text: t("communityPage.mission.p2Text4"), highlight: true },
    { text: t("communityPage.mission.p2Text5"), highlight: false },
    { text: t("communityPage.mission.p2Text6"), highlight: true },
    { text: t("communityPage.mission.p2Text7"), highlight: false },
    { text: t("communityPage.mission.p2Text8"), highlight: true },
    { text: t("communityPage.mission.p2Text9"), highlight: false },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Line-by-line slide-up stagger reveal (Option 3 aspect)
      gsap.fromTo(
        ".reveal-para-line",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-para-line",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Highlight word color transitions on scroll scrub (Option 1 aspect)
      gsap.utils.toArray(".highlight-word").forEach((el: unknown) => {
        const element = el as HTMLElement;
        gsap.fromTo(
          element,
          { color: "#8c9ba5" }, // Initial muted grey
          {
            color: "#E26A25", // Brand Saffron
            fontWeight: "700",
            duration: 0.5,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            }
          }
        );
      });

      // 3. Heading word slide-up reveal
      gsap.fromTo(
        ".reveal-word",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".reveal-word",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 4. Scroll scrub scaling trigger for the saffron line divider
      gsap.fromTo(
        ".reveal-line-bar",
        { scaleX: 0 },
        {
          scaleX: 1.0,
          scrollTrigger: {
            trigger: ".reveal-line-bar",
            start: "top 95%",
            end: "top 75%",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingWords = t("communityPage.mission.heading").split(" ");

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 dark:border-white/10"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Paragraph Column */}
          <div className="md:col-span-8 order-2 md:order-1 space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl text-[#525250] dark:text-neutral-300 leading-snug font-normal font-heading">
              {paragraph1Phrases.map((phrase, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5 mr-1.5 sm:mr-2 last:mr-0">
                  <span
                    className={`reveal-para-line inline-block ${
                      phrase.highlight ? "highlight-word text-[#8c9ba5]" : ""
                    }`}
                  >
                    {phrase.text}
                  </span>
                </span>
              ))}
            </p>
            <p className="text-base md:text-lg text-[#525250]/80 dark:text-neutral-400 leading-[1.7] sm:leading-[1.75] font-normal font-sans">
              {paragraph2Phrases.map((phrase, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5 mr-1.5 sm:mr-2 last:mr-0">
                  <span
                    className={`reveal-para-line inline-block ${
                      phrase.highlight ? "highlight-word text-[#8c9ba5]" : ""
                    }`}
                  >
                    {phrase.text}
                  </span>
                </span>
              ))}
            </p>
          </div>

          {/* Heading Column */}
          <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-start">
            <span className="text-saffron font-bold text-xs uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
              {t("communityPage.mission.badge")}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight flex flex-wrap gap-x-2 sm:gap-x-2.5 uppercase">
              {headingWords.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <span className="reveal-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <div className="reveal-line-bar w-16 sm:w-24 h-1 bg-saffron mt-3 sm:mt-6 rounded-full origin-left" />
          </div>

        </div>
      </div>
    </section>
  );
}
