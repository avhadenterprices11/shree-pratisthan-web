"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Users, Heart, Shield } from "lucide-react";

interface StatItem {
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    number: "100+",
    label: "Active Organizers",
    description: "Dedicated youth and community members leading festivals and social drives in Indira Nagar.",
    icon: <Users className="w-5 h-5 text-saffron" />
  },
  {
    number: "50+",
    label: "Blood & Health Camps",
    description: "Life-saving blood collection drives and free medical diagnostic camps conducted across Nashik.",
    icon: <Heart className="w-5 h-5 text-saffron" />
  },
  {
    number: "19+",
    label: "Years Active Leadership",
    description: "Unbroken community leadership and cultural preservation since our 2006 cricket origin.",
    icon: <Shield className="w-5 h-5 text-saffron" />
  }
];

export default function VolunteerHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      ).fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      ).fromTo(
        ".stat-item-row",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center py-20 lg:py-24 px-6 overflow-hidden md:px-12 bg-neutral-950"
    >
      {/* Fullscreen Ken Burns Background Image Layer (Fully Visible Casing) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/volunteer_coordinator.png"
          alt="Volunteer Drive Background"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-100 scale-105 animate-ken-burns"
        />
        {/* Semi-transparent dark overlay gradient to maintain text legibility without blacking out the center face */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent via-50% to-black/90 z-10" />
        <div className="absolute inset-0 ambient-saffron-glow opacity-30 pointer-events-none z-10" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Heading text content */}
        <div className="lg:col-span-5 space-y-6 text-left">

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight font-heading">
            <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
              <span className="block reveal-line">Join the Movement,</span>
            </div>
            <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
              <span className="block reveal-line text-saffron text-outline-festive">Shape the Future.</span>
            </div>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-medium [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
            Step forward as a volunteer with Shree Pratishtan (श्री प्रतिष्ठान). Your energy, leadership, and dedication empower youth, preserve cultural festivals, and drive social welfare in Indira Nagar and Nashik.
          </p>
        </div>

        {/* Right Column: Text-Only Impact Stats Stack (Right Aligned) */}
        <div className="lg:col-span-7 w-full z-20 flex flex-col justify-center space-y-8 text-right items-end">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-item-row border-b border-white/20 pb-6 w-full group cursor-pointer transition-all duration-300 pr-0 hover:pr-4"
            >
              <div className="flex flex-col sm:flex-row-reverse sm:items-baseline gap-4 mb-2 justify-start">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white group-hover:text-saffron transition-colors duration-300 font-heading tracking-tight leading-none [text-shadow:_0_2px_10px_rgba(0,0,0,0.6)]">
                  {stat.number}
                </span>
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                  {stat.icon}
                  <span className="text-xs font-bold text-saffron uppercase tracking-widest font-heading [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                    {stat.label}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-200 max-w-xl ml-auto transition-colors duration-300 group-hover:text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
