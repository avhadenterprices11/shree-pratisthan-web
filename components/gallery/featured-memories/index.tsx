"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function MemoryCard({ 
  id,
  title, 
  category, 
  date, 
  metric, 
  src
}: { 
  id: string;
  title: string; 
  category: string; 
  date: string; 
  metric: string; 
  src: string;
}) {
  return (
    <Link href={`/gallery/${id}`} className="block group">
      <div className="glass-panel overflow-hidden rounded-block flex flex-col h-[400px] hover:shadow-2xl transition-all duration-500 bg-white/70 border border-saffron/15 hover:border-saffron/30 hover:scale-[1.02]">
        
        {/* Card Image */}
        <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100 border-b border-saffron/10">
          <Image 
            src={src} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 z-10 bg-white/95 text-saffron font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm">
            {category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase block mb-1">
              {date}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug font-heading group-hover:text-saffron transition-colors duration-300">
              {title}
            </h3>
          </div>

          <div className="border-t border-saffron/10 pt-4 flex justify-between items-center text-xs text-saffron font-bold uppercase tracking-widest mt-auto">
            <span>{metric}</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
              Read Story <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { FEATURED_MEMORIES } from "@/app/gallery/gallery-data";

export default function FeaturedMemories() {
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Memories
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] w-full mx-auto">
          {FEATURED_MEMORIES.map((memory) => (
            <div key={memory.id} className="featured-mem-card">
              <MemoryCard
                id={memory.id}
                title={memory.title}
                category={memory.category}
                date={memory.date}
                metric={memory.metric || "Community Drive"}
                src={memory.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
