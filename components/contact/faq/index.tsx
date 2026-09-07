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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-4xl mx-auto relative z-10 faq-reveal">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <span className="text-saffron font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] block mb-2 sm:mb-3 font-sans">FAQ</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            Contact Queries &amp; Guidelines
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl sm:rounded-interactive overflow-hidden bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 text-left font-normal text-neutral-900 dark:text-neutral-100 font-heading hover:text-saffron transition-colors cursor-pointer uppercase"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg leading-snug pr-4">{faq.q}</span>
                  <span className={`text-lg sm:text-xl font-light transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45 text-saffron" : "text-slate-grey dark:text-neutral-400"}`}>
                    ＋
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[220px] border-t border-saffron/10 dark:border-white/10" : "max-h-0"
                  }`}
                >
                  <p className="p-4 sm:p-6 text-base md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal bg-slate-50/20 dark:bg-white/[0.02]">
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
