"use client";

import React from "react";
import { Sparkles, Calendar, HeartPulse, Leaf, Gift, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface AllEventsFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  counts: Record<string, number>;
}

export default function AllEventsFilter({
  selectedCategory,
  onSelectCategory,
  counts,
}: AllEventsFilterProps) {
  const { t } = useLanguage();

  const CATEGORIES = [
    { id: "all", label: t("eventsPage.allEvents.all"), icon: Sparkles },
    { id: "cultural", label: t("eventsPage.allEvents.cultural"), icon: Calendar },
    { id: "sports", label: t("eventsPage.allEvents.sports"), icon: Trophy },
    { id: "health", label: t("eventsPage.allEvents.health"), icon: HeartPulse },
    { id: "eco", label: t("eventsPage.allEvents.eco"), icon: Leaf },
    { id: "charity", label: t("eventsPage.allEvents.charity"), icon: Gift },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 my-4 sm:my-8">
      {/* Flex Wrap Container - Zero Clipping on Any Screen */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 py-1 sm:py-2 px-1">
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
                "group flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-300 whitespace-nowrap cursor-pointer border shadow-sm font-sans",
                isSelected
                  ? "bg-saffron text-white border-saffron ring-2 sm:ring-4 ring-saffron/20 shadow-md scale-105"
                  : "bg-white dark:bg-[#18181b] text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10 hover:border-saffron/40 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:scale-[1.02]"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 shrink-0", isSelected ? "text-white" : "text-saffron")} />
              <span>{cat.label}</span>
              <span
                className={cn(
                  "px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-mono",
                  isSelected ? "bg-white/20 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10"
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
