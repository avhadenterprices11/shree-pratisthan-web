"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Agentation } from "agentation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Gracefully buffer CPU/GPU micro-hitches so dropped frames never cause violent scroll jumps
    gsap.ticker.lagSmoothing(500, 33);

    // Only bypass Lenis on actual mobile phone viewports
    const isMobilePhone =
      window.matchMedia("(pointer: coarse) and (max-width: 768px)").matches;

    if (isMobilePhone) {
      // Mobile phones use native 120Hz touch physics
      return;
    }

    // Instantiate Lenis engine for desktop
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Sync Lenis with GSAP's unified high-frequency ticker loop
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000); // GSAP uses seconds; Lenis expects milliseconds
    };
    gsap.ticker.add(updatePhysics);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      {children}
      {mounted && process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
