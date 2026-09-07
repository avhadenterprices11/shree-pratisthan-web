"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

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
    title: "Adv. Shyam Badode",
    subtitle: "Founder President & Legal Advisor",
    description: "What began in 2006 as daily cricket sessions among friends in Indira Nagar has evolved into a registered trust serving culture, sports, and community with unshakeable brotherhood and dedication.",
    image: "/shyam_badode.png",
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
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonialsData = [
    {
      id: 1,
      title: t("testimonials.t1Name"),
      subtitle: t("testimonials.t1Subtitle"),
      description: t("testimonials.t1Desc"),
      image: "/shyam_badode.png",
    },
    {
      id: 2,
      title: t("testimonials.t2Name"),
      subtitle: t("testimonials.t2Subtitle"),
      description: t("testimonials.t2Desc"),
      image: "/portrait_csr.png",
    },
    {
      id: 3,
      title: t("testimonials.t3Name"),
      subtitle: t("testimonials.t3Subtitle"),
      description: t("testimonials.t3Desc"),
      image: "/portrait_volunteer.png",
    },
    {
      id: 4,
      title: t("testimonials.t4Name"),
      subtitle: t("testimonials.t4Subtitle"),
      description: t("testimonials.t4Desc"),
      image: "/volunteer_musician.png",
    },
    {
      id: 5,
      title: t("testimonials.t5Name"),
      subtitle: t("testimonials.t5Subtitle"),
      description: t("testimonials.t5Desc"),
      image: "/volunteer_safety.png",
    },
    {
      id: 6,
      title: t("testimonials.t6Name"),
      subtitle: t("testimonials.t6Subtitle"),
      description: t("testimonials.t6Desc"),
      image: "/volunteer_coordinator.png",
    },
  ];

  const activeItem = testimonialsData[activeIndex];

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || testimonialsData.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonialsData.length]);

  const handleNext = () => {
    if (activeIndex < testimonialsData.length - 1) {
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
      className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background z-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10 testimonials-viewport">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-14 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug uppercase py-1">
            {t("testimonials.title")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mt-3 sm:mt-6 rounded-full" />
        </div>

        {/* Dynamic Split Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-12 items-start">
          
          {/* Left Column: Quote & Progress Tracker */}
          <div className="col-span-1 md:col-span-7 flex flex-col justify-between min-h-[280px] sm:min-h-[360px] md:min-h-[400px] order-2 md:order-1">
            <div className="relative overflow-hidden pt-2 sm:pt-4">
              <span className="text-[7rem] sm:text-[12rem] font-serif text-saffron/10 absolute -top-10 sm:-top-24 left-0 sm:-left-8 pointer-events-none select-none leading-none">
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 pt-2 sm:pt-4"
                >
                  <p className="text-base sm:text-lg lg:text-[20px] font-normal font-heading italic text-slate-800 dark:text-neutral-100 leading-relaxed tracking-tight">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress & Controls */}
            <div className="flex items-center justify-between gap-4 sm:gap-8 mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-saffron/10 dark:border-white/10">
              {/* Progress Line Indicator */}
              <div className="flex items-center gap-3 sm:gap-4 select-none">
                <span className="text-[10px] font-bold text-saffron tracking-wider font-sans">01</span>
                <div className="relative w-24 sm:w-36 h-[2px] bg-saffron/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-saffron transition-all duration-500 ease-out" 
                    style={{ width: `${((activeIndex + 1) / testimonialsData.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-400 tracking-wider font-sans">
                  0{testimonialsData.length}
                </span>
              </div>

              {/* Touch Prev/Next Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-saffron/20 flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:bg-saffron hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === TESTIMONIALS_DATA.length - 1}
                  aria-label="Next testimonial"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-saffron/20 flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:bg-saffron hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Portrait Canvas */}
          <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end w-full order-1 md:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/3] sm:aspect-[3/4] rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-saffron/10 dark:border-white/10 shadow-2xl group bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 backdrop-blur-md bg-white/85 dark:bg-[#121214]/90 border border-white/20 dark:border-white/10 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg flex flex-col transition-transform duration-500 select-none">
                <span className="text-xs sm:text-sm font-bold text-saffron uppercase tracking-[0.2em] block mb-0.5 sm:mb-1 font-sans">
                  {activeItem.subtitle}
                </span>
                <h4 className="text-base sm:text-base md:text-lg font-normal text-slate-900 dark:text-white font-heading leading-tight">
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
