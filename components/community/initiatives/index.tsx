"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Shield, Leaf, ArrowDownRight } from "lucide-react";

interface InitiativeItem {
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
  anchor: string;
}

const INITIATIVES_SUMMARY: InitiativeItem[] = [
  {
    title: "Healthcare & Life Drives",
    desc: "Over 50+ mass blood donation camps, International Yoga Day sessions, emergency donor registry, and free medical checkup drives across Nashik.",
    tag: "Arogya",
    icon: <Heart className="w-6 h-6 text-saffron" />,
    anchor: "#blood-donation",
  },
  {
    title: "Ecological & Cleanliness",
    desc: "Mass tree planting campaigns, green cover enhancement, civic cleanliness drives, and promoting eco-friendly festival celebrations in Indira Nagar.",
    tag: "Vasundhara",
    icon: <Leaf className="w-6 h-6 text-saffron" />,
    anchor: "#tree-plantation",
  },
  {
    title: "Socio-Educational & Relief",
    desc: "Educational study kits and books for students, dry ration distribution, disaster support, and empowering youth through community welfare.",
    tag: "Seva",
    icon: <Shield className="w-6 h-6 text-saffron" />,
    anchor: "#charity-social-work",
  },
];

export default function CommunityInitiatives() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance fade-in animation for rows
      gsap.fromTo(
        ".initiative-row-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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

  const handleScrollToSection = (anchor: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 select-none"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
            Our Pillars
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Key Focus Areas
          </h2>
          <div className="w-16 h-1 bg-saffron mt-4 rounded-full" />
        </div>

        {/* Marquee Rows Accordion List */}
        <div className="flex flex-col border-t border-neutral-300">
          {INITIATIVES_SUMMARY.map((item, index) => (
            <div
              key={index}
              onClick={() => handleScrollToSection(item.anchor)}
              className="initiative-row-item group border-b border-neutral-300 py-10 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out relative flex flex-col justify-start"
            >
              {/* Hardware Accelerated Infinite CSS Marquee */}
              <div className="w-full overflow-hidden flex relative z-10 py-2">
                <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
                  
                  {/* First continuous loop panel */}
                  <div className="flex whitespace-nowrap gap-x-12 pr-12">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8">
                        <span className="text-[10px] font-bold text-saffron tracking-widest uppercase bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20 flex items-center gap-1.5 font-heading">
                          0{index + 1} / {item.tag}
                        </span>
                        <span className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-outline-festive tracking-tight uppercase transition-all duration-300 group-hover:text-saffron">
                          {item.title}
                        </span>
                        {item.icon}
                      </div>
                    ))}
                  </div>

                  {/* Second panel for seamless repeating */}
                  <div className="flex whitespace-nowrap gap-x-12 pr-12" aria-hidden="true">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8">
                        <span className="text-[10px] font-bold text-saffron tracking-widest uppercase bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20 flex items-center gap-1.5 font-heading">
                          0{index + 1} / {item.tag}
                        </span>
                        <span className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-outline-festive tracking-tight uppercase transition-all duration-300 group-hover:text-saffron">
                          {item.title}
                        </span>
                        {item.icon}
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Expanded detailed description revealed on hover */}
              <div className="max-w-4xl px-4 overflow-hidden max-h-0 group-hover:max-h-[160px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mt-0 group-hover:mt-6">
                <p className="text-base sm:text-lg text-[#525250] leading-relaxed max-w-3xl font-sans">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={(e) => handleScrollToSection(item.anchor, e)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white bg-saffron hover:bg-saffron/90 px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer group-hover:scale-102"
                >
                  <span>Explore details</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
