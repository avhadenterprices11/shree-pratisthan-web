"use client";

import React, { useState, useEffect, useRef } from "react";
import { getCDNUrl } from "@/lib/cdn";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface HighlightItem {
  num: string;
  title: string;
  category: string;
  video: string;
  image: string;
  isVideo: boolean;
}

export default function EventsHighlights() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isHovered = useRef(false);

  const HIGHLIGHTS: HighlightItem[] = [
    {
      num: "01",
      title: t("eventsPage.highlights.h1Title"),
      category: t("eventsPage.highlights.h1Category"),
      video: "",
      image: "/events_swagat_yatra_2022.jpg",
      isVideo: false,
    },
    {
      num: "02",
      title: t("eventsPage.highlights.h2Title"),
      category: t("eventsPage.highlights.h2Category"),
      video: "",
      image: "/events_ganeshotsav_2024_jejuri.jpg",
      isVideo: false,
    },
    {
      num: "03",
      title: t("eventsPage.highlights.h3Title"),
      category: t("eventsPage.highlights.h3Category"),
      video: "",
      image: "/volunteer_medical.png",
      isVideo: false,
    },
    {
      num: "04",
      title: t("eventsPage.highlights.h4Title"),
      category: t("eventsPage.highlights.h4Category"),
      video: "",
      image: "/events_shiv_jayanti_2022.jpg",
      isVideo: false,
    },
    {
      num: "05",
      title: t("eventsPage.highlights.h5Title"),
      category: t("eventsPage.highlights.h5Category"),
      video: "",
      image: "/navratri_2022.jpg",
      isVideo: false,
    },
    {
      num: "06",
      title: t("eventsPage.highlights.h6Title"),
      category: t("eventsPage.highlights.h6Category"),
      video: "/about_showcase_video.mp4",
      image: "/hero_dahihandi.png",
      isVideo: true,
    },
    {
      num: "07",
      title: t("eventsPage.highlights.h7Title"),
      category: t("eventsPage.highlights.h7Category"),
      video: "",
      image: "/portrait_volunteer.png",
      isVideo: false,
    },
    {
      num: "08",
      title: t("eventsPage.highlights.h8Title"),
      category: t("eventsPage.highlights.h8Category"),
      video: "",
      image: "/events_ambedkar_jayanti.jpg",
      isVideo: false,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".highlights-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  // Track cursor position to translate floating portal with ultra smooth timing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!portalRef.current || !isHovered.current) return;

      const portalWidth = 380;
      const portalHeight = 250;

      gsap.to(portalRef.current, {
        x: e.clientX - portalWidth / 2,
        y: e.clientY - portalHeight / 2,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    isHovered.current = true;
    setActiveIdx(idx);

    // Play active video loop if present
    const video = videoRefs.current[idx];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // Instantly set initial position to avoid jump
    if (portalRef.current) {
      const portalWidth = 380;
      const portalHeight = 250;
      gsap.set(portalRef.current, {
        x: e.clientX - portalWidth / 2,
        y: e.clientY - portalHeight / 2,
      });

      // Smooth scale & fade in
      gsap.killTweensOf(portalRef.current);
      gsap.to(portalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.4)",
      });
    }
  };

  const handleMouseLeave = (idx: number) => {
    isHovered.current = false;

    // Pause active video loop
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
    }

    // Scale portal out cleanly, clearing activeIdx only on complete
    if (portalRef.current) {
      gsap.killTweensOf(portalRef.current);
      gsap.to(portalRef.current, {
        opacity: 0,
        scale: 0.75,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          if (!isHovered.current) {
            setActiveIdx(null);
          }
        },
      });
    }
  };

  const handleRowClick = (idx: number) => {
    setTappedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 select-none"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      {/* Hardware-accelerated text outline style override */}
      <style>{`
        .text-outline-highlight {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.2);
          color: transparent;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dark .text-outline-highlight {
          -webkit-text-stroke: 1.5px rgba(244, 244, 244, 0.35);
        }
        .group:hover .text-outline-highlight,
        .text-outline-highlight.is-active {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10 highlights-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 md:mb-16 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("eventsPage.highlights.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-2 sm:mt-4 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-grey dark:text-neutral-300 mt-3 font-sans">
            {t("eventsPage.highlights.subtitle")}
          </p>
        </div>

        {/* Unified Typographic List (Desktop Cursor Hover + Mobile/Tablet Finger Tap) */}
        <div className="max-w-6xl mx-auto border-t border-black/10 dark:border-white/10">
          {HIGHLIGHTS.map((item, index) => {
            const isTapped = tappedIdx === index;
            const isHoverActive = activeIdx === index;
            const isActive = isTapped || isHoverActive;

            return (
              <div
                key={index}
                onClick={() => handleRowClick(index)}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={cn(
                  "group relative flex flex-col py-5 sm:py-8 lg:py-10 border-b border-black/10 dark:border-white/10 cursor-pointer select-none transition-all duration-300 px-2 sm:px-4",
                  isTapped ? "bg-saffron/[0.03]" : ""
                )}
              >
                {/* Row Header Block */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 min-w-0">
                    <span className={cn(
                      "text-xs sm:text-sm font-normal font-heading tracking-[0.2em] uppercase shrink-0 select-none transition-colors",
                      isActive ? "text-saffron" : "text-slate-grey"
                    )}>
                      {item.num}
                    </span>
                    <h3 className={cn(
                      "text-lg sm:text-2xl md:text-3xl xl:text-5xl font-normal font-heading tracking-tight select-none uppercase transition-colors duration-300",
                      isActive ? "text-saffron is-active" : "text-outline-highlight"
                    )}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-2">
                    {/* Desktop Category Tag (Appears on Hover) */}
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-grey opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 hidden lg:inline-block transition-all duration-300 pr-4 select-none font-sans">
                      {item.category}
                    </span>

                    {/* Mobile/Tablet Category Pill & Animated Chevron */}
                    <div className="flex lg:hidden items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-saffron bg-saffron/10 border border-saffron/20 px-2 py-0.5 rounded-full font-sans hidden sm:inline-block">
                        {item.category}
                      </span>
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0",
                        isTapped ? "rotate-180 bg-saffron text-white shadow-sm" : "bg-black/5 text-slate-grey"
                      )}>
                        <ChevronDown size={13} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Visual Preview: Unfolds smoothly on Mobile / Tablet finger tap */}
                <div className={cn(
                  "overflow-hidden transition-all duration-500 ease-out lg:hidden w-full",
                  isTapped ? "max-h-[340px] opacity-100 mt-3.5 pb-1" : "max-h-0 opacity-0 mt-0"
                )}>
                  <div className="relative w-full h-[190px] sm:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden border border-saffron/20 shadow-lg bg-neutral-900">
                    {item.isVideo ? (
                      <video
                        src={getCDNUrl(item.video)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-white/15 text-white backdrop-blur-sm border border-white/20 font-sans">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold text-saffron uppercase tracking-widest font-heading">
                        {item.num}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Visual Portal Element (Desktop Cursor Follower) */}
      <div
        ref={portalRef}
        className="hidden lg:flex pointer-events-none fixed z-50 w-[380px] h-[250px] rounded-block overflow-hidden opacity-0 scale-75 shadow-2xl border-4 border-white bg-neutral-950 shadow-saffron/15 select-none items-center justify-center"
        style={{ left: 0, top: 0 }}
      >
        {HIGHLIGHTS.map((item, index) => {
          const isSelected = activeIdx === index;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none select-none ${
                isSelected ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.isVideo ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={getCDNUrl(item.video)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center pointer-events-none select-none"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
