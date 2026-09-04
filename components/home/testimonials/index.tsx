"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    title: "Gopal Avhad",
    subtitle: "Founding Member & Sports Coordinator",
    description: "What began in 2006 as daily cricket sessions among friends in Indira Nagar has evolved into a powerful trust serving culture, sports, and society with unshakeable brotherhood.",
    image: "/portrait_admin.png",
  },
  {
    id: 2,
    title: "Manish Patil",
    subtitle: "Founding Member & Youth Lead",
    description: "From annual sports tournaments to youth mentorship, Shree Pratishtan provides a platform where youngsters channel their passion and energy into constructive community building.",
    image: "/portrait_csr.png",
  },
  {
    id: 3,
    title: "Satish Yadav",
    subtitle: "Founding Member & Health Coordinator",
    description: "Organizing regular mass blood donation drives, health checkups, and Yoga Day camps brings critical life-saving relief to families across Nashik.",
    image: "/portrait_volunteer.png",
  },
  {
    id: 4,
    title: "Jaywant Takke",
    subtitle: "Founding Member & Cultural Lead",
    description: "From our grand 10-day Shree Ganeshotsav to the vibrant Gudipadwa Swagat Yatra, every celebration brings hundreds of families together in cultural pride and harmony.",
    image: "/volunteer_musician.png",
  },
  {
    id: 5,
    title: "Ganesh Ratnaparkhe",
    subtitle: "Founding Member & Logistics Lead",
    description: "The teamwork, mutual trust, and coordination we forged on the cricket pitch in 2006 have made our festival management and safety operations a benchmark in Nashik.",
    image: "/volunteer_safety.png",
  },
  {
    id: 6,
    title: "Somnath Suryawanshi",
    subtitle: "Founding Member & Social Welfare",
    description: "Social unity and dedicated community service are our core pillars. Shree Pratishtan continues to stand beside local families in times of celebration and need alike.",
    image: "/volunteer_coordinator.png",
  },
];

export default function Testimonials({
  autoPlay = true,
  autoPlayInterval = 5000,
}: {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = TESTIMONIALS_DATA[activeIndex];

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || TESTIMONIALS_DATA.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const handleNext = () => {
    if (activeIndex < TESTIMONIALS_DATA.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-viewport",
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
      className="py-32 px-6 md:px-12 relative overflow-hidden bg-background z-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10 testimonials-viewport">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight font-heading leading-none uppercase">
            Voices of Our Founding Pillars
          </h2>
          <div className="w-16 h-1 bg-saffron mt-6 rounded-full" />
        </div>

        {/* Dynamic Split Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-start">
          
          {/* Left Column: Quote & Progress Tracker */}
          <div className="col-span-1 md:col-span-7 flex flex-col justify-between min-h-[360px] md:min-h-[400px] order-2 md:order-1">
            <div className="relative">
              <span className="text-[12rem] font-serif text-saffron/10 absolute -top-24 -left-12 pointer-events-none select-none">
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 pt-4"
                >
                  <p className="text-2xl sm:text-3xl lg:text-[2.5rem] font-serif italic text-slate-800 leading-snug tracking-tight font-light">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>            {/* Progress Scrollbar */}
            <div className="flex items-center gap-8 mt-16 pt-8 border-t border-saffron/10">
              {/* Progress Line Indicator */}
              <div className="flex items-center gap-4 select-none">
                <span className="text-[10px] font-bold text-saffron tracking-wider font-sans">01</span>
                <div className="relative w-36 h-[2px] bg-saffron/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-saffron transition-all duration-500 ease-out" 
                    style={{ width: `${((activeIndex + 1) / TESTIMONIALS_DATA.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider font-sans">
                  0{TESTIMONIALS_DATA.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Portrait Canvas */}
          <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end w-full order-1 md:order-2">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-saffron/10 shadow-2xl group bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-w-768px) 100vw, 30vw"
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Overlapping Glassmorphic Ticket Stub */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/80 border border-white/20 p-5 rounded-2xl shadow-lg flex flex-col transition-transform duration-500 select-none">
                <span className="text-[10px] font-black text-saffron uppercase tracking-widest block mb-0.5 font-sans">
                  {activeItem.subtitle}
                </span>
                <h4 className="text-lg font-black text-slate-900 font-heading leading-tight">
                  {activeItem.title}
                </h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
