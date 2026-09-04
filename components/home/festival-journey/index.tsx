"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2006",
    title: "Group Formed",
    description: "Shri Pratisthan was founded in Indira Nagar, Nashik by dedicated youth uniting together with a shared mission to serve the local community.",
    tag: "Founding",
    image: "/ganeshotsav_award_group.jpg",
    fit: "cover",
  },
  {
    year: "2012",
    title: "Cultural & Utsav Expansion",
    description: "Initiated grand Dahi Handi, Ganeshotsav, and Navratri celebrations with massive community participation across Nashik.",
    tag: "Festivals",
    image: "/dahihandi_2018.jpg",
    fit: "cover",
  },
  {
    year: "2018",
    title: "Official Trust Registration",
    description: "Formally registered as Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha (Reg: nashik/0000153/2018) under Adv. Shyam Badode.",
    tag: "Trust Reg.",
    image: "/trust_seal.png",
    fit: "contain",
  },
  {
    year: "Present",
    title: "19+ Years of Impact",
    description: "Over 100+ active members organizing iconic cultural sets (Jaipur Palace dekhava), Swagat Yatra, and mass community welfare initiatives.",
    tag: "Community Impact",
    image: "/ganeshotsav_2017_jaipur.jpg",
    fit: "cover",
  },
];

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.12,
  duration: 0.8,
};

export default function FestivalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(440);

  // Monitor viewport size to adjust slide size dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSlideSize(440);
      } else {
        setSlideSize(310);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section in the viewport while scrolling through the cards
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200", // Scroll depth of the pin
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = 0;
          if (progress < 0.22) {
            index = 0;
          } else if (progress < 0.44) {
            index = 1;
          } else if (progress < 0.66) {
            index = 2;
          } else {
            index = 3; // Keep active for final 34% scroll buffer
          }
          setActiveIndex(index);
        },
      });
    }, containerRef);

    // Recalculate offsets after client-side layout completes rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-background overflow-hidden flex flex-col justify-between py-12 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12 opacity-30" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-6 mt-4 relative z-20">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
          The Journey of Shree Pratishtan
        </h2>
        <div className="w-16 h-1 bg-saffron mx-auto mt-3 rounded-full" />
      </div>

      {/* Diagonal Cascade Carousel Viewport */}
      <div className="relative flex-grow flex items-center justify-center w-full select-none">
        <motion.div
          className="absolute left-[50%] top-[48%] flex w-fit -translate-y-1/2"
          animate={{ x: -(activeIndex * slideSize + slideSize / 2) }}
          transition={DEFAULT_TRANSITION}
        >
          {MILESTONES.map((item, index) => {
            const isActive = activeIndex === index;
            const distance = index - activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center gap-4 will-change-transform px-4"
                style={{ width: slideSize }}
                animate={{
                  rotate: distance * 12,
                  scale: isActive ? 1 : 0.75,
                  y: distance * 40,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={DEFAULT_TRANSITION}
              >
                {/* Milestone Detail Card */}
                <div
                  className={cn(
                    "group w-full h-[340px] sm:h-[320px] rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-500 relative",
                    isActive 
                      ? "border-saffron/25 shadow-saffron/10" 
                      : "border-slate-800/60 shadow-slate-900 opacity-90"
                  )}
                >
                  {/* Full-bleed Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 440px"
                    className={cn(
                      "transition-transform duration-700 ease-out group-hover:scale-105",
                      item.fit === "contain" 
                        ? "object-contain p-8 sm:p-10 -translate-y-4" 
                        : "object-cover"
                    )}
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-black/25 z-10 transition-all duration-500 group-hover:via-charcoal/60 group-hover:to-black/35" />

                  {/* Header: Year */}
                  <div className="relative z-20 flex justify-between items-center p-6 sm:p-7">
                    <span className="text-2xl sm:text-3xl font-extrabold text-saffron font-heading drop-shadow-sm">
                      {item.year}
                    </span>
                  </div>

                  {/* Body: Title & Content */}
                  <div className="relative z-20 p-6 sm:p-7 text-left space-y-2 mt-auto">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Navigation Progress Indicator */}
      <div className="text-center relative z-20 mb-4 flex flex-col items-center justify-center gap-1 opacity-70">
        <div className="flex gap-2.5 mt-2">
          {MILESTONES.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 rounded-full bg-saffron transition-all duration-300",
                activeIndex === idx ? "w-6 opacity-100" : "w-1.5 opacity-25"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
