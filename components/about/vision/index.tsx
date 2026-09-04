"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutVision() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-wipe",
        { 
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          opacity: 0,
          y: 20 
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center py-28 px-6 md:px-12 xl:px-24 overflow-hidden bg-[#FFFDF9] border-t border-saffron/10"
    >
      {/* 1. Subtle Ambient Heritage Glow */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5 z-0" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-16 opacity-5 z-0" />

      {/* 2. Layout Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* 3. Content Grid Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Tag & Header */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">

          <h2 className="reveal-wipe text-4xl sm:text-6xl font-black text-slate-800 leading-[0.98] tracking-tighter uppercase font-heading">
            Our Vision <br />
            & Social <br />
            <span className="text-saffron">Commitment.</span>
          </h2>
          <div className="reveal-wipe w-16 h-1 bg-saffron mt-6 rounded-full" />
        </div>

        {/* Right Side: High-legibility Text */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 max-w-3xl">
          
          <div className="reveal-wipe overflow-hidden">
            <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed font-sans font-light tracking-tight">
              &ldquo;एक एकजूट, सक्रिय आणि सामाजिकदृष्ट्या जबाबदार समाज घडवणे, जिथे सर्व नागरिक एकत्र येऊन संस्कृती व परंपरा जपतील आणि समाजाच्या सर्वांगीण विकासासाठी योगदान देतील.&rdquo;
            </p>
          </div>

          <div className="reveal-wipe overflow-hidden border-t border-saffron/15 pt-6 mt-2">
            <p className="text-sm sm:text-base text-slate-grey leading-relaxed font-sans font-light">
              To build a united, active, and socially responsible community where people come together to celebrate culture, support one another, encourage youth participation, and contribute towards the overall development and well-being of society.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
