"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, AlertCircle, CheckCircle2, ChevronDown, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const INTEREST_OPTIONS = [
  { value: "blood-donation", label: "Blood Donation & Health Camps (Arogya)" },
  { value: "tree-plantation", label: "Tree Plantation & Cleanliness (Vasundhara)" },
  { value: "charity-work", label: "Educational Kits & Relief Drives (Seva)" },
  { value: "all", label: "All Community Initiatives" },
];

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

export default function JoinMission() {
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-5xl mx-auto relative z-10 join-reveal">
        <div className="glass-panel p-8 sm:p-12 rounded-block bg-white border border-saffron/10 shadow-2xl">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
              Join Our Mission
            </h2>
            <p className="text-slate-grey mt-3 text-sm sm:text-base">
              Be a catalyst for community progress in Indira Nagar, Nashik. Register to donate blood, plant saplings, or support local student and welfare distributions.
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
                Registration Successful!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-sm">
                Thank you, <strong>{formData.name}</strong>. One of our community coordinators
                will contact you shortly on <strong>{formData.contact}</strong> to align on
                upcoming initiatives.
              </p>
              <button
                onClick={handleReset}
                className="text-xs uppercase font-extrabold tracking-widest text-saffron hover:underline mt-4 cursor-pointer"
              >
                Submit another response
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
                  <label htmlFor="jm-name" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="jm-name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="jm-contact" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Phone / Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="jm-contact"
                    required
                    placeholder="Where can we reach you?"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(!!fieldErrors.contact)}
                  />
                  <FieldError message={fieldErrors.contact} />
                </div>
              </div>

              {/* Premium Custom Dropdown */}
              <div className="space-y-2 relative" ref={dropdownRef}>
                <label id="jm-interest" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Area of Interest
                </label>
                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-saffron rounded-xl px-4 py-3 text-sm text-foreground flex items-center justify-between transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">
                    {INTEREST_OPTIONS.find((opt) => opt.value === formData.interest)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-saffron transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-saffron/25 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {INTEREST_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setFormData({ ...formData, interest: opt.value });
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                          formData.interest === opt.value
                            ? "bg-saffron/10 text-saffron font-bold"
                            : "text-foreground hover:bg-saffron/5"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {formData.interest === opt.value && <Check className="w-4 h-4 text-saffron" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="jm-message" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Short Message <span className="text-slate-400 normal-case font-normal">(Optional)</span>
                </label>
                <textarea
                  id="jm-message"
                  rows={4}
                  placeholder="Tell us a bit about yourself or ask any questions..."
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
                      Sending…
                    </>
                  ) : (
                    "Send Registration"
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
