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

    // Instantiate Lenis engine
    const lenis = new Lenis({
      lerp: 0.12,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
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
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return (
    <>
      {children}
      {mounted && process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
