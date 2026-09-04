"use client";

import React, { useEffect, useRef } from "react";
import { getCDNUrl } from "@/lib/cdn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !portalRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline on load
      const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      gsap.set(".reveal-char", { y: 120, rotateX: 60, opacity: 0 });
      gsap.set(".left-desc, .right-desc, .portal-video-frame", { opacity: 0, scale: 0.95 });

      entryTl
        .to(".portal-video-frame", { opacity: 1, scale: 1, duration: 1.2 })
        .to(".reveal-char", { y: 0, rotateX: 0, opacity: 1, stagger: 0.03, duration: 1.0 }, "-=0.9")
        .to(".left-desc, .right-desc", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.7");

      // 2. GPU-Accelerated Scroll-controlled Portal Zoom Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=900",
          pin: true,
          scrub: 0.5, // Ultra smooth responsive scrub without lag
          anticipatePin: 1,
        }
      });

      scrollTl
        // GPU scale zoom instead of width/height layout reflow
        .to(portalRef.current, {
          scale: 3.8,
          borderRadius: "0.5rem",
          boxShadow: "none",
          ease: "power2.inOut",
        }, 0)
        // Move the left-side text out of screen
        .to(".left-text-wrapper", {
          xPercent: -130,
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Move the right-side text out of screen
        .to(".right-text-wrapper", {
          xPercent: 130,
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Fade out gradient background overlay
        .to(".hero-gradient-bg", {
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Fade in full screen editorial content overlay
        .fromTo(".overlay-content", 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
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

  const TITLE_WORD_1 = "OUR";
  const TITLE_WORD_2 = "LEGACY";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[150vh] bg-saffron overflow-hidden select-none"
    >
      {/* Pinned Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        {/* 1. Fast GPU CSS Mesh Gradient Background */}
        <div className="hero-gradient-bg absolute inset-0 z-0 pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E26A36] via-[#D95B25] to-[#B84013]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* 2. Grid Lines overlay */}
        <div 
          className="hero-gradient-bg absolute inset-0 pointer-events-none opacity-15 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />

        {/* 3. Left Editorial Text Panel */}
        <div className="left-text-wrapper absolute left-4 sm:left-6 lg:left-8 z-20 flex flex-col items-start gap-5 max-w-xs md:max-w-sm pointer-events-none will-change-transform">
          <div className="hero-badge inline-flex items-center gap-2 bg-white/15 text-white font-bold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-white/25 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Foundations</span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter font-heading uppercase flex gap-1">
            {TITLE_WORD_1.split("").map((char, i) => (
              <span key={i} className="reveal-char inline-block cursor-default">{char}</span>
            ))}
          </h2>

          <p className="left-desc text-white/90 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Preserving cultural roots while building youth-led community progress in Indira Nagar, Nashik. Estd 2006.
          </p>
        </div>

        {/* 4. Right Editorial Text Panel */}
        <div className="right-text-wrapper absolute right-4 sm:right-6 lg:right-8 z-20 flex flex-col items-end text-right gap-5 max-w-xs md:max-w-sm pointer-events-none will-change-transform">
          
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter font-heading uppercase flex gap-1">
            {TITLE_WORD_2.split("").map((char, i) => (
              <span key={i} className="reveal-char inline-block cursor-default">{char}</span>
            ))}
          </h2>

          <div className="right-desc text-white/80 text-[10px] uppercase font-bold tracking-widest leading-relaxed border-t border-white/20 pt-4 flex flex-col gap-1">
            <span>✦ Estd 2006 Indira Nagar, Nashik</span>
            <span>✦ 100+ Active Members & 20 Founders</span>
            <span>✦ 50+ Health & Blood Donation Camps</span>
          </div>
        </div>

        {/* 5. Center Zoom Square Video Portal */}
        <div
          ref={portalRef}
          className="portal-video-frame absolute w-[280px] sm:w-[360px] aspect-square overflow-hidden rounded-[2.5rem] border border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.25)] z-30 bg-saffron will-change-transform"
        >
          {/* Internal Border Trim */}
          <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] pointer-events-none z-20" />
          
          <video
            className="absolute inset-0 w-full h-full object-cover scale-105"
            src={getCDNUrl("/Create_a_cinematic_second_h.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-saffron/50 via-transparent to-transparent z-10" />
        </div>

        {/* 6. Cinematic Editorial Overlay (fades in when portal zooms full bleed) */}
        <div className="overlay-content absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none bg-saffron/95 backdrop-blur-md">
          
          <div className="inline-flex items-center gap-2 mb-6 bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-white/30 shadow-lg backdrop-blur-md">
            <span>Shree Pratishtan (श्री प्रतिष्ठान)</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] font-heading uppercase max-w-4xl mb-6 tracking-tighter">
            वारसा संस्कृतीचा <br className="hidden sm:inline" />
            <span className="text-amber-100">ध्यास समाजसेवेचा</span>
          </h2>
          
          <p className="text-white/90 text-sm sm:text-base max-w-xl font-light font-sans leading-relaxed">
            From a circle of friends playing daily cricket in Indira Nagar in 2006 to a formally registered trust with 100+ active members and 20 founding pillars, uniting Nashik through culture, health camps, and social service.
          </p>

        </div>

      </div>
    </section>
  );
}
