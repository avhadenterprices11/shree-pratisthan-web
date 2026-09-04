"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const impactCards = [
  {
    id: 0,
    metric: "50+ Drives",
    title: "Blood Donation Camps",
    description:
      "Regular mass blood donation drives organized in collaboration with top Nashik hospitals to save critical lives in times of emergency.",
    image: "/volunteer_musician.png",
    bg: "bg-orange-50/70 border-saffron/15",
    text: "text-charcoal",
    isFeature: true,
    featureLabel: "Life-Saving Seva",
  },
  {
    id: 1,
    metric: "1,000+",
    title: "Yoga & Wellness Camps",
    description:
      "Mass community sessions on International Yoga Day and fitness workshops promoting holistic mental and physical well-being.",
    image: "/volunteer_safety.png",
    bg: "bg-amber-50/70 border-gold/15",
    text: "text-charcoal",
  },
  {
    id: 2,
    metric: "5,000+",
    title: "Health Diagnostic Camps",
    description:
      "Free medical examinations, eye checkup drives, and essential healthcare assistance for senior citizens and local families.",
    image: "/volunteer_coordinator.png",
    bg: "bg-[#121214] border-coal",
    text: "text-alabaster",
  },
  {
    id: 3,
    metric: "100%",
    title: "Community & Student Aid",
    description:
      "Distributing notebooks, study materials for underprivileged children, cleanliness drives, and prompt emergency community assistance.",
    image: "/volunteer_eco.png",
    bg: "bg-rose-50/70 border-red-200/15",
    text: "text-charcoal",
  },
];

export default function CulturalInitiatives() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="social-work" className="w-full bg-background py-12 sm:py-16 md:py-20 select-none">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex items-start justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-[620px] text-left">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] leading-[1.1] font-black text-charcoal font-heading">
              Social Welfare & Healthcare Drives
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] text-slate-grey leading-[1.7] max-w-[560px] font-sans">
              Dedicated community initiatives, life-saving blood donation drives, wellness camps, and educational support across Indira Nagar.
            </p>
          </div>
        </div>

        {/* Framer-Motion Accordion Layout */}
        <div 
          onMouseLeave={() => setOpenCard(null)}
          className="flex flex-col md:flex-row md:items-end gap-3 md:gap-0"
        >
          {impactCards.map((card, idx) => {
            const isOpen = openCard === idx;
            const closedHeights = [280, 330, 390, 430];
            const targetHeight = isMobile
              ? (isOpen ? 440 : 100)
              : (isOpen ? 480 : closedHeights[idx]);

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(idx)}
                tabIndex={0}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={`${card.bg} ${card.text} relative overflow-hidden border border-saffron/10 h-[100px] md:h-auto cursor-pointer rounded-2xl md:rounded-none`}
              >
                <motion.div
                  animate={{ height: targetHeight }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="h-full"
                >
                  {isOpen ? (
                    <div className="h-full p-5 sm:p-6 md:p-7 flex flex-col justify-between text-left">
                      {card.isFeature ? (
                        <div className="max-w-[280px]">
                          <h3 className="text-[24px] sm:text-[28px] md:text-[32px] leading-[1.05] font-black font-heading mb-3 text-charcoal">
                            Shree
                            <br />
                            Naad Pathak
                          </h3>
                          <Link
                            href="/volunteer"
                            className="inline-flex items-center gap-2 text-[11px] tracking-[1.4px] uppercase font-bold text-saffron hover:text-gold transition-colors cursor-pointer"
                            data-hover="pointer"
                          >
                            Join the Troupe <ArrowRight size={14} />
                          </Link>
                        </div>
                      ) : (
                        <div className="max-w-[300px]">
                          <h3 className={`text-[20px] sm:text-[24px] md:text-[26px] leading-[1.08] font-black font-heading ${
                            card.id === 2 ? "text-white" : "text-charcoal"
                          }`}>
                            {card.title}
                          </h3>
                          <p className={`mt-2 text-[12px] sm:text-[13px] leading-[1.5] opacity-90 font-sans ${
                            card.id === 2 ? "text-slate-300" : "text-slate-grey"
                          }`}>
                            {card.description}
                          </p>
                          <Link
                            href="/volunteer"
                            className={`mt-3 inline-flex items-center gap-2 text-[11px] tracking-[1.4px] uppercase font-bold transition-colors cursor-pointer ${
                              card.id === 2 ? "text-gold hover:text-saffron" : "text-saffron hover:text-gold"
                            }`}
                            data-hover="pointer"
                          >
                            Participate <ArrowRight size={14} />
                          </Link>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1.05fr_1fr] gap-4 flex-1 items-end">
                        <div className="self-start sm:self-end">
                          <p className="text-[44px] sm:text-[50px] md:text-[56px] font-black leading-none font-heading text-saffron">
                            {card.metric}
                          </p>
                          <p className={`mt-2 text-[10px] sm:text-[11px] tracking-[1.2px] uppercase font-bold font-sans ${
                            card.id === 2 ? "text-white/80" : "text-charcoal/80"
                          }`}>
                            {card.title}
                          </p>
                        </div>

                        <div
                          className={`relative w-full rounded-block overflow-hidden border border-saffron/10 ${
                            card.isFeature
                              ? "h-[160px] sm:h-[180px] md:h-[200px]"
                              : "h-[120px] sm:h-[140px] md:h-[155px]"
                          }`}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full p-4 sm:p-5 flex flex-col justify-between text-left">
                      <div />
                      <div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black leading-none font-heading text-saffron whitespace-nowrap">
                          {card.metric}
                        </p>
                        <p className={`mt-1.5 text-[9px] lg:text-[10px] tracking-wider uppercase font-extrabold font-sans leading-tight max-w-[90px] ${
                          card.id === 2 ? "text-white/60" : "text-charcoal/60"
                        }`}>
                          {card.title}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Troupe Volunteer Invitation Banner */}
        <Link 
          href="/volunteer"
          className="mt-12 bg-charcoal text-white rounded-full px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center cursor-pointer hover:bg-charcoal/95 transition-all border border-saffron/10 group shadow-md block"
          data-hover="pointer"
        >
          <p className="text-[13px] sm:text-[14px] leading-[1.4] text-slate-200 font-sans">
            Ready to drum, climb, or design? Register with our friends troupe and join the next grand celebration!
          </p>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-saffron flex items-center gap-1.5 whitespace-nowrap bg-white/95 px-4 py-2 rounded-full shadow-sm group-hover:text-gold transition-colors">
            Become a Volunteer <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>

      </div>
    </section>
  );
}
