"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const IMAGES = [
  "/gallery_ganeshotsav_aarthi.png",
  "/gallery_dahi_handi_pyramids.png",
  "/gallery_navratri_garba.png",
  "/gallery_shiv_jayanti_rally.png",
];

export default function GalleryHero() {
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
      className="relative min-h-[88vh] flex items-center py-28 md:py-36 px-6 md:px-12 overflow-hidden bg-black"
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/25 z-15 pointer-events-none" />
      
      <div className="max-w-[1600px] w-full mx-auto relative z-20">
        {/* Left-aligned Text Overlay */}
        <div className="max-w-3xl space-y-6 text-left">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight font-heading">
            <div className="overflow-hidden">
              <span className="block reveal-line">Immersive</span>
            </div>
            <div className="overflow-hidden">
              <span className="block reveal-line text-saffron text-outline-festive">Media Gallery.</span>
            </div>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
            Explore photographic records and video reels of our 19+ years legacy: cultural festivals, Gudipadwa Swagat Yatra, 50+ blood donation camps, and youth sports in Indira Nagar, Nashik.
          </p>
        </div>
      </div>
    </section>
  );
}
