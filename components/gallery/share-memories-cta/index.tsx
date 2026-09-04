"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShareMemoriesCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".share-trigger-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setBtnCoords({ x: x * 0.45, y: y * 0.45 });
  };

  const handleMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10 share-trigger-content">
        <div className="glass-panel p-8 sm:p-16 rounded-block text-center border border-saffron/20 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white">
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-tight mb-6 font-heading">
              Have Photos from Our Events?
            </h2>
            <p className="text-base sm:text-lg text-slate-grey max-w-xl mx-auto mb-10 leading-relaxed">
              If you attended our Shree Ganeshotsav, Gudipadwa Swagat Yatra, 50+ blood donation drives, or cricket leagues in Indira Nagar, Nashik, submit your photographs to our team. We showcase community memories dynamically.
            </p>

            <button
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)`,
                transition: btnCoords.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
              }}
              className="bg-saffron hover:bg-saffron/90 text-white font-extrabold px-10 py-5 rounded-full shadow-lg shadow-saffron/20 text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-none"
              data-hover="pointer"
            >
              Upload Your Photos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
