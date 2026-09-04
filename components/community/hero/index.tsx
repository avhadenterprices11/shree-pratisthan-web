"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CommunityHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ── CURSOR MOUSEMOVE LOGIC ──
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursorRef.current && cursorRingRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power2.out",
        });

        gsap.to(cursorRingRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ── GSAP SCROLLTRIGGER ANIMATION ──
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#wrapper",
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to("#heroImg", { scale: 1.3, ease: "none" })
        .to("#bgPlasma", { opacity: 0.8 }, 0);

      // Simple reveal line stagger on load
      gsap.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power4.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      );
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert(); 
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#FBFBFA]">
      {/* Custom Cursor Followers (Desktop Only) */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 bg-saffron rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorRingRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-saffron rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Pinned Section Wrapper */}
      <div 
        id="wrapper" 
        className="relative w-full h-[90vh] overflow-hidden flex flex-col justify-center items-center py-20 px-6 md:px-12 text-left"
      >
        {/* Plasma Background Overlay Layer */}
        <div 
          id="bgPlasma" 
          className="absolute inset-0 bg-[#FBFBFA] opacity-0 pointer-events-none z-10 transition-opacity duration-300" 
        />
        
        {/* Background Image Container */}
        <div id="imgContainer" className="absolute inset-0 z-0 overflow-hidden w-full h-full">
          <Image
            src="/community_assembly.png"
            alt="Community Hero Background"
            id="heroImg"
            fill
            priority
            sizes="100vw"
            className="object-cover filter brightness-100 scale-100"
          />
        </div>

        {/* Content Overlay (Z-20) */}
        <div className="max-w-[1600px] w-full mx-auto relative z-20 flex flex-col justify-start text-left pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.05] tracking-tight mb-6 font-heading [text-shadow:_0_2px_4px_rgba(255,255,255,0.8)]">
              <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
                <span className="block reveal-line">Unity in Action,</span>
              </div>
              <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
                <span className="block reveal-line text-saffron text-outline-festive">Strength in Community.</span>
              </div>
            </h1>

            <p className="hero-subtitle text-base sm:text-lg text-neutral-800 leading-relaxed font-semibold [text-shadow:_0_1.5px_3px_rgba(255,255,255,0.9)]">
              Shree Pratishtan (श्री प्रतिष्ठान) unites citizens, youth, and organizers in Indira Nagar, Nashik to drive 50+ blood donation drives, free health diagnostics, tree plantation, and welfare campaigns under the motto &ldquo;वारसा संस्कृतीचा, ध्यास समाजसेवेचा&rdquo;.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
