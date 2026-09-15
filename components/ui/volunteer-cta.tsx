"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface VolunteerCTAProps {
  title?: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export default function VolunteerCTA({
  title,
  description,
  buttonText,
  buttonLink = "/volunteer",
  className,
}: VolunteerCTAProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayTitle = title || (
    <>
      {t("volunteerCTA.heading")}
    </>
  );
  const displayDesc = description || t("volunteerCTA.description");
  const displayBtn = buttonText || t("volunteerCTA.button");

  const btnWrapperRef = useRef<HTMLDivElement>(null);

  const handleAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = buttonAreaRef.current;
    const btn = btnWrapperRef.current;
    if (!area || !btn) return;

    const rect = area.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;

    gsap.to(btn, { x, y, duration: 0.2, ease: "power2.out", overwrite: "auto" });
  };

  const handleAreaMouseLeave = () => {
    if (btnWrapperRef.current) {
      gsap.to(btnWrapperRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
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
        "py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background w-full select-none",
        className
      )}
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10 volunteer-canvas">
        
        {/* Typographic Canvas Card */}
        <div className="w-full bg-[#FFFDF9] dark:bg-[#121214] border border-saffron/15 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] py-8 sm:py-10 md:py-14 px-4 sm:px-8 md:px-16 shadow-lg text-center flex flex-col items-center justify-center max-w-7xl mx-auto relative overflow-hidden">
          
          {/* Heritage Corner Borders */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 w-4 h-4 sm:w-8 sm:h-8 border-t-2 border-l-2 border-saffron/20 pointer-events-none" />
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-4 h-4 sm:w-8 sm:h-8 border-t-2 border-r-2 border-saffron/20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-4 h-4 sm:w-8 sm:h-8 border-b-2 border-l-2 border-saffron/20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-4 h-4 sm:w-8 sm:h-8 border-b-2 border-r-2 border-saffron/20 pointer-events-none" />

          {/* Massive Display Typography */}
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-slate-800 dark:text-neutral-100 tracking-tight font-heading leading-snug uppercase max-w-4xl mb-4 sm:mb-6 py-1">
            {displayTitle}
          </h2>

          {/* Clean Description */}
          <p className="text-slate-grey dark:text-neutral-300 text-base md:text-lg leading-[1.75] max-w-2xl mb-6 sm:mb-8 font-normal font-sans">
            {displayDesc}
          </p>

          {/* Centered Magnetic CTA Button */}
          <div
            ref={buttonAreaRef}
            onMouseMove={handleAreaMouseMove}
            onMouseLeave={handleAreaMouseLeave}
            className="py-2 sm:py-4 px-2 sm:px-8 flex items-center justify-center cursor-pointer w-full sm:w-auto"
            data-hover="pointer"
          >
            <div ref={btnWrapperRef} className="w-full sm:w-auto flex justify-center">
              <LiquidMetalButton
                onClick={() => router.push(buttonLink)}
                variant="themed"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="text-xs sm:text-sm uppercase font-bold tracking-[0.2em] font-sans cursor-pointer w-full sm:w-auto"
                data-hover="pointer"
              >
                {displayBtn}
              </LiquidMetalButton>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
