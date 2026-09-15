"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  Copy, 
  Printer, 
  RotateCcw,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Check,
  ShieldCheck
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { useLanguage } from "@/context/LanguageContext";
import { getEventById } from "@/lib/events-data";
import { getLocalizedEvent } from "@/lib/events-i18n";
import { BookingResponse, IssuedTicketData } from "@/lib/api/bookings";

interface StepPaymentConfirmationProps {
  formData: Partial<EventBookingInput>;
  updateFields?: (fields: Partial<EventBookingInput>) => void;
  onBack?: () => void;
  onReset: () => void;
  bookingResult?: {
    booking: BookingResponse;
    tickets: IssuedTicketData[];
  } | null;
}

export default function StepPaymentConfirmation({
  formData,
  onReset,
  bookingResult,
}: StepPaymentConfirmationProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Generate clean verifiable booking ID
  const [bookingId] = useState(
    () => bookingResult?.booking?.booking_code || "SP-2026-" + Math.floor(1000 + Math.random() * 9000)
  );

  const rawEvent = getEventById(formData.eventId || "dr-ambedkar-jayanti-2026");
  const event = rawEvent ? getLocalizedEvent(rawEvent, language) : undefined;

  const participantName = formData.fullName || "Adv. Rahul Sharma";
  const eventName = event?.title || "Shree Pratishtan Event 2026";
  const eventDate = event?.date || formData.dateOfBirth || "2026-08-27";
  const participantCount = formData.numberOfParticipants || 1;

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-4 sm:py-8 animate-in fade-in duration-500 font-sans print:p-0 print:m-0 print:w-full print:max-w-none print:bg-white">
      
      {/* Centered Glass Panel With Generous Spacing & Single-Page Print Isolation */}
      <div className="printable-pass-container glass-panel p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-block bg-white/95 dark:bg-[#121214] border border-saffron/25 dark:border-white/10 shadow-2xl space-y-6 sm:space-y-8 text-center relative overflow-hidden print:p-6 print:m-0 print:space-y-3.5 print:border print:border-neutral-300 print:shadow-none print:bg-white print:rounded-2xl">
        
        {/* Official Header Banner strictly shown in Print */}
        <div className="hidden print:flex items-center justify-between border-b border-neutral-300 pb-3 mb-2 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 relative rounded-full overflow-hidden border border-neutral-300">
              <Image src="/logo.png" alt="Official Logo" fill className="object-contain" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-wider uppercase block text-neutral-950">
                {t("common.trustName")}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-sans block">
                Official Digital Entry Pass
              </span>
            </div>
          </div>
          <div className="text-right font-mono text-xs font-bold text-saffron">
            {bookingId}
          </div>
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-400/10 blur-3xl pointer-events-none -z-10 print:hidden" />

        {/* 1. Ultra-Premium Verified Success Medallion */}
        <div className="relative inline-flex items-center justify-center mx-auto my-2 print:my-0">
          {/* Ambient outer pulse glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-emerald-500/20 via-emerald-300/25 to-amber-300/30 blur-xl animate-pulse pointer-events-none print:hidden" />
          
          {/* Luxury outer gradient ring */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 print:w-14 print:h-14 rounded-full p-[3px] bg-gradient-to-tr from-emerald-600 via-teal-400 to-amber-400 shadow-xl shadow-emerald-600/20 print:shadow-none flex items-center justify-center">
            {/* Inner beveled disc */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-emerald-50/70 to-emerald-100/90 dark:from-[#1a2e22] dark:via-[#14231a] dark:to-[#0f1b13] print:bg-white flex items-center justify-center border border-white/80 dark:border-emerald-500/20 backdrop-blur-md shadow-inner relative group">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 print:w-7 print:h-7 text-emerald-600 drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* 2. Ultra-Premium Badge, Headline & Description */}
        <div className="space-y-4 print:space-y-1.5 max-w-xl mx-auto">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-900 dark:text-emerald-300 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/35 px-4 sm:px-5 py-1.5 rounded-full shadow-xs backdrop-blur-md font-sans print:border print:border-emerald-600 print:text-emerald-800 print:bg-emerald-50">
              <span className="relative flex h-2 w-2 print:hidden">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t("eventsPage.booking.freeEntryBadge")}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl print:text-2xl font-black font-heading text-neutral-900 dark:text-neutral-100 print:text-neutral-950 tracking-tight leading-tight">
            {t("eventsPage.booking.passReadyTitle")}
          </h2>

          <p className="text-xs sm:text-sm md:text-base print:text-xs font-normal text-slate-700 dark:text-neutral-300 print:text-slate-600 leading-relaxed font-sans">
            {t("eventsPage.booking.passReadyDesc")}
          </p>
        </div>

        {/* 3. Verified Booking ID & Event Summary Card */}
        <div className="bg-neutral-50/90 dark:bg-[#18181b] print:bg-white border border-neutral-200 dark:border-white/10 print:border-neutral-300 rounded-2xl p-5 sm:p-7 print:p-4 space-y-4 print:space-y-2.5 max-w-xl mx-auto text-left shadow-sm print:shadow-none">
          
          {/* Booking ID Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 print:pb-2 border-b border-neutral-200/80 dark:border-white/10 print:border-neutral-200">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 print:text-slate-500 font-sans block">
                {t("eventsPage.booking.bookingIdLabel")}
              </span>
              <span className="font-mono text-base sm:text-lg print:text-base font-extrabold text-saffron">
                {bookingId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyBookingId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1f1f23] hover:bg-neutral-100 dark:hover:bg-[#27272a] text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-bold border border-neutral-300 dark:border-white/10 shadow-2xs transition-all cursor-pointer font-sans print:hidden"
              title="Copy Booking ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-400">{t("eventsPage.booking.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>{t("eventsPage.booking.copyBookingId")}</span>
                </>
              )}
            </button>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-sans">
            <div>
              <span className="text-slate-500 dark:text-neutral-400 block text-[10px] sm:text-[11px] uppercase font-semibold">
                {t("eventsPage.booking.fullName")}
              </span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 block">{participantName}</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-neutral-400 block text-[10px] sm:text-[11px] uppercase font-semibold">
                {t("eventsPage.booking.eventName")}
              </span>
              <span className="font-bold text-saffron mt-0.5 block truncate">{eventName}</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-neutral-400 block text-[10px] sm:text-[11px] uppercase font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-saffron" /> {t("eventsPage.booking.officialDate")}
              </span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5 block">{eventDate}</span>
            </div>

            <div>
              <span className="text-slate-500 dark:text-neutral-400 block text-[10px] sm:text-[11px] uppercase font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-saffron" /> {t("eventsPage.booking.attendees")}
              </span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5 block">
                {participantCount} {t("eventsPage.booking.passes")}
              </span>
            </div>
          </div>

          {/* Venue Line */}
          {event?.venueName && (
            <div className="pt-3 border-t border-neutral-200/80 dark:border-white/10 flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300 font-sans">
              <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
              <span>
                <strong>{t("eventsPage.booking.venueLabel")}:</strong> {event.venueName}, {event.city}
              </span>
            </div>
          )}
        </div>

        {/* 4. Free Entry Note */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed font-sans">
          {t("eventsPage.booking.freeNotice")}
        </p>

        {/* 5. Clean Action Buttons with Perfect Spacing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-7 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-saffron/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            <Printer className="w-4 h-4" />
            <span>{t("eventsPage.booking.printPass")}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-neutral-300 dark:border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            <RotateCcw className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span>{t("eventsPage.booking.bookAnother")}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
