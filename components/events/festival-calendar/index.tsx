"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CalendarItem {
  num: string;
  month: string;
  title: string;
  desc: string;
  type: string;
  badgeClass: string;
}

const CALENDAR_ITEMS: CalendarItem[] = [
  {
    num: "1",
    month: "February",
    title: "Shiv Jayanti Celebrations (शिवजयंती)",
    desc: "Inspirational youth rallies, historical exhibitions, Mardani Khel martial arts demonstrations, and tributes in Indira Nagar.",
    type: "Historical & Youth",
    badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    num: "2",
    month: "March",
    title: "Gudipadwa Swagat Yatra (स्वागत यात्रा)",
    desc: "Grand Marathi New Year procession, traditional attire, Lezim, Dhol Tasha, and family rallies across Indira Nagar.",
    type: "Cultural Festival",
    badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    num: "3",
    month: "April",
    title: "Dr. Ambedkar Jayanti (आंबेडकर जयंती)",
    desc: "Free notebook kits distribution, social harmony symposiums, and academic merit awards for students.",
    type: "Social Welfare",
    badgeClass: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    num: "4",
    month: "June",
    title: "Yoga Day & Health Camp (आरोग्य शिबिर)",
    desc: "Mass guided yoga protocols and specialized doctor diagnostic checkups for families and senior citizens.",
    type: "Healthcare",
    badgeClass: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    num: "5",
    month: "Aug-Sept",
    title: "Shree Ganeshotsav & Blood Drive",
    desc: "10-day grand festival, eco-friendly Shadu clay idol, daily Maha Aarti, and mega blood donation camp.",
    type: "Cultural & Health",
    badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    num: "6",
    month: "Sept-Oct",
    title: "Navratri Utsav & Dandiya (नवरात्रौत्सव)",
    desc: "Nine nights of traditional Garba, Raas Dandiya, live folk musicians, and family celebration arenas.",
    type: "Cultural Festival",
    badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    num: "7",
    month: "December",
    title: "Annual Sports & Cricket Tournament",
    desc: "Premier 32-team tennis ball cricket championship and youth athletics honoring our 2006 sports roots.",
    type: "Sports Tournament",
    badgeClass: "bg-gold/10 border-gold/30 text-amber-700",
  },
];

export default function FestivalCalendar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !sliderRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop viewports: Pinned Scroll-Scrubbed Horizontal Timeline with Offset centering
    mm.add("(min-width: 768px)", () => {
      const slider = sliderRef.current;
      const container = containerRef.current;
      if (!slider || !container) return;

      const cardWidth = 332; // Matches md:w-[332px]
      const gap = 32;        // Matches gap-8
      const step = cardWidth + gap;

      // Calculate translation to position the first card centered on start, and the last card centered on end
      const W = container.clientWidth;
      const offset = (W - cardWidth) / 2;

      const startX = offset;
      const endX = offset - (CALENDAR_ITEMS.length - 1) * step;

      ScrollTrigger.create({
        trigger: "#calendarPinContainer",
        start: "top top",
        end: () => `+=${Math.abs(endX - startX) * 1.25}`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate active index based on active horizontal translation coordinates
          const currentX = startX + (endX - startX) * progress;
          const index = Math.round((offset - currentX) / step);
          const boundedIndex = Math.max(0, Math.min(index, CALENDAR_ITEMS.length - 1));
          setActiveIdx(boundedIndex);
        },
      });

      // Animate slider track horizontally
      gsap.fromTo(
        slider,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: "#calendarPinContainer",
            start: "top top",
            end: () => `+=${Math.abs(endX - startX) * 1.25}`,
            scrub: 0.5,
          },
        }
      );
    });

    // Mobile fallback viewports: Standard reveal entrance
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".calendar-reveal",
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
    });

    // Recalculate heights after layout hydration settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const triggers = ScrollTrigger.getAll();
      const calendarTrigger = triggers.find(t => t.trigger?.id === "calendarPinContainer");
      if (calendarTrigger) {
        const start = calendarTrigger.start;
        const end = calendarTrigger.end;
        // The progress is proportional to card index
        const progress = idx / (CALENDAR_ITEMS.length - 1);
        const scrollPos = start + (end - start) * progress;
        window.scrollTo({
          top: scrollPos,
          behavior: "smooth",
        });
      }
    } else {
      setActiveIdx(idx);
      const cardElements = sliderRef.current?.children;
      if (cardElements && cardElements[idx]) {
        cardElements[idx].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  };

  return (
    <div 
      id="calendarPinContainer" 
      ref={containerRef}
      className="bg-background relative w-full md:h-screen md:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="relative z-10 w-full flex flex-col justify-center py-20 md:py-0 overflow-hidden calendar-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Yearly Calendar Schedule
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Scroll Instruction Banner */}
        <div className="text-center mb-6 hidden md:block">
          <span className="text-[10px] text-slate-grey/65 font-bold uppercase tracking-widest bg-black/5 px-4 py-1.5 rounded-full inline-block">
            ↓ Scroll Down to Slide Calendar Timeline
          </span>
        </div>

        {/* The Scroll viewport Port */}
        <div className="relative w-full overflow-x-auto md:overflow-x-visible pb-8 pt-4 scrollbar-none px-6 md:px-0">
          {/* Draggable Row Track */}
          <div 
            ref={sliderRef}
            className="flex gap-6 sm:gap-8 w-max md:transform md:translate-x-0 snap-x snap-mandatory px-6 md:px-0"
          >
            {CALENDAR_ITEMS.map((item, index) => {
              const isActive = activeIdx === index;
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-[280px] md:w-[332px] shrink-0 glass-panel p-8 rounded-block bg-white border transition-all duration-500 min-h-[300px] flex flex-col justify-between cursor-pointer select-none snap-center ${
                    isActive 
                      ? "border-saffron/30 shadow-2xl scale-[1.03] opacity-100 z-10 shadow-saffron/10" 
                      : "border-black/5 scale-95 opacity-40 hover:opacity-60 z-0"
                  }`}
                >
                  <div>

                    {/* Giant Month Title */}
                    <span className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900 block mb-2 leading-none">
                      {item.month}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 font-sans mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-grey leading-relaxed font-sans select-none pointer-events-none">
                      {item.desc}
                    </p>
                  </div>

                  {/* Indicator stamp */}
                  <div className="mt-6 pt-4 border-t border-saffron/10 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-saffron font-heading">
                    <span>Active Drive Location</span>
                    <span>★</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Indicator slider tracker */}
        <div className="flex justify-center gap-1.5 mt-4 select-none">
          {CALENDAR_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx ? "w-8 bg-saffron" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
