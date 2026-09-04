"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MISSION_PILLARS = [
  {
    title: "Action in Service",
    subtitle: "Community Welfare & Health",
    description: "Organizing regular blood donation drives, free health & diagnostic checkups, disaster relief, and youth empowerment initiatives across Indira Nagar and Nashik.",
    image: "/images/social-work.jpg",
    stats: [
      { label: "Blood Camps", val: "50+" },
      { label: "Active Members", val: "100+" },
    ]
  },
  {
    title: "Pride in Legacy",
    subtitle: "Cultural Heritage & Traditions",
    description: "Preserving Maharashtra's grand spiritual traditions through Gudipadwa Swagat Yatra, Shree Ganeshotsav, Navratri, Shiv Jayanti, and annual youth sports leagues.",
    image: "/images/ganesh.jpg",
    stats: [
      { label: "Years Legacy", val: "19+" },
      { label: "Founding Pillars", val: "20" },
    ]
  }
];

export default function AboutMission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
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
      className="relative py-24 px-6 md:px-12 xl:px-24 overflow-hidden bg-[#FFFDF9] border-t border-saffron/10"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Top title header */}
        <div className="mission-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-saffron/15">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-800 font-heading uppercase leading-none">
              Action in Service, Pride in Legacy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
            वारसा संस्कृतीचा, ध्यास समाजसेवेचा — Bringing families, youth, and citizens together through cultural celebrations, sports leagues, and public welfare.
          </p>
        </div>

        {/* Interactive Split Columns Grid */}
        <div className="mission-reveal flex flex-col lg:flex-row gap-6 w-full items-stretch">
          {MISSION_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={cn(
                "relative min-h-[420px] rounded-[2.5rem] border border-saffron/15 bg-white overflow-hidden flex flex-col justify-end p-8 sm:p-12 shadow-xl shadow-saffron/5 transition-all duration-700 ease-out cursor-default group",
                activeIdx === idx 
                  ? "w-full lg:w-[62%]" 
                  : activeIdx !== null 
                    ? "w-full lg:w-[38%]" 
                    : "w-full lg:w-[50%]"
              )}
            >
              {/* Pillar Image Background with hover scaling */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-[1.2s] ease-out"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              </div>

              {/* Pillar Content Overlay */}
              <div className="relative z-10 flex flex-col items-start gap-4 text-left">

                {/* Pillar Heading */}
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase leading-none drop-shadow-sm">
                  {pillar.title}
                </h3>

                {/* Pillar Paragraph */}
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg font-sans font-light drop-shadow-sm">
                  {pillar.description}
                </p>

                {/* Sub-stats Panel (Slides up smoothly on hover) */}
                <div 
                  className={cn(
                    "transition-all duration-700 ease-out overflow-hidden w-full",
                    activeIdx === idx ? "max-h-[150px] opacity-100 mt-4 border-t border-white/20 pt-4" : "max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  <div className="flex gap-8">
                    {pillar.stats.map((st, i) => (
                      <div key={i} className="flex flex-col items-start">
                        <span className="text-2xl font-black text-saffron leading-none font-heading mb-1">
                          {st.val}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-white/80 font-sans">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
