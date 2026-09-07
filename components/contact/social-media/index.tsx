"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSocialMedia() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const SOCIALS = [
    {
      name: t("contactPage.social.fbName"),
      desc: t("contactPage.social.fbDesc"),
      icon: (
        <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      link: "https://facebook.com",
    },
    {
      name: t("contactPage.social.instaName"),
      desc: t("contactPage.social.instaDesc"),
      icon: (
        <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      link: "https://instagram.com",
    },
    {
      name: t("contactPage.social.ytName"),
      desc: t("contactPage.social.ytDesc"),
      icon: (
        <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      ),
      link: "https://youtube.com",
    },
    {
      name: t("contactPage.social.xName"),
      desc: t("contactPage.social.xDesc"),
      icon: (
        <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      link: "https://twitter.com",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".social-card",
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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
            {t("contactPage.social.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SOCIALS.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card glass-panel glass-panel-hover p-5 sm:p-8 rounded-2xl sm:rounded-block flex flex-col justify-between cursor-pointer bg-white dark:bg-[#121214] transition-all duration-300 border border-saffron/10 dark:border-white/10"
            >
              <div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-saffron/5 flex items-center justify-center mb-4 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 mb-2 sm:mb-3 font-heading uppercase">
                  {item.name}
                </h3>
                <p className="text-base md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-saffron group font-sans">
                <span>{t("contactPage.social.visitPage")}</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
