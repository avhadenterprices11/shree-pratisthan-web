"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedFestivals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // General section fade in
      gsap.fromTo(
        ".fest-section-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Disable on tablet/mobile screens

    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = ((e.clientX - rect.left) / rect.width) * 100;

    // Calculate dynamic clip path diagonals based on mouse X coordinate
    const topPct = gsap.utils.clamp(20, 80, xVal - 12);
    const bottomPct = gsap.utils.clamp(20, 80, xVal + 12);

    // Morphs dividing diagonal path
    gsap.to(".split-clip-target", {
      clipPath: `polygon(${topPct}% 0%, 100% 0%, 100% 100%, ${bottomPct}% 100%)`,
      duration: 0.5,
      ease: "power2.out",
    });

    // Opposite parallax shifts for depth
    const moveX = (e.clientX - rect.left - rect.width / 2) * 0.035;
    const moveY = (e.clientY - rect.top - rect.height / 2) * 0.035;

    gsap.to(".parallax-content-left", {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(".parallax-content-right", {
      x: -moveX,
      y: -moveY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset to default diagonal split values
    gsap.to(".split-clip-target", {
      clipPath: `polygon(38% 0%, 100% 0%, 100% 100%, 62% 100%)`,
      duration: 0.8,
      ease: "power3.out",
    });

    // Reset parallax text transforms
    gsap.to([".parallax-content-left", ".parallax-content-right"], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background w-full select-none border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 fest-section-reveal">
        {/* Section Heading & Subheading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Featured Festivals
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. Desktop Interface (Bright Theme Liquid Diagonal Masking Split) */}
        <div 
          className="hidden lg:block relative w-full h-[600px] bg-neutral-100 overflow-hidden cursor-default border border-black/5 rounded-block shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* L1 Pane: Ganeshotsav (Base layer - Left) */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/ganeshotsav_bright.png')" }}>
            {/* Very soft color filter, no heavy overlays blocking Ganesha details on the right */}
            <div className="absolute inset-0 bg-saffron/5 mix-blend-multiply z-0 pointer-events-none" />

            {/* Saffron Content Overlay - Floating Card on the Left */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 w-[42%] parallax-content-left select-none">
              <div className="glass-panel p-8 rounded-block bg-white/90 border border-white/50 backdrop-blur-md shadow-2xl space-y-5">
                <h3 className="text-2xl xl:text-3xl font-black text-neutral-900 font-heading leading-tight">
                  Shree Ganeshotsav &amp; Yatra
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  Our flagship 10-day celebration in Indira Nagar, Nashik. Uniting thousands of devotees with eco-friendly Shadu Mati idols, grand evening Maha Aarti, traditional Dhol Tasha recitals, and daily hygienic Maha Prasad.
                </p>
                
                <ul className="space-y-2.5 text-xs text-neutral-700 font-semibold font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    100% Eco-friendly Shadu Mati clay idol &amp; artificial tanks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    Daily 108-lamp Maha Aarti &amp; cultural youth drama
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    100+ active volunteer marshals on crowd duty
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="/event-booking"
                    className="w-full text-center inline-block bg-saffron hover:bg-saffron/90 text-white font-extrabold py-3 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-saffron/20 transition-transform hover:scale-105"
                  >
                    Get Ganeshotsav Aarti Pass
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* L2 Pane: Sports & Cricket (Overlay layer - Right, clipped diagonally) */}
          <div 
            className="split-clip-target absolute inset-0 w-full h-full bg-cover bg-center z-20 transition-all"
            style={{ 
              backgroundImage: "url('/dahihandi_bright.png')",
              clipPath: "polygon(38% 0%, 100% 0%, 100% 100%, 62% 100%)" 
            }}
          >
            {/* Very soft color filter */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-multiply z-0 pointer-events-none" />

            {/* Sports Content Overlay - Floating Card on the Right */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10 w-[42%] parallax-content-right select-none">
              <div className="glass-panel p-8 rounded-block bg-white/90 border border-white/50 backdrop-blur-md shadow-2xl space-y-5">
                <h3 className="text-2xl xl:text-3xl font-black text-neutral-900 font-heading leading-tight">
                  Sports &amp; Cricket Leagues
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  Honoring our 2006 founding roots where 20 cricket friends united for social service. Premier annual tennis-ball cricket tournaments and youth athletics in Indira Nagar, Nashik with grand championship trophies.
                </p>
                
                <ul className="space-y-2.5 text-xs text-neutral-700 font-semibold font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    32 participating youth cricket teams across Nashik
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    ₹1,50,000 championship awards &amp; individual honors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    On-site sports medical and physiotherapy care
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="/event-booking"
                    className="w-full text-center inline-block bg-neutral-900 hover:bg-saffron hover:text-white text-white font-extrabold py-3 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-neutral-900/10 transition-transform hover:scale-105"
                  >
                    Register Cricket Team / Athlete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mobile & Tablet Interface (Stacked Cards Grid Layout - Bright Theme) */}
        <div className="block lg:hidden space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Ganeshotsav */}
            <div 
              className="relative p-6 sm:p-8 rounded-block overflow-hidden min-h-[460px] flex flex-col justify-between bg-cover bg-center border border-black/5 shadow-lg"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.95)), url('/ganeshotsav_bright.png')" }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-neutral-900 font-heading">
                  Shree Ganeshotsav &amp; Yatra
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  Our flagship 10-day celebration in Indira Nagar, Nashik with eco-friendly Shadu Mati clay idols, daily grand Maha Aarti, and traditional Dhol Tasha parades.
                </p>
                
                <ul className="space-y-2 text-xs text-neutral-700 font-semibold font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    100% Eco-friendly Shadu Mati clay idol &amp; artificial tanks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    Daily 108-lamp Maha Aarti &amp; cultural youth drama
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="/event-booking"
                  className="w-full inline-block text-center bg-saffron hover:bg-saffron/90 text-white font-extrabold py-3.5 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-saffron/15"
                >
                  Get Ganeshotsav Pass
                </a>
              </div>
            </div>

            {/* Card 2: Sports & Cricket */}
            <div 
              className="relative p-6 sm:p-8 rounded-block overflow-hidden min-h-[460px] flex flex-col justify-between bg-cover bg-center border border-black/5 shadow-lg"
              style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.95)), url('/dahihandi_bright.png')" }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-neutral-900 font-heading">
                  Sports &amp; Cricket Leagues
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                  Honoring our 2006 cricket roots. Premier annual tennis-ball cricket championship with 32 teams and youth athletics in Indira Nagar, Nashik.
                </p>
                
                <ul className="space-y-2 text-xs text-neutral-700 font-semibold font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    32 participating youth cricket teams across Nashik
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    ₹1,50,000 championship awards &amp; trophies
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="/event-booking"
                  className="w-full inline-block text-center bg-neutral-900 hover:bg-saffron hover:text-white text-white font-extrabold py-3.5 rounded-full text-[10px] uppercase tracking-widest shadow-md shadow-neutral-900/15"
                >
                  Register Cricket Team
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
