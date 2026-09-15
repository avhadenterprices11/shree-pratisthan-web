"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Shield, Leaf, ArrowDownRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InitiativeItem {
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
  anchor: string;
}

export default function CommunityInitiatives() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchRow, setTouchRow] = useState<number | null>(null);
  const [activeMobileRow, setActiveMobileRow] = useState<number | null>(null);

  const INITIATIVES_SUMMARY: InitiativeItem[] = [
    {
      title: t("communityPage.initiatives.i1Title"),
      desc: t("communityPage.initiatives.i1Desc"),
      tag: t("communityPage.initiatives.i1Tag"),
      icon: <Heart className="w-6 h-6 text-saffron" />,
      anchor: "#blood-donation",
    },
    {
      title: t("communityPage.initiatives.i2Title"),
      desc: t("communityPage.initiatives.i2Desc"),
      tag: t("communityPage.initiatives.i2Tag"),
      icon: <Leaf className="w-6 h-6 text-saffron" />,
      anchor: "#tree-plantation",
    },
    {
      title: t("communityPage.initiatives.i3Title"),
      desc: t("communityPage.initiatives.i3Desc"),
      tag: t("communityPage.initiatives.i3Tag"),
      icon: <Shield className="w-6 h-6 text-saffron" />,
      anchor: "#charity-social-work",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance fade-in animation for rows
      gsap.fromTo(
        ".initiative-row-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
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

  // Guarantee that marquee resumes instantly on phone when finger lifts anywhere
  useEffect(() => {
    const handleRelease = () => {
      setTouchRow(null);
    };

    window.addEventListener("pointerup", handleRelease);
    window.addEventListener("pointercancel", handleRelease);
    window.addEventListener("touchend", handleRelease);
    window.addEventListener("touchcancel", handleRelease);

    return () => {
      window.removeEventListener("pointerup", handleRelease);
      window.removeEventListener("pointercancel", handleRelease);
      window.removeEventListener("touchend", handleRelease);
      window.removeEventListener("touchcancel", handleRelease);
    };
  }, []);

  const handleScrollToSection = (anchor: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRowToggle = (index: number) => {
    setActiveMobileRow((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-background border-t border-black/5 dark:border-white/10 select-none"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0" />
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-left max-w-2xl mb-8 sm:mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
            {t("communityPage.initiatives.badge")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("communityPage.initiatives.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mt-3 sm:mt-4 rounded-full" />
        </div>
      </div>

      {/* Marquee Rows Accordion List - Full Width Edge-to-Edge */}
      <div className="w-full flex flex-col border-t border-neutral-300 dark:border-white/10 relative z-10">
        {INITIATIVES_SUMMARY.map((item, index) => {
          const isTouchActive = touchRow === index;
          const isMobileActive = activeMobileRow === index;

          return (
            <div
              key={index}
              onClick={() => handleRowToggle(index)}
              onPointerDown={() => setTouchRow(index)}
              onPointerUp={() => setTouchRow(null)}
              onPointerCancel={() => setTouchRow(null)}
              className="initiative-row-item group border-b border-neutral-300 dark:border-white/10 py-6 sm:py-10 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out relative flex flex-col justify-start touch-manipulation w-full"
            >
              {/* Hardware Accelerated Infinite CSS Marquee */}
              <div className="w-full overflow-hidden flex relative z-10 py-4 sm:py-6 -my-2">
                <div
                  className="flex whitespace-nowrap animate-marquee lg:group-hover:[animation-play-state:paused] will-change-transform"
                  style={{
                    animationPlayState: isTouchActive ? "paused" : "running",
                  }}
                >
                  
                  {/* First continuous loop panel */}
                  <div className="flex shrink-0 whitespace-nowrap gap-x-6 sm:gap-x-12 pr-6 sm:pr-12 items-center">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 sm:gap-8 shrink-0">
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1 rounded-full border flex items-center gap-1.5 font-sans transition-colors ${
                          isMobileActive
                            ? "bg-saffron text-white border-saffron shadow-sm"
                            : "text-saffron bg-saffron/10 border-saffron/20"
                        }`}>
                          0{index + 1} / {item.tag}
                        </span>
                        <span className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-heading tracking-tight uppercase leading-[1.25] sm:leading-[1.28] py-2 inline-block transition-all duration-300 group-hover:text-saffron ${
                          isMobileActive
                            ? "text-saffron font-medium"
                            : "text-outline-festive"
                        }`}>
                          {item.title}
                        </span>
                        <div className="shrink-0 scale-85 sm:scale-100">{item.icon}</div>
                      </div>
                    ))}
                  </div>

                  {/* Second panel for seamless repeating */}
                  <div className="flex shrink-0 whitespace-nowrap gap-x-6 sm:gap-x-12 pr-6 sm:pr-12 items-center" aria-hidden="true">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 sm:gap-8 shrink-0">
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1 rounded-full border flex items-center gap-1.5 font-sans transition-colors ${
                          isMobileActive
                            ? "bg-saffron text-white border-saffron shadow-sm"
                            : "text-saffron bg-saffron/10 border-saffron/20"
                        }`}>
                          0{index + 1} / {item.tag}
                        </span>
                        <span className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-heading tracking-tight uppercase leading-[1.25] sm:leading-[1.28] py-2 inline-block transition-all duration-300 group-hover:text-saffron ${
                          isMobileActive
                            ? "text-saffron font-medium"
                            : "text-outline-festive"
                        }`}>
                          {item.title}
                        </span>
                        <div className="shrink-0 scale-85 sm:scale-100">{item.icon}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Expanded detailed description - aligned with standard max-w-7xl layout */}
              <div
                className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 transition-all duration-500 ease-out overflow-hidden ${
                  isMobileActive
                    ? "max-h-[220px] opacity-100 mt-4 sm:max-h-0 sm:opacity-0 sm:mt-0 group-hover:sm:max-h-[160px] group-hover:sm:opacity-100 group-hover:sm:mt-6"
                    : "max-h-0 opacity-0 mt-0 sm:max-h-0 sm:opacity-0 group-hover:sm:max-h-[160px] group-hover:sm:opacity-100 group-hover:sm:mt-6"
                }`}
              >
                <div className="max-w-3xl">
                  <p className="text-base md:text-lg text-[#525250] dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handleScrollToSection(item.anchor, e)}
                    className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white bg-saffron hover:bg-saffron/90 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all cursor-pointer group-hover:scale-102 font-sans active:scale-95"
                  >
                    <span>{t("communityPage.initiatives.readMore")}</span>
                    <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
