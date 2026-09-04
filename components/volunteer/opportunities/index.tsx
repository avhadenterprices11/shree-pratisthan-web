"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, HeartPulse, Leaf, Gift } from "lucide-react";

interface OpportunityTrack {
  title: string;
  desc: string;
  skills: string;
  icon: React.ReactNode;
}

const TRACKS: OpportunityTrack[] = [
  {
    title: "Cultural Festival Logistics",
    desc: "Oversee stage setups, grand processions, crowd safety, and logistics during major festivals like Gudipadwa Swagat Yatra, Ganeshotsav, Navratri, and Shiv Jayanti.",
    skills: "Crowd Safety, Procession Coordination, Leadership",
    icon: <Users className="w-6 h-6 text-saffron" />,
  },
  {
    title: "Arogya & Blood Drive Mobilizer",
    desc: "Coordinate donor registration desks, blood bank liaisons, queue management, and doctor assistance during our 50+ blood donation & health camps.",
    skills: "Donor Care, Health Camp Coordination, Desk Mgmt",
    icon: <HeartPulse className="w-6 h-6 text-saffron" />,
  },
  {
    title: "Sports & Cricket Tournaments",
    desc: "Manage team fixtures, ground operations, referee coordination, and youth athletics during our annual cricket tournaments in Indira Nagar.",
    skills: "Sports Coordination, Team Spirit, Field Mgmt",
    icon: <Leaf className="w-6 h-6 text-saffron" />,
  },
  {
    title: "Seva & Student Relief Coordinator",
    desc: "Assemble student educational kits, coordinate notebook distributions, organize winter clothing drives, and deliver emergency community relief.",
    skills: "Resource Management, Distribution Logistics, Care",
    icon: <Gift className="w-6 h-6 text-saffron" />,
  },
];

export default function VolunteerOpportunities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger reveal columns on scroll
      gsap.fromTo(
        ".opportunity-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToForm = () => {
    const el = document.querySelector("#registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Active Volunteer Tracks
          </h2>
          <p className="text-slate-grey mt-4">
            Select a pathway that aligns with your interest and contribute to high-efficiency community systems.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Liquid Column Flex Accordion Container */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch w-full min-h-[460px] md:h-[420px] group/container">
          {TRACKS.map((item, index) => (
            <div
              key={index}
              onClick={handleScrollToForm}
              className="opportunity-col glass-panel p-8 rounded-block flex flex-col justify-between cursor-pointer bg-white transition-all duration-500 border border-black/8 hover:border-saffron/30 hover:shadow-2xl flex-1 md:group-hover/container:flex-[0.8] md:hover:flex-[1.6] overflow-hidden relative group"
            >
              <div className="w-full">
                {/* Column Card Header */}
                <div className="flex justify-between items-center w-full">
                  <div className="w-12 h-12 rounded-full bg-saffron/5 flex items-center justify-center text-saffron flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg] border border-saffron/5">
                    {item.icon}
                  </div>
                  
                  <span className="text-2xl font-extrabold text-neutral-200 group-hover:text-saffron/20 transition-colors duration-500 font-heading select-none pointer-events-none">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Column Card Title */}
                <h3 className="text-xl font-extrabold text-neutral-900 font-heading mt-6 leading-snug">
                  {item.title}
                </h3>
                
                {/* Expandable Description (Hidden by default on desktop, shown on hover; always shown on mobile) */}
                <p className="text-sm text-slate-grey mt-4 leading-relaxed font-sans opacity-100 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-[140px] transition-all duration-500 ease-in-out overflow-hidden">
                  {item.desc}
                </p>
              </div>

              {/* Skills Footer */}
              <div className="mt-8 pt-4 border-t border-saffron/5 w-full">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-saffron bg-saffron/5 border border-saffron/10 px-2.5 py-1 rounded inline-block font-heading">
                  Skills: {item.skills}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
