"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: "+", label: "Blood Camps & Health Drives" },
  { value: 5000, suffix: "+", label: "Trees Planted & Nurtured" },
  { value: 10000, suffix: "+", label: "Citizens & Families Reached" },
  { value: 19, suffix: "+", label: "Years of Active Service" },
];

export default function CommunityImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger stats reveal
      gsap.fromTo(
        ".stat-box",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Trigger count-up numbers
      const targets = gsap.utils.toArray(".count-number");
      targets.forEach((target: any) => {
        const val = parseInt(target.getAttribute("data-target") || "0", 10);
        gsap.fromTo(
          target,
          { textContent: 0 },
          {
            textContent: val,
            duration: 2.0,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Community Impact in Numbers
          </h2>
          <p className="text-slate-grey mt-4">
            Transparent statistics tracking our public welfare drives, ecological campaigns, and relief programs.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item, index) => (
            <div
              key={index}
              className="stat-box glass-panel p-6 sm:p-8 rounded-block text-center flex flex-col justify-center items-center bg-white"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-saffron font-heading flex items-center justify-center">
                <span className="count-number" data-target={item.value}>0</span>
                <span>{item.suffix}</span>
              </div>
              <div className="w-10 h-0.5 bg-gold my-4 rounded-full" />
              <div className="text-xs sm:text-sm font-bold text-slate-grey uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
