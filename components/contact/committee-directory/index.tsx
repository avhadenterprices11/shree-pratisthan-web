"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    name: "Adv. Shyam Dharmaraj Badode",
    role: "Founder & President (संस्थापक अध्यक्ष)",
    zone: "Central Leadership (Nashik)",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
  {
    name: "Festival Operations & Logistics",
    role: "Swagat Yatra & Festival Lead",
    zone: "Indira Nagar & Nashik Zone",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
  {
    name: "Arogya & Blood Drive Coordinator",
    role: "50+ Blood Camps & Hospital Liaison",
    zone: "Nashik Civil Hospital Network",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
];

export default function CommitteeDirectory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".member-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Regional Coordinators Directory
          </h2>
          <p className="text-slate-grey mt-4">
            Directly connect with our administrative coordinators overseeing local zones.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERS.map((member, index) => (
            <div
              key={index}
              className="member-card glass-panel group p-8 rounded-block hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-saffron bg-saffron/5 border border-saffron/10 px-2.5 py-1 rounded block w-fit mb-4">
                  {member.zone}
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-heading">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-slate-grey font-bold mt-1">
                  {member.role}
                </p>
              </div>

              <div className="mt-8 space-y-3 border-t border-saffron/10 pt-6">
                <div className="flex items-center gap-3 text-sm text-slate-grey font-medium group/item">
                  <span className="w-8 h-8 rounded-lg bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="hover:text-saffron transition-colors">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-grey font-medium group/item">
                  <span className="w-8 h-8 rounded-lg bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <a href={`mailto:${member.email}`} className="hover:text-saffron transition-colors truncate">
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
