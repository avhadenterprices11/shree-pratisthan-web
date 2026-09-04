"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger client-side
gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    title: "Shree\nGanpati",
    description: "Cultivating devotion, historic theme dekhavas like Jejuri Gad, and grand traditions in Indira Nagar.",
    image: "/images/ganesh-utsav.jpg",
    label: "Ganesh Utsav",
  },
  {
    title: "Swagat\nYatra",
    description: "Welcoming the New Year with Dhol-Tasha, traditional pageantry, and cultural pride.",
    image: "/images/swagat-yatra.jpg",
    label: "Swagat Yatra",
  },
  {
    title: "Dahi\nHandi",
    description: "Thrilling multi-tier human pyramids, electrifying crowd energy, and grand youth celebrations.",
    image: "/images/dahihandi-utsav.jpg",
    label: "Dahi Handi Utsav",
  },
  {
    title: "Maha\nShivratri",
    description: "Spectacular 108-foot Mahamrutyunjay Shivling replicas, sacred rituals, and massive devotional gatherings.",
    image: "/images/mahashivratri.jpg",
    label: "Maha Shivratri",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Set initial states of slides
      const slides = gsap.utils.toArray<HTMLElement>(".slide-container");
      const slideBgs = gsap.utils.toArray<HTMLElement>(".slide-bg");
      const slideContents = gsap.utils.toArray<HTMLElement>(".slide-content");

      gsap.set(slides.slice(1), { opacity: 0, pointerEvents: "none" });
      gsap.set(slideBgs.slice(1), { scale: 1.15 });

      // 2. Build ScrollTrigger timeline with resting buffers (total duration = 7)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", // shortened pin depth for less scroll travel
          pin: true,
          scrub: 1,
          snap: {
            snapTo: [0, 2.5 / 7, 4.5 / 7, 1.0],
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const time = progress * 7;
            let index = 0;
            if (time < 1.5) {
              index = 0;
            } else if (time < 3.5) {
              index = 1;
            } else if (time < 5.5) {
              index = 2;
            } else {
              index = 3;
            }
            setActiveIndex(index);
          },
        },
      })
      // Transitions between slides (resting 0-1, transition 1-2, resting 2-3, transition 3-4, resting 4-5, transition 5-6, resting 6-7)
      // Transition 0 -> 1
      .fromTo(slides[0], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 1)
      .fromTo(slideBgs[0], { scale: 1 }, { scale: 0.95, duration: 1 }, 1)
      .fromTo(slides[1], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 1)
      .fromTo(slideBgs[1], { scale: 1.15 }, { scale: 1, duration: 1 }, 1)
      .fromTo(slideContents[0], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 1)
      .fromTo(slideContents[1], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)

      // Transition 1 -> 2
      .fromTo(slides[1], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 3)
      .fromTo(slideBgs[1], { scale: 1 }, { scale: 0.95, duration: 1 }, 3)
      .fromTo(slides[2], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 3)
      .fromTo(slideBgs[2], { scale: 1.15 }, { scale: 1, duration: 1 }, 3)
      .fromTo(slideContents[1], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 3)
      .fromTo(slideContents[2], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 3.2)

      // Transition 2 -> 3
      .fromTo(slides[2], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 5)
      .fromTo(slideBgs[2], { scale: 1 }, { scale: 0.95, duration: 1 }, 5)
      .fromTo(slides[3], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 5)
      .fromTo(slideBgs[3], { scale: 1.15 }, { scale: 1, duration: 1 }, 5)
      .fromTo(slideContents[2], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 5)
      .fromTo(slideContents[3], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 5.2);

      // 3. Entrance Intro Animation on Mount (Typographic Portal Reveal)
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".portal-text", { scale: 0.85, opacity: 0 });

      entryTl
        .fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".portal-text", { scale: 1, opacity: 1, duration: 1.0 })
        .to({}, { duration: 0.3 }) // brief pause
        .to(".portal-text", { 
          scale: 35, 
          opacity: 0, 
          duration: 1.4, 
          ease: "power3.in" 
        }, "+=0.1")
        .to(".portal-intro", { 
          opacity: 0, 
          duration: 1.0, 
          ease: "power2.inOut" 
        }, "-=1.2")
        .fromTo(
          ".slide-bg-0",
          { scale: 1.15, filter: "blur(4px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" },
          "-=1.2"
        )
        .set(".portal-intro", { display: "none" })
        .fromTo(
          ".slide-content-0",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.4"
        );
    }, containerRef);

    // Refresh ScrollTrigger to ensure correct measurements
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
      className="relative w-full h-screen bg-obsidian-deep overflow-hidden flex flex-col justify-between select-none opacity-0"
    >
      {/* Typographic Portal Reveal Overlay */}
      <div className="absolute inset-0 z-[60] bg-saffron flex flex-col items-center justify-center text-center portal-intro pointer-events-none px-4">
        <h2 className="portal-text text-[8.5vw] md:text-[7.5vw] font-black text-white select-none uppercase font-heading leading-[0.82] tracking-tighter text-center whitespace-pre-line">
          WE{"\n"}CELEBRATE{"\n"}TOGETHER
        </h2>
      </div>

      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full z-0">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 w-full h-full slide-container",
              idx === 0 ? "slide-0" : ""
            )}
          >
            {/* Slide Background Image */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full slide-bg",
                idx === 0 ? "slide-bg-0" : ""
              )}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                priority={idx === 0}
                className="object-cover object-center animate-pulse-slow opacity-90"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-obsidian-deep/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep/90 via-obsidian-deep/30 to-transparent" />
            </div>

            {/* Ambient glows inside active slide */}
            <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-15" />
            <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-40 opacity-10" />
          </div>
        ))}
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 flex-grow w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center text-left">
        <div className="max-w-4xl relative w-full h-[60vh] flex items-center">
          {SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute left-0 w-full flex flex-col items-start gap-4 pointer-events-none",
                activeIndex === idx ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10"
              )}
            >
              <div className={cn(
                "slide-content flex flex-col items-start gap-3 md:gap-5",
                idx === 0 ? "slide-content-0" : ""
              )}>
                {/* Big Bold Title */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white font-heading leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
                  {slide.title}
                </h1>

                {/* Story Quote */}
                <p className="text-lg sm:text-2xl md:text-3xl text-pebble font-light max-w-2xl leading-relaxed italic border-l-2 border-saffron/50 pl-4 py-1">
                  "{slide.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
