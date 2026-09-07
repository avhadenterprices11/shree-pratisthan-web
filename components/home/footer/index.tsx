"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function KalashIcon({ className = "w-6 h-6 sm:w-8 sm:h-8 inline-block shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Purna Kalash with Mango Leaves and Coconut"
    >
      {/* Coconut / Shrifal Top Tuft */}
      <path
        d="M32 5 C34.5 10 36 14 32 20 C28 14 29.5 10 32 5 Z"
        fill="#8D5B28"
      />
      {/* Coconut / Shrifal Body */}
      <circle cx="32" cy="18" r="7.5" fill="#A0632C" stroke="#663A12" strokeWidth="1.5" />
      <circle cx="32" cy="18" r="1.5" fill="#E25822" />

      {/* Mango Leaves (Aam Ke Patte) */}
      {/* Left Outer Leaf */}
      <path
        d="M26 26 C19 22 13 20 9 24 C13 27.5 19 28 26 28 Z"
        fill="#2E7D32"
        stroke="#1B5E20"
        strokeWidth="1"
      />
      {/* Left Inner Leaf */}
      <path
        d="M28 25 C23 17 19 14 15 17 C18 21.5 23.5 25 28 27 Z"
        fill="#43A047"
        stroke="#1B5E20"
        strokeWidth="1"
      />
      {/* Center Top Leaf behind coconut */}
      <path
        d="M32 14 C33.5 8 32 3 32 3 C32 3 30.5 8 32 14 Z"
        fill="#4CAF50"
      />
      {/* Right Inner Leaf */}
      <path
        d="M36 25 C41 17 45 14 49 17 C46 21.5 40.5 25 36 27 Z"
        fill="#43A047"
        stroke="#1B5E20"
        strokeWidth="1"
      />
      {/* Right Outer Leaf */}
      <path
        d="M38 26 C45 22 51 20 55 24 C51 27.5 45 28 38 28 Z"
        fill="#2E7D32"
        stroke="#1B5E20"
        strokeWidth="1"
      />

      {/* Kalash Rim / Mouth */}
      <path
        d="M21 28 C21 26 43 26 43 28 L41 31.5 L23 31.5 Z"
        fill="#D4AF37"
        stroke="#B38F24"
        strokeWidth="1.5"
      />

      {/* Sacred Thread / Mauli Neck Ribbon */}
      <rect x="22" y="30" width="20" height="3.5" rx="1.5" fill="#E25822" />
      <line x1="26" y1="30" x2="26" y2="33.5" stroke="#F4C430" strokeWidth="1.2" />
      <line x1="32" y1="30" x2="32" y2="33.5" stroke="#F4C430" strokeWidth="1.2" />
      <line x1="38" y1="30" x2="38" y2="33.5" stroke="#F4C430" strokeWidth="1.2" />

      {/* Golden Kalash Vessel Body */}
      <path
        d="M23 33 C16 38 15 52 23 58 C26 60 38 60 41 58 C49 52 48 38 41 33 Z"
        fill="url(#kalashGoldGrad)"
        stroke="#C59B27"
        strokeWidth="1.5"
      />

      {/* Auspicious Red Swastik on Kalash Body */}
      <path
        d="M32 40 L32 49 M27.5 44.5 L36.5 44.5 M32 40 L36.5 40 M32 49 L27.5 49 M27.5 44.5 L27.5 40 M36.5 44.5 L36.5 49"
        stroke="#D32F2F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Kalash Base */}
      <path
        d="M25 58 C25 58 27 61 32 61 C37 61 39 58 39 58 Z"
        fill="#B38F24"
      />

      <defs>
        <linearGradient id="kalashGoldGrad" x1="16" y1="34" x2="48" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@") || cleanEmail.startsWith("@") || cleanEmail.endsWith("@")) {
      setStatus("error");
      setFeedbackMsg("Please enter a valid email address (e.g. name@domain.com)");
      return;
    }

    setStatus("submitting");
    setFeedbackMsg("");

    setTimeout(() => {
      setStatus("success");
      setFeedbackMsg("Subscribed! Thank you for joining our newsletter.");
      setEmail("");

      setTimeout(() => {
        setStatus("idle");
        setFeedbackMsg("");
      }, 4000);
    }, 500);
  };

  return (
    <footer className="group/footer bg-[#111111] text-white relative overflow-hidden border-t border-white/10 select-none">

      {/* 1. Sleek Stable Header Marquee — Zero Layout Shift */}
      <div 
        className="footer-marquee-wrap relative w-full overflow-hidden whitespace-nowrap py-2 sm:py-5 bg-[#111] flex border-b border-white/10 select-none"
      >
        {/* Left & Right Gradient Soft Fades */}
        <div className="absolute left-0 top-0 h-full w-8 sm:w-28 bg-gradient-to-r from-[#111] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-8 sm:w-28 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10" />

        <div className="inline-flex items-center gap-5 sm:gap-14 animate-footer-marquee shrink-0 min-w-full justify-around pr-5 sm:pr-14 text-xs sm:text-xl md:text-2xl font-normal uppercase font-heading tracking-wider opacity-80 group-hover/footer:opacity-100 transition-opacity duration-300">
          <span className="text-white">{t("common.motto")}</span>
          <span className="text-gold font-serif text-sm sm:text-2xl md:text-3xl select-none shrink-0 drop-shadow-sm">ॐ</span>

          <span className="text-outline font-heading">{t("common.trustName")}</span>
          <KalashIcon className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 inline-block shrink-0 drop-shadow-sm" />

          <span className="text-saffron font-heading">{t("common.location")}</span>
          <span className="text-saffron font-bold text-sm sm:text-2xl md:text-3xl select-none shrink-0 drop-shadow-sm">卐</span>
        </div>
        <div className="inline-flex items-center gap-5 sm:gap-14 animate-footer-marquee shrink-0 min-w-full justify-around pr-5 sm:pr-14 text-xs sm:text-xl md:text-2xl font-normal uppercase font-heading tracking-wider opacity-80 group-hover/footer:opacity-100 transition-opacity duration-300" aria-hidden="true">
          <span className="text-white">{t("common.motto")}</span>
          <span className="text-gold font-serif text-sm sm:text-2xl md:text-3xl select-none shrink-0 drop-shadow-sm">ॐ</span>

          <span className="text-outline font-heading">{t("common.trustName")}</span>
          <KalashIcon className="w-4 h-4 sm:w-8 sm:h-8 md:w-9 md:h-9 inline-block shrink-0 drop-shadow-sm" />

          <span className="text-saffron font-heading">{t("common.location")}</span>
          <span className="text-saffron font-bold text-sm sm:text-2xl md:text-3xl select-none shrink-0 drop-shadow-sm">卐</span>
        </div>
      </div>

      {/* 2. Footer Content Grid (Streamlined & Minimized for Mobile) */}
      <div className="max-w-7xl mx-auto relative z-10 pt-5 sm:pt-10 pb-5 sm:pb-8 px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14">

          {/* Left Block: Description & Email Subscription */}
          <div className="lg:col-span-5 flex flex-col items-start gap-3 sm:gap-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/20 bg-white/5 shrink-0 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Shree Pratisthan Official Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-base font-normal tracking-tight text-white font-heading uppercase">
                  {t("common.trustName")}
                </span>
                <span className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans">
                  {t("footer.legalName")}
                </span>
              </div>
            </div>

            <p className="text-[11px] sm:text-sm text-white/60 leading-relaxed max-w-md font-normal font-sans line-clamp-2 sm:line-clamp-none">
              {t("footer.tagline")}
            </p>

            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="flex items-center bg-[#1c1c1c] border border-white/10 rounded-full p-1 pl-3 sm:pl-5 w-full focus-within:border-saffron/50 transition-colors"
              >
                <input
                  type="text"
                  placeholder={t("footer.subscribePlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className="bg-transparent text-base sm:text-sm text-white placeholder-white/30 py-1.5 sm:py-2.5 outline-none flex-grow min-w-0 font-sans"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] px-3.5 sm:px-8 py-1.5 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-50 inline-flex items-center justify-center gap-1.5 font-sans whitespace-nowrap"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{t("footer.subscribing")}</span>
                    </>
                  ) : (
                    t("footer.subscribeButton")
                  )}
                </button>
              </form>

              {status === "error" && feedbackMsg && (
                <p className="text-[10px] sm:text-[11px] text-red-400 font-medium mt-1.5 px-3 sm:px-4 flex items-center gap-1.5 font-sans">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {feedbackMsg}
                </p>
              )}

              {status === "success" && feedbackMsg && (
                <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium mt-1.5 px-3 sm:px-4 flex items-center gap-1.5 animate-in fade-in duration-200 font-sans">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  {feedbackMsg}
                </p>
              )}
            </div>

            {/* Desktop-only copyright notice */}
            <p className="hidden lg:block text-[10px] text-white/40 font-sans mt-1">
              © {new Date().getFullYear()} {t("common.trustName")} ({t("footer.legalName")} — Reg: nashik/0000153/2018). {t("footer.rights")}
            </p>
          </div>

          {/* Right Block: Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-1 sm:pt-0">

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white mb-2 sm:mb-5 font-sans">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-1.5 sm:space-y-3.5 text-xs text-white/50 font-sans">
                <li><Link href="/" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.home")}</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.events")}</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.community")}</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.about")}</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.gallery")}</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white mb-2 sm:mb-5 font-sans">
                {t("footer.supportLegal")}
              </h4>
              <ul className="space-y-1.5 sm:space-y-3.5 text-xs text-white/50 font-sans">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("footer.privacyPolicy")}</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("footer.termsConditions")}</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("common.volunteer")}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.14em] sm:tracking-[0.18em]">{t("navbar.contact")}</Link></li>
              </ul>
            </div>

            {/* Follow Us On In Icon Form */}
            <div className="col-span-2 sm:col-span-1 pt-1 sm:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white mb-2 sm:mb-5 font-sans">
                {t("footer.followUs")}
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.facebook")}
                  title={t("footer.facebook")}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.instagram")}
                  title={t("footer.instagram")}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.youtube")}
                  title={t("footer.youtube")}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.twitter")}
                  title={t("footer.twitter")}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile-only compact copyright at the very bottom */}
        <div className="block lg:hidden border-t border-white/10 mt-5 pt-3.5 text-center">
          <p className="text-xs text-white/40 font-sans leading-relaxed">
            © {new Date().getFullYear()} {t("common.trustName")} ({t("footer.legalName")} — Reg: nashik/0000153/2018). {t("footer.rights")}
          </p>
        </div>

      </div>
    </footer>
  );
}
