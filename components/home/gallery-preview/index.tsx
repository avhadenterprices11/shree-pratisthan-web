"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Shree Ganeshotsav Celebrations",
    tag: "Ganeshotsav",
    image: "/gallery_ganeshotsav_aarthi.png",
    icon: "🕉️",
  },
  {
    title: "Gudipadwa Swagat Yatra",
    tag: "Swagat Yatra",
    image: "/gallery_dhol_tasha_camps.png",
    icon: "🚩",
  },
  {
    title: "Navratri Garba & Dandiya",
    tag: "Navratri",
    image: "/gallery_navratri_garba.png",
    icon: "💃",
  },
  {
    title: "Mass Blood Donation Drives",
    tag: "Health & Seva",
    image: "/gallery_dahi_handi_pyramids.png",
    icon: "🩸",
  },
  {
    title: "International Yoga Day Camps",
    tag: "Wellness",
    image: "/gallery_gauri_ganpati_decor.png",
    icon: "🧘",
  },
  {
    title: "Annual Cricket & Sports Leagues",
    tag: "Youth Sports",
    image: "/gallery_shiv_jayanti_rally.png",
    icon: "🏏",
  },
];

export default function GalleryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal header texts and link (plays once when section enters)
      gsap.fromTo(
        ".gallery-reveal-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );

      // 2. Scroll-bound curved path entry for each card individually
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      items.forEach((item, index) => {
        const col = index % 3;
        let startProps = {};
        
        if (col === 0) {
          // Left column: sweeps from left, tilts CCW, shifts down
          startProps = { x: -120, y: 80, rotation: -10, opacity: 0 };
        } else if (col === 1) {
          // Middle column: rises vertically, scales down slightly
          startProps = { x: 0, y: 140, scale: 0.92, opacity: 0 };
        } else {
          // Right column: sweeps from right, tilts CW, shifts down
          startProps = { x: 120, y: 80, rotation: 10, opacity: 0 };
        }

        gsap.fromTo(
          item,
          startProps,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "top 55%",
              scrub: 1.2,
            }
          }
        );
      });
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to accommodate Lenis / hydration sizing
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background z-20 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="gallery-reveal-header text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Celebrations, Sports & Seva in Motion
            </h2>
          </div>
          <a 
            href="/gallery"
            className="gallery-reveal-header group inline-flex items-center gap-2 text-saffron font-bold uppercase text-xs tracking-widest hover:text-gold transition-colors font-sans cursor-none"
            data-hover="pointer"
          >
            Explore Complete Archive
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
          </a>
        </div>

        {/* Bento/Masonry-inspired dynamic grid */}
        <div ref={gridRef} className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, index) => {
            const isTall = index === 1 || index === 4;
            return (
              <div 
                key={index}
                className={`gallery-item group relative overflow-hidden rounded-block border border-saffron/10 shadow-md ${
                  isTall ? "lg:row-span-2 min-h-[360px]" : "min-h-[260px]"
                } flex flex-col justify-between p-7 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_20px_50px_rgba(226,88,34,0.15)] hover:border-saffron/30`}
              >
                {/* Full-bleed Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={index < 3}
                />

                {/* Ambient Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-black/10 z-10 transition-all duration-500 group-hover:via-charcoal/50 group-hover:to-black/25" />

                {/* Floating Glassmorphic Icon Badge (Revealed & Animated on Hover) */}
                <div className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg shadow-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-12 transition-all duration-500 ease-out">
                  {item.icon}
                </div>

                {/* Category Tag */}
                <div className="relative z-20 self-start bg-white/95 text-saffron font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-saffron/20 shadow-md">
                  {item.tag}
                </div>

                {/* Title & Interactive Underline */}
                <div className="relative z-20 mt-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight font-heading group-hover:text-gold transition-colors duration-300 flex flex-col gap-1.5">
                    {item.title}
                    <span className="w-0 h-[2px] bg-gold transition-all duration-500 ease-out group-hover:w-16" />
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

