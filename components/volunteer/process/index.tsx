"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StageItem {
  step: string;
  title: string;
  desc: string;
}

const STAGES: StageItem[] = [
  {
    step: "01",
    title: "Online Registration",
    desc: "Submit your basic contact details, area of interest, and availability in the registration form below.",
  },
  {
    step: "02",
    title: "Team Connection",
    desc: "Our Indira Nagar community leads connect with you to discuss upcoming festivals, sports leagues, or health drives.",
  },
  {
    step: "03",
    title: "Orientation & Briefing",
    desc: "Join a short briefing with our 100+ member team outlining event roles, safety parameters, and coordination guidelines.",
  },
  {
    step: "04",
    title: "Active Event Deployment",
    desc: "Report to your designated initiative (Swagat Yatra, Ganeshotsav, blood donation camps, or cricket leagues) and lead the action.",
  },
];

// Exact coordinates along quadratic curve M 50 30 Q 180 180 50 330
const ARC_NODE_POSITIONS = [
  { left: 40, top: 25 },
  { left: 110, top: 120 },
  { left: 110, top: 220 },
  { left: 40, top: 315 },
];

export default function VolunteerProcess() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollTriggerInstance = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop viewports: Pinned Scroll-Scrubbed Arc Stepper
    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: "#processPinContainer",
        start: "top top",
        end: "+=120%",
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * STAGES.length),
            STAGES.length - 1
          );
          if (index !== activeIdxRef.current) {
            activeIdxRef.current = index;
            setActiveIdx(index);
          }
        },
      });

      scrollTriggerInstance.current = trigger;
    });

    // Mobile fallback
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".process-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  // Micro fade-and-slide up animation when activeIdx switches
  useEffect(() => {
    if (!detailsRef.current) return;
    
    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeIdx]);

  const handleStepClick = (idx: number) => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && scrollTriggerInstance.current) {
      const start = scrollTriggerInstance.current.start;
      const end = scrollTriggerInstance.current.end;
      const progress = idx / (STAGES.length - 1);
      const scrollPos = start + (end - start) * progress;
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <div 
      id="processPinContainer" 
      ref={containerRef} 
      className="bg-background relative w-full md:h-screen md:min-h-screen flex flex-col justify-center overflow-hidden select-none"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="relative z-10 w-full flex flex-col justify-center py-16 md:py-0 process-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Our Onboarding Process
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Arc Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 max-w-6xl mx-auto w-full">
          
          {/* Left Column: Visual Arc Track */}
          <div className="hidden md:col-span-5 md:flex items-center justify-center relative h-[360px] w-full max-w-[280px] mx-auto">
            
            {/* SVG Arc Curved Path */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 240 360"
            >
              {/* Background Dashed Arc Track */}
              <path 
                d="M 50 30 Q 170 180 50 330" 
                fill="none" 
                stroke="#E26A36" 
                strokeOpacity="0.25" 
                strokeWidth="2.5" 
                strokeDasharray="6 6" 
              />
              {/* Active Segment Solid Arc Accent */}
              <path 
                d="M 50 30 Q 170 180 50 330" 
                fill="none" 
                stroke="#E26A36" 
                strokeWidth="3.5" 
                strokeDasharray="360"
                strokeDashoffset={360 - (activeIdx / 3) * 360}
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Arc Step Node Buttons */}
            {STAGES.map((stage, index) => {
              const isActive = activeIdx === index;
              const pos = ARC_NODE_POSITIONS[index];
              
              return (
                <button
                  key={stage.step}
                  onClick={() => handleStepClick(index)}
                  style={{
                    left: `${pos.left}px`,
                    top: `${pos.top}px`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border flex items-center justify-center text-sm font-extrabold font-heading shadow-md cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "bg-saffron text-white border-saffron scale-115 shadow-xl shadow-saffron/40 z-20 ring-4 ring-saffron/20" 
                      : "bg-white text-slate-grey border-saffron/20 hover:border-saffron hover:text-saffron z-10 hover:scale-105"
                  }`}
                >
                  {stage.step}
                </button>
              );
            })}
          </div>

          {/* Mobile Fallback: Horizontal step pills */}
          <div className="flex md:hidden flex-row gap-3 overflow-x-auto pb-4 scrollbar-none w-full">
            {STAGES.map((stage, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={stage.step}
                  onClick={() => handleStepClick(index)}
                  className={`px-5 py-2.5 rounded-full border text-xs font-extrabold tracking-wider uppercase shrink-0 transition-all duration-300 ${
                    isActive 
                      ? "bg-saffron border-saffron text-white shadow-lg" 
                      : "bg-transparent border-black/8 text-slate-grey"
                  }`}
                >
                  Step {stage.step}
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Card Panel */}
          <div className="md:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-block bg-white border border-saffron/15 shadow-2xl relative min-h-[200px] sm:min-h-[180px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-20 z-0" />
              
              <div ref={detailsRef} className="relative z-10 text-left">
                {/* Stage Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-4 font-heading">
                  {STAGES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-grey text-base sm:text-lg leading-relaxed font-sans">
                  {STAGES[activeIdx].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
