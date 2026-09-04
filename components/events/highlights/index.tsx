"use client";

import React, { useState, useEffect, useRef } from "react";
import { getCDNUrl } from "@/lib/cdn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HighlightItem {
  num: string;
  title: string;
  category: string;
  video: string;
  image: string;
  isVideo: boolean;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    num: "01",
    title: "Gudipadwa Swagat Yatra",
    category: "Lezim & Dhol Tasha Processions",
    video: "/festival_drums.mp4",
    image: "/gallery_dhol_tasha_camps.png",
    isVideo: true,
  },
  {
    num: "02",
    title: "Shree Ganeshotsav Maha Aarti",
    category: "108-Lamp Aarti & Eco Clay Idol",
    video: "",
    image: "/gallery_ganeshotsav_aarthi.png",
    isVideo: false,
  },
  {
    num: "03",
    title: "50+ Blood Donation Camps",
    category: "Nashik Civil Hospital Partner",
    video: "",
    image: "/volunteer_medical.png",
    isVideo: false,
  },
  {
    num: "04",
    title: "Shiv Jayanti Mardani Khel",
    category: "Martial Arts & Swarajya Tributes",
    video: "/festival_drums.mp4",
    image: "/community_assembly.png",
    isVideo: true,
  },
  {
    num: "05",
    title: "Navratri Raas & Dandiya Nights",
    category: "Traditional Folk Dance Arenas",
    video: "",
    image: "/gallery_navratri_garba.png",
    isVideo: false,
  },
  {
    num: "06",
    title: "Annual Sports & Cricket League",
    category: "32-Team Youth Championship",
    video: "/about_showcase_video.mp4",
    image: "/hero_dahihandi.png",
    isVideo: true,
  },
  {
    num: "07",
    title: "International Yoga Day Clinics",
    category: "Holistic Wellness & Screenings",
    video: "",
    image: "/portrait_volunteer.png",
    isVideo: false,
  },
  {
    num: "08",
    title: "Dr. Ambedkar Jayanti Book Drive",
    category: "Student Kits & Academic Honors",
    video: "",
    image: "/volunteer_coordinator.png",
    isVideo: false,
  },
];

export default function EventsHighlights() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isHovered = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".highlights-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Track cursor position to translate floating portal with ultra smooth timing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!portalRef.current || !isHovered.current) return;

      const portalWidth = 380;
      const portalHeight = 250;

      gsap.to(portalRef.current, {
        x: e.clientX - portalWidth / 2,
        y: e.clientY - portalHeight / 2,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    isHovered.current = true;
    setActiveIdx(idx);

    // Play active video loop if present
    const video = videoRefs.current[idx];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // Instantly set initial position to avoid jump
    if (portalRef.current) {
      const portalWidth = 380;
      const portalHeight = 250;
      gsap.set(portalRef.current, {
        x: e.clientX - portalWidth / 2,
        y: e.clientY - portalHeight / 2,
      });

      // Smooth scale & fade in
      gsap.killTweensOf(portalRef.current);
      gsap.to(portalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.4)",
      });
    }
  };

  const handleMouseLeave = (idx: number) => {
    isHovered.current = false;

    // Pause active video loop
    const video = videoRefs.current[idx];
    if (video) {
      video.pause();
    }

    // Scale portal out cleanly, clearing activeIdx only on complete
    if (portalRef.current) {
      gsap.killTweensOf(portalRef.current);
      gsap.to(portalRef.current, {
        opacity: 0,
        scale: 0.75,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          if (!isHovered.current) {
            setActiveIdx(null);
          }
        },
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      {/* Hardware-accelerated text outline style override */}
      <style>{`
        .text-outline-highlight {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.2);
          color: transparent;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .text-outline-highlight {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10 highlights-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Celebration Snapshots
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 1. Desktop Layout (Typographic list with cursor follow portal) */}
        <div className="hidden lg:block max-w-6xl mx-auto border-t border-black/10">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="group relative flex items-center justify-between py-12 border-b border-black/10 cursor-pointer select-none transition-all duration-300 px-4"
            >
              {/* Suffix Number & Title */}
              <div className="flex items-center gap-8">
                <span className="text-sm font-black text-slate-grey font-heading tracking-widest uppercase block select-none">
                  {item.num}
                </span>
                <h3 className="text-3xl xl:text-5xl font-extrabold text-outline-highlight font-heading tracking-tight select-none">
                  {item.title}
                </h3>
              </div>

              {/* Category Tag */}
              <span className="text-xs font-bold uppercase tracking-widest text-slate-grey opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-4 select-none font-sans">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Mobile & Tablet Fallback Interface (Stacked visual cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-8 max-w-4xl mx-auto">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className="relative rounded-block overflow-hidden min-h-[300px] flex flex-col justify-between p-8 border border-black/5 shadow-md bg-cover bg-center"
              style={!item.isVideo ? { backgroundImage: `url('${item.image}')` } : {}}
            >
              {item.isVideo && (
                <video
                  src={getCDNUrl(item.video)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                />
              )}
              <div className="absolute inset-0 bg-neutral-900/45 z-0 pointer-events-none" />

              {/* Category tag */}
              <div className="relative z-10 flex justify-between items-center mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-white backdrop-blur-sm border border-white/20">
                  {item.category}
                </span>
                <span className="text-xs text-saffron font-bold tracking-widest uppercase font-heading select-none">
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl sm:text-2xl font-black text-white font-heading select-none leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Visual Portal Element (Desktop Cursor Follower) */}
      <div
        ref={portalRef}
        className="hidden lg:flex pointer-events-none fixed z-50 w-[380px] h-[250px] rounded-block overflow-hidden opacity-0 scale-75 shadow-2xl border-4 border-white bg-neutral-950 shadow-saffron/15 select-none items-center justify-center"
        style={{ left: 0, top: 0 }}
      >
        {HIGHLIGHTS.map((item, index) => {
          const isSelected = activeIdx === index;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none select-none ${
                isSelected ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.isVideo ? (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={getCDNUrl(item.video)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              ) : (
                <div
                  className="w-full h-full bg-cover bg-center pointer-events-none select-none"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
