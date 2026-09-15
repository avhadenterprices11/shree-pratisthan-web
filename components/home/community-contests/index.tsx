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
      className="w-full bg-neutral-50/60 dark:bg-[#0c0a09] py-10 sm:py-14 border-y border-saffron/10 dark:border-white/10 relative overflow-hidden"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-saffron/5 dark:bg-saffron/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-gold/5 dark:bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-[760px] text-left mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-[32px] md:text-[36px] leading-tight font-normal text-charcoal dark:text-neutral-100 font-heading tracking-tight">
            {t("communityContests.title")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-grey dark:text-neutral-300 leading-relaxed font-sans">
            {t("communityContests.subtitle")}
          </p>
        </div>

        {/* Two Compact Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Card 1: Gharghuti Ganpati Spardha (Home Ganpati Decoration) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#151211] rounded-2xl border border-saffron/15 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Compact Image Banner */}
            <div className="relative w-full h-[190px] sm:h-[220px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src="/gallery_gauri_ganpati_decor.png"
                alt={t("communityContests.ganpatiCard.title")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-xl sm:text-2xl font-heading font-normal leading-snug">
                  {t("communityContests.ganpatiCard.title")}
                </h3>
              </div>
            </div>

            {/* Card Body - Slim & Crisp */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
              <p className="text-xs sm:text-[13px] text-slate-grey dark:text-neutral-300 leading-relaxed font-sans">
                {t("communityContests.ganpatiCard.description")}
              </p>

              {/* Action Link */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                  {t("communityContests.ganpatiCard.subtitle")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-sans text-saffron hover:text-gold transition-colors"
                >
                  <span>{t("communityContests.ganpatiCard.cta")}</span>
                  <ArrowRight size={13} />
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
            className="bg-white dark:bg-[#151211] rounded-2xl border border-saffron/15 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Compact Image Banner */}
            <div className="relative w-full h-[190px] sm:h-[220px] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src="/images/rangoli-competition.jpg"
                alt={t("communityContests.rangoliCard.title")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-xl sm:text-2xl font-heading font-normal leading-snug">
                  {t("communityContests.rangoliCard.title")}
                </h3>
              </div>
            </div>

            {/* Card Body - Slim & Crisp */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
              <p className="text-xs sm:text-[13px] text-slate-grey dark:text-neutral-300 leading-relaxed font-sans">
                {t("communityContests.rangoliCard.description")}
              </p>

              {/* Action Link */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 font-sans">
                  {t("communityContests.rangoliCard.subtitle")}
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-sans text-saffron hover:text-gold transition-colors"
                >
                  <span>{t("communityContests.rangoliCard.cta")}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Process Bar: Slim, Single-strip layout */}
        <div className="mt-8 bg-white/80 dark:bg-[#141211]/80 backdrop-blur-sm rounded-2xl p-3.5 sm:p-4 border border-saffron/10 dark:border-white/10 shadow-sm text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <Calendar size={15} className="text-saffron" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-white font-sans">
                {t("communityContests.steps.title")}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-saffron font-heading shrink-0">{t("communityContests.steps.s1Num")}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal dark:text-neutral-200 font-sans leading-tight">{t("communityContests.steps.s1Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gold font-heading shrink-0">{t("communityContests.steps.s2Num")}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal dark:text-neutral-200 font-sans leading-tight">{t("communityContests.steps.s2Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-saffron font-heading shrink-0">{t("communityContests.steps.s3Num")}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal dark:text-neutral-200 font-sans leading-tight">{t("communityContests.steps.s3Title")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-gold font-heading shrink-0">{t("communityContests.steps.s4Num")}</span>
                <span className="text-[11px] sm:text-xs font-semibold text-charcoal dark:text-neutral-200 font-sans leading-tight">{t("communityContests.steps.s4Title")}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
