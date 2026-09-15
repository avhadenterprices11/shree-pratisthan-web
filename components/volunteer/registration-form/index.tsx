"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  age: string;
  track: string;
  availability: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  age?: string;
  track?: string;
  availability?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  age: "",
  track: "event-logistics",
  availability: "weekends",
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

// ─── Input class helper ───────────────────────────────────────────────────────

function inputClass(hasError?: boolean) {
  return [
    "w-full bg-slate-50/50 dark:bg-[#18181b] border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 dark:text-neutral-100 font-sans",
    "focus:outline-none focus:bg-white dark:focus:bg-[#1f1f23] transition-all",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 dark:border-white/10 focus:border-saffron",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolunteerRegistrationForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP entrance animation (unchanged) ────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-reveal",
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (!formData.phone.trim() || formData.phone.trim().length < 7)
      errors.phone = "Please enter a valid phone number.";
    if (!formData.location.trim() || formData.location.trim().length < 2)
      errors.location = "Please enter your district or city.";

    const age = parseInt(formData.age, 10);
    if (!formData.age || isNaN(age) || age < 16 || age > 100)
      errors.age = "Age must be between 16 and 100.";

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
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age, 10) }),
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
      id="registration-form"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-6xl mx-auto relative z-10 form-reveal">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block bg-white dark:bg-[#121214] border border-saffron/10 dark:border-white/10 shadow-2xl">

          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight font-heading leading-tight uppercase">
              {t("volunteerPage.form.heading")}
            </h2>
            <p className="text-slate-grey dark:text-neutral-300 mt-2.5 sm:mt-3 text-base font-sans leading-[1.7] sm:leading-relaxed font-normal">
              {t("volunteerPage.form.subtitle")}
            </p>
            <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
          </div>

          {/* ── Success State ─────────────────────────────────────────────── */}
          {status === "success" ? (
            <div className="text-center py-8 sm:py-12 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mx-auto border border-saffron/20">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase">
                {t("volunteerPage.form.successTitle")}
              </h3>
              <p className="text-slate-grey dark:text-neutral-300 max-w-md mx-auto text-base font-sans leading-relaxed">
                {t("volunteerPage.form.successMsg")}
              </p>
              <button
                onClick={handleReset}
                className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-saffron hover:underline mt-3 sm:mt-4 cursor-pointer font-sans"
              >
                {t("volunteerPage.form.registerAnother")}
              </button>
            </div>
          ) : (
            /* ── Form ────────────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>

              {/* Global error banner */}
              {status === "error" && errorMessage && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-red-700 font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-name" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.nameLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="vf-name"
                    required
                    placeholder={t("volunteerPage.form.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-email" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.emailLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="vf-email"
                    required
                    placeholder={t("volunteerPage.form.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-phone" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.phoneLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="vf-phone"
                    required
                    placeholder={t("volunteerPage.form.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.phone)}
                  />
                  <FieldError message={fieldErrors.phone} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-location" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.locationLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="vf-location"
                    required
                    placeholder={t("volunteerPage.form.locationPlaceholder")}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.location)}
                  />
                  <FieldError message={fieldErrors.location} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-age" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.ageLabel")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="vf-age"
                    required
                    min="16"
                    max="100"
                    placeholder={t("volunteerPage.form.agePlaceholder")}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.age)}
                  />
                  <FieldError message={fieldErrors.age} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-track" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.trackLabel")}
                  </label>
                  <select
                    id="vf-track"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(false) + " cursor-pointer"}
                  >
                    <option value="event-logistics">{t("volunteerPage.form.trackOpt1")}</option>
                    <option value="medical-camps">{t("volunteerPage.form.trackOpt2")}</option>
                    <option value="tree-plantation">{t("volunteerPage.form.trackOpt3")}</option>
                    <option value="relief-work">{t("volunteerPage.form.trackOpt4")}</option>
                  </select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="vf-availability" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                    {t("volunteerPage.form.availLabel")}
                  </label>
                  <select
                    id="vf-availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(false) + " cursor-pointer"}
                  >
                    <option value="weekends">{t("volunteerPage.form.availOpt1")}</option>
                    <option value="weekdays">{t("volunteerPage.form.availOpt2")}</option>
                    <option value="both">{t("volunteerPage.form.availOpt3")}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="vf-message" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 dark:text-neutral-200 block font-sans">
                  {t("volunteerPage.form.notesLabel")}
                </label>
                <textarea
                  id="vf-message"
                  rows={4}
                  placeholder={t("volunteerPage.form.notesPlaceholder")}
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
                      {t("volunteerPage.form.submittingBtn")}
                    </>
                  ) : (
                    t("volunteerPage.form.submitBtn")
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
