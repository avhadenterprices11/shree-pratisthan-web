"use client";

import React, { useEffect, useRef } from "react";
import { getCDNUrl } from "@/lib/cdn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !portalRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Entrance timeline on load
      const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      gsap.set(".reveal-char", { y: 60, rotateX: 45, opacity: 0 });
      gsap.set(".left-desc, .right-desc, .portal-video-frame", { opacity: 0, scale: 0.95 });

      entryTl
        .to(".portal-video-frame", { opacity: 1, scale: 1, duration: 1.0 })
        .to(".reveal-char", { y: 0, rotateX: 0, opacity: 1, stagger: 0.03, duration: 0.8 }, "-=0.7")
        .to(".left-desc, .right-desc", { opacity: 1, scale: 1, duration: 0.6 }, "-=0.5");

      // 2. Desktop Zoom Timeline
      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=900",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          }
        });

        scrollTl
          .to(portalRef.current, {
            scale: 3.8,
            borderRadius: "0.5rem",
            boxShadow: "none",
            ease: "power2.inOut",
          }, 0)
          .to(".left-text-wrapper", {
            xPercent: -130,
            opacity: 0,
            ease: "power1.inOut",
          }, 0)
          .to(".right-text-wrapper", {
            xPercent: 130,
            opacity: 0,
            ease: "power1.inOut",
          }, 0)
          .to(".hero-gradient-bg", {
            opacity: 0,
            ease: "power1.inOut",
          }, 0)
          .fromTo(".overlay-content", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.2"
          );
      });

      // 3. Mobile Zoom Timeline
      mm.add("(max-width: 767px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=650",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          }
        });

        scrollTl
          .to(portalRef.current, {
            scale: 2.3,
            borderRadius: "0.5rem",
            boxShadow: "none",
            ease: "power2.inOut",
          }, 0)
          .to(".left-text-wrapper, .right-text-wrapper", {
            opacity: 0,
            y: -20,
            ease: "power1.inOut",
          }, 0)
          .to(".hero-gradient-bg", {
            opacity: 0,
            ease: "power1.inOut",
          }, 0)
          .fromTo(".overlay-content", 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
      });
    }, containerRef);

    // Refresh ScrollTrigger to ensure clean geometry calculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const TITLE_WORD_1 = t("aboutPage.hero.word1");
  const TITLE_WORD_2 = t("aboutPage.hero.word2");

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[150vh] bg-saffron overflow-hidden select-none"
    >
      {/* Pinned Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        {/* 1. Fast GPU CSS Mesh Gradient Background */}
        <div className="hero-gradient-bg absolute inset-0 z-0 pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E26A36] via-[#D95B25] to-[#B84013]" />
          <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gold/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        </div>

        {/* 2. Grid Lines overlay */}
        <div 
          className="hero-gradient-bg absolute inset-0 pointer-events-none opacity-15 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />

        {/* 3. Left Editorial Text Panel */}
        <div className="left-text-wrapper absolute top-16 sm:top-auto left-4 sm:left-6 lg:left-8 z-20 flex flex-col items-start gap-1.5 sm:gap-5 max-w-[155px] sm:max-w-xs md:max-w-sm pointer-events-none will-change-transform">
          <div className="hero-badge inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] px-2.5 sm:px-4.5 py-1 sm:py-2 rounded-full border border-white/25 shadow-sm backdrop-blur-md font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{t("aboutPage.hero.badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-[48px] font-normal text-white leading-[1.25] tracking-tight font-heading uppercase flex gap-0.5 sm:gap-1 py-1">
            {TITLE_WORD_1}
          </h2>

          <p className="left-desc text-white/90 text-sm sm:text-base md:text-lg font-sans font-normal leading-[1.6] sm:leading-[1.75]">
            {t("aboutPage.hero.leftDesc")}
          </p>
        </div>

        {/* 4. Right Editorial Text Panel */}
        <div className="right-text-wrapper absolute bottom-10 sm:bottom-auto right-4 sm:right-6 lg:right-8 z-20 flex flex-col items-end text-right gap-1.5 sm:gap-5 max-w-[155px] sm:max-w-xs md:max-w-sm pointer-events-none will-change-transform">
          
          <h2 className="text-2xl sm:text-4xl md:text-[48px] font-normal text-white leading-[1.25] tracking-tight font-heading uppercase flex gap-0.5 sm:gap-1 py-1">
            {TITLE_WORD_2}
          </h2>

          <div className="right-desc text-white/80 text-xs sm:text-sm uppercase font-bold tracking-[0.16em] sm:tracking-[0.18em] leading-relaxed border-t border-white/20 pt-2 sm:pt-4 flex flex-col gap-0.5 sm:gap-1 font-sans">
            <span>{t("aboutPage.hero.bullet1")}</span>
            <span>{t("aboutPage.hero.bullet2")}</span>
            <span>{t("aboutPage.hero.bullet3")}</span>
          </div>
        </div>

        {/* 5. Center Zoom Square Video Portal */}
        <div
          ref={portalRef}
          className="portal-video-frame absolute w-[135px] sm:w-[280px] md:w-[360px] aspect-square overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.25)] z-30 bg-saffron will-change-transform"
        >
          {/* Internal Border Trim */}
          <div className="absolute inset-0 border border-white/20 rounded-2xl sm:rounded-[2.5rem] pointer-events-none z-20" />
          
          <video
            className="absolute inset-0 w-full h-full object-cover scale-105"
            src={getCDNUrl("/shri_pratisthan.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-saffron/50 via-transparent to-transparent z-10" />
        </div>

        {/* 6. Cinematic Editorial Overlay (fades in when portal zooms full bleed) */}
        <div className="overlay-content absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none bg-saffron/95 backdrop-blur-md">
          
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 bg-white/20 text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/30 shadow-lg backdrop-blur-md font-sans">
            <span>{t("aboutPage.hero.pillTitle")}</span>
          </div>

          <h2 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.1] font-heading uppercase max-w-4xl mb-4 sm:mb-6 tracking-tight">
            {t("aboutPage.hero.sloganPart1")} <br className="hidden sm:inline" />
            <span className="text-amber-100 font-heading">{t("aboutPage.hero.sloganPart2")}</span>
          </h2>
          
          <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl font-normal font-sans leading-[1.75]">
            {t("aboutPage.hero.overlayDesc")}
          </p>

        </div>

      </div>
    </section>
  );
}
