"use client";

import React from "react";

interface FiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Media" },
  { id: "festival", label: "Cultural Festivals" },
  { id: "healthcare", label: "Health & Blood Drives" },
  { id: "education", label: "Education & Seva" },
  { id: "sports", label: "Sports & Athletics" },
];

export default function GalleryFilters({ 
  activeCategory, 
  onCategoryChange 
}: FiltersProps) {
  return (
    <section className="py-8 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center flex-wrap gap-3">
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            onClick={() => onCategoryChange(item.id)}
            className={`font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full border transition-all cursor-pointer ${
              activeCategory === item.id
                ? "bg-saffron text-white border-saffron shadow-md"
                : "bg-white/40 text-slate-grey border-saffron/10 hover:border-saffron/40 hover:bg-white/60 backdrop-blur-sm"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
