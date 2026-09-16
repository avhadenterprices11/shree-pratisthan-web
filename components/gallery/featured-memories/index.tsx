"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FEATURED_MEMORIES } from "@/app/gallery/gallery-data";
import { getLocalizedGalleryItem } from "@/lib/gallery-i18n";

gsap.registerPlugin(ScrollTrigger);

function MemoryCard({ 
  id,
  title, 
  category, 
  date, 
  metric, 
  src,
  readStoryText,
}: { 
  id: string;
  title: string; 
  category: string; 
  date: string; 
  metric: string; 
  src: string; 
  readStoryText: string;
}) {
  return (
    <Link href={`/gallery/${id}`} className="block group">
      <div className="glass-panel overflow-hidden rounded-2xl sm:rounded-block flex flex-col h-auto min-h-[360px] sm:h-[400px] hover:shadow-2xl transition-all duration-500 bg-white/70 dark:bg-[#121214] border border-saffron/15 dark:border-white/10 hover:border-saffron/30 hover:scale-[1.02]">
        
        {/* Card Image */}
        <div className="relative h-[180px] sm:h-[200px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-saffron/10 dark:border-white/10">
          <Image 
            src={src} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-white/95 dark:bg-[#18181b] text-saffron font-bold text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-saffron/20 dark:border-white/10 shadow-sm font-sans">
            {category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
          <div>
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-bold tracking-[0.2em] uppercase block mb-1 font-sans">
              {date}
            </span>
            <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 leading-snug font-heading group-hover:text-saffron transition-colors duration-300 uppercase">
              {title}
            </h3>
          </div>

          <div className="border-t border-saffron/10 dark:border-white/10 pt-3 sm:pt-4 flex justify-between items-center text-xs text-saffron font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] mt-auto font-sans">
            <span>{metric}</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
              {readStoryText} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedMemories() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-mem-card",
        { opacity: 0, y: 35 },
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
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("galleryPage.featured.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-[1600px] w-full mx-auto">
          {FEATURED_MEMORIES.map((memory) => {
            const localized = getLocalizedGalleryItem(memory, language);
            return (
              <div key={memory.id} className="featured-mem-card">
                <MemoryCard
                  id={localized.id}
                  title={localized.title}
                  category={localized.category}
                  date={localized.date}
                  metric={localized.metric || t("galleryPage.featured.communityDrive")}
                  src={localized.src}
                  readStoryText={t("galleryPage.featured.readStory")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
