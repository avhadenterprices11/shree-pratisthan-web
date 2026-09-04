"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CORPORATES = [
  "Samarth Sahakari Bank",
  "Late Dharmaraj Badode Sanstha",
  "Indira Nagar Citizens Forum",
  "Nashik Blood Bank Network",
  "Nashik Sports & Cricket Association",
  "Nashik Cultural Utsav Samiti",
];

export default function Sponsors() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Direct GSAP infinite scroll animation from 0% to -50% (looping the duplicate set)
    const anim = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    // Velocity observer to scale marquee animation speed on scroll speed
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          // Standard speed is 1x. Dynamically scales up to 4.5x during high-velocity scrolls
          const targetScale = 1 + Math.min(velocity / 120, 3.5);
          gsap.to(anim, { timeScale: targetScale, duration: 0.4, overwrite: "auto" });
        },
      },
    });

    // Decelerate smoothly back to 1x when page scrolling stops
    const handleScrollStop = () => {
      gsap.to(anim, { timeScale: 1, duration: 0.8, overwrite: "auto" });
    };

    window.addEventListener("scroll", handleScrollStop);

    return () => {
      anim.kill();
      tl.kill();
      window.removeEventListener("scroll", handleScrollStop);
    };
  }, []);

  const LIST_ITEMS = [...CORPORATES, ...CORPORATES];

  return (
    <section className="pt-12 pb-6 bg-background overflow-hidden relative select-none">
      {/* Background soft ambient halo */}
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />

      {/* Capsule Badge Header Divider (Perfect visual visibility) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-8 flex items-center justify-between gap-6">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-saffron/20" />
        <span className="text-saffron font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans bg-background px-5 py-2 rounded-full border border-saffron/12 shadow-sm whitespace-nowrap">
          Supported & Endorsed By
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-saffron/20" />
      </div>

      {/* Responsive Marquee Ticker Row */}
      <div className="w-full flex relative overflow-hidden py-4">
        {/* Edge gradient masks for seamless visual blend */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Triple clone timeline container */}
        <div ref={marqueeRef} className="flex gap-20 items-center whitespace-nowrap cursor-none">
          {LIST_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`text-xl sm:text-2xl font-black font-heading tracking-widest uppercase transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  isEven
                    ? "text-saffron hover:text-gold"
                    : "text-slate-grey hover:text-saffron"
                }`}
                data-hover="pointer"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
