"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    title: "Registered Public Trust",
    desc: "Officially registered under government authority as 'कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था' (Reg: nashik/0000153/2018).",
    badge: "REG",
  },
  {
    title: "Banking Partner Verification",
    desc: "Samarth Sahakari Bank (समर्थ बँक) verified banking credentials ensure 100% financial transparency for social contributions.",
    badge: "BANK",
  },
  {
    title: "50+ Health & Blood Drives",
    desc: "Conducted over 50 life-saving blood donation camps, free diagnostic checkups, and annual sports tournaments across Nashik.",
    badge: "50+",
  },
];

export default function AboutAchievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance elastic scale reveal
      gsap.fromTo(
        ".achievement-badge-card",
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "elastic.out(1.0, 0.75)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Magnetic Dial Pull on hover (Desktop only)
      const cards = gsap.utils.toArray<HTMLElement>(".achievement-badge-card");
      cards.forEach((card) => {
        const dial = card.querySelector(".achievement-badge-dial");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2;
          const mouseY = e.clientY - rect.top - rect.height / 2;

          // Pull emblem dial toward mouse cursor
          if (dial) {
            gsap.to(dial, {
              x: mouseX * 0.18,
              y: mouseY * 0.18,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          if (dial) {
            gsap.to(dial, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 xl:px-24 bg-[#FFFDF9] border-t border-saffron/10 relative overflow-hidden select-none z-10"
    >
      {/* Animation keyframes for badge spin are defined in globals.css */}

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
              Achievements & Verifications
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
            Officially verified registration (nashik/0000153/2018) and trusted banking partnership for transparent community welfare.
          </p>
        </div>

        {/* Badge Dials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full justify-center items-start">
          {AWARDS.map((item, index) => (
            <div 
              key={index}
              className="achievement-badge-card flex flex-col items-center text-center p-8 sm:p-10 bg-white border border-saffron/15 rounded-[3rem] shadow-xl shadow-saffron/5 hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 group relative cursor-default"
            >
              
              {/* Emblem Badge Dial (Hover outer scale ripple and rotation speed-up) */}
              <div className="achievement-badge-dial w-36 h-36 rounded-full bg-[#FFFDF9] border border-saffron/15 flex items-center justify-center relative overflow-visible mb-8 shadow-inner">
                
                {/* Rotating SVG Curved Label */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow-badge opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 100 100">
                  <path id={`badge-path-${index}`} d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="text-[6.5px] fill-saffron uppercase font-bold tracking-widest font-sans">
                    <textPath href={`#badge-path-${index}`} startOffset="50%" textAnchor="middle">
                      Verified Credential • Shree Prathishthan •
                    </textPath>
                  </text>
                </svg>

                {/* Inner Icon */}
                <div className="text-2xl font-black font-heading text-saffron relative z-10 group-hover:scale-108 transition-transform duration-500">
                  {item.badge}
                </div>

              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-black text-slate-800 font-heading uppercase tracking-tight mb-3 group-hover:text-saffron transition-colors duration-350">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-grey leading-relaxed font-sans font-light max-w-xs transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
                {item.desc}
              </p>

              {/* Verified Stamp tag */}
              <div className="mt-8 text-[9px] text-saffron uppercase font-bold tracking-widest border border-saffron/20 bg-saffron/5 px-4.5 py-1.5 rounded-full font-sans shadow-sm transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                Official Validation
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
