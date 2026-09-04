"use client";

import React from "react";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { EventBookingInput } from "@/lib/validations";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-neutral-200 pb-4 mb-6">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <User className="w-6 h-6 text-saffron" />
          Step 1: Personal Information
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Please provide your basic contact details for booking verification.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Full Name <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="fullName"
              type="text"
              required
              placeholder="Enter your full name (e.g. Adv. Rahul Sharma)"
              value={formData.fullName || ""}
              onChange={(e) => updateFields({ fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Phone Number <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="mobileNumber"
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.mobileNumber || ""}
              onChange={(e) => updateFields({ mobileNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-xs text-red-600 font-medium">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Email Address <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="email"
              type="email"
              required
              placeholder="name@domain.com"
              value={formData.email || ""}
              onChange={(e) => updateFields({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="streetArea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Residential Address <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
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
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium resize-none"
            />
          </div>
          {errors.streetArea && (
            <p className="text-xs text-red-600 font-medium">{errors.streetArea}</p>
          )}
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer"
        >
          Next: Select Booking Slot &rarr;
        </button>
      </div>
    </form>
  );
}
