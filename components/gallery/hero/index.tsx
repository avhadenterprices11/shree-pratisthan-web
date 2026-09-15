"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const IMAGES = [
  "/ganeshotsav_2017_jaipur.jpg",
  "/events_rajmudra_51ft.jpg",
  "/events_ganeshotsav_2023.jpg",
  "/dahihandi_2018.jpg",
];

export default function GalleryHero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Staggered curtain slide states
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    // Staggered curtain cycle transition loop
    const interval = setInterval(() => {
      const nextIndex = (currentIdx + 1) % IMAGES.length;
      setNextIdx(nextIndex);
      setIsTransitioning(true);

      // Transition takes 800ms + 300ms delay = 1100ms. Swap base at 1200ms
      setTimeout(() => {
        setCurrentIdx(nextIndex);
        setIsTransitioning(false);
      }, 1200);

    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [currentIdx]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-[88vh] flex items-center py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden bg-black"
    >
      {/* Base Background Image (Ken Burns Zoom) */}
      <div className="absolute inset-0 z-0 bg-neutral-900 overflow-hidden">
        <Image 
          src={IMAGES[currentIdx]} 
          alt="Gallery Showcase Base" 
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70 animate-ken-burns"
        />
      </div>

      {/* Staggered Curtain Slide Columns Overlay */}
      <div className="absolute inset-0 grid grid-cols-4 z-10 w-full h-full pointer-events-none overflow-hidden">
        {[0, 1, 2, 3].map((index) => {
          const delay = index * 100; // 100ms staggered delay
          return (
            <div 
              key={index}
              className="relative h-full overflow-hidden transition-transform ease-in-out bg-neutral-900"
              style={{
                transform: isTransitioning ? "translateY(0%)" : "translateY(-100%)",
                transitionDuration: "800ms",
                transitionDelay: `${delay}ms`
              }}
            >
              {/* Offset full-width image inside the 25%-wide curtain strip */}
              <img 
                src={IMAGES[nextIdx]}
                alt={`Curtain Pane ${index}`}
                className="absolute top-0 h-full object-cover max-w-none opacity-70"
                style={{
                  width: "400%",
                  left: `-${index * 100}%`
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Cinematic dark overlay gradient mask for high contrast text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 sm:via-black/55 to-black/30 z-15 pointer-events-none" />
      
      <div className="max-w-[1600px] w-full mx-auto relative z-20">
        {/* Left-aligned Text Overlay */}
        <div className="max-w-3xl space-y-4 sm:space-y-6 text-left">
          <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.3] sm:leading-[1.32] tracking-tight font-heading uppercase">
            <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-3 sm:py-4 -my-2 sm:-my-3">
              <span className="block reveal-line py-1">{t("galleryPage.hero.titleLine1")}</span>
            </div>
            <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-3 sm:py-4 -my-2 sm:-my-3">
              <span className="block reveal-line py-1 text-saffron text-outline-festive font-heading">{t("galleryPage.hero.titleLine2")}</span>
            </div>
          </h1>

          <p className="hero-subtitle text-base sm:text-base md:text-lg text-white/85 max-w-xl leading-[1.7] sm:leading-[1.75] font-sans font-normal [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
            {t("galleryPage.hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
