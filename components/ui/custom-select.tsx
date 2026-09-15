"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  id?: string;
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function CustomSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select option...",
  className,
  icon,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = options[selectedIndex];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, options, selectedIndex, highlightedIndex, onChange]
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} onKeyDown={handleKeyDown}>
      {/* Custom Select Trigger Button */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
          }
        }}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-[#18181b] border rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-left select-none",
          isOpen
            ? "border-saffron ring-4 ring-saffron/10 shadow-lg text-neutral-900 dark:text-neutral-100"
            : "border-neutral-200 dark:border-white/15 hover:border-saffron/60 text-neutral-900 dark:text-neutral-100 hover:shadow-xs shadow-xs"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon && (
            <span className="w-8 h-8 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
              {icon}
            </span>
          )}
          <span className="truncate text-neutral-900 dark:text-neutral-100 font-sans">
            {selectedOption ? selectedOption.label : <span className="text-slate-400 dark:text-neutral-500 font-normal">{placeholder}</span>}
          </span>
        </div>

        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-2",
            isOpen ? "rotate-180 bg-saffron text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
          )}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Custom Popover Options Menu (Apple-Inspired Floating Menu) */}
      {isOpen && (
        <div
          ref={optionsListRef}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white/98 dark:bg-[#18181b] backdrop-blur-2xl border border-black/10 dark:border-white/15 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.16)] z-50 overflow-hidden p-1.5 max-h-64 overflow-y-auto animate-in fade-in zoom-in-98 duration-150"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightedIndex;

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-sans transition-all duration-150 cursor-pointer select-none mb-0.5 last:mb-0",
                  isSelected
                    ? "bg-saffron text-white font-bold shadow-xs"
                    : isHighlighted
                    ? "bg-saffron/10 text-saffron font-medium"
                    : "text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  {opt.icon && (
                    <span className={cn("shrink-0", isSelected ? "text-white" : "text-saffron")}>
                      {opt.icon}
                    </span>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="truncate leading-snug">{opt.label}</span>
                    {opt.sublabel && (
                      <span
                        className={cn(
                          "text-[10px] truncate mt-0.5",
                          isSelected ? "text-white/80" : "text-slate-400 font-normal"
                        )}
                      >
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
