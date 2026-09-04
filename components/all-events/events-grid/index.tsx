"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Ticket, Sparkles } from "lucide-react";
import { EventItem } from "@/lib/events-data";

interface EventsGridProps {
  events: EventItem[];
  isLoading?: boolean;
}

export default function EventsGrid({ events, isLoading = false }: EventsGridProps) {
  // Skeleton Loader State
  if (isLoading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-56 w-full bg-neutral-200/80 relative">
                <div className="absolute top-4 left-4 h-6 w-24 bg-neutral-300 rounded-full" />
                <div className="absolute top-4 right-4 h-6 w-20 bg-neutral-300 rounded-full" />
              </div>
              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-neutral-200 rounded-lg" />
                  <div className="h-4 w-full bg-neutral-100 rounded-md" />
                  <div className="h-4 w-2/3 bg-neutral-100 rounded-md" />
                </div>
                <div className="pt-2 border-t border-neutral-100 space-y-2">
                  <div className="h-4 w-1/2 bg-neutral-100 rounded-md" />
                  <div className="h-4 w-1/3 bg-neutral-100 rounded-md" />
                </div>
                <div className="pt-4 border-t border-neutral-100 flex gap-3">
                  <div className="h-9 flex-1 bg-neutral-200 rounded-xl" />
                  <div className="h-9 w-28 bg-neutral-200 rounded-xl" />
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
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center text-saffron border border-saffron/20 shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-neutral-900 font-heading">No Events Found</h3>
        <p className="text-sm text-neutral-500 font-medium max-w-md mx-auto mt-2">
          There are currently no events matching the selected category. Check back soon for upcoming celebrations and drives.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const [imgSrc, setImgSrc] = useState(event.mainImage || "/hero_ganesh.png");

  return (
    <div className="group bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-saffron/40 transition-all duration-500 flex flex-col justify-between">
      {/* Image Box */}
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
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
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-saffron text-white font-extrabold text-[10px] uppercase tracking-widest rounded-full shadow-md">
            {event.categoryLabel}
          </span>
        </div>

        {/* Tag for Status */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
              event.status === "upcoming"
                ? "bg-emerald-500 text-white"
                : event.status === "active"
                ? "bg-amber-500 text-white animate-pulse"
                : "bg-black/60 text-neutral-300 border border-white/20"
            }`}
          >
            {event.status === "upcoming"
              ? "Upcoming"
              : event.status === "active"
              ? "Happening Now"
              : "Completed"}
          </span>
        </div>

        {/* Bottom Image Overlay Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {event.date}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-black font-heading text-neutral-900 leading-tight group-hover:text-saffron transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs text-neutral-600 font-medium line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Venue & Capacity Info */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700 font-medium">
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
        <div className="pt-4 flex items-center justify-between gap-3 border-t border-neutral-100">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-extrabold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
          >
            Details <ArrowRight className="w-3.5 h-3.5 text-saffron" />
          </Link>

          {event.status !== "completed" && (
            <Link
              href={`/event-booking?event=${event.id}`}
              className="py-2.5 px-4 bg-saffron hover:bg-saffron/90 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 shadow-md hover:shadow-saffron/20"
            >
              <Ticket className="w-3.5 h-3.5" /> Book Event
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
