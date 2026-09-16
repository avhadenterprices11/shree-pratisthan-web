"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Newspaper, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import gsap from "gsap";

export default function PressHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent"
    >
      {/* Subtle ambient lighting layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/10 border border-saffron/25 text-saffron font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHREE PRATISTHAN • MEDIA</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-heading font-normal tracking-tight text-neutral-900 dark:text-neutral-50 uppercase leading-[0.95] sm:leading-[0.92]"
            >
              Press <span className="text-saffron">&amp;</span> Releases
            </h1>

            {/* Supporting Copy */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Official updates, community stories, event highlights and media information from Shree Pratisthan. Documenting our cultural heritage and social welfare initiatives across Indira Nagar, Nashik.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-saffron shrink-0" />
                <span>Govt Reg: nashik/0000153/2018</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-400" />
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-gold shrink-0" />
                <span>Official Newsroom &amp; Press Desk</span>
              </div>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection("featured-release")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] shadow-lg shadow-saffron/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer font-sans"
              >
                <span>View Latest Release</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection("press-archive")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 border border-neutral-300 dark:border-white/15 text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer font-sans"
              >
                <span>Explore Archive</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Layered Editorial Cards Motif */}
          <div ref={visualRef} className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Newsprint Card Base Layer (Layer 1) */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] sm:aspect-[3/4]">
              {/* Decorative back layer */}
              <div className="absolute inset-0 -rotate-3 scale-[0.97] rounded-2xl sm:rounded-block bg-neutral-200/70 dark:bg-white/[0.04] border border-neutral-300/60 dark:border-white/10 shadow-xl pointer-events-none" />

              {/* Main front editorial card */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-block overflow-hidden bg-white/90 dark:bg-[#121214] border border-neutral-200 dark:border-white/15 shadow-2xl p-5 sm:p-7 flex flex-col justify-between backdrop-blur-xl">
                
                {/* Header Gazette Stamp */}
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-saffron/30">
                      <Image
                        src="/logo.png"
                        alt="Shree Pratisthan Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-heading">
                        SHREE PRATISTHAN
                      </p>
                      <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-sans">
                        OFFICIAL MEDIA DESK
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-saffron/10 text-saffron font-bold">
                    VOL. 2024
                  </span>
                </div>

                {/* Imagery Preview */}
                <div className="relative my-4 aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-sm bg-neutral-900">
                  <Image
                    src="/events_ganeshotsav_2024_jejuri.jpg"
                    alt="Latest Release Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-saffron border border-saffron/30">
                    FEATURED STORY
                  </div>
                </div>

                {/* Card Story Excerpt */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-saffron font-sans">
                    LATEST COMMUNIQUE
                  </p>
                  <h3 className="text-sm sm:text-base font-heading font-medium tracking-tight text-neutral-900 dark:text-white line-clamp-2">
                    Shree Ganeshotsav 2024 concludes with historic Jejuri Gad replica in Indira Nagar
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans line-clamp-2">
                    Ten days of devotion, cultural unity, and over 75,000 devotees in attendance.
                  </p>
                </div>

                {/* Footer Stamp */}
                <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-[9px] text-neutral-400 dark:text-neutral-500 font-sans">
                  <span>Indira Nagar, Nashik</span>
                  <span className="font-mono text-saffron">VERIFIED • OFFICIAL</span>
                </div>
              </div>

              {/* Floating Accent Pill */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 px-4 py-2 rounded-full bg-neutral-900 dark:bg-[#1D1D20] text-white border border-saffron/30 shadow-2xl flex items-center gap-2 text-xs font-medium backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                <span>19+ Years of Trusted Seva</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
