"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

const HERO_SLIDES = [
  { id: 1, title: "Cultural Festivals", image: "/ganeshotsav_backdrop.png" },
  { id: 2, title: "Annual Cricket Leagues", image: "/hero_dahihandi.png" },
  { id: 3, title: "50+ Blood Donation Drives", image: "/volunteer_medical.png" },
  { id: 4, title: "Gudipadwa Swagat Yatra", image: "/gallery_dhol_tasha_camps.png" },
];

export default function AllEventsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-28 pb-12 overflow-hidden select-none bg-[#FBFBFA] text-neutral-900"
    >
      {/* Background Visual Backdrop Slider - 100% Full Clarity & Vivid Detail */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FBFBFA]">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Minimal gradient at edges for seamless transition without hiding image */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBFBFA]/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto space-y-6 flex flex-col items-center">
        {/* Animated Badge Tag */}
        <div className="hero-title-reveal inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 border border-saffron/40 text-saffron font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-saffron animate-spin-slow-badge" />
          Shree Pratishtan Events Hub
        </div>

        {/* Bright Headline: CELEBRATING TRADITIONS */}
        <h1 className="hero-title-reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight uppercase leading-[0.95] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
          <span className="text-saffron text-outline-festive font-heading block">
            CELEBRATING TRADITIONS
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-title-reveal text-base sm:text-xl text-neutral-950 max-w-3xl leading-relaxed font-bold bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/90 shadow-lg">
          Explore our complete lineup of cultural celebrations, Gudipadwa Swagat Yatra, Shree Ganeshotsav, 50+ blood donation camps, and annual sports tournaments in Indira Nagar, Nashik.
        </p>
      </div>
    </section>
  );
}
