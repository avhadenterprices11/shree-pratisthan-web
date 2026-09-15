"use client";

import React from "react";
import { MapPin, Home, Navigation, Map } from "lucide-react";
import { EventBookingInput } from "@/lib/validations";

interface StepAddressProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepAddress({
  formData,
  updateFields,
  errors,
  onNext,
  onBack,
}: StepAddressProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-neutral-200 pb-4 mb-6">
        <h3 className="text-lg md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-saffron" />
          Step 3: Address Details
        </h3>
        <p className="text-base text-neutral-600 mt-1">
          Provide your residential address for pass allocation and local coordinator dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* House / Flat Number */}
        <div className="space-y-2">
          <label htmlFor="houseNumber" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            House / Flat Number <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="houseNumber"
              type="text"
              required
              placeholder="e.g. Flat 302, Sai Heights"
              value={formData.houseNumber || ""}
              onChange={(e) => updateFields({ houseNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.houseNumber && (
            <p className="text-xs text-red-600 font-medium">{errors.houseNumber}</p>
          )}
        </div>

        {/* Street / Area */}
        <div className="space-y-2">
          <label htmlFor="streetArea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Street / Area <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="streetArea"
              type="text"
              required
              placeholder="e.g. MG Road, Shivaji Nagar"
              value={formData.streetArea || ""}
              onChange={(e) => updateFields({ streetArea: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.streetArea && (
            <p className="text-xs text-red-600 font-medium">{errors.streetArea}</p>
          )}
        </div>

        {/* Landmark */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="landmark" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Landmark <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            id="landmark"
            type="text"
            placeholder="e.g. Near Old Temple Gate, Opposite City Library"
            value={formData.landmark || ""}
            onChange={(e) => updateFields({ landmark: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            City <span className="text-saffron">*</span>
          </label>
          <input
            id="city"
            type="text"
            required
            placeholder="e.g. Nashik"
            value={formData.city || ""}
            onChange={(e) => updateFields({ city: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
          />
          {errors.city && (
            <p className="text-xs text-red-600 font-medium">{errors.city}</p>
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          <label htmlFor="district" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            District <span className="text-saffron">*</span>
          </label>
          <input
            id="district"
            type="text"
            required
            placeholder="e.g. Nashik District"
            value={formData.district || ""}
            onChange={(e) => updateFields({ district: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
          />
          {errors.district && (
            <p className="text-xs text-red-600 font-medium">{errors.district}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-2">
          <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            State <span className="text-saffron">*</span>
          </label>
          <input
            id="state"
            type="text"
            required
            placeholder="e.g. Maharashtra"
            value={formData.state || "Maharashtra"}
            onChange={(e) => updateFields({ state: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
          />
          {errors.state && (
            <p className="text-xs text-red-600 font-medium">{errors.state}</p>
          )}
        </div>

        {/* PIN Code */}
        <div className="space-y-2">
          <label htmlFor="pinCode" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            PIN Code <span className="text-saffron">*</span>
          </label>
          <input
            id="pinCode"
            type="text"
            required
            placeholder="6-digit PIN code"
            value={formData.pinCode || ""}
            onChange={(e) => updateFields({ pinCode: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
          />
          {errors.pinCode && (
            <p className="text-xs text-red-600 font-medium">{errors.pinCode}</p>
          )}
        </div>

        {/* Google Map Location */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="googleMapUrl" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Google Maps Location Link <span className="text-neutral-400 font-normal">(Optional pin for precise navigation)</span>
          </label>
          <div className="relative">
            <Map className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="googleMapUrl"
              type="url"
              placeholder="https://maps.google.com/?q=..."
              value={formData.googleMapUrl || ""}
              onChange={(e) => updateFields({ googleMapUrl: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 sm:px-6 py-2.5 sm:py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[11px] sm:text-sm uppercase rounded-xl transition-all cursor-pointer shrink-0 whitespace-nowrap"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          className="px-4 sm:px-8 py-2.5 sm:py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-[11px] sm:text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap text-center"
        >
          Next: Review & Terms &rarr;
        </button>
      </div>
    </form>
  );
}
