"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What are the Aarti & Darshan timings during Shree Ganeshotsav?",
    a: "Daily Prabhat Aarti begins at 6:00 AM, afternoon community darshan runs through 1:00 PM, and the grand 108-lamp evening Maha Aarti commences at 7:30 PM at the Indira Nagar Mandal Ground, Nashik.",
  },
  {
    q: "Who can participate in the Gudipadwa Swagat Yatra & Cricket Tournaments?",
    a: "Our cultural processions, health drives, and annual cricket championships are open to all citizens, families, and youth clubs across Indira Nagar and Nashik district. Registration is free and welcome to all.",
  },
  {
    q: "Are events free and how do I obtain an entry or booking pass?",
    a: "All cultural festivals, aartis, and health camps are completely free for the public. You can generate an instant digital pass with QR verification directly on our Event Booking portal.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.to(contentRef.current, { height: "auto", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [open]);

  return (
    <div className="glass-panel rounded-block overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-base sm:text-lg font-extrabold text-foreground font-heading">{q}</span>
        <span className={`text-saffron text-2xl font-black transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div 
        ref={contentRef} 
        className="height-0 overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="px-6 pb-5 text-sm text-slate-grey leading-relaxed border-t border-saffron/10 pt-4 bg-orange-50/10">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function EventsFAQ() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-slide-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 faq-slide-in">
        <div className="text-center mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Common Questions
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <FaqItem key={index} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
