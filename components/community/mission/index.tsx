"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PhraseItem {
  text: string;
  highlight: boolean;
}

const paragraph1Phrases: PhraseItem[] = [
  { text: "We believe that true", highlight: false },
  { text: "societal transformation", highlight: true },
  { text: "begins at the", highlight: false },
  { text: "grassroots level in Nashik.", highlight: true },
  { text: "With over 100+ active organizers,", highlight: true },
  { text: "Shree Pratishtan bridges critical", highlight: false },
  { text: "healthcare needs", highlight: true },
  { text: "and community welfare challenges.", highlight: false }
];

const paragraph2Phrases: PhraseItem[] = [
  { text: "Our community drives focus on organizing 50+", highlight: false },
  { text: "blood donation camps,", highlight: true },
  { text: "mass health checkup camps,", highlight: false },
  { text: "tree plantation drives,", highlight: true },
  { text: "and establishing an emergency", highlight: false },
  { text: "youth volunteer registry", highlight: true },
  { text: "to", highlight: false },
  { text: "serve Indira Nagar & Nashik", highlight: true },
  { text: "whenever needed.", highlight: false }
];

export default function CommunityMission() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Line-by-line slide-up stagger reveal (Option 3 aspect)
      gsap.fromTo(
        ".reveal-para-line",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-para-line",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Highlight word color transitions on scroll scrub (Option 1 aspect)
      gsap.utils.toArray(".highlight-word").forEach((el: unknown) => {
        const element = el as HTMLElement;
        gsap.fromTo(
          element,
          { color: "#8c9ba5" }, // Initial muted grey
          {
            color: "#E26A25", // Brand Saffron
            fontWeight: "700",
            duration: 0.5,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            }
          }
        );
      });

      // 3. Heading word slide-up reveal
      gsap.fromTo(
        ".reveal-word",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".reveal-word",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 4. Scroll scrub scaling trigger for the saffron line divider
      gsap.fromTo(
        ".reveal-line-bar",
        { scaleX: 0 },
        {
          scaleX: 1.0,
          scrollTrigger: {
            trigger: ".reveal-line-bar",
            start: "top 95%",
            end: "top 75%",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headingWords = "Sustained Welfare, United Action".split(" ");

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Paragraph Column */}
          <div className="md:col-span-8 order-2 md:order-1 space-y-6">
            <p className="text-lg sm:text-xl text-[#525250] leading-relaxed font-medium font-sans">
              {paragraph1Phrases.map((phrase, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5 mr-2 last:mr-0">
                  <span
                    className={`reveal-para-line inline-block ${
                      phrase.highlight ? "highlight-word text-[#8c9ba5]" : ""
                    }`}
                  >
                    {phrase.text}
                  </span>
                </span>
              ))}
            </p>
            <p className="text-base sm:text-lg text-[#525250]/80 leading-relaxed font-sans">
              {paragraph2Phrases.map((phrase, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-0.5 mr-2 last:mr-0">
                  <span
                    className={`reveal-para-line inline-block ${
                      phrase.highlight ? "highlight-word text-[#8c9ba5]" : ""
                    }`}
                  >
                    {phrase.text}
                  </span>
                </span>
              ))}
            </p>
          </div>

          {/* Heading Column */}
          <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-start">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
              Our Vision
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight flex flex-wrap gap-x-2.5">
              {headingWords.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <span className="reveal-word inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <div className="reveal-line-bar w-24 h-1 bg-saffron mt-6 rounded-full origin-left" />
          </div>

        </div>
      </div>
    </section>
  );
}
