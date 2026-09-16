"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  Edit3,
  User,
  Calendar,
  Clock,
  Users,
  Ticket,
  ShieldCheck,
  Tag,
  Check,
  Loader2,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";

interface StepReviewProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  isSubmitting?: boolean;
  onJumpToStep: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function StepReview({
  formData,
  updateFields,
  errors,
  isSubmitting = false,
  onJumpToStep,
  onSubmit,
  onBack,
}: StepReviewProps) {
  const [promoInput, setPromoInput] = useState(formData.promoCode || "");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const participantCount = formData.numberOfParticipants || 1;
  const unitPrice = formData.ticketPrice || 0;
  const ticketsSubtotal = unitPrice * participantCount;

  // Calculate addons total
  const addonsTotal = 0; // Default complimentary or calculate from selectedAddons

  const totalBeforeDiscount = ticketsSubtotal + addonsTotal;
  const finalTotal = Math.max(0, totalBeforeDiscount - promoDiscount);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const code = promoInput.trim().toUpperCase();
    if (code === "FESTIVAL20" || code === "SHREE2026") {
      setPromoDiscount(Math.min(50, totalBeforeDiscount));
      setPromoApplied(true);
      updateFields({ promoCode: code });
    } else {
      setPromoApplied(true);
      updateFields({ promoCode: code });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-saffron" />
          Step 3: Review Details &amp; Confirm Booking
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Review your attendee details and pass selection. Your verified entry pass with QR code will be generated instantly.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="space-y-6">
        {/* Section 1: Attendee Details */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <User className="w-4 h-4 text-saffron" />
              1. Attendee Information
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Primary Attendee</span>
              <span className="font-semibold text-neutral-900">{formData.fullName || "Adv. Rahul Sharma"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Mobile Number</span>
              <span className="font-medium text-neutral-900">{formData.mobileNumber || "+91 9922786608"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Email (For Ticket Delivery)</span>
              <span className="font-medium text-neutral-900 text-saffron font-mono">{formData.email || "devotee@shreepratishthan.com"}</span>
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Residential Area</span>
              <span className="font-medium text-neutral-900">{formData.streetArea || "Indira Nagar"}, {formData.city || "Nashik"} - {formData.pinCode || "422009"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Event & Pass Summary */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <Calendar className="w-4 h-4 text-saffron" />
              2. Event &amp; Entry Pass Details
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Selected Event</span>
              <span className="font-bold text-neutral-900 text-sm capitalize">
                {formData.eventId?.replace(/-/g, " ") || "Shree Ganeshotsav 2026"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Pass Type</span>
              <span className="font-bold text-saffron">{formData.ticketName || "General Community Pass"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Attendance Date</span>
              <span className="font-semibold text-neutral-900">{formData.dateOfBirth || "2026-08-27"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Arrival Slot</span>
              <span className="font-semibold text-neutral-900 capitalize">{formData.preferredTimeSlot || "Morning"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Number of Passes</span>
              <span className="font-extrabold text-neutral-900">{participantCount} Pass(es)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Pricing & Promo Code */}
        <div className="bg-white border-2 border-dashed border-neutral-300 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-saffron" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Promo Code / Seva Coupon (Optional)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="px-3.5 py-2 bg-neutral-100 border border-neutral-300 rounded-xl text-xs uppercase font-bold tracking-wider text-neutral-900 focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase transition-all"
              >
                Apply
              </button>
            </div>
          </div>

          {promoApplied && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              Promo code <strong>{promoInput.toUpperCase()}</strong> applied successfully.
            </div>
          )}

          {/* Price Breakdown Table */}
          <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-600">
              <span>{formData.ticketName || "Entry Pass"} ({participantCount} &times; {unitPrice === 0 ? "Free" : `₹${unitPrice}`})</span>
              <span className="font-semibold">{ticketsSubtotal === 0 ? "₹0.00" : `₹${ticketsSubtotal.toFixed(2)}`}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Promo Discount</span>
                <span>-₹{promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-neutral-900 font-black text-base pt-2 border-t border-neutral-200">
              <span>Total Payable</span>
              <span className="text-saffron">
                {finalTotal === 0 ? "FREE (Complimentary Pass)" : `₹${finalTotal.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900 leading-relaxed flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <strong>Instant Verified Pass:</strong> Your booking code will be registered in the central system, and an email with your entry QR code and attendee badge will be delivered to <strong>{formData.email || "your email"}</strong>.
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm uppercase rounded-xl transition-all cursor-pointer disabled:opacity-50"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-saffron hover:bg-saffron/90 text-white font-extrabold text-sm tracking-wider uppercase rounded-2xl shadow-xl hover:shadow-saffron/30 transition-all duration-300 cursor-pointer flex items-center gap-2 disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Digital Pass...
            </>
          ) : (
            <>
              <Ticket className="w-5 h-5" />
              Confirm &amp; Issue Entry Pass &rarr;
            </>
          )}
        </button>
      </div>
    </form>
  );
}
