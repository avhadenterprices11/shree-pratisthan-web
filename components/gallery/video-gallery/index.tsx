"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedVideos } from "@/app/gallery/gallery-data";

gsap.registerPlugin(ScrollTrigger);

export default function VideoGallery() {
  const { t, language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const localizedVideos = getLocalizedVideos(language);

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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("galleryPage.videoGallery.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {localizedVideos.map((item, index) => (
            <div 
              key={index}
              onClick={() => setActiveVideo({ title: item.title, src: item.src })}
              className="video-card glass-panel rounded-2xl sm:rounded-block overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-saffron/10 dark:border-white/10 bg-white dark:bg-[#121214]"
              data-hover="pointer"
            >
              {/* Visual wrapper */}
              <div className="h-[180px] sm:h-[200px] relative overflow-hidden flex items-center justify-center select-none bg-neutral-900">
                <Image 
                  src={item.poster || item.thumbnail || "/events_ganeshotsav_2024_jejuri.jpg"} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/80 text-saffron font-bold text-xs uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-saffron/20 dark:border-saffron/40 shadow-sm backdrop-blur-sm font-sans">
                  {item.category}
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center text-saffron shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current stroke-current ml-1" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-4 sm:p-5 bg-white dark:bg-[#121214] border-t border-saffron/10 dark:border-white/10 flex flex-col justify-between flex-grow relative z-20 space-y-2">
                <h3 className="text-lg font-normal text-neutral-900 dark:text-neutral-100 font-heading group-hover:text-saffron transition-colors leading-snug line-clamp-2 uppercase">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-slate-grey dark:text-neutral-400 font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase pt-2 border-t border-neutral-100 dark:border-white/10 font-sans">
                  <span>{item.location || "Nashik"}</span>
                  <span className="text-saffron">{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-4xl rounded-2xl sm:rounded-block bg-neutral-900 border border-white/10 p-3 sm:p-4 relative shadow-2xl flex flex-col gap-3 sm:gap-4">
            <div className="flex justify-between items-center text-white border-b border-white/10 pb-2">
              <h3 className="text-lg sm:text-xl font-normal font-heading text-saffron uppercase">{activeVideo.title}</h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-saffron font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors focus:outline-none cursor-pointer flex items-center gap-1.5 font-sans"
              >
                ✕ {t("galleryPage.videoGallery.close")}
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
