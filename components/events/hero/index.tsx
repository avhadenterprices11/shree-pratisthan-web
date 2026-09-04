"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const slidesData: SlideItem[] = [
  {
    id: 1,
    title: "Ganeshotsav & Swagat Yatra",
    image: "/gallery_ganeshotsav_aarthi.png",
  },
  {
    id: 2,
    title: "50+ Blood Camps & Healthcare",
    image: "/volunteer_medical.png",
  },
  {
    id: 3,
    title: "Annual Sports & Youth Leagues",
    image: "/hero_dahihandi.png",
  }
];

export default function EventsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      ).fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const nextIndex = (currentIndex + 1) % slidesData.length;

    // Smooth Curtain Wipe Fade Animation
    const activeSlide = document.querySelector(`.hero-slide-${currentIndex}`);
    const nextSlide = document.querySelector(`.hero-slide-${nextIndex}`);

    if (activeSlide && nextSlide) {
      gsap.timeline({
        onComplete: () => {
          setCurrentIndex(nextIndex);
          isAnimating.current = false;
        },
      })
      .fromTo(
        nextSlide,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0.5 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 0.9, ease: "power3.inOut" }
      )
      .to(activeSlide, { opacity: 0, duration: 0.5 }, "-=0.7");
    } else {
      setCurrentIndex(nextIndex);
      isAnimating.current = false;
    }
  }, [currentIndex]);

  // Automatic slide changing transition within 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex flex-col justify-center items-start pt-28 pb-12 px-6 overflow-hidden md:px-12 bg-[#FBFBFA]"
    >
      {/* Fullscreen Slider Backdrop Container - 100% Sharp & Vivid */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FBFBFA]">
        <div className="relative w-full h-full">
          {slidesData.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`hero-slide-${index} absolute inset-0 transition-all duration-700 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Campaign Visual backdrop (Fully Visible & Clear) */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Soft edge gradient for crisp visibility */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBFBFA]/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Overlaid Page Header */}
      <div className="max-w-[1600px] w-full mx-auto relative z-20 flex flex-col justify-start text-left pointer-events-none">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-950 leading-[1.05] tracking-tight mb-6 font-heading pointer-events-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
          <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
            <span className="block reveal-line">Festivals &</span>
          </div>
          <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
            <span className="block reveal-line text-saffron text-outline-festive">Social Campaigns.</span>
          </div>
        </h1>

        <p className="hero-subtitle text-base sm:text-lg text-neutral-950 max-w-2xl leading-relaxed font-bold bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/90 shadow-lg pointer-events-auto">
          "वारसा संस्कृतीचा, ध्यास समाजसेवेचा" — Discover upcoming grand festivals, 50+ blood camps, and sports leagues organized by Shree Pratishtan in Indira Nagar, Nashik.
        </p>
      </div>
    </section>
  );
}
