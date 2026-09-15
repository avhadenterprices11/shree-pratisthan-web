"use client";

import React from "react";
import { ArrowRight, Bell, Calendar, ChevronRight } from "lucide-react";
import { OfficialAnnouncement, OFFICIAL_ANNOUNCEMENTS } from "@/lib/press-data";

interface OfficialStatementsProps {
  onSelectAnnouncement: (announcement: OfficialAnnouncement) => void;
}

export default function OfficialStatements({ onSelectAnnouncement }: OfficialStatementsProps) {
  return (
    <section id="official-statements" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-saffron" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
              FORMAL TRUST NOTICES &amp; COMMUNICATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            Official Statements &amp; Announcements
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl">
            Official public notices, schedule advisories, and administrative circulars issued directly by the leadership and governing body of Shree Pratisthan.
          </p>
        </div>

        {/* Editorial Structured List Wrapper */}
        <div className="rounded-2xl sm:rounded-block overflow-hidden bg-white/70 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 shadow-xl backdrop-blur-xl divide-y divide-neutral-200 dark:divide-white/10">
          
          {/* Table Header (Desktop only) */}
          <div className="hidden md:grid md:grid-cols-12 px-6 py-4 bg-neutral-100/70 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-sans">
            <div className="col-span-2">Date</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-6">Subject / Notice Title</div>
            <div className="col-span-1 text-right">Details</div>
          </div>

          {/* Statement Rows */}
          {OFFICIAL_ANNOUNCEMENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAnnouncement(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectAnnouncement(item);
                }
              }}
              className="group p-5 sm:p-6 transition-colors duration-200 hover:bg-neutral-100/80 dark:hover:bg-white/[0.03] cursor-pointer focus:outline-none focus:bg-neutral-100/90 dark:focus:bg-white/[0.05]"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-12 items-center gap-4">
                
                {/* Date */}
                <div className="col-span-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-saffron shrink-0" />
                  <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-wider">
                    {item.monthDay} {item.year}
                  </span>
                </div>

                {/* Category */}
                <div className="col-span-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest font-sans ${
                    item.category === "ANNOUNCEMENT"
                      ? "bg-saffron/15 text-saffron border border-saffron/30"
                      : item.category === "PUBLIC NOTICE"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "bg-gold/15 text-gold border border-gold/30"
                  }`}>
                    {item.priority === "urgent" && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                    {item.category}
                  </span>
                </div>

                {/* Title & Short Excerpt */}
                <div className="col-span-6 pr-4 space-y-1">
                  <h3 className="text-sm sm:text-base font-heading font-medium tracking-tight text-neutral-900 dark:text-white group-hover:text-saffron transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans line-clamp-1">
                    {item.summary}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-1 text-right">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-transparent group-hover:bg-saffron text-neutral-400 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>

              {/* Mobile Layout (Stacked Card) */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest font-sans ${
                    item.category === "ANNOUNCEMENT"
                      ? "bg-saffron/15 text-saffron border border-saffron/30"
                      : item.category === "PUBLIC NOTICE"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : "bg-gold/15 text-gold border border-gold/30"
                  }`}>
                    {item.category}
                  </span>

                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    {item.monthDay} {item.year}
                  </span>
                </div>

                <h3 className="text-sm font-heading font-medium text-neutral-900 dark:text-white group-hover:text-saffron transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans line-clamp-2">
                  {item.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-saffron font-sans">
                  <span>View Full Statement</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
