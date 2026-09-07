"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Ticket, Sparkles } from "lucide-react";
import { EventItem, getLocalizedEvent } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

interface EventsGridProps {
  events: EventItem[];
  isLoading?: boolean;
}

function EventCard({ rawEvent }: { rawEvent: EventItem }) {
  const { t, language } = useLanguage();
  const event = getLocalizedEvent(rawEvent, language);
  const [imgSrc, setImgSrc] = useState(event.mainImage || "/hero_ganesh.png");

  return (
    <div className="group bg-white dark:bg-[#121214] border border-neutral-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-saffron/40 transition-all duration-500 flex flex-col justify-between">
      {/* Image Box */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={imgSrc}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/hero_ganesh.png")}
          className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
          <span className="px-2.5 sm:px-3 py-1 bg-saffron text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full shadow-md">
            {event.categoryLabel}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
              event.status === "upcoming"
                ? "bg-emerald-500 text-white"
                : event.status === "active"
                ? "bg-amber-500 text-white animate-pulse"
                : "bg-black/60 text-neutral-300 border border-white/20"
            }`}
          >
            {event.status === "upcoming"
              ? t("eventsPage.allEvents.upcoming") || "Upcoming"
              : event.status === "active"
              ? t("eventsPage.allEvents.active") || "Happening Now"
              : t("eventsPage.allEvents.completed") || "Completed"}
          </span>
        </div>

        {/* Bottom Image Overlay Date */}
        <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 text-white">
          <span className="text-[10px] sm:text-[11px] font-medium text-amber-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {event.date}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-saffron transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Venue & Capacity Info */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-saffron flex-shrink-0" />
            <span>
              {event.metrics?.[0]?.label || "Capacity"}:{" "}
              <strong>{event.metrics?.[0]?.value || "Open to All"}</strong>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center justify-between gap-2 border-t border-neutral-100 dark:border-white/10 mt-3">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 py-2 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            {t("eventsPage.allEvents.detailsBtn") || "Details"} <ArrowRight className="w-3.5 h-3.5 text-saffron" />
          </Link>

          {event.status !== "completed" && (
            <Link
              href={`/event-booking?event=${event.id}`}
              className="py-2 px-3 sm:px-3.5 bg-saffron hover:bg-saffron/90 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-md hover:shadow-saffron/20"
            >
              <Ticket className="w-3.5 h-3.5" /> {t("eventsPage.allEvents.bookBtn") || "Book Event"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsGrid({ events, isLoading = false }: EventsGridProps) {
  const { t } = useLanguage();

  // Skeleton Loader State
  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#121214] border border-neutral-200/90 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-56 w-full bg-neutral-200/80 dark:bg-neutral-800 relative">
                <div className="absolute top-4 left-4 h-6 w-24 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                <div className="absolute top-4 right-4 h-6 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              </div>
              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                  <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                  <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                </div>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                  <div className="h-4 w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                  <div className="h-4 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                </div>
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-3">
                  <div className="h-9 flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
                  <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty State
  if (events.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-saffron border border-saffron/20 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 font-heading">
          {t("eventsPage.allEvents.noEvents") || "No Events Found"}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-md mx-auto mt-2">
          There are currently no events matching the selected category. Check back soon for upcoming celebrations and drives.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event) => (
          <EventCard key={event.id} rawEvent={event} />
        ))}
      </div>
    </section>
  );
}
