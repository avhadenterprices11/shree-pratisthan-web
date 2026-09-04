"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, AlertTriangle, Gift } from "lucide-react";

interface CampaignItem {
  title: string;
  desc: string;
  metric: string;
  icon: React.ReactNode;
}

const CAMPAIGNS: CampaignItem[] = [
  {
    title: "Student Education & Study Kits",
    desc: "Providing textbooks, notebooks, school bags, and stationery sets to underprivileged students and schools across Nashik district.",
    metric: "2,500+ Kits Distributed",
    icon: <BookOpen className="w-6 h-6 text-saffron" />,
  },
  {
    title: "Emergency Aid & Relief Drives",
    desc: "Delivering essential grocery packets, dry food grains, emergency medical aid, and hygiene kits to vulnerable families during crises.",
    metric: "1,500+ Families Supported",
    icon: <AlertTriangle className="w-6 h-6 text-saffron" />,
  },
  {
    title: "Winter Clothing & Blanket Drive",
    desc: "Community collection and distribution of warm blankets and sweaters to elderly residents and needy families in Indira Nagar and Nashik.",
    metric: "3,000+ Blankets Donated",
    icon: <Gift className="w-6 h-6 text-saffron" />,
  },
];

export default function CharitySocialWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const cards = gsap.utils.toArray(".charity-card") as HTMLElement[];
    const rotations = [-6, 0, 6];
    const initialX = [60, 0, -60];
    const initialRot = [12, 0, -12];

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

        // 3. Interactive 3D cursor tilt handlers
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20 border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="charity-title text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Charity & Direct Relief Work
          </h2>
          <p className="text-slate-grey mt-4">
            Delivering essential support directly to students, families in crises, and marginalized communities.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Fanning Card Layout Wrapper */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {CAMPAIGNS.map((item, index) => (
            <div
              key={index}
              className="charity-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-saffron/5 flex items-center justify-center text-saffron mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-4 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-saffron/10 pt-6 mt-6 flex justify-between items-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-saffron">
                  {item.metric}
                </span>
                <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                  Distributed
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
