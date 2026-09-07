"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, AlertTriangle, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CampaignItem {
  title: string;
  desc: string;
  metric: string;
  icon: React.ReactNode;
}

export default function CharitySocialWork() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const CAMPAIGNS: CampaignItem[] = [
    {
      title: t("communityPage.charity.c1Title"),
      desc: t("communityPage.charity.c1Desc"),
      metric: t("communityPage.charity.c1Metric"),
      icon: <BookOpen className="w-6 h-6 text-saffron" />,
    },
    {
      title: t("communityPage.charity.c2Title"),
      desc: t("communityPage.charity.c2Desc"),
      metric: t("communityPage.charity.c2Metric"),
      icon: <AlertTriangle className="w-6 h-6 text-saffron" />,
    },
    {
      title: t("communityPage.charity.c3Title"),
      desc: t("communityPage.charity.c3Desc"),
      metric: t("communityPage.charity.c3Metric"),
      icon: <Gift className="w-6 h-6 text-saffron" />,
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const cards = gsap.utils.toArray(".charity-card") as HTMLElement[];
    const isMobile = window.innerWidth < 768;
    const rotations = isMobile ? [0, 0, 0] : [-6, 0, 6];
    const initialX = isMobile ? [0, 0, 0] : [60, 0, -60];
    const initialRot = isMobile ? [0, 0, 0] : [12, 0, -12];

    const listeners: { card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    const ctx = gsap.context(() => {
      // 1. Title fade up
      gsap.fromTo(
        ".charity-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Fanning Cards reveal scroll triggers
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            xPercent: initialX[idx],
            rotation: initialRot[idx],
          },
          {
            opacity: 1,
            xPercent: 0,
            rotation: rotations[idx],
            duration: 0.75, // Faster fan-out sweep
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Interactive 3D cursor tilt handlers (desktop only)
        if (!isMobile) {
          const onMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
              rotationY: x * 0.06,
              rotationX: -y * 0.06,
              rotation: 0, // straighten slightly on hover
              scale: 1.05,
              transformPerspective: 1000,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const onMouseLeave = () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              rotation: rotations[idx], // restore fanning angle
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
          listeners.push({ card, move: onMouseMove, leave: onMouseLeave });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      listeners.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section
      id="charity-social-work"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5 dark:border-white/10"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="charity-title text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
            {t("communityPage.charity.badge")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("communityPage.charity.heading")}
          </h2>
          <p className="text-slate-grey dark:text-neutral-300 mt-2.5 sm:mt-4 font-sans leading-[1.7] sm:leading-relaxed text-base font-normal">
            {t("communityPage.charity.subtitle")}
          </p>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Fanning Card Layout Wrapper */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {CAMPAIGNS.map((item, index) => (
            <div
              key={index}
              className="charity-card glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10 shadow-md"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-saffron/5 dark:bg-saffron/10 flex items-center justify-center text-saffron mb-4 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 mb-2.5 sm:mb-4 font-heading leading-snug uppercase">
                  {item.title}
                </h3>
                <p className="text-base md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-saffron/10 dark:border-white/10 pt-4 sm:pt-6 mt-4 sm:mt-6 flex justify-between items-center">
                <span className="text-xs uppercase font-bold tracking-[0.18em] text-saffron font-sans">
                  {item.metric}
                </span>
                <span className="text-xs text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.18em] bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded font-sans">
                  {t("communityPage.charity.distributedTag")}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
