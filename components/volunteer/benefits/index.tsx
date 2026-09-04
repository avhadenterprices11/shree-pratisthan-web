"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BenefitItem {
  title: string;
  desc: string;
  icon: string;
}

const BENEFITS: BenefitItem[] = [
  {
    title: "Official Trust Certification",
    desc: "Receive an official Trust Certificate from 'कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था' (Reg: nashik/0000153/2018) validating your service, leadership, and community contributions.",
    icon: "Cert",
  },
  {
    title: "Youth Skill & Event Training",
    desc: "Gain hands-on experience in large-scale cultural festival execution, stage coordination, healthcare logistics, and emergency response management.",
    icon: "Skill",
  },
  {
    title: "Leadership & Committee Growth",
    desc: "Take charge of zonal operations in Indira Nagar and Nashik. Transition from active volunteer to drive coordinator and event planning lead.",
    icon: "Lead",
  },
  {
    title: "Civic & Community Network",
    desc: "Connect with dedicated local leaders, municipal authorities, sports enthusiasts, and community organizers committed to Nashik's progress.",
    icon: "Net",
  },
];

export default function VolunteerBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal rows on scroll
      gsap.fromTo(
        ".benefit-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-45 z-0" />
      
      {/* Local styles for transition outlines */}
      <style>{`
        .text-outline-row-benefit {
          -webkit-text-stroke: 1.5px rgba(23, 23, 23, 0.4);
          color: transparent;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .group:hover .text-outline-row-benefit {
          -webkit-text-stroke: 1.5px transparent;
          color: #E25822;
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Volunteer Rewards & Benefits
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Typographic Accordion List Container */}
        <div className="flex flex-col border-t border-neutral-300">
          {BENEFITS.map((item, index) => (
            <div
              key={index}
              className="benefit-row group border-b border-neutral-300 py-8 cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-start relative px-4"
            >
              {/* Row Header Block */}
              <div className="flex items-center gap-6 z-10">
                <span className="text-xl sm:text-2xl font-extrabold text-saffron tracking-wider font-heading">
                  0{index + 1}
                </span>
                
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-outline-row-benefit tracking-tight uppercase flex items-center gap-4">
                  <span>{item.title}</span>
                  <span className="text-xs uppercase font-extrabold tracking-widest bg-saffron/10 text-saffron border border-saffron/20 px-3.5 py-1 rounded-full font-sans inline-block select-none opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {item.icon}
                  </span>
                </h3>
              </div>

              {/* Row Expandable Description Container */}
              <div className="max-w-4xl overflow-hidden max-h-0 group-hover:max-h-[120px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mt-0 group-hover:mt-4 pl-10 sm:pl-14">
                <p className="text-base sm:text-lg text-slate-grey leading-relaxed max-w-3xl font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
