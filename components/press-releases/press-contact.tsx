"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, MessageSquare, ShieldCheck } from "lucide-react";

export default function PressContact() {
  return (
    <section id="press-contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Main CTA Panel: Luminous Light Canvas with warm saffron/gold undertones */}
        <div className="relative rounded-2xl sm:rounded-block overflow-hidden bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-white dark:from-[#1A1412] dark:via-[#141416] dark:to-[#121214] border border-saffron/25 dark:border-white/10 p-8 sm:p-12 md:p-16 shadow-2xl backdrop-blur-xl text-neutral-900 dark:text-white">
          
          {/* Ambient Decorative Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/10 border border-saffron/25 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-saffron font-sans">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>MEDIA INQUIRIES &amp; ACCREDITATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight uppercase leading-[1.05] text-neutral-900 dark:text-white">
                Looking for information about <span className="text-saffron">Shree Pratisthan?</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                We invite journalists, news organizations, community partners, and event collaborators to reach out for official statements, festival press passes, and historical archives.
              </p>

              {/* Main Contact CTA Button */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.16em] shadow-xl shadow-saffron/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-sans"
                >
                  <span>Contact Shree Pratisthan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-[11px] text-neutral-500 dark:text-white/50 font-sans">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha (Reg: nashik/0000153/2018)</span>
              </div>

            </div>

            {/* Right Column: Direct Contact Info Blocks */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              {/* Helpline Box */}
              <div className="p-5 rounded-xl bg-white/90 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10 hover:border-saffron/40 shadow-sm transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-saffron/10 border border-saffron/25 flex items-center justify-center text-saffron shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-white/50 font-sans">
                    Press &amp; Helpline
                  </p>
                  <a
                    href="tel:+919922786608"
                    className="text-sm font-bold text-neutral-900 dark:text-white hover:text-saffron transition-colors font-sans"
                  >
                    +91 9922786608
                  </a>
                  <p className="text-[10px] text-neutral-500 dark:text-white/40 mt-0.5">Available Mon-Sat, 9 AM - 8 PM IST</p>
                </div>
              </div>

              {/* Email Box */}
              <div className="p-5 rounded-xl bg-white/90 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10 hover:border-saffron/40 shadow-sm transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-white/50 font-sans">
                    Official Email
                  </p>
                  <a
                    href="mailto:Info@shreepratishthan.com"
                    className="text-sm font-bold text-neutral-900 dark:text-white hover:text-saffron transition-colors font-sans break-all"
                  >
                    Info@shreepratishthan.com
                  </a>
                  <p className="text-[10px] text-neutral-500 dark:text-white/40 mt-0.5">Prompt response for media queries</p>
                </div>
              </div>

              {/* Office Address Box */}
              <div className="p-5 rounded-xl bg-white/90 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/10 hover:border-saffron/40 shadow-sm transition-all flex items-start gap-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 flex items-center justify-center text-neutral-700 dark:text-white/70 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-white/50 font-sans">
                    Coordination Office
                  </p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white font-sans">
                    Indira Nagar, Nashik, Maharashtra - 422009
                  </p>
                  <p className="text-[10px] text-neutral-500 dark:text-white/40 mt-0.5">Central administrative headquarters</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
