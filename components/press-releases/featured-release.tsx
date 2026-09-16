"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { PressRelease } from "@/lib/press-data";

interface FeaturedReleaseProps {
  release: PressRelease;
  onReadFullRelease: (release: PressRelease) => void;
}

export default function FeaturedRelease({ release, onReadFullRelease }: FeaturedReleaseProps) {
  return (
    <section id="featured-release" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Heading Tag */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-[2px] bg-saffron" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
            LATEST OFFICIAL RELEASE
          </h2>
        </div>

        {/* Asymmetric Featured Editorial Card */}
        <div className="group relative rounded-2xl sm:rounded-block overflow-hidden bg-white/80 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 hover:border-saffron/40 shadow-2xl transition-all duration-500 backdrop-blur-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Feature Image (Col 7) */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] w-full overflow-hidden bg-neutral-950">
              <Image
                src={release.image}
                alt={release.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-saffron text-white shadow-lg flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-3 h-3" />
                  {release.officialBadge || "FEATURED COMMUNIQUE"}
                </span>
              </div>

              {/* Mobile overlay metadata preview */}
              <div className="absolute bottom-4 left-4 right-4 lg:hidden z-10 text-white">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5 text-saffron" />
                  {release.date}
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Copy (Col 5) */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4 sm:space-y-5">
                {/* Category & Date Desktop Bar */}
                <div className="hidden lg:flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-sans border-b border-neutral-200 dark:border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-saffron/10 text-saffron border border-saffron/20">
                    {release.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-saffron" />
                    <span>{release.date}</span>
                  </div>
                </div>

                {/* Release Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium tracking-tight text-neutral-900 dark:text-white leading-snug group-hover:text-saffron transition-colors duration-300">
                  {release.title}
                </h3>

                {/* Location Stamp */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-saffron shrink-0" />
                  <span>{release.location}</span>
                </div>

                {/* Short Summary */}
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed font-normal">
                  {release.summary}
                </p>

                {/* Key Bullet points if available */}
                {release.keyFacts && (
                  <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-white/10">
                    {release.keyFacts.slice(0, 2).map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Trigger */}
              <div className="pt-4 sm:pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onReadFullRelease(release)}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-saffron hover:text-saffron/80 group-hover:translate-x-1 transition-all duration-300 cursor-pointer font-sans"
                >
                  <span>Read Full Release</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono uppercase">
                  OFFICIAL DISPATCH
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
