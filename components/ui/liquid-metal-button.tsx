"use client";

import React, { memo, forwardRef } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

// ============================================================================
// LiquidMetal - Base shader wrapper component
// ============================================================================

export interface LiquidMetalProps {
  /** Base background color of the liquid metal */
  colorBack?: string;
  /** Tint/highlight color for the chrome effect */
  colorTint?: string;
  /** Animation speed (0.1 - 2.0 recommended) */
  speed?: number;
  /** Pattern complexity/repetition (1 - 10) */
  repetition?: number;
  /** Wave distortion amount (0 - 1) */
  distortion?: number;
  /** Texture scale */
  scale?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style,
}: LiquidMetalProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      style={style}
    >
      <LiquidMetalShader
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={45}
        shape="none"
        scale={scale}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

LiquidMetal.displayName = "LiquidMetal";

// ============================================================================
// LiquidMetalButton - Premium button with liquid metal border effect
// ============================================================================

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;
  /** Optional icon displayed on the left */
  icon?: React.ReactNode;
  /** Border width in pixels */
  borderWidth?: number;
  /** Configuration for the LiquidMetal shader */
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Style variant */
  variant?: "default" | "themed" | "saffron" | "dark";
}

export const LiquidMetalButton = forwardRef<
  HTMLButtonElement,
  LiquidMetalButtonProps
>(
  (
    {
      children,
      icon,
      borderWidth = 3,
      metalConfig,
      size = "md",
      variant = "default",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "py-2 pl-3 pr-6 gap-3 text-xs",
      md: "py-3 pl-4 pr-8 gap-3.5 text-sm",
      lg: "py-4 pl-5 pr-10 gap-4 text-base",
    };

    const iconSizes = {
      sm: "w-7 h-7 text-xs",
      md: "w-9 h-9 text-sm",
      lg: "w-11 h-11 text-base",
    };

    const isThemed = variant === "themed" || variant === "saffron";

    const defaultBack = isThemed ? "#E26A36" : variant === "dark" ? "#1F1F23" : "#888888";
    const defaultTint = isThemed ? "#F3C04E" : variant === "dark" ? "#E26A36" : "#ffffff";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative rounded-full overflow-hidden transition-all duration-300",
            isThemed
              ? "shadow-[0_12px_35px_-8px_rgba(226,106,54,0.45)] group-hover:shadow-[0_18px_45px_-5px_rgba(226,106,54,0.6)] group-hover:scale-[1.02]"
              : "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]"
          )}
          style={{ padding: borderWidth }}
        >
          {/* Liquid Metal Border Layer */}
          <LiquidMetal
            colorBack={metalConfig?.colorBack ?? defaultBack}
            colorTint={metalConfig?.colorTint ?? defaultTint}
            speed={metalConfig?.speed ?? (isThemed ? 0.6 : 0.4)}
            repetition={metalConfig?.repetition ?? 4}
            distortion={metalConfig?.distortion ?? 0.15}
            scale={metalConfig?.scale ?? 1}
            className="absolute inset-0 z-0 rounded-full"
          />

          {/* Inner Button Body */}
          <div
            className={cn(
              "relative z-10 rounded-full flex items-center justify-center font-heading font-extrabold tracking-widest uppercase transition-all duration-300",
              isThemed
                ? "bg-gradient-to-r from-[#E26A36] via-[#D95B25] to-[#B84013] text-white group-hover:from-[#EA7642] group-hover:to-[#C64A1C]"
                : variant === "dark"
                ? "bg-[#121214] text-white group-hover:bg-[#1A1A1E]"
                : "bg-white dark:bg-black text-neutral-900 dark:text-white group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900",
              sizeStyles[size]
            )}
          >
            {icon && (
              <div
                className={cn(
                  "rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                  isThemed
                    ? "bg-white/20 text-white backdrop-blur-md shadow-inner border border-white/25"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]",
                  iconSizes[size]
                )}
              >
                {icon}
              </div>
            )}
            <span className="relative z-10">{children}</span>
          </div>
        </div>
      </button>
    );
  }
);

LiquidMetalButton.displayName = "LiquidMetalButton";

export default LiquidMetalButton;
