"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { ALL_EVENTS } from "@/lib/events-data";

export default function PastEventsArchive() {
  const pastEvents = ALL_EVENTS.filter((e) => e.status === "completed");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest border border-saffron/20">
          <History className="w-3.5 h-3.5" /> Historical Archive
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 tracking-tight uppercase">
          PAST EVENTS & <span className="text-saffron">COMMUNITY IMPACT</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-grey font-medium leading-relaxed">
          A retrospective showcase of our past cultural rallies, food relief drives, and music workshops that empowered local communities.
        </p>
      </div>

      {/* Grid of Bright Past Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pastEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white text-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl hover:border-saffron/40 flex flex-col justify-between group transition-all duration-500"
          >
            <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
              <Image
                src={event.mainImage}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-md">
                Completed
              </span>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-lg font-bold font-heading text-neutral-900 group-hover:text-saffron transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-neutral-600 font-normal line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-xs">
                {event.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-center">
                    <span className="font-extrabold text-saffron block font-heading">{m.value}</span>
                    <span className="text-[10px] text-neutral-500 font-medium block truncate">{m.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/events/${event.id}`}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
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
