"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, PhoneCall, Building2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactInformation() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const CARDS = [
    {
      title: t("contactPage.info.card1Title"),
      details: [
        t("contactPage.info.card1Line1"),
        t("contactPage.info.card1Line2"),
        t("contactPage.info.card1Line3"),
      ],
      icon: MapPin,
    },
    {
      title: t("contactPage.info.card2Title"),
      details: [
        t("contactPage.info.card2Inquiries"),
        t("contactPage.info.card2Helpline"),
        t("contactPage.info.card2Whatsapp"),
      ],
      icon: PhoneCall,
    },
    {
      title: t("contactPage.info.card3Title"),
      details: [
        t("contactPage.info.card3TrustName"),
        t("contactPage.info.card3Loc"),
        t("contactPage.info.card3Bank"),
      ],
      icon: Building2,
    },
    {
      title: t("contactPage.info.card4Title"),
      details: [
        t("contactPage.info.card4RegNo"),
        t("contactPage.info.card4Founder"),
        t("contactPage.info.card4Motto"),
      ],
      icon: ShieldCheck,
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-card",
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
      className="pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("contactPage.info.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CARDS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="info-card glass-panel group p-5 sm:p-8 rounded-2xl sm:rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10"
              >
                <div>
                  <div className="mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-saffron/10 to-saffron/5 border border-saffron/20 flex items-center justify-center text-saffron group-hover:scale-110 group-hover:border-saffron/40 group-hover:shadow-md group-hover:shadow-saffron/10 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 mb-3 sm:mb-4 font-heading leading-snug uppercase">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5 font-sans">
                    {item.details.map((line, idx) => {
                      if (line.includes("Info@shreepratishthan.com")) {
                        const parts = line.split("Info@shreepratishthan.com");
                        const prefix = parts[0];
                        return (
                          <p key={idx} className="text-base md:text-sm text-slate-grey dark:text-neutral-300 font-normal leading-[1.7]">
                            {prefix}
                            <a
                              href="mailto:Info@shreepratishthan.com"
                              className="text-saffron font-bold hover:underline"
                            >
                              Info@shreepratishthan.com
                            </a>
                          </p>
                        );
                      }
                      if (line.includes("+91 9922786608")) {
                        const isWhatsApp = line.toLowerCase().includes("whatsapp") || line.includes("व्हॉट्सअ‍ॅप") || line.includes("व्हाट्सएप");
                        const parts = line.split("+91 9922786608");
                        const prefix = parts[0];
                        return (
                          <p key={idx} className="text-base md:text-sm text-slate-grey dark:text-neutral-300 font-normal leading-[1.7]">
                            {prefix}
                            <a
                              href={isWhatsApp ? "https://wa.me/919922786608" : "tel:+919922786608"}
                              target={isWhatsApp ? "_blank" : undefined}
                              rel={isWhatsApp ? "noopener noreferrer" : undefined}
                              className="text-saffron font-bold hover:underline"
                            >
                              +91 9922786608
                            </a>
                          </p>
                        );
                      }
                      return (
                        <p key={idx} className="text-base md:text-sm text-slate-grey dark:text-neutral-300 font-normal leading-[1.7]">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-xs text-saffron uppercase font-bold tracking-[0.16em] sm:tracking-[0.2em] font-sans pt-3 border-t border-saffron/10 dark:border-white/10">
                  {t("contactPage.info.officialDirectory")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
