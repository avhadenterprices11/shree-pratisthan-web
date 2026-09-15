"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const slidesData: SlideItem[] = [
  {
    id: 1,
    title: "Ganeshotsav — Prem Mandir Vrindavan Dekhava",
    image: "/events_ganeshotsav_2023.jpg",
  },
  {
    id: 2,
    title: "Chhatrapati Shivaji Maharaj Jayanti Celebrations",
    image: "/events_shiv_jayanti_2022.jpg",
  },
  {
    id: 3,
    title: "51-Foot Shiv Chhatrapati Rajmudra",
    image: "/events_rajmudra_51ft.jpg",
  }
];

export default function EventsHero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      ).fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const nextIndex = (currentIndex + 1) % slidesData.length;

    // Smooth Curtain Wipe Fade Animation
    const activeSlide = document.querySelector(`.hero-slide-${currentIndex}`);
    const nextSlide = document.querySelector(`.hero-slide-${nextIndex}`);

    if (activeSlide && nextSlide) {
      gsap.timeline({
        onComplete: () => {
          setCurrentIndex(nextIndex);
          isAnimating.current = false;
        },
      })
      .fromTo(
        nextSlide,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0.5 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 0.9, ease: "power3.inOut" }
      )
      .to(activeSlide, { opacity: 0, duration: 0.5 }, "-=0.7");
    } else {
      setCurrentIndex(nextIndex);
      isAnimating.current = false;
    }
  }, [currentIndex]);

  // Automatic slide changing transition within 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-end items-start pt-24 sm:pt-36 pb-10 sm:pb-20 px-4 sm:px-6 md:px-12 overflow-hidden bg-neutral-950"
    >
      {/* Fullscreen Slider Backdrop Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        <div className="relative w-full h-full">
          {slidesData.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`hero-slide-${index} absolute inset-0 transition-all duration-700 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Campaign Visual backdrop - 100% crisp without white fog */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Clean, crystal-clear gradient for text legibility without white blurriness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 z-10 pointer-events-none" />
      </div>

      {/* Overlaid Page Header */}
      <div className="max-w-[1600px] w-full mx-auto relative z-20 flex flex-col justify-start text-left pointer-events-none">
        <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.3] sm:leading-[1.32] tracking-tight mb-4 sm:mb-6 font-heading pointer-events-auto drop-shadow-md">
          <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-3 sm:py-4 -my-2 sm:-my-3">
            <span className="block reveal-line py-1">{t("eventsPage.hero.titleLine1")}</span>
          </div>
          <div className="overflow-hidden px-2 sm:px-4 -mx-2 sm:-mx-4 py-3 sm:py-4 -my-2 sm:-my-3">
            <span className="block reveal-line py-1 text-saffron font-heading">{t("eventsPage.hero.titleLine2")}</span>
          </div>
        </h1>

        <p className="hero-subtitle text-base sm:text-base md:text-lg text-slate-100 max-w-2xl leading-[1.7] sm:leading-[1.75] font-normal pointer-events-auto font-sans drop-shadow-sm">
          {t("eventsPage.hero.subtitle")}
        </p>
      </div>
    </section>
  );
}
