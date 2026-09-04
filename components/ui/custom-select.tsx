"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
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
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Custom Select Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer text-left select-none",
          isOpen
            ? "border-saffron ring-2 ring-saffron/20 shadow-md"
            : "border-neutral-300 hover:border-saffron/60 text-neutral-900"
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {icon && <span className="text-saffron flex-shrink-0">{icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-saffron transition-transform duration-300 flex-shrink-0 ml-2",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Custom Popover Options Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-saffron/20 rounded-2xl shadow-2xl z-50 overflow-hidden py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none",
                  isSelected
                    ? "bg-saffron/10 text-saffron font-bold border-l-4 border-saffron"
                    : "text-neutral-800 hover:bg-saffron/5 hover:text-saffron"
                )}
              >
                <div className="flex flex-col">
                  <span>{opt.label}</span>
                  {opt.sublabel && (
                    <span className="text-[10px] text-neutral-400 font-normal">{opt.sublabel}</span>
                  )}
                </div>

                {isSelected && <Check className="w-4 h-4 text-saffron flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
