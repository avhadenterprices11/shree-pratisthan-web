"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function EventsRegistration() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reg-slide-in",
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
      id="register"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block border border-saffron/20 bg-white reg-slide-in shadow-xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
              {t("eventsPage.registration.heading")}
            </h2>
            <p className="text-slate-grey mt-2 max-w-lg mx-auto font-sans leading-relaxed text-xs sm:text-sm font-normal">
              {t("eventsPage.registration.subtitle")}
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                  {t("eventsPage.registration.nameLabel")}
                </label>
                <input 
                  type="text" 
                  placeholder={t("eventsPage.registration.namePlaceholder")}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                  {t("eventsPage.registration.phoneLabel")}
                </label>
                <input 
                  type="tel" 
                  placeholder={t("eventsPage.registration.phonePlaceholder")}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                {t("eventsPage.registration.eventLabel")}
              </label>
              <div className="relative group">
                <select className="w-full appearance-none pl-4 pr-11 py-3 sm:py-3.5 rounded-xl sm:rounded-interactive border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xs text-foreground font-sans text-sm font-medium focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/25 transition-all cursor-pointer hover:border-saffron/50">
                  <option className="bg-background text-foreground py-2">{t("eventsPage.registration.opt1")}</option>
                  <option className="bg-background text-foreground py-2">{t("eventsPage.registration.opt2")}</option>
                  <option className="bg-background text-foreground py-2">{t("eventsPage.registration.opt3")}</option>
                  <option className="bg-background text-foreground py-2">{t("eventsPage.registration.opt4")}</option>
                  <option className="bg-background text-foreground py-2">{t("eventsPage.registration.opt5")}</option>
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg bg-saffron/10 text-saffron transition-transform duration-300 group-hover:scale-105">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                {t("eventsPage.registration.messageLabel")}
              </label>
              <textarea 
                rows={3} 
                placeholder={t("eventsPage.registration.messagePlaceholder")}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all resize-none font-sans"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-saffron hover:bg-saffron/90 text-white font-bold py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-saffron/25 transition-all hover:scale-[1.01] font-sans cursor-pointer"
            >
              {t("eventsPage.registration.submitBtn")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
