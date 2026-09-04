"use client";

import React from "react";
import { Check, User, Calendar, MapPin, ClipboardCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number; // 1 to 3
  onStepClick: (step: number) => void;
  maxStepReached: number;
}

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Booking Slot", icon: Calendar },
  { id: 3, label: "Review & Confirm", icon: ClipboardCheck },
];

export default function StepProgress({
  currentStep,
  onStepClick,
  maxStepReached,
}: StepProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-2">
      {/* Progress Bar Header */}
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-neutral-200 dark:bg-neutral-800 -z-10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-saffron via-marigold to-saffron transition-all duration-500 rounded-full"
            style={{
              width: `${((Math.min(currentStep, 5) - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = step.id <= maxStepReached;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={cn(
                "group relative flex flex-col items-center focus:outline-none transition-all duration-300",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300 shadow-md border-2",
                  isCompleted
                    ? "bg-saffron text-white border-saffron shadow-saffron/20 scale-100"
                    : isCurrent
                    ? "bg-white text-saffron border-saffron ring-4 ring-saffron/15 scale-110 shadow-lg"
                    : "bg-white text-neutral-400 border-neutral-300"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-[10px] md:text-xs font-semibold tracking-wide transition-colors duration-300 text-center max-w-[70px] md:max-w-none",
                  isCurrent
                    ? "text-saffron font-bold"
                    : isCompleted
                    ? "text-neutral-800 font-medium"
                    : "text-neutral-400"
                )}
              >
                Step {step.id}
                <span className="hidden sm:inline"> • {step.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
