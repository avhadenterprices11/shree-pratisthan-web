"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { ALL_EVENTS } from "@/lib/events-data";

export default function PastEventsArchive() {
  const pastEvents = ALL_EVENTS.filter((e) => e.status === "completed");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-saffron/10 text-saffron font-bold text-[9px] sm:text-xs uppercase tracking-[0.2em] border border-saffron/20 font-sans">
          <History className="w-3.5 h-3.5" /> Historical Archive
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal font-heading text-neutral-900 dark:text-neutral-100 tracking-tight uppercase">
          PAST EVENTS &amp; <span className="text-saffron font-heading">COMMUNITY IMPACT</span>
        </h2>
        <p className="text-xs sm:text-base text-slate-grey dark:text-neutral-300 font-normal leading-[1.7] sm:leading-[1.75] font-sans">
          A retrospective showcase of our past cultural rallies, food relief drives, and music workshops that empowered local communities.
        </p>
      </div>

      {/* Grid of Bright Past Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {pastEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-[#121214] text-neutral-900 dark:text-neutral-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-saffron/40 flex flex-col justify-between group transition-all duration-500"
          >
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={event.mainImage}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 bg-amber-500 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-full shadow-md font-sans">
                Completed
              </span>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="text-base sm:text-lg font-normal font-heading text-neutral-900 dark:text-neutral-100 group-hover:text-saffron transition-colors uppercase">
                  {event.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal line-clamp-2 leading-[1.6] font-sans">
                  {event.description}
                </p>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-white/10 text-xs">
                {event.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-2 sm:p-2.5 bg-neutral-50 dark:bg-[#18181b] rounded-xl border border-neutral-200/80 dark:border-white/10 text-center">
                    <span className="font-normal text-saffron block font-heading">{m.value}</span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 font-normal block truncate font-sans">{m.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/events/${event.id}`}
                className="w-full py-2 sm:py-2.5 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-neutral-900 border border-neutral-800 dark:border-white/10 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-center transition-all flex items-center justify-center gap-1.5 shadow-sm font-sans"
              >
                Details <ArrowRight className="w-3.5 h-3.5 text-saffron" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
