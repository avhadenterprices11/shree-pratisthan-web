"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSupportCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-animate",
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-5xl mx-auto relative z-10 cta-animate">
        <div className="glass-panel p-8 sm:p-12 rounded-block text-center space-y-8 bg-white border border-saffron/15 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-30" />
          
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Ready to Make an Active Impact?
            </h2>
            <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
              Whether you want to sponsor student study kits, participate in 50+ blood donation drives, support youth sports leagues, or join cultural festivals in Indira Nagar, Nashik, we welcome you.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/volunteer"
              className="bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 active:scale-95 text-center"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/community"
              className="bg-slate-100 hover:bg-slate-200 text-foreground font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 active:scale-95 text-center border border-slate-200"
            >
              Explore Community Drives
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
