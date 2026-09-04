"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCDNUrl } from "@/lib/cdn";
import { LiquidMetal } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPreview() {
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
      // 1. Card Zoom & Radius Morph (scroll-linked scale & corner flattening against light canvas)
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.9,
          y: 120,
          opacity: 0.2,
          borderRadius: "96px",
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          borderRadius: "24px",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.6,
          },
        }
      );

      // 2. Video Parallax Sweep (subtle scroll-linked vertical translation)
      gsap.fromTo(
        videoRef.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. Staggered Content Reveal Timeline (Play-once when card enters 80% of viewport)
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          once: true,
        },
      });

      contentTl.fromTo(
        ".about-title-el",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={triggerRef}
      className="relative w-full overflow-hidden bg-background z-20 py-16 md:py-24"
    >
      {/* Ambient decorative brand glows (original light theme values) */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-10" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-20 opacity-10" />

      {/* Centered Heading Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col items-center mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron/20 opacity-0 about-title-el">
          <span>Culture • Service • Community</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-none opacity-0 about-title-el">
          Heritage In Motion <br />
          <span className="text-4xl sm:text-[4rem] md:text-[5rem] font-bold text-saffron block mt-3 text-outline-festive">
            Service In Action
          </span>
        </h2>
      </div>

      {/* Showcase Card Wrapper */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={cardRef}
          style={{
            borderRadius: "96px",
            aspectRatio: videoAspectRatio ? `${videoAspectRatio}` : "16 / 9",
          }}
          className="relative w-full p-[6px] shadow-2xl overflow-hidden bg-white border border-saffron/10 opacity-0 transition-[aspect-ratio] duration-300"
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
