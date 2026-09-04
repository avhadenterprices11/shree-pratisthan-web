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
      className="relative w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 pt-28 pb-12 overflow-hidden select-none bg-[#FBFBFA]"
    >
      {/* Background Visual Backdrop - 100% Sharp & Clearly Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FBFBFA]">
        <Image
          src="/ganeshotsav_backdrop.png"
          alt="Shree Prathishthan Festive Backdrop"
          fill
          priority
          className="object-cover object-center opacity-100"
        />
        {/* Soft edge gradient for crisp image visibility and smooth transition below */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBFBFA]/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Box */}
      <div className="relative z-20 max-w-5xl mx-auto space-y-6 flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading text-neutral-950 tracking-tight uppercase leading-[0.92] max-w-4xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
          <span className="block reveal-headline-1">OFFICIAL FESTIVAL &amp;</span>
          <span className="block reveal-headline-2 text-saffron text-outline-festive font-heading">
            EVENT BOOKING
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-description text-base sm:text-xl text-neutral-950 max-w-3xl leading-relaxed font-bold bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/90 shadow-lg">
          Book your slot for Shree Ganeshotsav, Gudipadwa Swagat Yatra, Navratri Garba, blood donation camps, and sports tournaments in Indira Nagar, Nashik.
        </p>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-4 w-full max-w-4xl">
          <div className="feature-card-item p-4 bg-white/95 backdrop-blur-md border border-saffron/20 rounded-2xl shadow-lg flex items-center gap-3 text-left hover:border-saffron/40 hover:scale-[1.02] transition-all">
            <div className="p-2.5 bg-saffron/10 text-saffron rounded-xl flex-shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-neutral-900 text-xs uppercase font-heading">Event Booking</h5>
              <p className="text-[11px] text-neutral-500 font-medium">Instant Slot Slip</p>
            </div>
          </div>

          <div className="feature-card-item p-4 bg-white/95 backdrop-blur-md border border-saffron/20 rounded-2xl shadow-lg flex items-center gap-3 text-left hover:border-saffron/40 hover:scale-[1.02] transition-all">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-neutral-900 text-xs uppercase font-heading">Booking ID</h5>
              <p className="text-[11px] text-neutral-500 font-medium">Ground Entry Ref</p>
            </div>
          </div>

          <div className="feature-card-item p-4 bg-white/95 backdrop-blur-md border border-saffron/20 rounded-2xl shadow-lg flex items-center gap-3 text-left hover:border-saffron/40 hover:scale-[1.02] transition-all">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-neutral-900 text-xs uppercase font-heading">Free Booking</h5>
              <p className="text-[11px] text-neutral-500 font-medium">No Online Payment</p>
            </div>
          </div>

          <div className="feature-card-item p-4 bg-white/95 backdrop-blur-md border border-saffron/20 rounded-2xl shadow-lg flex items-center gap-3 text-left hover:border-saffron/40 hover:scale-[1.02] transition-all">
            <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-neutral-900 text-xs uppercase font-heading">Seva Interest</h5>
              <p className="text-[11px] text-neutral-500 font-medium">Volunteer Marshals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
