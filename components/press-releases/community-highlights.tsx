"use client";

import React from "react";
import Link from "next/image";
import Image from "next/image";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { COMMUNITY_HIGHLIGHTS } from "@/lib/press-data";
import LinkComponent from "next/link";

export default function CommunityHighlights() {
  return (
    <section id="community-highlights" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-neutral-200 dark:border-white/10 pb-6 sm:pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-saffron" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
                GROUND-LEVEL IMPACT &amp; CELEBRATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              Event &amp; Community Highlights
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-xl">
              Connecting official press records with our living cultural celebrations and grassroots public welfare drives in Indira Nagar, Nashik.
            </p>
          </div>

          <LinkComponent
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-saffron hover:text-saffron/80 transition-colors font-sans self-start md:self-end"
          >
            <span>View Complete Photo Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </LinkComponent>
        </div>

        {/* Editorial Visual Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMUNITY_HIGHLIGHTS.map((item, index) => (
            <article
              key={item.id}
              className={`group relative rounded-2xl sm:rounded-block overflow-hidden bg-white/70 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 hover:border-saffron/40 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md flex flex-col justify-between ${
                index === 0 ? "md:col-span-2 lg:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Media Asset */}
              <div className={`relative w-full overflow-hidden bg-neutral-900 ${
                index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
              }`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-saffron border border-saffron/30 font-sans">
                    {item.category}
                  </span>
                </div>

                {/* Metric Bottom Right if available */}
                {item.statsValue && (
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-right border border-white/10">
                    <p className="text-[11px] font-heading font-bold text-gold">
                      {item.statsValue}
                    </p>
                    <p className="text-[8px] uppercase tracking-wider text-white/60 font-sans">
                      {item.statsLabel}
                    </p>
                  </div>
                )}
              </div>

              {/* Text Description */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-saffron" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-medium tracking-tight text-neutral-900 dark:text-white leading-snug group-hover:text-saffron transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                  <LinkComponent
                    href={item.actionUrl}
                    className="inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-[0.14em] text-saffron hover:text-saffron/80 transition-colors font-sans"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </LinkComponent>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
