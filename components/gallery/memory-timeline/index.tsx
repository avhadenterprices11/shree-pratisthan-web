"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGS = [
  { year: "2006", title: "Daily Cricket Spark & Brotherhood", desc: "20 childhood friends playing daily cricket in Indira Nagar unite to channel sports camaraderie into community welfare.", emoji: "🏏" },
  { year: "2012", title: "First Gudipadwa Swagat Yatra", desc: "Establishing the iconic Marathi New Year cultural procession with Lezim and Dhol Tasha across Indira Nagar.", emoji: "🚩" },
  { year: "2018", title: "Official Trust Registration", desc: "Formally registered as 'कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था' (Reg: nashik/0000153/2018) under Adv. Shyam Badode.", emoji: "📜" },
  { year: "2026", title: "19+ Years Seva & 50+ Blood Drives", desc: "Celebrating 19+ years of continuous social impact, 50+ blood donation camps, and active youth leadership across Nashik.", emoji: "🩸" },
];

export default function MemoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return;

    const ctx = gsap.context(() => {
      // Connect timeline progress line to scroll position
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Stagger timeline node reveals
      gsap.fromTo(
        ".mem-timeline-node",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Milestones</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Archival Timeline
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Core */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
            <div 
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-b from-saffron to-gold origin-top scale-y-0"
            />
          </div>

          <div className="space-y-16">
            {LOGS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className="mem-timeline-node flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Saffron bullet */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-saffron -translate-x-1/2 z-10" />

                  {/* Left block */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:px-12 ${isEven ? "md:order-1 md:text-right" : "md:order-2 md:text-left"}`}>
                    <div className="glass-panel p-6 rounded-block">
                      <span className="text-xs font-bold text-saffron uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-xl font-extrabold text-foreground mt-1 mb-2 font-heading flex items-center justify-start md:justify-end gap-2">
                        {!isEven && <span className="text-2xl">{item.emoji}</span>}
                        {item.title}
                        {isEven && <span className="text-2xl">{item.emoji}</span>}
                      </h3>
                      <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className={`hidden md:block w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
