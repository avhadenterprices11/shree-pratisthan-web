"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Eye, FileText, FolderDown, ShieldCheck, Sparkles } from "lucide-react";
import { PRESS_KIT_ASSETS } from "@/lib/press-data";

export default function PressKit() {
  return (
    <section id="press-kit" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-saffron" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
              OFFICIAL ASSETS &amp; BRAND RESOURCES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
            Press Kit
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl">
            Official brand emblems, verified trust seals, high-resolution leadership portraits, and organizational factsheets available for journalists, partners, and media publications.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS_KIT_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-2xl sm:rounded-block overflow-hidden bg-white/70 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 hover:border-saffron/40 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Visual Preview / Emblem Frame */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-[#1A1A1E] border border-neutral-200 dark:border-white/5 flex items-center justify-center p-4">
                  {asset.previewUrl ? (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <Image
                        src={asset.previewUrl}
                        alt={asset.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                      <FileText className="w-8 h-8" />
                    </div>
                  )}

                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-neutral-900/80 text-white font-bold">
                    {asset.fileFormat}
                  </span>
                </div>

                {/* Meta Labels */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-saffron font-sans">
                    {asset.category}
                  </span>
                  <h3 className="text-base font-heading font-medium tracking-tight text-neutral-900 dark:text-white group-hover:text-saffron transition-colors mt-1">
                    {asset.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-1.5 leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              </div>

              {/* Asset Action Footer */}
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-mono">
                  {asset.fileSize}
                </span>

                <a
                  href={asset.downloadUrl}
                  download={asset.previewUrl ? true : undefined}
                  target={asset.previewUrl ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-saffron/10 hover:bg-saffron text-saffron hover:text-white border border-saffron/30 hover:border-saffron text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer font-sans"
                >
                  {asset.previewUrl ? (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Factsheet</span>
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Press Usage Advisory Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-saffron shrink-0" />
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
              All logos, emblems, and photographs are registered assets of <span className="font-semibold text-neutral-900 dark:text-white">Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha</span> (Reg: nashik/0000153/2018). Media use permitted with attribution.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-saffron hover:underline font-sans"
          >
            Read Governance &amp; Registration &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
