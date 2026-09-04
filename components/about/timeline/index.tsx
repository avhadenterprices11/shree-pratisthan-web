"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HISTORY = [
  {
    year: "2006",
    title: "Indira Nagar Cricket Spark",
    desc: "Started as a close circle of 20 friends playing cricket daily in Indira Nagar, deciding to channel their bond and energy into community service.",
  },
  {
    year: "2012",
    title: "Festival & Youth Expansion",
    desc: "Expanded into organizing grand cultural celebrations, including the iconic Gudipadwa Swagat Yatra, Ganeshotsav, and youth sports events in Nashik.",
  },
  {
    year: "2018",
    title: "Official Trust Registration",
    desc: "Formally registered as 'कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था इंदिरानगर नाशिक' (Reg: nashik/0000153/2018) under Adv. Shyam Dharmaraj Badode.",
  },
  {
    year: "2021",
    title: "Pandemic Relief & Health Drives",
    desc: "Organized urgent food grain distribution, medical support during lockdowns, and accelerated regular blood donation drives across Nashik.",
  },
  {
    year: "Present",
    title: "19+ Years Legacy & Leadership",
    desc: "Leading 100+ active members and 20 founding pillars, conducting 50+ health drives, major cultural yatras, and annual sports tournaments.",
  },
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row");
      
      rows.forEach((row) => {
        const fillYear = row.querySelector(".timeline-fill-year");
        const detail = row.querySelector(".timeline-detail-content");
        
        // 1. Scrub Clip-Path Liquid Fill on scroll
        if (fillYear) {
          gsap.fromTo(
            fillYear,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 80%", // Starts filling as row moves up from bottom
                end: "bottom 35%", // Completes fill near top
                scrub: true,
              }
            }
          );
        }

        // 2. Smooth Slide Reveal for details on enter
        if (detail) {
          gsap.fromTo(
            detail,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#FFFDF9] border-t border-saffron/10 z-10 select-none"
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

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-saffron/15 mb-16 relative z-10">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-800 font-heading uppercase leading-none">
              Trust History
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
            Our key operational milestones, reflecting direct social welfare impacts and structured organizational expansion.
          </p>
        </div>

        {/* Timeline Rows List */}
        <div className="max-w-5xl mx-auto flex flex-col gap-12 relative z-10">
          {HISTORY.map((item, index) => {
            return (
              <div 
                key={item.year}
                className="timeline-row w-full flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-b border-saffron/10 last:border-0 relative"
              >
                {/* Left Column: Giant Year outlines */}
                <div className="w-full md:w-5/12 relative select-none leading-none h-[90px] sm:h-[130px] flex items-center justify-start">
                  
                  {/* Outline Year Background */}
                  <div 
                    className="text-7xl sm:text-[8rem] font-black font-heading tracking-tighter leading-none"
                    style={{
                      WebkitTextStroke: "2px rgba(226, 106, 54, 0.15)",
                      color: "transparent",
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Saffron Filled Liquid Text layer */}
                  <div 
                    className="timeline-fill-year absolute left-0 text-7xl sm:text-[8rem] font-black text-saffron font-heading tracking-tighter leading-none"
                    style={{
                      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                      willChange: "clip-path",
                    }}
                  >
                    {item.year}
                  </div>

                </div>

                {/* Right Column: Title and details */}
                <div className="timeline-detail-content w-full md:w-7/12 flex flex-col items-start gap-3 text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-grey leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
