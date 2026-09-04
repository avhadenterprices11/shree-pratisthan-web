"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

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
    "w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm text-foreground",
    "focus:outline-none focus:bg-white transition-all",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-saffron",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolunteerRegistrationForm() {
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-6xl mx-auto relative z-10 form-reveal">
        <div className="glass-panel p-8 sm:p-12 rounded-block bg-white border border-saffron/10 shadow-2xl">

          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
              Volunteer Registration Form
            </h2>
            <p className="text-slate-grey mt-3 text-sm sm:text-base">
              Submit your interest below. Our Indira Nagar, Nashik team leads will review your application and connect with you shortly.
            </p>
            <div className="w-12 h-1 bg-saffron mx-auto mt-4 rounded-full" />
          </div>

          {/* ── Success State ─────────────────────────────────────────────── */}
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mx-auto border border-saffron/20">
                <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">
                Application Received!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-sm">
                Thank you for applying, <strong>{formData.name}</strong>. We have logged your
                email (<strong>{formData.email}</strong>) and phone number (
                <strong>{formData.phone}</strong>). An Indira Nagar, Nashik team coordinator will contact you to explain
                upcoming festival, health camp, and sports initiative schedules.
              </p>
              <button
                onClick={handleReset}
                className="text-xs uppercase font-extrabold tracking-widest text-saffron hover:underline mt-4 cursor-pointer"
              >
                Submit another application
              </button>
            </div>
          ) : (
            /* ── Form ────────────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

              {/* Global error banner */}
              {status === "error" && errorMessage && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="vf-name" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="vf-name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="vf-email" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="vf-email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="vf-phone" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="vf-phone"
                    required
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.phone)}
                  />
                  <FieldError message={fieldErrors.phone} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="vf-location" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Area / Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="vf-location"
                    required
                    placeholder="e.g. Indira Nagar, Nashik"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.location)}
                  />
                  <FieldError message={fieldErrors.location} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="vf-age" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Age <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="vf-age"
                    required
                    min="16"
                    max="100"
                    placeholder="Min age: 16"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.age)}
                  />
                  <FieldError message={fieldErrors.age} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="vf-track" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Preferred Volunteer Track
                  </label>
                  <select
                    id="vf-track"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(false) + " cursor-pointer"}
                  >
                    <option value="event-logistics">Cultural Festivals (Swagat Yatra / Ganeshotsav / Shiv Jayanti)</option>
                    <option value="medical-camps">Blood Donation &amp; Health Camps (Arogya)</option>
                    <option value="tree-plantation">Sports &amp; Cricket Tournaments</option>
                    <option value="relief-work">Student Aid &amp; Community Welfare (Seva)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="vf-availability" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Time Availability
                  </label>
                  <select
                    id="vf-availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(false) + " cursor-pointer"}
                  >
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays Only</option>
                    <option value="both">Both Weekdays &amp; Weekends</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="vf-message" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Relevant Skills / Message <span className="text-slate-400 normal-case font-normal">(Optional)</span>
                </label>
                <textarea
                  id="vf-message"
                  rows={4}
                  placeholder="Share any past NGO skills, medical experience, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === "loading"}
                  className={inputClass(false) + " resize-none"}
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-extrabold text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit Volunteer Application"
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
