"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How can I obtain a tax exemption certificate for my donation?",
    a: "All financial contributions are issued official receipts. For Section 80G tax clearance certificates, please email your transaction receipt and PAN card details to info@shripratisthan.org. Our accounts desk will email the certificate within 7-10 business days.",
  },
  {
    q: "Are there scheduled days for dropping off school materials or clothes?",
    a: "Yes. In-kind donations (like textbooks, notebooks, schoolbags, or winter blankets) can be dropped off at our Bhandup Seva Kendra on Saturdays between 10:00 AM and 2:00 PM. Please connect with our liaison coordinator beforehand.",
  },
  {
    q: "Can corporate CSR teams request project audit files?",
    a: "Absolutely. Shree Prathishthan maintains a transparent audit system. Corporate partners can request our detailed annual reports, project impact sheets, and CSR verification files directly via info@shripratisthan.org.",
  },
  {
    q: "How can I coordinate an emergency medical checkup in my village?",
    a: "If you want to organize a medical or blood donation drive in a rural zone, please write to Vikram Shinde (Operations Director) or Sunil Patil (Rural welfare Lead). Our team will schedule an alignment call to inspect logistics parameters.",
  },
];

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-4xl mx-auto relative z-10 faq-reveal">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Contact Queries & Guidelines
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden bg-white border border-saffron/5 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-foreground font-heading hover:text-saffron transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <span className={`text-xl font-light transform transition-transform duration-300 ${isOpen ? "rotate-45 text-saffron" : "text-slate-grey"}`}>
                    ＋
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px] border-t border-saffron/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm text-slate-grey leading-relaxed font-sans bg-slate-50/20">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
