"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "header" | "drawer";
  className?: string;
}

export function ThemeToggle({ variant = "header", className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (variant === "drawer") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none",
          isDark
            ? "bg-neutral-900/90 border-saffron/40 text-neutral-100 hover:border-saffron"
            : "bg-white/90 border-neutral-200 text-neutral-800 hover:border-saffron",
          className
        )}
        aria-label="Toggle Theme"
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-saffron fill-saffron/20" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          )}
          <span>{isDark ? "Dark Theme" : "Light Theme"}</span>
        </span>
        <span className="text-[10px] text-slate-400 font-normal lowercase">
          {isDark ? "active" : "active"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md border shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none relative group select-none",
        isDark
          ? "bg-neutral-900/95 border-saffron/40 hover:border-saffron text-neutral-100"
          : "bg-white/95 border-saffron/25 hover:border-saffron/60 text-neutral-800",
        className
      )}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-700 group-hover:text-saffron group-hover:-rotate-12 transition-all duration-300" />
      )}
    </button>
  );
}
