"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-animate-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".map-animate-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Office visiting details */}
          <div className="map-animate-left space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Coordinate Your <br />
              <span className="text-saffron text-outline-festive">Office Visits</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed">
              We welcome patrons, volunteers, and event partners to our registered headquarters in Indira Nagar, Nashik. To ensure coordinator availability, please connect ahead of your visit.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Clock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground font-sans">Visiting Hours</h4>
                  <p className="text-sm text-slate-grey mt-0.5">
                    Monday to Saturday: 10:00 AM – 6:00 PM <br />
                    Sunday: 10:00 AM – 2:00 PM (During festival campaigns)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Stylized Interactive Map Dashboard */}
          <div className="map-animate-right space-y-6">
            
            {/* Real-time Premium Google Map Container */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl group/map">
              {/* Actual Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5273390757754!2d73.768165!3d19.98661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeaa9e8a9bc6f%3A0x6b7b25e1a3bc89a7!2sIndira%20Nagar%2C%20Nashik%2C%20Maharashtra%20422009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-[15%] contrast-[110%] brightness-[95%] pointer-events-auto"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <div>
                <h4 className="font-extrabold text-foreground text-sm font-sans">Indira Nagar Headquarters (Nashik)</h4>
                <p className="text-xs text-slate-grey mt-0.5">
                  Conveniently accessible via Mumbai-Agra Highway and Nashik Road.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Indira+Nagar+Nashik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground hover:bg-saffron hover:shadow-lg hover:shadow-saffron/20 text-background hover:text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
