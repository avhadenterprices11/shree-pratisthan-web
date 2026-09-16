"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  X, 
  Printer, 
  Loader2,
  Calendar,
  Phone,
  User,
  FileText
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface RegistrationData {
  regId: string;
  name: string;
  phone: string;
  event: string;
  message: string;
  date: string;
}

export default function EventsRegistration() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form input states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventChoice, setEventChoice] = useState("");
  const [message, setMessage] = useState("");
  
  // Validation and status
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state & confirmed registration summary
  const [confirmedData, setConfirmedData] = useState<RegistrationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Set default event choice when language loads
  useEffect(() => {
    if (!eventChoice) {
      setEventChoice(t("eventsPage.registration.opt1"));
    }
  }, [t, eventChoice]);

  // Entrance GSAP animation
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

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = t("eventsPage.registration.nameReq");
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = t("eventsPage.registration.phoneReq");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable async registration registration
    setTimeout(() => {
      const generatedId = `SP-INIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const currentDate = new Date().toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setConfirmedData({
        regId: generatedId,
        name: name.trim(),
        phone: cleanPhone,
        event: eventChoice || t("eventsPage.registration.opt1"),
        message: message.trim(),
        date: currentDate,
      });

      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 600);
  };

  const handleCopyId = () => {
    if (!confirmedData?.regId) return;
    navigator.clipboard.writeText(confirmedData.regId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form after completed submission
    setName("");
    setPhone("");
    setMessage("");
    setErrors({});
  };

  return (
    <section 
      ref={containerRef}
      id="register"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white dark:bg-[#121214] reg-slide-in shadow-xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("eventsPage.registration.heading")}
            </h2>
            <p className="text-slate-grey dark:text-neutral-300 mt-2 max-w-lg mx-auto font-sans leading-relaxed text-xs sm:text-sm font-normal">
              {t("eventsPage.registration.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[10px] text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                  {t("eventsPage.registration.nameLabel")} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder={t("eventsPage.registration.namePlaceholder")}
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border ${
                    errors.name ? "border-red-500 ring-1 ring-red-500/20" : "border-border dark:border-white/15"
                  } bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 font-sans">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                  {t("eventsPage.registration.phoneLabel")} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder={t("eventsPage.registration.phonePlaceholder")}
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border ${
                    errors.phone ? "border-red-500 ring-1 ring-red-500/20" : "border-border dark:border-white/15"
                  } bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5 font-sans">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                {t("eventsPage.registration.eventLabel")}
              </label>
              <div className="relative group">
                <select 
                  value={eventChoice}
                  onChange={(e) => setEventChoice(e.target.value)}
                  className="w-full appearance-none pl-4 pr-11 py-3 sm:py-3.5 rounded-xl sm:rounded-interactive border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#18181b] backdrop-blur-md shadow-xs text-neutral-900 dark:text-neutral-100 font-sans text-sm font-medium focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/25 transition-all cursor-pointer hover:border-saffron/50"
                >
                  <option value={t("eventsPage.registration.opt1")} className="bg-background dark:bg-neutral-900 text-foreground py-2">
                    {t("eventsPage.registration.opt1")}
                  </option>
                  <option value={t("eventsPage.registration.opt2")} className="bg-background dark:bg-neutral-900 text-foreground py-2">
                    {t("eventsPage.registration.opt2")}
                  </option>
                  <option value={t("eventsPage.registration.opt3")} className="bg-background dark:bg-neutral-900 text-foreground py-2">
                    {t("eventsPage.registration.opt3")}
                  </option>
                  <option value={t("eventsPage.registration.opt4")} className="bg-background dark:bg-neutral-900 text-foreground py-2">
                    {t("eventsPage.registration.opt4")}
                  </option>
                  <option value={t("eventsPage.registration.opt5")} className="bg-background dark:bg-neutral-900 text-foreground py-2">
                    {t("eventsPage.registration.opt5")}
                  </option>
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg bg-saffron/10 text-saffron transition-transform duration-300 group-hover:scale-105">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-grey dark:text-neutral-400 uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">
                {t("eventsPage.registration.messageLabel")}
              </label>
              <textarea 
                rows={3} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("eventsPage.registration.messagePlaceholder")}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border dark:border-white/15 bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all resize-none font-sans"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-saffron hover:bg-saffron/90 disabled:opacity-60 text-white font-bold py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-saffron/25 transition-all hover:scale-[1.01] font-sans cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                t("eventsPage.registration.submitBtn")
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── HIGH-CONVERTING REGISTRATION CONFIRMATION MODAL POPUP ── */}
      {isModalOpen && confirmedData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 print:p-0 print:bg-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-[#121214] border border-saffron/30 dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center overflow-hidden animate-in zoom-in-95 duration-300 font-sans">
            
            {/* Close Cross Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer print:hidden"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Verified Badge */}
            <div className="relative inline-flex items-center justify-center mx-auto mt-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-600 via-teal-400 to-amber-400 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-emerald-50 to-emerald-100 dark:from-[#1a2e22] dark:via-[#14231a] dark:to-[#0f1b13] flex items-center justify-center border border-white/80 dark:border-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Header & Subtitle */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t("eventsPage.registration.confirmModalBadge")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                {t("eventsPage.registration.confirmModalTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                {t("eventsPage.registration.confirmModalDesc")}
              </p>
            </div>

            {/* Summary Details Card */}
            <div className="bg-neutral-50 dark:bg-[#18181b] border border-neutral-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 text-left space-y-3 shadow-inner">
              
              {/* Reference ID Row */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400 tracking-wider block">
                    {t("eventsPage.registration.bookingId")}
                  </span>
                  <span className="font-mono text-base font-extrabold text-saffron tracking-tight">
                    {confirmedData.regId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#202024] hover:bg-neutral-100 dark:hover:bg-[#28282d] text-neutral-700 dark:text-neutral-200 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-white/10 transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t("eventsPage.registration.copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{t("eventsPage.registration.copyId")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Data Fields */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-saffron shrink-0" />
                  <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Participant:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{confirmedData.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-saffron shrink-0" />
                  <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Contact:</span>
                  <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">{confirmedData.phone}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                  <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Initiative:</span>
                  <span className="font-semibold text-saffron">{confirmedData.event}</span>
                </div>

                {confirmedData.message && (
                  <div className="flex items-start gap-2 pt-1 border-t border-neutral-200/60 dark:border-white/5">
                    <FileText className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                    <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Notes:</span>
                    <span className="text-neutral-700 dark:text-neutral-300 text-xs italic">{confirmedData.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 print:hidden">
              <button
                type="button"
                onClick={handlePrintSlip}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-300 dark:border-neutral-700"
              >
                <Printer className="w-4 h-4" />
                <span>{t("eventsPage.registration.printSlip")}</span>
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-saffron hover:bg-saffron/90 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-saffron/20"
              >
                <span>{t("eventsPage.registration.doneBtn")}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
