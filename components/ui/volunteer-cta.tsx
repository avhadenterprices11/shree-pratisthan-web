"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface VolunteerCTAProps {
  title?: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export default function VolunteerCTA({
  title = (
    <>
      Join the Movement.<br />
      <span className="text-saffron">Serve With Pride.</span>
    </>
  ),
  description = "Coordinate event logistics, support mass blood donation drives, lead youth sports tournaments, or participate in our grand Gudipadwa Swagat Yatra and Ganeshotsav. Shree Pratishtan channels your energy directly into community progress and cultural preservation in Indira Nagar, Nashik.",
  buttonText = "Become a Volunteer",
  buttonLink = "/volunteer",
  className,
}: VolunteerCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  const handleAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = buttonAreaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setBtnCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleAreaMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth container scroll reveal
      gsap.fromTo(
        ".volunteer-canvas",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
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
      id="volunteer"
      className={cn(
        "py-24 px-6 md:px-12 relative overflow-hidden bg-background w-full select-none",
        className
      )}
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10 volunteer-canvas">
        
        {/* Typographic Canvas Card */}
        <div className="w-full bg-[#FFFDF9] border border-saffron/15 rounded-[2.5rem] py-10 md:py-14 px-8 md:px-16 shadow-lg text-center flex flex-col items-center justify-center max-w-7xl mx-auto relative overflow-hidden">
          
          {/* Heritage Corner Borders */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-saffron/20 pointer-events-none" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-saffron/20 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-saffron/20 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-saffron/20 pointer-events-none" />



          {/* Massive Display Typography */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-800 tracking-tight font-heading leading-none uppercase max-w-4xl mb-6">
            {title}
          </h2>

          {/* Clean Description */}
          <p className="text-slate-grey text-sm md:text-base leading-relaxed max-w-2xl mb-8 font-light font-sans">
            {description}
          </p>

          {/* Centered Magnetic CTA Button */}
          <div
            ref={buttonAreaRef}
            onMouseMove={handleAreaMouseMove}
            onMouseLeave={handleAreaMouseLeave}
            className="py-4 px-8 flex items-center justify-center cursor-pointer"
            data-hover="pointer"
          >
            <LiquidMetalButton
              onClick={() => router.push(buttonLink)}
              style={{
                transform: `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)`,
                transition: btnCoords.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
              }}
              variant="themed"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="text-xs uppercase font-extrabold tracking-widest font-heading cursor-pointer"
              data-hover="pointer"
            >
              {buttonText}
            </LiquidMetalButton>
          </div>

        </div>

      </div>
    </section>
  );
}
