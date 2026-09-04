"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StoryItem {
  title: string;
  beneficiary: string;
  location: string;
  story: string;
  imageText: string;
  accent: string;
}

const STORIES: StoryItem[] = [
  {
    title: "Empowering Young Students",
    beneficiary: "Rahul Shinde, 6th Grade Student",
    location: "Nashik Municipal School",
    story: "Rahul and his classmates received complete study kits, notebooks, and school bags during Shree Pratishtan's annual education drive. This material assistance relieved the financial strain on his family, enabling him to continue his schooling with enthusiasm.",
    imageText: "Edu",
    accent: "border-saffron/30 text-saffron bg-saffron/5",
  },
  {
    title: "Emergency Blood Transfusion Response",
    beneficiary: "Mahendra Patil, Emergency Patient",
    location: "Nashik Civil Hospital",
    story: "During an emergency surgery, Mahendra's family urgently required O-negative blood units. Shree Pratishtan's active donor helpline mobilized a local Indira Nagar volunteer donor within 30 minutes, ensuring a timely and life-saving transfusion.",
    imageText: "Med",
    accent: "border-red-500/30 text-red-500 bg-red-500/5",
  },
  {
    title: "Green Canopy in Indira Nagar",
    beneficiary: "Anjali Tambe, Community Volunteer",
    location: "Indira Nagar Green Initiative",
    story: "Over the past seasons, our volunteer youth teams planted over 1,500 shade and fruit saplings across residential avenues and public spaces in Indira Nagar. Today, our community enjoys a visibly greener, cleaner, and healthier environment.",
    imageText: "Eco",
    accent: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
  },
];

export default function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stories-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    // Set up automatic slide interval (4 seconds)
    const timer = setInterval(() => {
      const activeCard = document.querySelector(".active-deck-card");
      if (activeCard) {
        gsap.to(activeCard, {
          x: -360,
          rotation: -12,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setActiveIdx((prev) => (prev + 1) % STORIES.length);
            gsap.set(activeCard, { x: 0, rotation: 0, opacity: 1, scale: 1 });
          }
        });
      }
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-5xl mx-auto relative z-10 stories-reveal">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Stories of Transformation
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 3D Stacked Deck Slider Container */}
        <div 
          className="relative w-full max-w-4xl mx-auto h-[480px] sm:h-[400px] md:h-[320px] flex items-center justify-center"
          style={{ perspective: 1500, transformStyle: "preserve-3d" }}
        >
          {STORIES.map((story, index) => {
            // Calculate relative index position in the stack loop
            const position = (index - activeIdx + STORIES.length) % STORIES.length;
            const isActive = position === 0;
            const isNext = position === 1;
            const isFar = position === 2;

            // Apply different stack translation styles based on stack order
            let transformClass = "opacity-0 scale-90 translate-y-16 translate-x-16 pointer-events-none z-0";
            if (isActive) {
              transformClass = "active-deck-card opacity-100 scale-100 translate-y-0 translate-x-0 rotate-0 pointer-events-auto z-30";
            } else if (isNext) {
              transformClass = "opacity-75 scale-95 translate-y-4 translate-x-4 rotate-2 pointer-events-none z-20";
            } else if (isFar) {
              transformClass = "opacity-35 scale-90 translate-y-8 translate-x-8 rotate-4 pointer-events-none z-10";
            }

            return (
              <div
                key={index}
                className={`absolute w-full p-8 sm:p-12 rounded-block flex flex-col md:flex-row gap-8 items-center bg-white border border-saffron/15 shadow-xl transition-all duration-700 ease-out ${transformClass}`}
              >
                {/* Story Icon/Avatar */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 flex items-center justify-center text-lg font-bold font-heading shadow-md ${story.accent} flex-shrink-0`}>
                  {story.imageText}
                </div>

                {/* Content block */}
                <div className="flex-grow space-y-3 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-saffron/10 text-saffron px-2.5 py-1 rounded">
                      {story.location}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-100 text-slate-grey px-2.5 py-1 rounded">
                      {story.beneficiary}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-heading">
                    {story.title}
                  </h3>
                  
                  <p className="text-slate-grey leading-relaxed text-sm sm:text-base italic">
                    “{story.story}”
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
