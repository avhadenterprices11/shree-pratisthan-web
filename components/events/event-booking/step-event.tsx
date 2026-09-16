"use client";

import React from "react";
import { Calendar, Users, Clock, MapPin, AlertCircle, ShieldCheck } from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

interface StepEventProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

import { getLocalizedEvent } from "@/lib/events-i18n";

export default function StepEvent({
  formData,
  updateFields,
  errors,
  onNext,
  onBack,
}: StepEventProps) {
  const { t, language } = useLanguage();
  const rawActiveEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const activeEvent = rawActiveEvent ? getLocalizedEvent(rawActiveEvent, language) : undefined;
  const isWaitlist = Boolean(activeEvent?.isCapacityFull && activeEvent?.waitlistEnabled);

  const TIME_SLOT_OPTIONS = [
    { value: "morning", label: t("eventsPage.booking.morningSlot") },
    { value: "afternoon", label: t("eventsPage.booking.afternoonSlot") },
    { value: "evening", label: t("eventsPage.booking.eveningSlot") },
    { value: "full-day", label: t("eventsPage.booking.fullDaySlot") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-none">
      <div className="border-b border-neutral-200 dark:border-white/10 pb-4 mb-6">
        <h3 className="text-lg md:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-saffron" />
          {t("eventsPage.booking.step2")}
        </h3>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
          {t("eventsPage.booking.step2Desc")}
        </p>
      </div>

      {/* 1. Read-Only Selected Event Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-[#18181b] border border-saffron/20 dark:border-white/10 space-y-2 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-saffron bg-saffron/10 px-2.5 py-0.5 rounded-full border border-saffron/20 font-sans">
              {t("eventsPage.booking.selectedEvent")}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-sans">
              • {activeEvent?.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-200 bg-white dark:bg-[#121214] px-2.5 py-0.5 rounded-full border border-black/10 dark:border-white/10 font-sans">
              <MapPin className="w-3 h-3 text-saffron" />
              {activeEvent?.eventMode === "In-Person"
                ? (language === "mr" ? "प्रत्यक्ष उपस्थिती" : language === "hi" ? "प्रत्यक्ष उपस्थिति" : "In-Person")
                : (activeEvent?.eventMode || (language === "mr" ? "प्रत्यक्ष उपस्थिती" : language === "hi" ? "प्रत्यक्ष उपस्थिति" : "In-Person"))}
            </span>
          </div>
        </div>

        <h4 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-neutral-100 font-heading uppercase leading-tight pt-1">
          {activeEvent?.title}
        </h4>

        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-neutral-300 font-sans pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-saffron" />
            <strong>{t("eventsPage.booking.officialDates")}:</strong> {activeEvent?.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-saffron" />
            <strong>{t("eventsPage.booking.venueLabel")}:</strong> {activeEvent?.venueName}, {activeEvent?.city}
          </span>
        </div>
      </div>

      {/* Form Fields: Slot, Date & Attendees */}
      <div className="space-y-5">
        
        {/* Date Calendar & Time Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Calendar Date Selection */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
              {t("eventsPage.booking.dateLabel")} <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <input
                id="dateOfBirth"
                type="date"
                required
                min={activeEvent?.startDate || "2026-01-01"}
                max={activeEvent?.endDate || "2026-12-31"}
                value={formData.dateOfBirth || activeEvent?.startDate || "2026-08-27"}
                onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium font-sans"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Time Slot Selector Dropdown */}
          <div className="space-y-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
              {t("eventsPage.booking.timeSlotSelector")} <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="preferredTimeSlot"
              options={TIME_SLOT_OPTIONS}
              value={formData.preferredTimeSlot || "morning"}
              onChange={(val) => updateFields({ preferredTimeSlot: val })}
              icon={<Clock className="w-4 h-4" />}
            />
            {errors.preferredTimeSlot && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.preferredTimeSlot}</p>
            )}
          </div>
        </div>

        {/* Number of Attendees */}
        <div className="space-y-2">
          <label htmlFor="numberOfParticipants" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {t("eventsPage.booking.attendeesCountLabel")} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              id="numberOfParticipants"
              type="number"
              min={1}
              max={20}
              required
              value={formData.numberOfParticipants || 1}
              onChange={(e) => updateFields({ numberOfParticipants: Math.min(20, Math.max(1, parseInt(e.target.value) || 1)) })}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold shadow-xs font-sans"
            />
          </div>
          {errors.numberOfParticipants && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.numberOfParticipants}</p>
          )}
        </div>

        {/* Capacity / Waitlist Status Notice */}
        {isWaitlist ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs text-amber-900 dark:text-amber-300 leading-relaxed font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              {t("eventsPage.booking.capacityFullNotice")}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-saffron/[0.04] dark:bg-white/[0.02] border border-saffron/20 dark:border-white/10 rounded-xl text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-sans flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
            <div>
              {t("eventsPage.booking.freeCommunityNotice")}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 sm:px-6 py-2.5 sm:py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-[11px] sm:text-sm uppercase rounded-xl transition-all cursor-pointer font-sans shrink-0 whitespace-nowrap"
        >
          &larr; {t("eventsPage.booking.prevStep")}
        </button>

        <button
          type="submit"
          className="px-4 sm:px-8 py-2.5 sm:py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-[11px] sm:text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer font-sans shrink-0 whitespace-nowrap text-center"
        >
          {isWaitlist ? `${t("eventsPage.booking.joinWaitlistBtn")} →` : `${t("eventsPage.booking.nextStep")} →`}
        </button>
      </div>
    </form>
  );
}
