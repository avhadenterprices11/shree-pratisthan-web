"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Info, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryItem } from "@/app/gallery/gallery-data";
import { getLocalizedGalleryItem } from "@/lib/gallery-i18n";

export default function GalleryDetailContent({ item }: { item: GalleryItem }) {
  const { t, language } = useLanguage();
  const localizedItem = getLocalizedGalleryItem(item, language);

  return (
    <main className="min-h-screen pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-28 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-transparent">
      {/* Decorative ambient backgrounds */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-1/3 opacity-60" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        {/* Navigation Link back */}
        <div className="mb-6 sm:mb-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-saffron hover:text-saffron/85 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors duration-300 group font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            {t("galleryPage.detail.backToGallery")}
          </Link>
        </div>

        {/* Details Wrapper */}
        <div className="glass-panel p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 relative overflow-hidden bg-white/75 dark:bg-[#121214] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-block border border-saffron/10 dark:border-white/10 shadow-lg bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={localizedItem.src}
                alt={localizedItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {/* Header section tags */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border border-saffron/20 shadow-sm font-sans">
                  <Tag className="w-3 h-3" />
                  {localizedItem.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-300 font-bold text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border border-slate-200/60 dark:border-white/10 shadow-sm font-sans">
                  <Calendar className="w-3 h-3" />
                  {localizedItem.date}
                </span>
                {localizedItem.metric && (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-800/40 shadow-sm font-sans">
                    <Award className="w-3 h-3" />
                    {localizedItem.metric}
                  </span>
                )}
              </div>

              <h1 className="text-[32px] sm:text-4xl font-normal text-neutral-900 dark:text-neutral-100 leading-tight font-heading uppercase">
                {localizedItem.title}
              </h1>

              {/* Description quote block */}
              <div className="flex gap-3 border-l-4 border-saffron pl-3 sm:pl-4 py-1">
                <p className="text-base sm:text-lg font-normal text-slate-800 dark:text-neutral-200 italic leading-relaxed font-heading">
                  {localizedItem.description}
                </p>
              </div>

              {/* Event overview detailed text */}
              <div className="border-t border-saffron/10 dark:border-white/10 pt-4 sm:pt-6">
                <h2 className="text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading mb-2 sm:mb-3 flex items-center gap-2 uppercase">
                  <Info className="w-4 h-4 text-saffron" />
                  {t("galleryPage.detail.overviewHeading")}
                </h2>
                <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] sm:relaxed whitespace-pre-line font-sans font-normal">
                  {localizedItem.details}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
