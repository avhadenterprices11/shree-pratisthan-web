"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Ticket, QrCode, HeartHandshake, ShieldCheck } from "lucide-react";

export default function EventBookingHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".reveal-headline-1",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          ".reveal-headline-2",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".feature-card-item",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[55vh] sm:min-h-[60vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-10 sm:pb-12 overflow-hidden select-none bg-[#FBFBFA] dark:bg-background"
    >
      {/* Background Visual Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FBFBFA] dark:bg-background">
        <Image
          src="/ganeshotsav_backdrop.png"
          alt="Shree Prathishthan Festive Backdrop"
          fill
          priority
          className="object-cover object-center opacity-100"
        />
        {/* Soft edge gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#FBFBFA] dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-[#FBFBFA]/60 dark:from-background/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Box */}
      <div className="relative z-20 max-w-5xl mx-auto space-y-4 sm:space-y-6 flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-[32px] sm:text-5xl md:text-7xl lg:text-8xl font-normal font-heading text-neutral-950 dark:text-neutral-100 tracking-tight uppercase leading-[0.95] sm:leading-[0.92] max-w-4xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] dark:drop-shadow-none">
          <span className="block reveal-headline-1">OFFICIAL FESTIVAL &amp;</span>
          <span className="block reveal-headline-2 text-saffron text-outline-festive font-heading">
            EVENT BOOKING
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-description text-base sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200 max-w-3xl leading-[1.7] sm:leading-[1.75] font-normal font-sans bg-white/85 dark:bg-[#121214]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/90 dark:border-white/10 shadow-lg">
          Book your slot for Shree Ganeshotsav, Gudipadwa Swagat Yatra, Navratri Garba, blood donation camps, and sports tournaments in Indira Nagar, Nashik.
        </p>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4 w-full max-w-4xl">
          <div className="feature-card-item p-3 sm:p-4 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border border-saffron/20 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3 text-left hover:border-saffron/40 dark:hover:border-white/20 hover:scale-[1.02] transition-all">
            <div className="p-2 sm:p-2.5 bg-saffron/10 text-saffron rounded-lg sm:rounded-xl flex-shrink-0">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans">Event Booking</h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-normal font-sans">Instant Slot Slip</p>
            </div>
          </div>

          <div className="feature-card-item p-3 sm:p-4 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border border-saffron/20 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3 text-left hover:border-saffron/40 dark:hover:border-white/20 hover:scale-[1.02] transition-all">
            <div className="p-2 sm:p-2.5 bg-amber-500/10 text-amber-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans">Booking ID</h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-normal font-sans">Ground Entry Ref</p>
            </div>
          </div>

          <div className="feature-card-item p-3 sm:p-4 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border border-saffron/20 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3 text-left hover:border-saffron/40 dark:hover:border-white/20 hover:scale-[1.02] transition-all">
            <div className="p-2 sm:p-2.5 bg-emerald-500/10 text-emerald-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans">Free Booking</h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-normal font-sans">No Online Payment</p>
            </div>
          </div>

          <div className="feature-card-item p-3 sm:p-4 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border border-saffron/20 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3 text-left hover:border-saffron/40 dark:hover:border-white/20 hover:scale-[1.02] transition-all">
            <div className="p-2 sm:p-2.5 bg-rose-500/10 text-rose-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="font-bold text-neutral-900 dark:text-neutral-100 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans">Seva Interest</h5>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-normal font-sans">Volunteer Marshals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
