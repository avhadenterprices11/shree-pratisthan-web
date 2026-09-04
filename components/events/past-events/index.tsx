"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PastEvents.module.css";

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imgSrc: string;
  bgColor: string;
  date: string;
}

const CARDS: CardItem[] = [
  {
    id: 1,
    title: "Vasundhara Tree Plantation",
    subtitle: "5,000+ Trees Planted",
    description: "Planting indigenous shade and fruit saplings with Sunday volunteer care across Indira Nagar and Nashik avenues.",
    imgSrc: "/ganeshotsav_bright.png",
    bgColor: "#78d28c", // Green theme
    date: "July 2025",
  },
  {
    id: 2,
    title: "Community Relief Drives",
    subtitle: "10,000+ Citizens Aided",
    description: "Distributed dry food grain rations, emergency medical kits, and hygiene essentials to vulnerable families in Nashik.",
    imgSrc: "/volunteer_medical.png",
    bgColor: "#d27878", // Red/Saffron theme
    date: "2020 - 2024",
  },
  {
    id: 3,
    title: "Student Education & Study Kits",
    subtitle: "2,500+ Students Guided",
    description: "Supplied quality school bags, notebooks, geometry boxes, and stationery to municipal and rural schools in Nashik.",
    imgSrc: "/about_showcase.png",
    bgColor: "#dbd578", // Gold theme
    date: "Annual Drive",
  },
];

export default function PastEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 past-flip-reveal">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Past Campaigns Impact
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.15)), url(${card.imgSrc})`,
            backgroundColor: card.bgColor,
          }}
        >
          <div className={styles.frontOverlay}>
            <span className="text-[9px] uppercase tracking-widest font-black bg-white/20 text-white border border-white/20 px-2 py-0.5 rounded backdrop-blur-sm inline-block mb-3 select-none">
              {card.date}
            </span>
            <h3 className="font-heading tracking-tight select-none">
              {card.subtitle}
            </h3>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.back} style={{ backgroundColor: card.bgColor }}>
          <h2 className="font-heading tracking-tight select-none">
            {card.title}
          </h2>
          <p className="font-sans font-medium select-none text-center leading-relaxed">
            {card.description}
          </p>
          <button className={styles.moreBtn}>
            Audit Verified
          </button>
        </div>
      </div>
    </div>
  );
}
