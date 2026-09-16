"use client";

import React from "react";
import { User, Phone, Mail, MapPin, HelpCircle, ChevronDown } from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

interface StepPersonalProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

export default function StepPersonal({
  formData,
  updateFields,
  errors,
  onNext,
}: StepPersonalProps) {
  const { t } = useLanguage();
  const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const customQuestions = activeEvent?.customQuestions || [];

  const handleCustomAnswerChange = (questionId: string, value: string | boolean) => {
    const currentAnswers = formData.customAnswers || {};
    updateFields({
      customAnswers: {
        ...currentAnswers,
        [questionId]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-neutral-200 dark:border-white/10 pb-4 mb-6">
        <h3 className="text-lg md:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <User className="w-6 h-6 text-saffron" />
          {t("eventsPage.booking.step1")}
        </h3>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
          {t("eventsPage.booking.attendeeDesc")}
        </p>
      </div>

      {/* Grid Layout: Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {t("eventsPage.booking.fullName")} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              id="fullName"
              type="text"
              required
              placeholder="e.g. Adv. Rahul Sharma"
              value={formData.fullName || ""}
              onChange={(e) => updateFields({ fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium font-sans"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {t("eventsPage.booking.phone")} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              id="mobileNumber"
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.mobileNumber || ""}
              onChange={(e) => updateFields({ mobileNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium font-sans"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {t("eventsPage.booking.email")} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              id="email"
              type="email"
              required
              placeholder="name@domain.com"
              value={formData.email || ""}
              onChange={(e) => updateFields({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium font-sans"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.email}</p>
          )}
        </div>

        {/* Residential Address */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="streetArea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {t("eventsPage.booking.address")} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <textarea
              id="streetArea"
              required
              rows={3}
              placeholder="Enter your flat/house no., area, landmark & city (e.g. Flat 402, Indira Nagar, Nashik - 422009)"
              value={formData.streetArea || ""}
              onChange={(e) => updateFields({ 
                streetArea: e.target.value,
                houseNumber: "N/A",
                city: "Nashik",
                district: "Nashik",
                pinCode: "422009"
              })}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium resize-none font-sans"
            />
          </div>
          {errors.streetArea && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.streetArea}</p>
          )}
        </div>
      </div>

      {/* Dynamic Custom Registration Questions (Configured in Backend) */}
      {customQuestions.length > 0 && (
        <div className="pt-6 border-t border-saffron/15 dark:border-white/10 space-y-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-saffron" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-heading">
                Event-Specific Registration Questions
              </h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans">
                Tailored for {activeEvent?.title}
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-saffron/[0.03] dark:bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-saffron/15 dark:border-white/10">
            {customQuestions.map((q) => {
              const currentVal = formData.customAnswers?.[q.id] ?? "";
              const errKey = `custom_${q.id}`;

              return (
                <div key={q.id} className="space-y-1.5">
                  <label htmlFor={`custom_${q.id}`} className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                    {q.label} {q.required && <span className="text-saffron">*</span>}
                  </label>

                  {q.type === "select" && q.options && (
                    <div className="relative group">
                      <select
                        id={`custom_${q.id}`}
                        required={q.required}
                        value={String(currentVal)}
                        onChange={(e) => handleCustomAnswerChange(q.id, e.target.value)}
                        className="w-full appearance-none pl-4 pr-11 py-2.5 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm font-medium font-sans focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron shadow-xs cursor-pointer hover:border-saffron/50 transition-all"
                      >
                        <option value="">-- Please select an option --</option>
                        {q.options.map((opt, i) => (
                          <option key={i} value={opt} className="dark:bg-[#18181b] dark:text-neutral-100">{opt}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md bg-saffron/10 text-saffron">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {q.type === "text" && (
                    <input
                      id={`custom_${q.id}`}
                      type="text"
                      required={q.required}
                      placeholder={q.placeholder || "Enter details..."}
                      value={String(currentVal)}
                      onChange={(e) => handleCustomAnswerChange(q.id, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-xs sm:text-sm font-medium font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron"
                    />
                  )}

                  {q.type === "checkbox" && (
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={Boolean(currentVal)}
                        onChange={(e) => handleCustomAnswerChange(q.id, e.target.checked)}
                        className="w-4 h-4 rounded text-saffron focus:ring-saffron"
                      />
                      <span className="text-xs text-neutral-700 dark:text-neutral-300 font-sans">{q.placeholder || "Yes, confirm"}</span>
                    </label>
                  )}

                  {errors[errKey] && (
                    <p className="text-xs text-red-600 font-medium font-sans">{errors[errKey]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer font-sans flex items-center gap-2"
        >
          <span>{t("eventsPage.booking.nextStep")}</span> &rarr;
        </button>
      </div>
    </form>
  );
}
