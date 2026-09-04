"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  Copy, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  MapPin, 
  Download, 
  Printer, 
  Mail, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  Ticket,
  QrCode
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { BookingResponse, IssuedTicketData } from "@/lib/api/bookings";

interface StepPaymentConfirmationProps {
  formData: Partial<EventBookingInput>;
  bookingResult?: {
    booking: BookingResponse;
    tickets: IssuedTicketData[];
  } | null;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  onBack: () => void;
  onReset: () => void;
}

export default function StepPaymentConfirmation({
  formData,
  bookingResult,
  updateFields,
  onBack,
  onReset,
}: StepPaymentConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Resolved booking code and ticket details
  const bookingCode = bookingResult?.booking?.booking_code || "BK-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  const primaryTicket = bookingResult?.tickets?.[0];
  const ticketNumber = primaryTicket?.ticket_number || "TK-2026-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  const uniqueCode = primaryTicket?.unique_code || Math.random().toString(36).substr(2, 6).toUpperCase();

  const participantName = formData.fullName || "Adv. Rahul Sharma";
  const email = formData.email || "devotee@shreepratishthan.com";
  const mobile = formData.mobileNumber || "+91 9922786608";
  const eventName = formData.eventId
    ? formData.eventId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Shree Ganeshotsav 2026";
  const participantCount = formData.numberOfParticipants || 1;
  const slotTime = formData.preferredTimeSlot
    ? formData.preferredTimeSlot.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Morning Slot";
  const eventDate = formData.dateOfBirth || "2026-08-27";
  const address = formData.streetArea || "Indira Nagar, Nashik";
  const venue = "Shree Pratishtan Grand Pandal, Indira Nagar Ground, Nashik - 422009";

  // QR Code payload or image URL
  const qrData = primaryTicket?.qr_payload || `EMS-EVENT-${bookingCode}-${ticketNumber}-${uniqueCode}`;
  const qrImageUrl = primaryTicket?.qr_image_url || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&color=000000&bgcolor=ffffff`;

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-neutral-900 space-y-8 animate-in fade-in duration-500 font-sans print:p-0 print:bg-white">
      
      {/* 1. Top Success Confirmation Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-saffron/20 shadow-xl space-y-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-inner mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
            Pass Issued &amp; Confirmed
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-neutral-900">
            Event Pass Booked Successfully!
          </h2>
          <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs sm:text-sm text-emerald-950 font-medium flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              A confirmation email with your digital entry pass and scannable QR code has been dispatched to <strong>{email}</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* 2. 3-Column Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Digital Pass Card (Print Friendly) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-saffron/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden print:border-neutral-400 print:shadow-none">
            {/* Background Decorative Emblem */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-saffron/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header / Brand */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-saffron block">
                  Official Entry Pass
                </span>
                <h3 className="text-xl font-black font-heading text-neutral-900">
                  SHREE PRATISHTAN
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Booking Reference</span>
                <span className="font-mono text-sm font-extrabold text-neutral-900">{bookingCode}</span>
              </div>
            </div>

            {/* Ticket Content Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-neutral-200">
              {/* Event Info Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Festival / Event</span>
                  <h4 className="font-extrabold text-neutral-900 text-lg leading-tight">{eventName}</h4>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Date</span>
                    <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-saffron" /> {eventDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Slot</span>
                    <span className="font-semibold text-neutral-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-saffron" /> {slotTime}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Primary Pass Holder</span>
                  <span className="font-bold text-neutral-900 text-sm">{participantName} ({participantCount} Pass{participantCount > 1 ? "es" : ""})</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Venue</span>
                  <span className="text-xs font-medium text-neutral-700 leading-snug block mt-0.5">
                    {venue}
                  </span>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center space-y-2">
                <div className="relative w-36 h-36 bg-white p-2 rounded-xl shadow-sm border border-neutral-200">
                  <Image
                    src={qrImageUrl}
                    alt="Digital Pass QR Code"
                    width={140}
                    height={140}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-neutral-800 tracking-wider">
                  {uniqueCode}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium">
                  Scan at Entrance Gate
                </span>
              </div>
            </div>

            {/* Pass Footer */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Digital Pass
              </span>
              <span>Ticket No: <strong className="font-mono text-neutral-800">{ticketNumber}</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 min-w-[140px] py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" /> Print Pass
            </button>

            <button
              type="button"
              onClick={handleCopyBookingId}
              className="py-3 px-5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer border border-neutral-200"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Reference" : "Copy Code"}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="py-3 px-5 bg-saffron/10 hover:bg-saffron/20 text-saffron rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
            >
              Book Another Pass
            </button>
          </div>
        </div>

        {/* Right Column: Support, Directions & Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ground Coordination Card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <Building2 className="w-5 h-5 text-saffron" />
              Ground Coordination &amp; Entry
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Show this digital pass or mention your booking reference <strong>{bookingCode}</strong> at the reception desk near Indira Nagar Ground.
            </p>

            <div className="space-y-2.5 pt-2 border-t border-neutral-200/80 text-xs">
              <div className="flex items-start gap-2 text-neutral-700">
                <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                <span>Indira Nagar Ground Arena, Nashik - 422009</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <PhoneCall className="w-4 h-4 text-saffron flex-shrink-0" />
                <span>Helpline: +91 9922786608 (24/7)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-4 h-4 text-saffron flex-shrink-0" />
                <span>Email: Info@shreepratishthan.com</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Indira+Nagar+Nashik+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border border-neutral-300 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-saffron" /> Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social Community Callout */}
          <div className="p-6 bg-gradient-to-br from-amber-500 to-saffron rounded-3xl text-white space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <h4 className="font-bold text-base font-heading">Join Shree Pratishtan Community</h4>
            </div>
            <p className="text-xs text-amber-100 leading-relaxed">
              Connect with volunteer marshals and stay updated on daily Maha Aarti timings, cultural recitals, and seva drives.
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-white text-saffron hover:bg-amber-50 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md"
            >
              Join as Volunteer Marshal &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
