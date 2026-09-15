"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PastEvents.module.css";
import { useLanguage } from "@/context/LanguageContext";

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imgSrc: string;
  bgColor: string;
  date: string;
}

export default function PastEvents() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const CARDS: CardItem[] = [
    {
      id: 1,
      title: t("eventsPage.past.p1Title"),
      subtitle: t("eventsPage.past.p1Subtitle"),
      description: t("eventsPage.past.p1Desc"),
      imgSrc: "/ganeshotsav_bright.png",
      bgColor: "#78d28c", // Green theme
      date: t("eventsPage.past.p1Date"),
    },
    {
      id: 2,
      title: t("eventsPage.past.p2Title"),
      subtitle: t("eventsPage.past.p2Subtitle"),
      description: t("eventsPage.past.p2Desc"),
      imgSrc: "/volunteer_medical.png",
      bgColor: "#d27878", // Red/Saffron theme
      date: t("eventsPage.past.p2Date"),
    },
    {
      id: 3,
      title: t("eventsPage.past.p3Title"),
      subtitle: t("eventsPage.past.p3Subtitle"),
      description: t("eventsPage.past.p3Desc"),
      imgSrc: "/about_showcase.png",
      bgColor: "#dbd578", // Gold theme
      date: t("eventsPage.past.p3Date"),
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".past-flip-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 past-flip-reveal">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("eventsPage.past.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* 3D Flip Card Grid */}
        <div className={styles.cardGrid}>
          {CARDS.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ card }: { card: CardItem }) {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.flipCardInner}>
        {/* Front Side */}
        <div
          className={styles.front}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.25)), url(${card.imgSrc})`,
            backgroundColor: card.bgColor,
          }}
        >
          <div className={styles.frontOverlay}>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-white/20 text-white border border-white/20 px-2 py-0.5 rounded backdrop-blur-sm inline-block mb-2 sm:mb-3 select-none font-sans">
              {card.date}
            </span>
            <h3 className="font-heading font-normal tracking-tight select-none text-lg sm:text-2xl uppercase">
              {card.subtitle}
            </h3>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.back} style={{ backgroundColor: card.bgColor }}>
          <h2 className="font-heading font-normal tracking-tight select-none text-lg sm:text-2xl mb-2 sm:mb-3 uppercase">
            {card.title}
          </h2>
          <p className="font-sans font-normal select-none text-center leading-[1.7] text-xs sm:text-sm mb-4">
            {card.description}
          </p>
          <button className={`${styles.moreBtn} font-sans uppercase text-[10px] tracking-[0.2em] font-bold`}>
            {t("eventsPage.pastEvents.auditVerified")}
          </button>
        </div>
      </div>
    </div>
  );
}
