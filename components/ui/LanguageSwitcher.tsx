"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "header" | "drawer" | "floating";
  className?: string;
}

const LANGUAGES: { code: Language; shortLabel: string; fullLabel: string }[] = [
  { code: "en", shortLabel: "EN", fullLabel: "English" },
  { code: "mr", shortLabel: "म", fullLabel: "मराठी" },
  { code: "hi", shortLabel: "हिं", fullLabel: "हिंदी" },
];

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Header Variant: Small Circular button so it fits effortlessly in phone preview
  if (variant === "header") {
    return (
      <div ref={containerRef} className={cn("relative inline-block select-none", className)}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-saffron/25 dark:border-white/20 hover:border-saffron/60 dark:hover:border-saffron/60 shadow-md flex items-center justify-center text-xs font-bold text-neutral-900 dark:text-neutral-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none relative group"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Language Selector"
          title={`Language: ${currentLang.fullLabel}`}
        >
          <span className="font-heading font-normal text-[11px] sm:text-xs tracking-wider uppercase group-hover:text-saffron transition-colors">
            {currentLang.shortLabel}
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-36 bg-white/98 dark:bg-neutral-900/98 backdrop-blur-xl border border-saffron/20 dark:border-white/10 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none space-y-1"
            role="menu"
            aria-orientation="vertical"
          >
            {LANGUAGES.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer",
                    isActive
                      ? "bg-saffron text-white shadow-xs"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-saffron/10 dark:hover:bg-neutral-800 hover:text-saffron"
                  )}
                  role="menuitem"
                >
                  <span>{lang.fullLabel}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded",
                      isActive ? "bg-white/20 text-white font-bold" : "bg-black/5 text-neutral-600"
                    )}
                  >
                    {lang.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Drawer Variant: Full touch targets for mobile/drawer menu with spacious gap
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 select-none w-full",
        className
      )}
      role="group"
      aria-label="Language Selector"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "flex-1 py-2.5 px-2.5 sm:px-3 text-xs font-bold font-sans tracking-wide rounded-xl transition-all duration-200 cursor-pointer text-center",
              isActive
                ? "bg-saffron text-white shadow-md scale-[1.02]"
                : "text-neutral-700 hover:text-neutral-900 hover:bg-black/5"
            )}
          >
            {lang.fullLabel}
          </button>
        );
      })}
    </div>
  );
}
