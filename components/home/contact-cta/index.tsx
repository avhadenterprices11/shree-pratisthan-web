"use client";

import React, { useEffect, useRef, useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { ChevronDown, Send, Check, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    t("contactCTA.form.opt1"),
    t("contactCTA.form.opt2"),
    t("contactCTA.form.opt3"),
    t("contactCTA.form.opt4"),
  ];

  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-slide-in",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = t("contactCTA.form.nameError");
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = t("contactCTA.form.emailError");
    }
    if (!message.trim()) {
      newErrors.message = t("contactCTA.form.messageError");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 contact-slide-in">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-foreground leading-[1.15] tracking-tight mb-4 sm:mb-6 font-heading">
              {t("contactCTA.title")}
            </h2>
            <p className="text-base text-slate-grey leading-[1.75] mb-6 sm:mb-8 font-sans">
              {t("contactCTA.description")}
            </p>

            <div className="space-y-4 sm:space-y-6">
              {/* Telephone */}
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-grey uppercase font-bold tracking-[0.2em] block font-sans">{t("contactCTA.phoneTitle")}</span>
                  <span className="text-base font-normal text-foreground font-heading">+91 9922786608</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-grey uppercase font-bold tracking-[0.2em] block font-sans">{t("contactCTA.emailTitle")}</span>
                  <span className="text-base font-normal text-foreground font-heading">Info@shreepratishthan.com</span>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 dark:bg-saffron/20 flex items-center justify-center text-orange-600 dark:text-saffron shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-grey dark:text-neutral-300 uppercase font-bold tracking-[0.2em] block font-sans">{t("contactCTA.addressTitle")}</span>
                  <span className="text-base font-normal text-foreground font-heading">{t("contactCTA.address")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 contact-slide-in glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/90 dark:bg-[#121214]/95 backdrop-blur-md shadow-xl">
            <h3 className="text-lg sm:text-2xl font-normal text-foreground mb-4 sm:mb-6 font-heading">{t("contactCTA.form.submitButton")}</h3>

            {status === "success" ? (
              <div className="py-6 sm:py-8 px-4 sm:px-6 text-center space-y-3 sm:space-y-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl animate-in fade-in duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-emerald-950 dark:text-emerald-200 font-heading">
                  {t("contactCTA.form.successTitle")}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed max-w-md mx-auto">
                  {t("contactCTA.form.successDesc")}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 sm:mt-4 px-5 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-sm"
                >
                  {t("contactCTA.form.sendAnother")}
                </button>
              </div>
            ) : (
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs text-slate-grey dark:text-neutral-300 uppercase font-bold tracking-widest block mb-1.5 sm:mb-2 font-heading">{t("contactCTA.form.nameLabel")}</label>
                    <input 
                      type="text" 
                      placeholder={t("contactCTA.form.namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-interactive border bg-background/80 dark:bg-[#18181b] focus:outline-none focus:ring-2 text-base text-foreground transition-all ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-saffron/20 dark:border-white/10 focus:border-saffron focus:ring-saffron/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-slate-grey dark:text-neutral-300 uppercase font-bold tracking-widest block mb-2 font-heading">{t("contactCTA.form.emailLabel")}</label>
                    <input 
                      type="text" 
                      placeholder={t("contactCTA.form.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-interactive border bg-background/80 dark:bg-[#18181b] focus:outline-none focus:ring-2 text-base text-foreground transition-all ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-saffron/20 dark:border-white/10 focus:border-saffron focus:ring-saffron/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Premium Custom Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="text-xs text-slate-grey dark:text-neutral-300 uppercase font-bold tracking-widest block mb-2 font-heading">{t("contactCTA.form.subjectLabel")}</label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-interactive border border-saffron/25 dark:border-white/10 bg-background/80 dark:bg-[#18181b] hover:bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base text-foreground flex items-center justify-between transition-all cursor-pointer shadow-xs"
                  >
                    <span className="font-medium">{subjectOptions[selectedSubjectIndex]}</span>
                    <ChevronDown className={`w-4 h-4 text-saffron transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 dark:bg-[#18181b] backdrop-blur-xl border border-saffron/25 dark:border-white/10 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {subjectOptions.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedSubjectIndex(idx);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-base cursor-pointer flex items-center justify-between transition-colors ${
                            selectedSubjectIndex === idx
                              ? "bg-saffron/10 text-saffron font-bold"
                              : "text-foreground hover:bg-saffron/5 dark:hover:bg-white/5"
                          }`}
                        >
                          <span>{option}</span>
                          {selectedSubjectIndex === idx && <Check className="w-4 h-4 text-saffron" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-grey dark:text-neutral-300 uppercase font-bold tracking-widest block mb-2 font-heading">{t("contactCTA.form.messageLabel")}</label>
                  <textarea 
                    rows={4} 
                    placeholder={t("contactCTA.form.messagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-interactive border bg-background/80 dark:bg-[#18181b] focus:outline-none focus:ring-2 text-base text-foreground transition-all resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-saffron/20 dark:border-white/10 focus:border-saffron focus:ring-saffron/20"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <LiquidMetalButton
                    type="submit"
                    variant="themed"
                    size="lg"
                    disabled={status === "submitting"}
                    icon={status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    className="w-full text-xs uppercase font-extrabold tracking-widest font-heading cursor-pointer disabled:opacity-70"
                    data-hover="pointer"
                  >
                    {status === "submitting" ? t("contactCTA.form.sending") : t("contactCTA.form.submitButton")}
                  </LiquidMetalButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
