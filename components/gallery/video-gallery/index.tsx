"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { 
    title: "Gudipadwa Swagat Yatra & Lezim Parades",
    category: "Cultural Heritage",
    location: "Indira Nagar, Nashik",
    duration: "2:15", 
    src: "/festival_celebration.mp4", 
    poster: "/gallery_dhol_tasha_camps.png" 
  },
  { 
    title: "Shree Ganeshotsav Grand Maha Aarti & Parades",
    category: "Devotional Festival",
    location: "Indira Nagar, Nashik",
    duration: "2:40", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_ganeshotsav_aarthi.png" 
  },
  { 
    title: "50+ Blood Donation & Health Camp Drives",
    category: "Healthcare Seva",
    location: "Nashik Civil Hospital Partner",
    duration: "1:55", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_medical.png" 
  },
  { 
    title: "Annual 32-Team Cricket Championship",
    category: "Sports Tournament",
    location: "Indira Nagar Ground, Nashik",
    duration: "2:10", 
    src: "/Create_a_cinematic_second_h.mp4", 
    poster: "/gallery_dahi_handi_pyramids.png" 
  },
  { 
    title: "Shiv Jayanti Mardani Khel & Youth Rallies",
    category: "Martial Arts & History",
    location: "Indira Nagar, Nashik",
    duration: "2:30", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_shiv_jayanti_rally.png" 
  },
  { 
    title: "Navratri Raas Dandiya & Garba Celebrations",
    category: "Folk Traditions",
    location: "Indira Nagar, Nashik",
    duration: "2:05", 
    src: "/festival_celebration.mp4", 
    poster: "/gallery_navratri_garba.png" 
  },
  { 
    title: "Vasundhara Tree Plantation & Eco Drives",
    category: "Environmental Seva",
    location: "Nashik Green Avenues",
    duration: "1:45", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_eco.png" 
  },
  { 
    title: "Student Study Kits & Educational Aid Drive",
    category: "Education Relief",
    location: "Nashik Municipal Schools",
    duration: "1:50", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_coordinator.png" 
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".video-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Video Reels &amp; Event Footage
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VIDEOS.map((item, index) => (
            <div 
              key={index}
              onClick={() => setActiveVideo({ title: item.title, src: item.src })}
              className="video-card glass-panel rounded-block overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              data-hover="pointer"
            >
              {/* Visual wrapper */}
              <div className="h-[200px] relative overflow-hidden flex items-center justify-center text-7xl select-none">
                <Image 
                  src={item.poster} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 text-saffron font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-saffron/20 shadow-sm backdrop-blur-sm">
                  {item.category}
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-saffron shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 fill-current stroke-current ml-1" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-5 bg-white border-t border-saffron/10 flex flex-col justify-between flex-grow relative z-20 space-y-2">
                <h3 className="text-sm sm:text-base font-extrabold text-foreground font-heading group-hover:text-saffron transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-[10px] text-slate-grey font-bold tracking-widest uppercase pt-2 border-t border-neutral-100">
                  <span>{item.location}</span>
                  <span className="text-saffron">{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="w-full max-w-4xl rounded-block bg-neutral-900 border border-white/10 p-4 relative shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center text-white border-b border-white/10 pb-2">
              <h3 className="text-lg sm:text-xl font-extrabold font-heading text-saffron">{activeVideo.title}</h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-saffron font-bold text-sm tracking-widest uppercase transition-colors focus:outline-none cursor-pointer flex items-center gap-1.5"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/5 shadow-inner">
              <video 
                src={activeVideo.src} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
