"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function InstrumentShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Track mobile viewports
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Left card (Puneri Dhol) - moves left, tilts back in Y, rotates counter-clockwise
  const xLeft = useTransform(scrollYProgress, [0.15, 0.7], [0, isMobile ? -50 : -290]);
  const yLeft = useTransform(scrollYProgress, [0.15, 0.7], [0, isMobile ? 35 : 55]);
  const rLeft = useTransform(scrollYProgress, [0.15, 0.7], [0, -14]);
  const ryLeft = useTransform(scrollYProgress, [0.15, 0.7], [0, -18]);
  const sLeft = useTransform(scrollYProgress, [0.15, 0.7], [1, 0.94]);

  // Right card (Shahi Tasha) - moves right, tilts forward in Y, rotates clockwise
  const xRight = useTransform(scrollYProgress, [0.15, 0.7], [0, isMobile ? 50 : 290]);
  const yRight = useTransform(scrollYProgress, [0.15, 0.7], [0, isMobile ? 35 : -55]);
  const rRight = useTransform(scrollYProgress, [0.15, 0.7], [0, 12]);
  const ryRight = useTransform(scrollYProgress, [0.15, 0.7], [0, 18]);
  const sRight = useTransform(scrollYProgress, [0.15, 0.7], [1, 0.94]);

  // Center card (Janj & Lezim) - stays center, lifts up, scales slightly up
  const xCenter = useTransform(scrollYProgress, [0.15, 0.7], [0, 0]);
  const yCenter = useTransform(scrollYProgress, [0.15, 0.7], [0, isMobile ? -35 : -90]);
  const rCenter = useTransform(scrollYProgress, [0.15, 0.7], [0, 2]);
  const ryCenter = useTransform(scrollYProgress, [0.15, 0.7], [0, 0]);
  const sCenter = useTransform(scrollYProgress, [0.15, 0.7], [1, 1.06]);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#FCFAF7] dark:bg-[#0c0c0e] py-16 sm:py-24 border-y border-saffron/10 dark:border-white/10 relative z-20 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-16 relative z-10">
        <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Cultural Traditions</span>
        <h2 className="text-3xl sm:text-5xl font-black text-charcoal dark:text-neutral-100 font-heading tracking-tight max-w-2xl mx-auto leading-none">
          Rhythms & Traditions of Maharashtra
        </h2>
        <p className="text-slate-grey dark:text-neutral-300 mt-4 max-w-xl mx-auto font-sans text-sm sm:text-base">
          Scroll down to explore the traditional Dhol, Tasha, and Lezim rhythms that power our grand Gudipadwa Swagat Yatra and Shree Ganeshotsav processions across Indira Nagar.
        </p>
      </div>

      {/* Stack Container */}
      <div className="relative w-[280px] sm:w-[340px] md:w-[370px] h-[360px] md:h-[400px] flex items-center justify-center z-10">
        
        {/* Card 1: Puneri Dhol (Left Card) */}
        <motion.div
          style={{
            x: xLeft,
            y: yLeft,
            rotateZ: rLeft,
            rotateY: ryLeft,
            scale: sLeft,
            transformStyle: "preserve-3d",
            zIndex: 10,
          }}
          whileHover={{ scale: 0.98, translateZ: 20 }}
          className="absolute inset-0 w-full h-full rounded-[28px] border border-saffron/15 dark:border-saffron/30 bg-gradient-to-br from-orange-50/90 to-orange-100/70 dark:from-[#1a1410] dark:to-[#241a12] p-6 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100/50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-200/30 dark:border-orange-800/40">
              Dhol Tasha
            </span>
            <span className="text-xs font-black text-orange-400 font-heading">01</span>
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <svg className="w-16 h-16 stroke-orange-600 dark:stroke-orange-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2">
              <ellipse cx="12" cy="6" rx="8" ry="3" />
              <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
              <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
              <path d="M8 6v12M16 6v12" />
            </svg>
          </div>

          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-black text-charcoal dark:text-neutral-100 font-heading leading-tight mb-1.5">Puneri Dhol</h3>
            <p className="text-[11px] md:text-[12px] text-slate-grey dark:text-neutral-300 font-sans leading-relaxed">
              The thunderous heartbeat of our Ganeshotsav and Swagat Yatra. Delivering deep, resonant bass beats that unite and energize thousands.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Shahi Tasha (Right Card) */}
        <motion.div
          style={{
            x: xRight,
            y: yRight,
            rotateZ: rRight,
            rotateY: ryRight,
            scale: sRight,
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
          whileHover={{ scale: 0.98, translateZ: 20 }}
          className="absolute inset-0 w-full h-full rounded-[28px] border border-gold/15 dark:border-gold/30 bg-gradient-to-br from-amber-50/90 to-amber-100/70 dark:from-[#1a1710] dark:to-[#242012] p-6 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/30 dark:border-amber-800/40">
              High Treble
            </span>
            <span className="text-xs font-black text-amber-400 font-heading">02</span>
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <svg className="w-16 h-16 stroke-amber-600 dark:stroke-amber-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2">
              <path d="M12 2C6.48 2 2 5.58 2 10c0 3.32 2.57 6.13 6.12 7.37L10 22h4l1.88-4.63C19.43 16.13 22 13.32 22 10c0-4.42-4.48-8-10-8z" />
              <ellipse cx="12" cy="7" rx="8" ry="2.5" />
              <path d="M4 7l8 11 8-11" />
            </svg>
          </div>

          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-black text-charcoal dark:text-neutral-100 font-heading leading-tight mb-1.5">Shahi Tasha</h3>
            <p className="text-[11px] md:text-[12px] text-slate-grey dark:text-neutral-300 font-sans leading-relaxed">
              The commanding high-pitched treble drum, played with swift cane sticks to lead the energetic speed and coordination of our rallies.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Janj & Lezim (Center Card) */}
        <motion.div
          style={{
            x: xCenter,
            y: yCenter,
            rotateZ: rCenter,
            rotateY: ryCenter,
            scale: sCenter,
            transformStyle: "preserve-3d",
            zIndex: 30,
          }}
          whileHover={{ scale: 1.1, translateZ: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute inset-0 w-full h-full rounded-[28px] border border-red-200/20 dark:border-red-500/30 bg-gradient-to-br from-rose-50/95 to-rose-100/80 dark:from-[#1a1012] dark:to-[#241216] p-6 flex flex-col justify-between shadow-2xl"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200/30 dark:border-rose-800/40">
              Folk Heritage
            </span>
            <span className="text-xs font-black text-rose-400 font-heading">03</span>
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <svg className="w-16 h-16 stroke-rose-600 dark:stroke-rose-400 fill-none" viewBox="0 0 24 24" strokeWidth="1.2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 4v2M12 16v2M4 12h2M16 12h2" />
            </svg>
          </div>

          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-black text-charcoal dark:text-neutral-100 font-heading leading-tight mb-1.5">Janj & Lezim</h3>
            <p className="text-[11px] md:text-[12px] text-slate-grey dark:text-neutral-300 font-sans leading-relaxed">
              Traditional synchronized folk dance instruments creating rhythmic metallic cadences during our annual Gudipadwa Swagat Yatra.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
