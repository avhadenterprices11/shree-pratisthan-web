"use client";

import React from "react";
import { Sparkles, Calendar, HeartPulse, Leaf, Gift, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AllEventsFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
}

const CATEGORIES = [
  { id: "all", label: "All Events", icon: Sparkles },
  { id: "cultural", label: "Cultural Festivals", icon: Calendar },
  { id: "sports", label: "Sports & Competitions", icon: Trophy },
  { id: "health", label: "Health & Medical Camps", icon: HeartPulse },
  { id: "eco", label: "Ecological Drives", icon: Leaf },
  { id: "charity", label: "Social & Relief Work", icon: Gift },
];

export default function AllEventsFilter({
  selectedCategory,
  onSelectCategory,
  counts,
}: AllEventsFilterProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8">
      {/* Flex Wrap Container - Zero Clipping on Any Screen */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-2 px-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "group flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border shadow-sm",
                isSelected
                  ? "bg-saffron text-white border-saffron ring-4 ring-saffron/20 shadow-md scale-105"
                  : "bg-white text-neutral-800 border-neutral-200 hover:border-saffron/40 hover:bg-neutral-50 hover:scale-[1.02]"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isSelected ? "text-white" : "text-saffron")} />
              <span>{cat.label}</span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono",
                  isSelected ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
