"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCDNUrl } from "@/lib/cdn";
import { LiquidMetal } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPreview() {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = e.currentTarget;
    if (videoWidth && videoHeight) {
      setVideoAspectRatio(videoWidth / videoHeight);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!triggerRef.current || !cardRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Card Zoom & Clean Entrance (No y-translation scrub loop)
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          cardRef.current,
          {
            scale: 0.96,
            opacity: 0.4,
            borderRadius: "48px",
          },
          {
            scale: 1,
            opacity: 1,
            borderRadius: "24px",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          cardRef.current,
          {
            scale: 0.97,
            opacity: 0.6,
            borderRadius: "24px",
          },
          {
            scale: 1,
            opacity: 1,
            borderRadius: "16px",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 2. Staggered Content Reveal Timeline
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      contentTl.fromTo(
        ".about-title-el",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={triggerRef}
      className="relative w-full overflow-hidden bg-background z-20 pt-8 pb-3 sm:py-16 md:py-24"
    >
      {/* Ambient decorative brand glows (original light theme values) */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-10" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-20 opacity-10" />

      {/* Centered Heading Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center mb-8 sm:mb-12 text-center relative z-10">
        <h2 className="text-2xl sm:text-[32px] md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug py-1 opacity-0 about-title-el uppercase">
          {t("aboutPreview.title1")} <br />
          <span className="text-3xl sm:text-[36px] md:text-[48px] font-normal text-saffron block mt-2 sm:mt-3 py-1 text-outline-festive font-heading">
            {t("aboutPreview.title2")}
          </span>
        </h2>
      </div>

      {/* Showcase Card Wrapper */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 relative z-10">
        <div
          ref={cardRef}
          style={{
            borderRadius: "clamp(16px, 4vw, 80px)",
            aspectRatio: videoAspectRatio ? `${videoAspectRatio}` : "16 / 9",
          }}
          className="relative w-full p-1 sm:p-[6px] shadow-2xl overflow-hidden bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10 transition-[aspect-ratio] duration-300"
        >
          {/* Animated Liquid Metal Border Bezel */}
          <LiquidMetal
            colorBack="#aaaaac"
            colorTint="#ffffff"
            speed={0.4}
            repetition={5}
            distortion={0.12}
            className="absolute inset-0 z-0"
          />

          {/* Inner Content Body - Full Bleed Video Container */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-[inherit] bg-[#080808]">
            <video
              ref={videoRef}
              src={getCDNUrl("/shri_pratisthan.mp4")}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              className="absolute inset-0 w-full h-[110%] -top-[5%] object-cover select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
