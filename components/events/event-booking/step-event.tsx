"use client";

import React, { useEffect, useState, useMemo } from "react";
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
  ShieldCheck
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";
import { ALL_EVENTS } from "@/lib/events-data";
import { getCategoryLabel } from "@/lib/api/events";
import { fetchEventTickets, fetchEventAddons, getApiBaseUrl, BackendTicket, BackendAddon } from "@/lib/api/bookings";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, language } = useLanguage();

  // Initial event list seeded from ALL_EVENTS
  const [eventsList, setEventsList] = useState<DynamicEventOption[]>(() => [
    {
      value: "ballerina-movie-premiere",
      rawId: 10,
      label: "Ballerina – Movie Premiere",
      sublabel: "22 Sept 2026 • Cinema / Theatre, London",
      category: "premiere",
      categoryLabel: "Cinema & Premiere",
      startDate: "2026-09-22",
      endDate: "2026-09-22",
      formattedDate: "22 Sept 2026",
      formattedTime: "01:30 AM – 05:30 AM",
      venue: "Cinema / Theatre, 5-6 Leicester Square",
      city: "London",
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
      startDate: e.startDate || "2026-08-27",
      endDate: e.endDate || "2026-09-06",
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

  // 1. Fetch Dynamic Events from API
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
              const dateDisplay = isSingle ? formattedStart : `${formattedStart} – ${formattedEnd}`;

              const timeDisplay = e.all_day 
                ? "Full Day Event" 
                : `${startObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })} – ${endObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`;

              const venue = e.venue_name || e.address_line1 || e.city || "Nashik, Maharashtra";
              const city = e.city || "Nashik";
              const catLabel = getCategoryLabel(e.category, e.name, e.type, e.tags);

              return {
                value: e.url_slug || String(e.id),
                rawId: Number(e.id),
                label: e.name || e.title,
                sublabel: `${dateDisplay} • ${city}`,
                category: e.category || "cultural",
                categoryLabel: catLabel,
                startDate: startYMD,
                endDate: endYMD,
                formattedDate: dateDisplay,
                formattedTime: timeDisplay,
                venue,
                city,
                imageUrl: e.banner_image_url || "/hero_ganesh.png",
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
              startDate: se.startDate || "2026-08-27",
              endDate: se.endDate || "2026-09-06",
              formattedDate: se.date,
              formattedTime: se.time || "06:00 AM – 11:00 PM",
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
            dateOfBirth: match.startDate || formData.dateOfBirth || "2026-09-22"
          });
        }
      } catch (err) {
        console.warn("[StepEvent] Error fetching dynamic events:", err);
      }
    }

    loadEvents();
  }, [formData.eventId]);

  // Selected event object
  const selectedEventInfo = useMemo(() => {
    return (
      eventsList.find(
        (e) =>
          e.value === formData.eventId ||
          String(e.rawId) === String(formData.eventId) ||
          e.value.toLowerCase() === String(formData.eventId || "").toLowerCase()
      ) || eventsList[0]
    );
  }, [eventsList, formData.eventId]);

  // 2. Fetch Tickets & Addons when Event changes
  useEffect(() => {
    async function loadTicketsAndAddons() {
      if (!selectedEventInfo) return;

      const eventLookup = selectedEventInfo.rawId || selectedEventInfo.value;

      if (selectedEventInfo.startDate && formData.dateOfBirth !== selectedEventInfo.startDate) {
        updateFields({ dateOfBirth: selectedEventInfo.startDate });
      }

      setLoadingExtras(true);
      try {
        const [fetchedTickets, fetchedAddons] = await Promise.all([
          fetchEventTickets(eventLookup),
          fetchEventAddons(eventLookup),
        ]);

        if (fetchedTickets && fetchedTickets.length > 0) {
          setTickets(fetchedTickets);
          if (!formData.ticketId || !fetchedTickets.some((t) => t.id === formData.ticketId)) {
            updateFields({
              ticketId: fetchedTickets[0].id,
              ticketName: fetchedTickets[0].name,
              ticketPrice: Number(fetchedTickets[0].price) || 0,
            });
          }
        } else {
          // Dynamic standard fallback tickets
          const defaultTickets: BackendTicket[] = [
            {
              id: 1,
              event_id: typeof eventLookup === "number" ? eventLookup : 10,
              name: "General Pass",
              price: 0,
              type: "general",
              description: "General Pass for all attendees with digital QR gate access",
              is_active: true,
            },
            {
              id: 2,
              event_id: typeof eventLookup === "number" ? eventLookup : 10,
              name: "Premium Pass",
              price: 0,
              type: "premium",
              description: "Priority gate pass for faster queue check-in",
              is_active: true,
            },
            {
              id: 3,
              event_id: typeof eventLookup === "number" ? eventLookup : 10,
              name: "VIP Pass",
              price: 0,
              type: "vip",
              description: "Reserved seating and special access for dignitaries & special guests",
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
  }, [selectedEventInfo]);

  // Dynamic Time Slot Options based on event timing
  const timeSlotOptions = useMemo(() => {
    if (selectedEventInfo?.formattedTime && !selectedEventInfo.formattedTime.toLowerCase().includes("all day")) {
      return [
        { 
          value: "main-show", 
          label: language === "mr" 
            ? `मुख्य कार्यक्रम वेळ (${selectedEventInfo.formattedTime})` 
            : language === "hi" 
            ? `मुख्य कार्यक्रम समय (${selectedEventInfo.formattedTime})` 
            : `Standard Event Showtime (${selectedEventInfo.formattedTime})` 
        },
        { 
          value: "early-arrival", 
          label: language === "mr" 
            ? `लवकर आगमन व चेक-इन (१ तास आधी)` 
            : language === "hi" 
            ? `प्रारंभिक आगमन एवं चेक-इन (1 घंटा पहले)` 
            : `Early Arrival & Check-in (1 Hour Prior)` 
        },
      ];
    }
    return [
      { 
        value: "morning", 
        label: language === "mr" 
          ? "सकाळचे सत्र (०८:०० AM – १२:०० PM)" 
          : language === "hi" 
          ? "सुबह का सत्र (08:00 AM – 12:00 PM)" 
          : "Morning Slot (08:00 AM – 12:00 PM)" 
      },
      { 
        value: "afternoon", 
        label: language === "mr" 
          ? "दुपारचे सत्र (१२:०० PM – ०४:०० PM)" 
          : language === "hi" 
          ? "दोपहर का सत्र (12:00 PM – 04:00 PM)" 
          : "Afternoon Slot (12:00 PM – 04:00 PM)" 
      },
      { 
        value: "evening", 
        label: language === "mr" 
          ? "संध्याकाळची महाआरती व दर्शन (०५:०० PM – ०९:०० PM)" 
          : language === "hi" 
          ? "शाम की महाआरती एवं दर्शन (05:00 PM – 09:00 PM)" 
          : "Evening Aarti & Program (05:00 PM – 09:00 PM)" 
      },
      { 
        value: "full-day", 
        label: language === "mr" 
          ? "पूर्ण दिवस पास (०८:०० AM – १०:०० PM)" 
          : language === "hi" 
          ? "पूरा दिन पास (08:00 AM – 10:00 PM)" 
          : "Full Day Pass (08:00 AM – 10:00 PM)" 
      },
    ];
  }, [selectedEventInfo, language]);

  // Active valid time slot
  const currentSlotValue = useMemo(() => {
    if (timeSlotOptions.length === 0) return "";
    const match = timeSlotOptions.find((opt) => opt.value === formData.preferredTimeSlot);
    return match ? match.value : timeSlotOptions[0].value;
  }, [timeSlotOptions, formData.preferredTimeSlot]);

  // Auto-select valid time slot if current slot is invalid for this event
  useEffect(() => {
    if (currentSlotValue && formData.preferredTimeSlot !== currentSlotValue) {
      updateFields({ preferredTimeSlot: currentSlotValue });
    }
  }, [currentSlotValue, formData.preferredTimeSlot]);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 font-sans select-none">
      <div className="border-b border-neutral-200 dark:border-white/10 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-saffron" />
          {t("eventsPage.booking.step2")}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
          {t("eventsPage.booking.step2Desc")}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        
        {/* 1. Festival / Event (Read-only) */}
        <div className="space-y-2">
          <label htmlFor="eventId" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {language === "mr" ? "महोत्सव / कार्यक्रम" : language === "hi" ? "महोत्सव / कार्यक्रम" : "Festival / Event"} <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-saffron" />
            <input
              id="eventId"
              type="text"
              readOnly
              value={selectedEventInfo?.label || "Event"}
              className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 text-sm font-semibold cursor-default select-none shadow-xs font-sans"
            />
          </div>
          {errors.eventId && <p className="text-xs text-red-600 font-medium font-sans">{errors.eventId}</p>}
        </div>

        {/* Dynamic Event Summary Preview Banner */}
        {selectedEventInfo && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-saffron/10 via-amber-500/5 to-transparent border border-saffron/25 dark:border-white/10 dark:bg-[#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-saffron text-white text-[10px] font-extrabold uppercase tracking-wider font-sans">
                  {selectedEventInfo.categoryLabel || "Event"}
                </span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-sans border border-emerald-300 dark:border-emerald-800/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {language === "mr" ? "सत्यापित कार्यक्रम" : language === "hi" ? "सत्यापित कार्यक्रम" : "Verified Event"}
                </span>
              </div>
              <h4 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-heading uppercase">
                {selectedEventInfo.label}
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-300 font-sans">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-saffron" />
                  {selectedEventInfo.formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {selectedEventInfo.formattedTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {selectedEventInfo.venue}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Ticket Tier Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
              {language === "mr" ? "पासचा प्रकार निवडा" : language === "hi" ? "पास का प्रकार चुनें" : "Select Ticket Tier / Pass Type"} <span className="text-saffron">*</span>
            </label>
            {loadingExtras && <Loader2 className="w-4 h-4 text-saffron animate-spin" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {tickets.map((tItem) => {
              const isSelected = formData.ticketId === tItem.id;
              const priceNum = Number(tItem.price) || 0;
              return (
                <div
                  key={tItem.id}
                  onClick={() =>
                    updateFields({
                      ticketId: tItem.id,
                      ticketName: tItem.name,
                      ticketPrice: priceNum,
                    })
                  }
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-saffron bg-saffron/5 dark:bg-saffron/10 shadow-md ring-2 ring-saffron/20"
                      : "border-neutral-200 dark:border-white/10 bg-white dark:bg-[#18181b] hover:border-saffron/40 hover:bg-neutral-50/50 dark:hover:bg-[#1f1f23]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-heading">
                          {tItem.name}
                        </span>
                        {tItem.type === "vip" && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                            VIP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed font-sans line-clamp-2">
                        {tItem.description || "Official verified entry pass with barcode & gate access."}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-saffron text-white"
                          : "border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#121214]"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-neutral-200/60 dark:border-white/10 flex items-center justify-between text-xs font-sans">
                    <span className="text-neutral-500 dark:text-neutral-400 font-semibold">{language === "mr" ? "किंमत प्रति पास" : language === "hi" ? "मूल्य प्रति पास" : "Price per Pass"}</span>
                    <span className="font-extrabold text-neutral-900 dark:text-neutral-100 text-sm">
                      {priceNum === 0 ? (
                        <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 dark:border-emerald-800/40">
                          {language === "mr" ? "मोफत पास" : language === "hi" ? "निःशुल्क पास" : "FREE PASS"}
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
          {/* Event Date (Read-only) */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
              {language === "mr" ? "कार्यक्रमाची तारीख" : language === "hi" ? "कार्यक्रम तिथि" : "Event Date"} <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <input
                id="dateOfBirth"
                type="text"
                readOnly
                value={selectedEventInfo?.formattedDate || formData.dateOfBirth || ""}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 text-sm font-semibold cursor-default select-none shadow-xs font-sans"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Time Slot Selector Dropdown */}
          <div className="space-y-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
              {language === "mr" ? "आगमन वेळ / सत्र" : language === "hi" ? "आगमन समय / सत्र" : "Arrival Time Slot"} <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="preferredTimeSlot"
              options={timeSlotOptions}
              value={currentSlotValue || "main-show"}
              onChange={(val) => updateFields({ preferredTimeSlot: val })}
              icon={<Clock className="w-4 h-4" />}
            />
            {errors.preferredTimeSlot && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.preferredTimeSlot}</p>
            )}
          </div>
        </div>

        {/* 4. Number of Attendees / Quantity Counter */}
        <div className="space-y-2">
          <label htmlFor="numberOfParticipants" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-sans">
            {language === "mr" ? "उपस्थित व्यक्ती / पास संख्या" : language === "hi" ? "उपस्थित सदस्य / पास संख्या" : "Number of Attendees / Passes"} <span className="text-saffron">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              <input
                id="numberOfParticipants"
                type="number"
                min={1}
                max={20}
                required
                value={formData.numberOfParticipants || 1}
                onChange={(e) =>
                  updateFields({ numberOfParticipants: Math.min(20, Math.max(1, parseInt(e.target.value, 10) || 1)) })
                }
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-white/15 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold shadow-xs font-sans"
              />
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-[#18181b] p-1 rounded-xl border border-neutral-200 dark:border-white/10">
              <button
                type="button"
                aria-label="Decrease attendees"
                onClick={() =>
                  updateFields({
                    numberOfParticipants: Math.max(1, (formData.numberOfParticipants || 1) - 1),
                  })
                }
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[#222226] rounded-lg shadow-xs hover:bg-neutral-50 dark:hover:bg-[#2c2c30] text-neutral-700 dark:text-neutral-200 font-bold cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-neutral-900 dark:text-neutral-100 font-sans">
                {formData.numberOfParticipants || 1}
              </span>
              <button
                type="button"
                aria-label="Increase attendees"
                onClick={() =>
                  updateFields({
                    numberOfParticipants: Math.min(20, (formData.numberOfParticipants || 1) + 1),
                  })
                }
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[#222226] rounded-lg shadow-xs hover:bg-neutral-50 dark:hover:bg-[#2c2c30] text-neutral-700 dark:text-neutral-200 font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {errors.numberOfParticipants && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.numberOfParticipants}</p>
          )}
        </div>

        {/* 5. Optional Add-ons */}
        {addons.length > 0 && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 font-sans">
              <ShoppingBag className="w-4 h-4 text-saffron" />
              {language === "mr" ? "ऐच्छिक सेवा व किट" : language === "hi" ? "वैकल्पिक सेवा एवं किट" : "Optional Community Add-ons & Seva Kits"}
            </label>
            <div className="space-y-2.5">
              {addons.map((a) => {
                const qty = formData.selectedAddons?.[a.id] || 0;
                const priceNum = Number(a.price) || 0;
                return (
                  <div
                    key={a.id}
                    className="p-3.5 bg-neutral-50 dark:bg-[#18181b] border border-neutral-200 dark:border-white/10 rounded-xl flex items-center justify-between gap-4 font-sans"
                  >
                    <div>
                      <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 block">{a.name}</span>
                      {a.description && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{a.description}</p>
                      )}
                      <span className="text-xs font-bold text-saffron">
                        {priceNum === 0 ? "Complimentary" : `₹${priceNum}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-white dark:bg-[#222226] px-2 py-1 rounded-lg border border-neutral-200 dark:border-white/10 shadow-xs">
                      <button
                        type="button"
                        aria-label="Decrease addon quantity"
                        onClick={() => handleAddonQty(a.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-neutral-900 dark:text-neutral-100">{qty}</span>
                      <button
                        type="button"
                        aria-label="Increase addon quantity"
                        onClick={() => handleAddonQty(a.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded cursor-pointer"
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
        <div className="p-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 rounded-2xl text-xs text-slate-700 dark:text-neutral-300 leading-relaxed flex items-start gap-2.5 font-sans">
          <Info className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-900 dark:text-neutral-100 font-bold block mb-0.5">
              {language === "mr" ? "स्वयंचलित गेट क्यूआर पास व पुष्टीकरण:" : language === "hi" ? "स्वचालित गेट क्यूआर पास एवं पुष्टि:" : "Automated Gate QR Pass & Confirmation:"}
            </strong>
            {language === "mr"
              ? "नोंदणी पूर्ण होताच आपला डिजिटल क्यूआर कोड पास तयार होईल आणि ईमेलवर पाठवला जाईल."
              : language === "hi"
              ? "पंजीकरण पूर्ण होते ही आपका डिजिटल क्यूआर कोड पास तुरंत जनरेट होगा और ईमेल पर भेजा जाएगा।"
              : "Upon submitting, your unique QR Code ticket will be generated instantly and emailed with all event location and coordination details."}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs sm:text-sm uppercase rounded-xl transition-all cursor-pointer font-sans"
        >
          &larr; {t("eventsPage.booking.prevStep")}
        </button>

        <button
          type="submit"
          className="px-6 sm:px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer font-sans"
        >
          {language === "mr" ? "पुढील: तपासा व निश्चित करा →" : language === "hi" ? "आगे: जांचें एवं पुष्टि करें →" : "Next: Review & Confirm →"}
        </button>
      </div>
    </form>
  );
}
