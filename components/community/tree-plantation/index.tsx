"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPECIES = [
  { name: "Neem (Azadirachta indica)", type: "Air Purifying & Medicinal", count: "1,500+" },
  { name: "Banyan (Ficus benghalensis)", type: "Shade & Canopy Growth", count: "800+" },
  { name: "Mango (Mangifera indica)", type: "Fruiting & Local Ecology", count: "1,200+" },
  { name: "Peepal (Ficus religiosa)", type: "Oxygen Rich & Soil Stability", count: "900+" },
];

export default function TreePlantation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left column card 3D Scroll Flip (counter-clockwise / opposite)
      gsap.fromTo(
        ".tree-animate-left",
        {
          opacity: 0,
          rotationY: -45,
          rotationX: -12,
          z: -180,
          transformOrigin: "right center",
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scrollTrigger: {
            trigger: ".tree-animate-left",
            start: "top 95%",
            end: "top 50%",
            scrub: 1.8, // Smooth slow catch-up lag
          },
        }
      );

      // Right column text slide
      gsap.fromTo(
        ".tree-animate-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tree-plantation"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          
          {/* Left Column: Visual Species Selection */}
          <div className="tree-animate-left order-2 lg:order-1 glass-panel p-8 rounded-block bg-white relative">
            <div className="absolute top-4 right-6 text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Ecology
            </div>
            <h3 className="text-2xl font-extrabold text-foreground mb-6 font-heading">
              Sown & Nurtured Saplings
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECIES.map((spec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-300"
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block font-heading">
                    {spec.count}
                  </span>
                  <h4 className="text-sm font-bold text-foreground mt-1 font-sans">
                    {spec.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-grey font-semibold mt-1">
                    {spec.type}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-grey font-medium">
              Saplings are monitored and watered under our Sunday Care initiatives.
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div className="tree-animate-right order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Restoring Green Cover & <br />
              <span className="text-emerald-600 text-outline-festive hover:text-emerald-600">Ecological Balance</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed">
              Preserving our environment is a sacred civic duty. Through our green initiatives, Shree Pratishtan mobilizes youth and families in Indira Nagar and Nashik on weekends to conduct mass plantation, nurture saplings, and promote cleanliness.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-emerald-600 font-heading">5,000+</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Saplings Planted
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-emerald-600 font-heading">100%</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Sunday Volunteer Care
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
