"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  offsetClass: string;
}

const VOLUNTEER_TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Working on the Gudipadwa Swagat Yatra and Ganeshotsav logistics in Indira Nagar taught me genuine teamwork, stage management, and crowd coordination under pressure.",
    name: "Swapnil Pawar",
    role: "Youth Volunteer, Indira Nagar",
    avatar: "SP",
    offsetClass: "md:rotate-2 md:translate-y-6 hover:rotate-0 hover:translate-y-2",
  },
  {
    quote: "Coordinating our 50+ blood donation drives with Nashik Civil Hospital and managing emergency donor calls has been the most meaningful social work experience of my life.",
    name: "Pooja Jadhav",
    role: "Health Drive Coordinator",
    avatar: "PJ",
    offsetClass: "md:-rotate-2 md:-translate-y-2 hover:rotate-0 hover:-translate-y-6",
  },
  {
    quote: "Managing the annual cricket tournament fixtures and youth athletics keeps our 2006 founding sports roots alive. The friendship and support here are unmatched.",
    name: "Rohan Shinde",
    role: "Sports Event Volunteer",
    avatar: "RS",
    offsetClass: "md:rotate-3 md:translate-y-10 hover:rotate-0 hover:translate-y-6",
  },
];

export default function VolunteerTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Apply 3D perspective to parent grid
      gsap.set(".perspective-grid", { perspective: 1200 });

      // Staggered 3D rotation slide up
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50, rotateX: 12, rotateY: -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          stagger: 0.18,
          duration: 0.9,
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
      className="py-28 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50 z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Volunteer Experiences
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 3D Perspective Speech Cards Grid */}
        <div className="perspective-grid grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-8 lg:gap-x-12 items-start pb-12">
          {VOLUNTEER_TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className={`testimonial-card relative glass-panel pt-12 pb-8 px-8 sm:px-10 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 bg-white min-h-[260px] cursor-default ${item.offsetClass}`}
            >
              {/* Floating Avatar overlaps top edge */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full border-2 border-saffron bg-white flex items-center justify-center text-xs font-bold font-heading text-saffron shadow-lg z-20">
                {item.avatar}
              </div>

              {/* Speech bubble pointer block */}
              <div className="absolute -bottom-3 left-10 w-6 h-6 rotate-45 border-r border-b border-black/5 bg-white z-0" />

              <div className="relative z-10">
                {/* Decorative Quote Icon */}
                <div className="text-5xl text-saffron/15 font-serif leading-none absolute top-0 right-0 pointer-events-none select-none">
                  “
                </div>
                
                {/* Quote description */}
                <p className="text-slate-grey leading-relaxed italic text-sm font-sans mb-6 pt-2">
                  {item.quote}
                </p>
              </div>

              {/* Author Info footer */}
              <div className="relative z-10 border-t border-saffron/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-neutral-900 font-heading">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-grey uppercase tracking-wider font-semibold mt-0.5">
                    {item.role}
                  </p>
                </div>
                <span className="text-saffron text-sm">★</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
