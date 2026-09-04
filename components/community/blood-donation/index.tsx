"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAST_CAMPS = [
  {
    location: "Indira Nagar Community Hall, Nashik",
    date: "Annual Mega Camp 2026",
    units: "165 Units Collected",
    partner: "Nashik Civil Hospital Blood Bank",
  },
  {
    location: "Govind Nagar Sports Ground, Nashik",
    date: "Shiv Jayanti Drive 2026",
    units: "120 Units Collected",
    partner: "Red Cross Blood Center Nashik",
  },
  {
    location: "Pratishtan Seva Kendra, Indira Nagar",
    date: "December 2025",
    units: "95 Units Collected",
    partner: "Arpan Blood Bank Nashik",
  },
];

export default function BloodDonation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left column text slide
      gsap.fromTo(
        ".blood-animate-left",
        { opacity: 0, x: -40 },
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

      // Right column card 3D Scroll Flip (clockwise)
      gsap.fromTo(
        ".blood-animate-right",
        {
          opacity: 0,
          rotationY: 45,
          rotationX: 12,
          z: -180,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scrollTrigger: {
            trigger: ".blood-animate-right",
            start: "top 95%",
            end: "top 50%",
            scrub: 1.8, // Smooth slow catch-up lag
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blood-donation"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {/* Left Column: Info & Stats */}
          <div className="blood-animate-left space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Bridging the Critical <br />
              <span className="text-red-600 text-outline-festive hover:text-red-600">Blood Bank Deficit</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed">
              Every month, hospitals face critical blood shortages. Shree Pratishtan organizes regular mega blood donation drives in Indira Nagar and Nashik in partnership with authorized government and charitable blood banks to save lives during emergencies.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-red-600 font-heading">50+</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Camps Organized
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-red-600 font-heading">1,500+</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Donors Registered
                </span>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-block"
              >
                Register as a Donor
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Log Card */}
          <div className="blood-animate-right glass-panel p-8 rounded-block bg-white relative">
            <div className="absolute top-4 right-6 text-xs uppercase font-extrabold tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Verified Drives
            </div>
            <h3 className="text-2xl font-extrabold text-foreground mb-6 font-heading">
              Recent Donation Drives
            </h3>
            
            <div className="space-y-6">
              {PAST_CAMPS.map((camp, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl hover:bg-red-50/30 border border-slate-100 transition-colors duration-300"
                >
                  <div>
                    <h4 className="text-base font-bold text-foreground font-sans">
                      {camp.location}
                    </h4>
                    <p className="text-xs text-slate-grey font-medium mt-1">
                      Partnered with: {camp.partner}
                    </p>
                  </div>
                  <div className="text-right sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="text-xs font-bold text-slate-grey">{camp.date}</span>
                    <span className="text-sm font-extrabold text-red-600 bg-red-100/50 px-3 py-1 rounded-full mt-1">
                      {camp.units}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-grey font-medium">
              ❤️ Donation drives are monitored under medical guidance. 100% safe.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
