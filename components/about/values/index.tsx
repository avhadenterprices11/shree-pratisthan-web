"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutValues() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number | null>(0);

  const VALUES = [
    {
      title: t("aboutPage.values.v1Title"),
      desc: t("aboutPage.values.v1Desc"),
      image: "/images/social-work.jpg",
    },
    {
      title: t("aboutPage.values.v2Title"),
      desc: t("aboutPage.values.v2Desc"),
      image: "/images/social-work.jpg",
    },
    {
      title: t("aboutPage.values.v3Title"),
      desc: t("aboutPage.values.v3Desc"),
      image: "/images/ganesh.jpg",
    },
    {
      title: t("aboutPage.values.v4Title"),
      desc: t("aboutPage.values.v4Desc"),
      image: "/images/dahi-handi.jpg",
    },
    {
      title: t("aboutPage.values.v5Title"),
      desc: t("aboutPage.values.v5Desc"),
      image: "/images/sports.jpg",
    },
    {
      title: t("aboutPage.values.v6Title"),
      desc: t("aboutPage.values.v6Desc"),
      image: "/images/social-work.jpg",
    },
    {
      title: t("aboutPage.values.v7Title"),
      desc: t("aboutPage.values.v7Desc"),
      image: "/images/social-work.jpg",
    },
    {
      title: t("aboutPage.values.v8Title"),
      desc: t("aboutPage.values.v8Desc"),
      image: "/images/ganesh.jpg",
    },
  ];

  // Scroll Entrance Reveals for list items
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-row-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor follow physics and scroll-hide safety (Desktop only)
  useEffect(() => {
    const floatingEl = document.querySelector(".floating-preview");
    if (!floatingEl) return;

    const setX = gsap.quickSetter(floatingEl, "x", "px");
    const setY = gsap.quickSetter(floatingEl, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of card width/height to center on cursor
      setX(e.clientX - 110);
      setY(e.clientY - 75);
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      setHoveredIdx(null);
      gsap.to(floatingEl, { scale: 0.75, opacity: 0, duration: 0.15, overwrite: "auto" });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Re-enable pointer events 150ms after scroll stops
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleMobileToggle = (idx: number) => {
    setActiveMobileIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#FFFDF9] dark:bg-background py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 select-none border-t border-saffron/10 dark:border-white/10 z-20 overflow-hidden"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-saffron/15 dark:border-white/10 mb-6 sm:mb-12 relative z-10">
        <div className="flex flex-col items-start gap-2 sm:gap-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-slate-800 dark:text-neutral-100 font-heading uppercase leading-tight tracking-tight">
            {t("aboutPage.values.heading")}
          </h2>
        </div>
        <p className="text-base text-slate-grey dark:text-neutral-300 max-w-md font-sans font-normal leading-[1.75]">
          {t("aboutPage.values.subtitle")}
        </p>
      </div>

      {/* Interactive Spotlight Rows List */}
      <div className={cn(
        "max-w-7xl mx-auto flex flex-col relative z-10 transition-opacity duration-300",
        isScrolling && "pointer-events-none"
      )}>
        {VALUES.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          const isMobileOpen = activeMobileIdx === idx;

          return (
            <div
              key={idx}
              onClick={() => handleMobileToggle(idx)}
              onMouseEnter={() => {
                if (isScrolling) return;
                setHoveredIdx(idx);
                setActiveImage(item.image);
                gsap.to(".floating-preview", { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" });
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                gsap.to(".floating-preview", { scale: 0.75, opacity: 0, duration: 0.2, ease: "power2.out" });
              }}
              className={cn(
                "value-row-item group py-5 sm:py-8 lg:py-10 border-b border-saffron/15 dark:border-white/10 flex flex-col transition-all duration-500 relative z-10 cursor-pointer rounded-2xl lg:rounded-none px-3 lg:px-0",
                isAnyHovered && !isHovered ? "lg:opacity-30" : "lg:opacity-100",
                isMobileOpen ? "bg-saffron/[0.03] lg:bg-transparent" : ""
              )}
            >
              {/* Row Header Layout */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-6 w-full">
                
                {/* Left Column: Index & Heading */}
                <div className="flex items-center justify-between lg:justify-start gap-3 sm:gap-6 lg:w-5/12">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className={cn(
                      "text-xs font-bold font-sans tracking-[0.2em] transition-colors shrink-0",
                      isMobileOpen ? "text-saffron" : "text-saffron/60 group-hover:text-saffron"
                    )}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className={cn(
                      "text-lg sm:text-2xl lg:text-3xl font-normal font-heading uppercase tracking-tight transition-colors leading-snug",
                      isMobileOpen ? "text-saffron" : "text-slate-800 dark:text-neutral-100 group-hover:text-saffron"
                    )}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Mobile Chevron Tap Indicator */}
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 lg:hidden",
                    isMobileOpen ? "rotate-180 bg-saffron text-white shadow-sm" : "bg-saffron/10 text-saffron"
                  )}>
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Right Column: Description */}
                <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] lg:w-7/12 font-sans font-normal transition-all duration-500 group-hover:text-slate-700 dark:group-hover:text-white">
                  {item.desc}
                </p>
              </div>

              {/* Mobile Smooth Tap-to-Reveal Image Accordion */}
              <div className="lg:hidden w-full">
                <AnimatePresence initial={false}>
                  {isMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.97 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden w-full pt-3 sm:pt-4"
                    >
                      <div className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl border border-saffron/20 shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-sans font-semibold flex items-center gap-1.5">
                          <Sparkles size={12} className="text-gold" />
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Cursor Preview Frame (Desktop only - No CSS transitions to prevent GSAP conflict) */}
      <div 
        className="floating-preview pointer-events-none fixed top-0 left-0 w-[220px] h-[150px] rounded-2xl overflow-hidden shadow-2xl z-50 opacity-0 scale-75 origin-center hidden lg:block border-2 border-saffron/20 bg-white"
        style={{ willChange: "transform" }}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Preview"
            fill
            className="object-cover"
            sizes="220px"
          />
        )}
      </div>

    </section>
  );
}

