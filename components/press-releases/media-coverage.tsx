"use client";

import React from "react";
import Link from "next/link";
import { Newspaper, Mail, Phone, ExternalLink, ShieldCheck } from "lucide-react";

export default function MediaCoverage() {
  return (
    <section id="media-coverage" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-saffron" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
              EXTERNAL PUBLICATIONS &amp; PRESS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            Media Coverage
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl">
            External news reporting, regional newspaper coverage, and media publications documenting Shree Pratisthan&apos;s cultural and social welfare activities.
          </p>
        </div>

        {/* Sophisticated Editorial Empty State Container */}
        <div className="rounded-2xl sm:rounded-block overflow-hidden bg-white/70 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 p-8 sm:p-12 md:p-16 shadow-xl backdrop-blur-xl relative">
          
          {/* Ambient Corner Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            
            {/* Gazette Icon Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-saffron/10 border border-saffron/25 flex items-center justify-center text-saffron shadow-inner">
              <Newspaper className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-saffron" />
              <span>Official Media Archive in Verification</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-neutral-900 dark:text-white">
              Media Coverage Archive Coming Soon
            </h3>

            {/* Respectful & Professional Description */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
              Newspaper clippings, print publications, and broadcast interviews featuring Shree Pratisthan&apos;s social welfare campaigns and Ganeshotsav milestones are currently being cataloged by our administrative desk. Verified regional press links will be published here directly as they are archived.
            </p>

            {/* Press Inquiry Card inside Empty State */}
            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-[#161619] border border-neutral-200 dark:border-white/10 text-left space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron font-sans">
                  Accredited Press &amp; Journalists
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  PRESS DESK NASHIK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans">
                Are you a journalist, media representative, or editorial correspondent seeking verified archival information, interviews, or high-resolution photography regarding Shree Pratisthan?
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <a
                  href="mailto:Info@shreepratishthan.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-saffron hover:bg-saffron/90 text-white text-xs font-bold uppercase tracking-wider transition-colors font-sans"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Media Desk</span>
                </a>
                <a
                  href="tel:+919922786608"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-300 dark:border-white/15 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors font-sans"
                >
                  <Phone className="w-3.5 h-3.5 text-saffron" />
                  <span>Call +91 9922786608</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
