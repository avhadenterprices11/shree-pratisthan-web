"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, AlertCircle, CheckCircle2, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  contact: string;
  interest: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  contact?: string;
  interest?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  contact: "",
  interest: "blood-donation",
  message: "",
};

// ─── Field Error Component ────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </p>
  );
}

function inputClass(hasError?: boolean) {
  return [
    "w-full bg-slate-50/50 dark:bg-white/5 border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 dark:text-neutral-100 font-sans",
    "focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
      : "border-slate-200 dark:border-white/15 focus:border-saffron",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JoinMission() {
  const { t } = useLanguage();

  const INTEREST_OPTIONS = [
    { value: "blood-donation", label: t("communityPage.joinMission.opt1") },
    { value: "tree-plantation", label: t("communityPage.joinMission.opt2") },
    { value: "charity-work", label: t("communityPage.joinMission.opt3") },
    { value: "all", label: t("communityPage.joinMission.opt4") },
  ];

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── GSAP entrance animation (unchanged) ────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".join-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
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

  // ── Client-side validation ─────────────────────────────────────────────────
  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters.";
    if (!formData.contact.trim() || formData.contact.trim().length < 5)
      errors.contact = "Please enter a valid phone number or email address.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json() as {
        success: boolean;
        message: string;
        errors?: Array<{ field: string; message: string }>;
      };

      if (!response.ok || !result.success) {
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors: FieldErrors = {};
          result.errors.forEach((err) => {
            if (err.field in INITIAL_FORM) {
              (serverErrors as Record<string, string>)[err.field] = err.message;
            }
          });
          setFieldErrors(serverErrors);
        }
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  // ── Reset handler ──────────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setFieldErrors({});
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      id="join-mission"
      ref={containerRef}
      className="pt-12 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-5xl mx-auto relative z-10 join-reveal">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10 shadow-2xl">

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-saffron font-bold text-xs sm:text-sm uppercase tracking-[0.25em] block mb-2 font-sans">
              {t("communityPage.joinMission.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-snug uppercase py-1">
              {t("communityPage.joinMission.heading")}
            </h2>
            <p className="text-slate-grey mt-2.5 sm:mt-3 text-base md:text-lg font-sans leading-[1.75] font-normal">
              {t("communityPage.joinMission.subtitle")}
            </p>
            <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
          </div>

          {/* ── Success State ─────────────────────────────────────────────── */}
          {status === "success" ? (
            <div className="text-center py-8 sm:py-12 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mx-auto border border-saffron/20">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-lg sm:text-2xl font-normal text-neutral-900 font-heading uppercase">
                {t("communityPage.joinMission.successTitle")}
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-base md:text-sm font-sans leading-relaxed">
                {t("communityPage.joinMission.successDesc")}
              </p>
              <button
                onClick={handleReset}
                className="text-xs uppercase font-bold tracking-[0.2em] text-saffron hover:underline mt-3 sm:mt-4 cursor-pointer font-sans"
              >
                Submit another response
              </button>
            </div>
          ) : (
            /* ── Form ────────────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>

              {/* Global error banner */}
              {status === "error" && errorMessage && (
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 rounded-xl px-4 py-3 text-xs sm:text-sm text-red-700 dark:text-red-400 font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="jm-name" className="text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("communityPage.joinMission.nameLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="jm-name"
                    required
                    placeholder={t("communityPage.joinMission.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="jm-contact" className="text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("communityPage.joinMission.contactLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="jm-contact"
                    required
                    placeholder={t("communityPage.joinMission.contactPlaceholder")}
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.contact)}
                  />
                  <FieldError message={fieldErrors.contact} />
                </div>
              </div>

              {/* Premium Custom Dropdown */}
              <div className="space-y-1.5 sm:space-y-2 relative" ref={dropdownRef}>
                <label id="jm-interest" className="text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                  {t("communityPage.joinMission.interestLabel")}
                </label>
                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50/50 dark:bg-[#18181b] hover:bg-white dark:hover:bg-[#202024] border border-slate-200 dark:border-white/15 focus:border-saffron rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 dark:text-neutral-100 flex items-center justify-between transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed font-sans"
                >
                  <span className="font-normal text-left truncate">
                    {INTEREST_OPTIONS.find((opt) => opt.value === formData.interest)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-saffron transition-transform duration-300 shrink-0 ml-2 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl border border-saffron/25 dark:border-white/15 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
                    {INTEREST_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setFormData({ ...formData, interest: opt.value });
                          setIsDropdownOpen(false);
                        }}
                        className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-base sm:text-sm cursor-pointer flex items-center justify-between transition-colors ${
                          formData.interest === opt.value
                            ? "bg-saffron/10 text-saffron font-bold"
                            : "text-neutral-900 dark:text-neutral-200 hover:bg-saffron/5 dark:hover:bg-white/5 font-normal"
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {formData.interest === opt.value && <Check className="w-4 h-4 text-saffron shrink-0 ml-2" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="jm-message" className="text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                  {t("communityPage.joinMission.messageLabel")}
                </label>
                <textarea
                  id="jm-message"
                  rows={4}
                  placeholder={t("communityPage.joinMission.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === "loading"}
                  className={inputClass(false) + " resize-none"}
                />
              </div>

              <div className="text-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-bold text-xs uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 font-sans"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("communityPage.joinMission.submitting")}
                    </>
                  ) : (
                    t("communityPage.joinMission.submitButton")
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
