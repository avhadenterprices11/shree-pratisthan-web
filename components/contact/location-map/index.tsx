"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-animate-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".map-animate-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Office visiting details */}
          <div className="map-animate-left space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("contactPage.location.headingLine1")} <br />
              <span className="text-saffron text-outline-festive font-heading">{t("contactPage.location.headingLine2")}</span>
            </h2>
            <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("contactPage.location.desc")}
            </p>
            
            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="font-normal text-neutral-900 dark:text-neutral-100 font-heading text-base sm:text-lg uppercase">{t("contactPage.location.visitingHoursTitle")}</h4>
                  <p className="text-base md:text-sm text-slate-grey dark:text-neutral-300 mt-0.5 font-sans leading-relaxed font-normal">
                    {t("contactPage.location.visitingHoursLine1")} <br />
                    {t("contactPage.location.visitingHoursLine2")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Stylized Interactive Map Dashboard */}
          <div className="map-animate-right space-y-4 sm:space-y-6">
            
            {/* Real-time Premium Google Map Container */}
            <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl sm:rounded-block overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl group/map">
              {/* Actual Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5273390757754!2d73.768165!3d19.98661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeaa9e8a9bc6f%3A0x6b7b25e1a3bc89a7!2sIndira%20Nagar%2C%20Nashik%2C%20Maharashtra%20422009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-[15%] contrast-[110%] brightness-[95%] pointer-events-auto"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-slate-50 dark:bg-[#121214] border border-slate-200 dark:border-white/10 p-4 sm:p-5 rounded-2xl">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm font-sans uppercase tracking-wide">{t("contactPage.location.hqTitle")}</h4>
                <p className="text-xs text-slate-grey dark:text-neutral-300 mt-0.5 font-sans">
                  {t("contactPage.location.hqDesc")}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Indira+Nagar+Nashik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-foreground hover:bg-saffron hover:shadow-lg hover:shadow-saffron/20 text-background hover:text-white font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans"
              >
                <span>{t("contactPage.location.navigateBtn")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
