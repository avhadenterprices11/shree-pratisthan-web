"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CommunityContests() {
  const { t } = useLanguage();

  return (
    <section 
      id="community-contests" 
      className="w-full bg-[#FAF8F5] dark:bg-[#0c0a09] py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[820px] text-left mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-normal text-charcoal dark:text-neutral-100 font-heading tracking-tight">
            {t("communityContests.title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed font-sans">
            {t("communityContests.subtitle")}
          </p>
        </div>

        {/* Two Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 sm:mb-10">

          {/* Card 1: Gharghuti Ganpati Spardha (Home Ganpati Decoration) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#151211] rounded-2xl border border-neutral-200/80 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Image Banner */}
            <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] lg:h-[340px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src="/gallery_gauri_ganpati_decor.png"
                alt={t("communityContests.ganpatiCard.title")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-heading font-normal leading-snug">
                  {t("communityContests.ganpatiCard.title")}
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
              <p className="text-xs sm:text-[13px] md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans">
                {t("communityContests.ganpatiCard.description")}
              </p>

              {/* Action Link (No dividing line, clean spacing) */}
              <div className="mt-6 sm:mt-8 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-[13px] font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                  {t("communityContests.ganpatiCard.subtitle")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider font-sans text-saffron hover:text-gold transition-colors shrink-0"
                >
                  <span className="uppercase">{t("communityContests.ganpatiCard.cta")}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Bhavya Rangoli Pradarshan & Spardha */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-[#151211] rounded-2xl border border-neutral-200/80 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Image Banner */}
            <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] lg:h-[340px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src="/images/rangoli-competition.jpg"
                alt={t("communityContests.rangoliCard.title")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-heading font-normal leading-snug">
                  {t("communityContests.rangoliCard.title")}
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
              <p className="text-xs sm:text-[13px] md:text-sm text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans">
                {t("communityContests.rangoliCard.description")}
              </p>

              {/* Action Link (No dividing line, clean spacing) */}
              <div className="mt-6 sm:mt-8 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-[13px] font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                  {t("communityContests.rangoliCard.subtitle")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider font-sans text-saffron hover:text-gold transition-colors shrink-0"
                >
                  <span className="uppercase">{t("communityContests.rangoliCard.cta")}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Process Bar: Single-strip layout */}
        <div className="bg-white dark:bg-[#141211] rounded-2xl px-5 sm:px-7 py-4 sm:py-5 border border-neutral-200/80 dark:border-white/10 shadow-sm text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex items-center gap-2.5 shrink-0">
              <Calendar size={18} className="text-[#E65100]" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-charcoal dark:text-white font-sans whitespace-nowrap">
                {t("communityContests.steps.title")}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 flex-1 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#E65100] font-heading shrink-0">{t("communityContests.steps.s1Num")}</span>
                <span className="text-xs sm:text-[13px] font-bold text-charcoal dark:text-neutral-200 font-sans leading-tight whitespace-nowrap">{t("communityContests.steps.s1Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#EAB308] font-heading shrink-0">{t("communityContests.steps.s2Num")}</span>
                <span className="text-xs sm:text-[13px] font-bold text-charcoal dark:text-neutral-200 font-sans leading-tight whitespace-nowrap">{t("communityContests.steps.s2Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#E65100] font-heading shrink-0">{t("communityContests.steps.s3Num")}</span>
                <span className="text-xs sm:text-[13px] font-bold text-charcoal dark:text-neutral-200 font-sans leading-tight whitespace-nowrap">{t("communityContests.steps.s3Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#EAB308] font-heading shrink-0">{t("communityContests.steps.s4Num")}</span>
                <span className="text-xs sm:text-[13px] font-bold text-charcoal dark:text-neutral-200 font-sans leading-tight whitespace-nowrap">{t("communityContests.steps.s4Title")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
