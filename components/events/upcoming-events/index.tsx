"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UpcomingItem {
  day: string;
  month: string;
  time: string;
  title: string;
  location: string;
  category: string;
  colorClass: string;
}

const UPCOMING: UpcomingItem[] = [
  {
    day: "27",
    month: "AUG",
    time: "6:00 AM - 11:00 PM Daily",
    title: "Shree Ganeshotsav 2026 (श्री गणेशोत्सव)",
    location: "Indira Nagar Ground, Nashik",
    category: "Cultural Festival",
    colorClass: "bg-saffron/10 text-saffron border border-saffron/20",
  },
  {
    day: "30",
    month: "AUG",
    time: "8:00 AM - 4:00 PM",
    title: "Bhavya Blood Donation & Health Camp",
    location: "Indira Nagar Community Hall, Nashik",
    category: "Healthcare & Life Drive",
    colorClass: "bg-red-50 text-red-600 border border-red-200/50",
  },
];

export default function UpcomingEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal agenda cards
      gsap.fromTo(
        ".upcoming-agenda-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      {/* Hardware-accelerated transitions for text outlines */}
      <style>{`
        .text-outline-date {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.35);
          color: transparent;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .text-outline-date {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Immediate Initiatives
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Typographic Agenda Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {UPCOMING.map((item, index) => (
            <div 
              key={index}
              className="upcoming-agenda-card group relative glass-panel p-8 sm:p-10 rounded-block bg-white border border-black/5 hover:border-saffron/20 hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start cursor-pointer select-none overflow-hidden min-h-[240px]"
              onClick={() => {
                const regForm = document.getElementById("register");
                if (regForm) {
                  regForm.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {/* Background scale vertical shutter accent */}
              <div className="absolute inset-0 bg-saffron/5 rounded-block scale-y-90 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 origin-bottom z-0" />

              {/* Date stamp column */}
              <div className="relative z-10 flex flex-col items-center justify-center shrink-0 min-w-[70px]">
                <span className="text-6xl sm:text-7xl font-extrabold text-outline-date tracking-tighter leading-none block">
                  {item.day}
                </span>
                <span className="text-xs font-black tracking-widest text-slate-grey mt-2 block select-none uppercase">
                  {item.month}
                </span>
              </div>

              {/* Content description column */}
              <div className="relative z-10 flex-1 flex flex-col justify-between h-full text-left">
                <div>
                  {/* Category */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded ${item.colorClass}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 group-hover:text-saffron transition-colors duration-300 font-heading mb-4 leading-snug">
                    {item.title}
                  </h3>

                  {/* Time & Location details */}
                  <div className="space-y-2 text-xs text-slate-grey font-semibold font-sans">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-saffron stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Floating Arrow CTA */}
                <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-saffron font-heading group-hover:border-saffron/10">
                  <span>Register to Attend</span>
                  <span className="text-base transform transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
