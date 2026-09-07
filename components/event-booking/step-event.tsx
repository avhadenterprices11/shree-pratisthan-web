"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  Users, 
  Clock, 
  Ticket, 
  Plus, 
  Minus, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Info,
  Loader2,
  MapPin,
  Tag,
  ShieldCheck
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";
import { ALL_EVENTS } from "@/lib/events-data";
import { fetchEventTickets, fetchEventAddons, getApiBaseUrl, BackendTicket, BackendAddon } from "@/lib/api/bookings";

interface StepEventProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

export interface DynamicEventOption {
  value: string;
  rawId: number;
  label: string;
  sublabel?: string;
  category?: string;
  categoryLabel?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  formattedDate?: string;
  formattedTime?: string;
  venue?: string;
  city?: string;
  imageUrl?: string;
  capacity?: number;
  isSingleDay?: boolean;
}

export default function StepEvent({
  formData,
  updateFields,
  errors,
  onNext,
  onBack,
}: StepEventProps) {
  // Pre-seed with known seed events including ballerina premiere so dropdown is never blank
  const [eventsList, setEventsList] = useState<DynamicEventOption[]>(() => [
    {
      value: "ballerina-movie-premiere",
      rawId: 10,
      label: "Ballerina – Movie Premiere",
      sublabel: "24 Aug 2026 • PVR INOX Cinemas, Nashik",
      category: "premiere",
      categoryLabel: "Movie Premiere",
      startDate: "2026-08-24",
      endDate: "2026-08-24",
      formattedDate: "24 Aug 2026",
      formattedTime: "07:00 PM - 10:00 PM",
      venue: "PVR INOX Cinemas, City Centre Mall, Nashik",
      city: "Nashik",
      capacity: 500,
      isSingleDay: true,
    },
    ...ALL_EVENTS.map((e, idx) => ({
      value: e.id,
      rawId: 100 + idx,
      label: e.title,
      sublabel: `${e.date} • ${e.location.split(",")[0]}`,
      category: e.category,
      categoryLabel: e.categoryLabel,
      startDate: "2026-08-27",
      endDate: "2026-09-06",
      formattedDate: e.date,
      formattedTime: e.time,
      venue: e.location,
      city: "Nashik",
      capacity: 1000,
      isSingleDay: false,
    }))
  ]);
  const [tickets, setTickets] = useState<BackendTicket[]>([]);
  const [addons, setAddons] = useState<BackendAddon[]>([]);
  const [loadingExtras, setLoadingExtras] = useState(false);

  // 1. Load Dynamic Events from Database API
  useEffect(() => {
    async function loadEvents() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/events?pageSize=100`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        let list: DynamicEventOption[] = [];

        if (res.ok) {
          const json = await res.json();
          const rawEvents: any[] = Array.isArray(json) ? json : json.data || [];
          if (rawEvents.length > 0) {
            list = rawEvents.map((e) => {
              const startObj = e.start_date ? new Date(e.start_date) : new Date();
              const endObj = e.end_date ? new Date(e.end_date) : startObj;
              
              const startYMD = startObj.toISOString().split("T")[0];
              const endYMD = endObj.toISOString().split("T")[0];
              const isSingle = startYMD === endYMD;

              const formattedStart = startObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
              const formattedEnd = endObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
              const dateDisplay = isSingle ? formattedStart : `${formattedStart} - ${formattedEnd}`;

              const timeDisplay = e.all_day 
                ? "Full Day Event" 
                : `${startObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} - ${endObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;

              const venue = e.venue_name || e.address_line1 || e.city || "Nashik, Maharashtra";
              const city = e.city || "Nashik";

              return {
                value: e.url_slug || String(e.id),
                rawId: Number(e.id),
                label: e.name || e.title,
                sublabel: `${dateDisplay} • ${city}`,
                category: e.type || e.category || "cultural",
                categoryLabel: e.type || e.category || "Event",
                startDate: startYMD,
                endDate: endYMD,
                formattedDate: dateDisplay,
                formattedTime: timeDisplay,
                venue,
                city,
                imageUrl: e.banner_image_url || "/assets/placeholder-event.jpg",
                capacity: e.capacity || 500,
                isSingleDay: isSingle,
              };
            });
          }
        }

        // Merge with static seed events
        ALL_EVENTS.forEach((se, idx) => {
          if (!list.some((le) => le.value === se.id || le.label.toLowerCase() === se.title.toLowerCase())) {
            list.push({
              value: se.id,
              rawId: 100 + idx,
              label: se.title,
              sublabel: `${se.date} • ${se.location.split(",")[0]}`,
              category: se.category || "cultural",
              categoryLabel: se.categoryLabel || "Cultural Festival",
              startDate: "2026-08-27",
              endDate: "2026-09-06",
              formattedDate: se.date,
              formattedTime: se.time || "All Day Event",
              venue: se.location,
              city: "Nashik",
              imageUrl: se.mainImage,
              capacity: 1000,
              isSingleDay: false,
            });
          }
        });

        if (list.length > 0) {
          setEventsList(list);
        }

        // Check if formData.eventId matches any option
        const targetEventId = formData.eventId || "ballerina-movie-premiere";
        const match = list.find(
          (item) =>
            item.value === targetEventId ||
            String(item.rawId) === String(targetEventId) ||
            item.value.toLowerCase() === String(targetEventId).toLowerCase()
        );
        if (match) {
          updateFields({ 
            eventId: match.value,
            dateOfBirth: match.startDate || formData.dateOfBirth || "2026-08-24"
          });
        }
      } catch (err) {
        console.warn("[StepEvent] Error fetching dynamic events:", err);
      }
    }

    loadEvents();
  }, [formData.eventId]);

  // 2. Fetch Tickets & Addons when Event changes
  useEffect(() => {
    async function loadTicketsAndAddons() {
      if (!formData.eventId) return;

      const selectedEvent = eventsList.find(
        (e) => e.value === formData.eventId || String(e.rawId) === String(formData.eventId)
      );
      const eventLookup = selectedEvent?.rawId || formData.eventId;

      if (selectedEvent && selectedEvent.startDate) {
        // Auto-set the event date
        updateFields({ dateOfBirth: selectedEvent.startDate });
      }

      setLoadingExtras(true);
      try {
        const [fetchedTickets, fetchedAddons] = await Promise.all([
          fetchEventTickets(eventLookup),
          fetchEventAddons(eventLookup),
        ]);

        if (fetchedTickets && fetchedTickets.length > 0) {
          setTickets(fetchedTickets);
          // Set default ticket if not already set or not in list
          if (!formData.ticketId || !fetchedTickets.some((t) => t.id === formData.ticketId)) {
            updateFields({
              ticketId: fetchedTickets[0].id,
              ticketName: fetchedTickets[0].name,
              ticketPrice: Number(fetchedTickets[0].price) || 0,
            });
          }
        } else {
          // Dynamic fallback tickets
          const defaultTickets: BackendTicket[] = [
            {
              id: 1,
              event_id: typeof eventLookup === "number" ? eventLookup : 1,
              name: "General Admission Pass",
              price: 0,
              type: "general",
              description: "Official verified event pass with barcode & gate access",
              is_active: true,
            },
            {
              id: 2,
              event_id: typeof eventLookup === "number" ? eventLookup : 1,
              name: "VIP / Premium Devotee Pass",
              price: 0,
              type: "vip",
              description: "Priority gate access with reserved seating & special darshan",
              is_active: true,
            },
          ];
          setTickets(defaultTickets);
          if (!formData.ticketId) {
            updateFields({
              ticketId: 1,
              ticketName: defaultTickets[0].name,
              ticketPrice: 0,
            });
          }
        }

        setAddons(fetchedAddons || []);
      } catch (err) {
        console.warn("[StepEvent] Error fetching tickets:", err);
      } finally {
        setLoadingExtras(false);
      }
    }

    loadTicketsAndAddons();
  }, [formData.eventId, eventsList]);

  // Handle addon quantity change
  const handleAddonQty = (addonId: number, delta: number) => {
    const current = { ...(formData.selectedAddons || {}) };
    const newQty = Math.max(0, (current[addonId] || 0) + delta);
    if (newQty === 0) {
      delete current[addonId];
    } else {
      current[addonId] = newQty;
    }
    updateFields({ selectedAddons: current });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const selectedEventInfo = eventsList.find((e) => e.value === formData.eventId);

  // Dynamic Time Slot Options based on event type
  const timeSlotOptions = selectedEventInfo?.formattedTime && !selectedEventInfo.formattedTime.toLowerCase().includes("all day")
    ? [
        { value: "main-show", label: `Standard Event Showtime (${selectedEventInfo.formattedTime})` },
        { value: "early-arrival", label: `Early Arrival & Check-in (1 Hour Prior)` },
      ]
    : [
        { value: "morning", label: "Morning Slot (08:00 AM - 12:00 PM)" },
        { value: "afternoon", label: "Afternoon Slot (12:00 PM - 04:00 PM)" },
        { value: "evening", label: "Evening Aarti & Darshan (05:00 PM - 09:00 PM)" },
        { value: "full-day", label: "Full Day Pass (08:00 AM - 10:00 PM)" },
      ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-saffron" />
          Step 2: Choose Event Pass &amp; Timing
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Select your festival, choose your ticket tier, add optional community seva kits, and pick your arrival slot.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* 1. Select Event Dropdown */}
        <div className="space-y-2">
          <label htmlFor="eventId" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Select Festival / Event <span className="text-saffron">*</span>
          </label>
          <CustomSelect
            id="eventId"
            options={
              eventsList.length > 0
                ? eventsList
                : [{ value: "ganesh-utsav-2026", label: "Shree Ganeshotsav 2026 (श्री गणेशोत्सव)" }]
            }
            value={formData.eventId || (eventsList[0]?.value ?? "ganesh-utsav-2026")}
            onChange={(val) => {
              const matched = eventsList.find((e) => e.value === val);
              updateFields({
                eventId: val,
                dateOfBirth: matched?.startDate || "2026-08-27",
                ticketId: undefined,
                ticketName: undefined,
                ticketPrice: undefined,
                selectedAddons: {},
              });
            }}
            icon={<Calendar className="w-4 h-4" />}
          />
          {errors.eventId && <p className="text-xs text-red-600 font-medium">{errors.eventId}</p>}
        </div>

        {/* Dynamic Event Summary Preview Banner */}
        {selectedEventInfo && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider">
                  {selectedEventInfo.categoryLabel || "Featured Event"}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Event
                </span>
              </div>
              <h4 className="font-bold text-base text-neutral-900">
                {selectedEventInfo.label}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  {selectedEventInfo.formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  {selectedEventInfo.formattedTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  {selectedEventInfo.venue}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Ticket Tier Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Select Ticket Tier / Pass Type <span className="text-saffron">*</span>
            </label>
            {loadingExtras && <Loader2 className="w-4 h-4 text-saffron animate-spin" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {tickets.map((t) => {
              const isSelected = formData.ticketId === t.id;
              const priceNum = Number(t.price) || 0;
              return (
                <div
                  key={t.id}
                  onClick={() =>
                    updateFields({
                      ticketId: t.id,
                      ticketName: t.name,
                      ticketPrice: priceNum,
                    })
                  }
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-saffron bg-saffron/5 shadow-md ring-2 ring-saffron/20"
                      : "border-neutral-200 bg-white hover:border-saffron/40 hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-sm md:text-base">
                          {t.name}
                        </span>
                        {t.type === "vip" && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                            VIP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                        {t.description || "Official verified entry pass with barcode & gate access."}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-saffron text-white"
                          : "border border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-semibold">Price per Pass</span>
                    <span className="font-extrabold text-neutral-900 text-sm">
                      {priceNum === 0 ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                          FREE PASS
                        </span>
                      ) : (
                        `₹${priceNum}`
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Date & Time Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Smart Event Date Selector */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Attendance Date <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              {selectedEventInfo?.isSingleDay ? (
                <div className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-800 text-sm font-semibold flex items-center justify-between">
                  <span>{selectedEventInfo.formattedDate}</span>
                  <span className="text-[10px] uppercase font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                    Confirmed Date
                  </span>
                </div>
              ) : (
                <input
                  id="dateOfBirth"
                  type="date"
                  required
                  min={selectedEventInfo?.startDate}
                  max={selectedEventInfo?.endDate}
                  value={formData.dateOfBirth || selectedEventInfo?.startDate || "2026-08-27"}
                  onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium"
                />
              )}
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 font-medium">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Time Slot Selector in Dropdown */}
          <div className="space-y-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Arrival Time Slot <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="preferredTimeSlot"
              options={timeSlotOptions}
              value={formData.preferredTimeSlot || timeSlotOptions[0]?.value || "morning"}
              onChange={(val) => updateFields({ preferredTimeSlot: val })}
              icon={<Clock className="w-4 h-4" />}
            />
            {errors.preferredTimeSlot && (
              <p className="text-xs text-red-600 font-medium">{errors.preferredTimeSlot}</p>
            )}
          </div>
        </div>

        {/* 4. Number of Attendees / Quantity Counter */}
        <div className="space-y-2">
          <label htmlFor="numberOfParticipants" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Number of Attendees / Passes <span className="text-saffron">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="numberOfParticipants"
                type="number"
                min={1}
                max={15}
                required
                value={formData.numberOfParticipants || 1}
                onChange={(e) =>
                  updateFields({ numberOfParticipants: parseInt(e.target.value, 10) || 1 })
                }
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold shadow-sm"
              />
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() =>
                  updateFields({
                    numberOfParticipants: Math.max(1, (formData.numberOfParticipants || 1) - 1),
                  })
                }
                className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-neutral-50 text-neutral-700 font-bold cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-neutral-900">
                {formData.numberOfParticipants || 1}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateFields({
                    numberOfParticipants: Math.min(15, (formData.numberOfParticipants || 1) + 1),
                  })
                }
                className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-neutral-50 text-neutral-700 font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {errors.numberOfParticipants && (
            <p className="text-xs text-red-600 font-medium">{errors.numberOfParticipants}</p>
          )}
        </div>

        {/* 5. Optional Add-ons */}
        {addons.length > 0 && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-saffron" />
              Optional Community Add-ons &amp; Seva Kits
            </label>
            <div className="space-y-2.5">
              {addons.map((a) => {
                const qty = formData.selectedAddons?.[a.id] || 0;
                const priceNum = Number(a.price) || 0;
                return (
                  <div
                    key={a.id}
                    className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="font-bold text-sm text-neutral-900 block">{a.name}</span>
                      {a.description && (
                        <p className="text-xs text-neutral-500 line-clamp-1">{a.description}</p>
                      )}
                      <span className="text-xs font-bold text-saffron">
                        {priceNum === 0 ? "Complimentary" : `₹${priceNum}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-neutral-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleAddonQty(a.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{qty}</span>
                      <button
                        type="button"
                        onClick={() => handleAddonQty(a.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-900 font-bold block mb-0.5">Automated Gate QR Pass &amp; Confirmation:</strong>
            Upon submitting, your unique QR Code ticket will be generated instantly and emailed with all event location and coordination details.
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm uppercase rounded-xl transition-all cursor-pointer"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer"
        >
          Next: Review &amp; Confirm &rarr;
        </button>
      </div>
    </form>
  );
}
