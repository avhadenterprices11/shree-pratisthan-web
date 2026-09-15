"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface FiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GalleryFilters({ 
  activeCategory, 
  onCategoryChange 
}: FiltersProps) {
  const { t } = useLanguage();

  const CATEGORIES = [
    { id: "all", label: t("galleryPage.filters.allMedia") },
    { id: "festival", label: t("galleryPage.filters.culturalFestivals") },
    { id: "healthcare", label: t("galleryPage.filters.healthBloodDrives") },
    { id: "education", label: t("galleryPage.filters.educationSeva") },
    { id: "sports", label: t("galleryPage.filters.sportsAthletics") },
  ];
  return (
    <section className="py-4 sm:py-8 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-center flex-wrap gap-2 sm:gap-3">
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            onClick={() => onCategoryChange(item.id)}
            className={`font-bold text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all cursor-pointer font-sans ${
              activeCategory === item.id
                ? "bg-saffron text-white border-saffron shadow-md"
                : "bg-white/40 dark:bg-[#121214] text-slate-grey dark:text-neutral-300 border-saffron/10 dark:border-white/10 hover:border-saffron/40 dark:hover:border-white/20 hover:bg-white/60 dark:hover:bg-[#18181b] backdrop-blur-sm"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
