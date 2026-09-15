"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Loader2, 
  MessageCircle, 
  UploadCloud,
  Calendar,
  Phone,
  User,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface ConfirmedMemory {
  refId: string;
  name: string;
  phone: string;
  event: string;
  year: string;
  mediaLink: string;
}

export default function ShareMemoriesCTA() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  // Modal and submission state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventOccasion, setEventOccasion] = useState("");
  const [year, setYear] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState<ConfirmedMemory | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".share-trigger-content",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll and listen for ESC key when modal is active
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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setBtnCoords({ x: x * 0.45, y: y * 0.45 });
  };

  const handleMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setConfirmedData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (confirmedData) {
      setName("");
      setPhone("");
      setEventOccasion("");
      setYear("");
      setMediaLink("");
      setConfirmedData(null);
    }
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = t("galleryPage.cta.nameReq");
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = t("galleryPage.cta.phoneReq");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedData({
        refId: generatedRef,
        name: name.trim(),
        phone: cleanPhone,
        event: eventOccasion.trim() || "Shree Pratisthan Past Event",
        year: year.trim() || "2026",
        mediaLink: mediaLink.trim(),
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyId = () => {
    if (!confirmedData?.refId) return;
    navigator.clipboard.writeText(confirmedData.refId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10 share-trigger-content">
        <div className="glass-panel p-6 sm:p-12 md:p-16 rounded-2xl sm:rounded-block text-center border border-saffron/20 dark:border-white/10 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white dark:from-[#1a1412] dark:via-[#141416] dark:to-[#121214]">
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 leading-tight mb-3 sm:mb-6 font-heading tracking-tight uppercase">
              {t("galleryPage.cta.heading")}
            </h2>
            <p className="text-base md:text-lg text-slate-grey dark:text-neutral-300 max-w-xl mx-auto mb-6 sm:mb-10 leading-[1.7] sm:leading-[1.75] font-sans font-normal">
              {t("galleryPage.cta.subtitle")}
            </p>

            <button
              ref={buttonRef}
              onClick={handleOpenModal}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)`,
                transition: btnCoords.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
              }}
              className="bg-saffron hover:bg-saffron/90 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full shadow-lg shadow-saffron/20 text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 cursor-pointer font-sans inline-flex items-center gap-2"
              data-hover="pointer"
              type="button"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{t("galleryPage.cta.shareBtn")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MODAL DIALOG: SUBMIT MEMORIES & CONFIRMATION POPUP ── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-[#121214] border border-saffron/30 dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center overflow-hidden animate-in zoom-in-95 duration-300 font-sans max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedData ? (
              /* ── SUCCESS CONFIRMATION POPUP VIEW ── */
              <div className="space-y-5 py-2 animate-in fade-in duration-300">
                {/* Verified Medallion */}
                <div className="relative inline-flex items-center justify-center mx-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-600 via-teal-400 to-amber-400 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-emerald-50 to-emerald-100 dark:from-[#1a2e22] dark:via-[#14231a] dark:to-[#0f1b13] flex items-center justify-center border border-white/80 dark:border-emerald-500/20">
                      <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Archive Recorded
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                    {t("galleryPage.cta.successTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {t("galleryPage.cta.successDesc")}
                  </p>
                </div>

                {/* Confirmed Details Card */}
                <div className="bg-neutral-50 dark:bg-[#18181b] border border-neutral-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 text-left space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400 tracking-wider block">
                        {t("galleryPage.cta.refId")}
                      </span>
                      <span className="font-mono text-base font-extrabold text-saffron tracking-tight">
                        {confirmedData.refId}
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
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Contributor:</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">{confirmedData.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Contact:</span>
                      <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">{confirmedData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span className="text-slate-500 dark:text-neutral-400 min-w-[70px]">Occasion:</span>
                      <span className="font-semibold text-saffron">{confirmedData.event} ({confirmedData.year})</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Alternative Action */}
                <a
                  href={`https://wa.me/919922786608?text=${encodeURIComponent(
                    `Namaskar Shree Pratisthan! I have submitted past memories with Ref ID: ${confirmedData.refId}. Name: ${confirmedData.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Photos on WhatsApp Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-neutral-300 dark:border-neutral-700"
                >
                  {t("galleryPage.cta.close")}
                </button>
              </div>
            ) : (
              /* ── INPUT SUBMISSION FORM VIEW ── */
              <div className="space-y-4">
                <div className="space-y-1.5 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center mx-auto border border-saffron/20 shadow-xs mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                    {t("galleryPage.cta.modalTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {t("galleryPage.cta.modalSubtitle")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-left pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] text-slate-600 dark:text-neutral-400 uppercase font-bold tracking-[0.18em] block mb-1">
                        {t("galleryPage.cta.nameLabel")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={t("galleryPage.cta.namePlaceholder")}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${
                          errors.name ? "border-red-500 ring-1 ring-red-500/20" : "border-border dark:border-white/15"
                        } bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-600 dark:text-neutral-400 uppercase font-bold tracking-[0.18em] block mb-1">
                        {t("galleryPage.cta.phoneLabel")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder={t("galleryPage.cta.phonePlaceholder")}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${
                          errors.phone ? "border-red-500 ring-1 ring-red-500/20" : "border-border dark:border-white/15"
                        } bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] text-slate-600 dark:text-neutral-400 uppercase font-bold tracking-[0.18em] block mb-1">
                        {t("galleryPage.cta.eventLabel")}
                      </label>
                      <input 
                        type="text"
                        value={eventOccasion}
                        onChange={(e) => setEventOccasion(e.target.value)}
                        placeholder={t("galleryPage.cta.eventPlaceholder")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border dark:border-white/15 bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-600 dark:text-neutral-400 uppercase font-bold tracking-[0.18em] block mb-1">
                        {t("galleryPage.cta.yearLabel")}
                      </label>
                      <input 
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder={t("galleryPage.cta.yearPlaceholder")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border dark:border-white/15 bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-600 dark:text-neutral-400 uppercase font-bold tracking-[0.18em] block mb-1">
                      {t("galleryPage.cta.mediaLinkLabel")}
                    </label>
                    <textarea 
                      rows={3}
                      value={mediaLink}
                      onChange={(e) => setMediaLink(e.target.value)}
                      placeholder={t("galleryPage.cta.mediaLinkPlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border dark:border-white/15 bg-background dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all resize-none"
                    />
                  </div>

                  {/* Direct WhatsApp Option */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/25 text-xs">
                    <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                      {t("galleryPage.cta.whatsappHint")}
                    </span>
                    <a
                      href="https://wa.me/919922786608?text=Namaskar%20Shree%20Pratisthan%20Team,%20I%20have%20event%20memories%20and%20photos%20to%20share."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shrink-0 ml-2"
                      title="Open WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-saffron hover:bg-saffron/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-saffron/25 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t("galleryPage.cta.submitting")}</span>
                      </>
                    ) : (
                      t("galleryPage.cta.submitBtn")
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
