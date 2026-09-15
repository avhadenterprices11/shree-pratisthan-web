"use client";

import React from "react";
import { Check, User, Calendar, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface StepProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  maxStepReached: number;
}

export default function StepProgress({
  currentStep,
  onStepClick,
  maxStepReached,
}: StepProgressProps) {
  const { t } = useLanguage();

  const STEPS = [
    { id: 1, label: t("eventsPage.booking.step1"), icon: User },
    { id: 2, label: t("eventsPage.booking.step2"), icon: Calendar },
    { id: 3, label: t("eventsPage.booking.step3"), icon: ClipboardCheck },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-2">
      {/* Progress Bar Header */}
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-neutral-200 dark:bg-neutral-800 -z-10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-saffron via-gold to-saffron transition-all duration-500 rounded-full"
            style={{
              width: `${((Math.min(currentStep, 3) - 1) / (STEPS.length - 1)) * 100}%`,
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
                    ? "bg-white dark:bg-[#121214] text-saffron border-saffron ring-4 ring-saffron/15 scale-110 shadow-lg"
                    : "bg-white dark:bg-[#121214] text-neutral-400 dark:text-neutral-500 border-neutral-300 dark:border-white/10"
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
                  "mt-2 text-[10px] md:text-xs font-semibold tracking-wide transition-colors duration-300 text-center max-w-[90px] md:max-w-none font-sans",
                  isCurrent
                    ? "text-saffron font-bold"
                    : isCompleted
                    ? "text-neutral-800 dark:text-neutral-200 font-medium"
                    : "text-neutral-400 dark:text-neutral-500"
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
