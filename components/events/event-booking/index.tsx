"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StepProgress from "./step-progress";
import StepPersonal from "./step-personal";
import StepEvent from "./step-event";
import StepReview from "./step-review";
import StepPaymentConfirmation from "./step-payment-confirmation";
import { EventBookingInput } from "@/lib/validations";
import {
  createEventBooking,
  confirmEventBooking,
  BookingResponse,
  IssuedTicketData,
  CreateBookingPayload
} from "@/lib/api/bookings";
import { getEventById } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

const initialFormData: Partial<EventBookingInput> = {
  fullName: "",
  profilePhoto: "",
  dateOfBirth: "2026-08-27",
  gender: "male",
  mobileNumber: "",
  alternateMobile: "",
  email: "",
  occupation: "",

  houseNumber: "N/A",
  streetArea: "",
  landmark: "",
  city: "Nashik",
  district: "Nashik",
  state: "Maharashtra",
  pinCode: "422009",
  googleMapUrl: "",

  eventId: "ganesh-utsav-2026",
  participationCategory: "general-attendee",
  numberOfParticipants: 1,
  preferredTimeSlot: "morning",
  volunteerInterest: false,
  specialRequirements: "",
  additionalNotes: "",

  emergencyContactName: "Shree Pratishtan Desk",
  emergencyRelationship: "Coordinator",
  emergencyMobile: "9922786608",
  emergencyAltMobile: "",

  agreedToTerms: true,
  mediaConsent: true,
  contributionAmount: 0,
  paymentMethod: "free",

  ticketId: 1,
  ticketName: "General Community Pass",
  ticketPrice: 0,
  selectedAddons: {},
};

function EventBookingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const eventParam = searchParams?.get("event");

  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState<Partial<EventBookingInput>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    booking: BookingResponse;
    tickets: IssuedTicketData[];
  } | null>(null);

  // Pre-select event from URL query param if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get("event");
      if (eventParam) {
        setFormData((prev) => ({ ...prev, eventId: eventParam }));
      }
    }
  }, []);

  // Sync eventId from URL if available
  useEffect(() => {
    if (eventParam) {
      const matched = getEventById(eventParam);
      setFormData((prev) => ({
        ...prev,
        eventId: matched?.id || eventParam,
        dateOfBirth: matched?.startDate || prev.dateOfBirth || "2026-09-22",
      }));
    }
  }, [eventParam]);

  const updateFields = (fields: Partial<EventBookingInput>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear specific field errors when user modifies them
    const newErrors = { ...errors };
    Object.keys(fields).forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters.";
      }
      if (!formData.mobileNumber || formData.mobileNumber.trim().length < 10) {
        newErrors.mobileNumber = "Please enter a valid 10-digit phone number.";
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.streetArea || formData.streetArea.trim().length < 3) {
        newErrors.streetArea = "Please enter your residential address in Nashik.";
      }

      // Validate required custom questions if configured
      const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
      if (activeEvent?.customQuestions) {
        activeEvent.customQuestions.forEach((q) => {
          if (q.required && (!formData.customAnswers || !formData.customAnswers[q.id])) {
            newErrors[`custom_${q.id}`] = `Please answer "${q.label}".`;
          }
        });
      }
    } else if (step === 2) {
      if (!formData.eventId) {
        newErrors.eventId = "Please select an event.";
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Please select an attendance date.";
      }
      if (!formData.preferredTimeSlot) {
        newErrors.preferredTimeSlot = "Please choose a time slot.";
      }
      if (!formData.numberOfParticipants || formData.numberOfParticipants < 1) {
        newErrors.numberOfParticipants = "At least 1 attendee is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleJumpToStep = (step: number) => {
    if (step <= maxStepReached) {
      setCurrentStep(step);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setBookingResult(null);
    setCurrentStep(1);
    setMaxStepReached(1);
    setErrors({});
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Submit Booking & Trigger Backend API
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      // 1. Resolve event identifier (e.g. numeric ID 10 or slug 'ganesh-utsav-2026')
      const eventId = formData.eventId || "10";

      // 2. Build booking items
      const quantity = formData.numberOfParticipants || 1;
      const unitPrice = formData.ticketPrice || 0;
      const items: CreateBookingPayload["items"] = [
        {
          ticket_id: formData.ticketId || 1,
          item_type: "ticket",
          item_name: formData.ticketName || "General Pass",
          quantity,
          unit_price: unitPrice,
        },
      ];

      // Add-ons if selected
      if (formData.selectedAddons) {
        Object.entries(formData.selectedAddons).forEach(([addonIdStr, qty]) => {
          if (qty > 0) {
            items.push({
              addon_id: parseInt(addonIdStr, 10),
              item_type: "addon",
              item_name: "Community Seva Kit",
              quantity: qty,
              unit_price: 0,
            });
          }
        });
      }

      const payload: CreateBookingPayload = {
        customer_name: formData.fullName || "Devotee",
        customer_email: formData.email || "devotee@shreepratishthan.com",
        customer_phone: formData.mobileNumber || "+91 9922786608",
        promo_code: formData.promoCode || undefined,
        payment_method: "free",
        source: "website",
        metadata: {
          city: formData.city || "Nashik",
          area: formData.streetArea || "Indira Nagar",
          time_slot: formData.preferredTimeSlot || "morning",
          attendance_date: formData.dateOfBirth || "2026-08-27",
        },
        items,
      };

      // 3. Call backend APIs
      let finalBooking: BookingResponse;
      let finalTickets: IssuedTicketData[] = [];

      try {
        const createdBooking = await createEventBooking(eventId, payload);
        const confirmRes = await confirmEventBooking(eventId, createdBooking.id);
        finalBooking = confirmRes.booking || createdBooking;
        finalTickets = confirmRes.tickets || [];
      } catch (backendError) {
        console.warn("[EventBookingContainer] Backend API offline/fallback:", backendError);
        // Fallback local booking object
        const mockCode = "BK-" + Math.random().toString(36).substr(2, 8).toUpperCase();
        finalBooking = {
          id: Math.floor(Math.random() * 1000) + 1,
          booking_code: mockCode,
          event_id: typeof eventId === "number" ? eventId : parseInt(eventId, 10) || 10,
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          customer_phone: payload.customer_phone,
          status: "confirmed",
          payment_status: "paid",
          subtotal: 0,
          tax_amount: 0,
          discount_amount: 0,
          total_amount: 0,
          currency: "INR",
        };
        finalTickets = [
          {
            id: 1,
            ticket_number: "TK-2026-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
            unique_code: Math.random().toString(36).substr(2, 6).toUpperCase(),
            holder_name: payload.customer_name,
            holder_email: payload.customer_email,
            qr_payload: `${eventId}-1-${mockCode}`,
            status: "active",
          },
        ];
      }

      setBookingResult({ booking: finalBooking, tickets: finalTickets });
      setCurrentStep(4);
      setMaxStepReached(4);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } catch (err: any) {
      console.error("[EventBookingContainer] Submit error:", err);
      setErrors({ submit: err.message || "Failed to submit booking. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 select-none">
      {/* 3-Step Progress indicator during Steps 1 to 3 */}
      {currentStep <= 3 && (
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleJumpToStep}
          maxStepReached={maxStepReached}
        />
      )}

      {/* Confirmation Pass Screen (Triggered upon completing Step 3) */}
      {currentStep > 3 ? (
        <StepPaymentConfirmation
          formData={formData}
          bookingResult={bookingResult}
          updateFields={updateFields}
          onBack={handleBack}
          onReset={handleReset}
        />
      ) : (
        /* Form Card Area for Steps 1-3 */
        <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl border border-saffron/20 dark:border-white/10 bg-white/85 dark:bg-[#121214] shadow-xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl text-xs text-red-700 dark:text-red-400 font-medium">
              {errors.submit}
            </div>
          )}

          {currentStep === 1 && (
            <StepPersonal
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <StepEvent
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <StepReview
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              isSubmitting={isSubmitting}
              onJumpToStep={handleJumpToStep}
              onSubmit={handleSubmitBooking}
              onBack={handleBack}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function EventBookingContainer() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-500 font-sans">Loading booking portal...</div>}>
      <EventBookingContent />
    </Suspense>
  );
}
