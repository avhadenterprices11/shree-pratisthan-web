"use client";

import React, { useState, useEffect } from "react";
import AllEventsFilter from "./all-events-filter";
import EventsGrid from "./events-grid";
import { EventItem, ALL_EVENTS } from "@/lib/events-data";
import { fetchEvents } from "@/lib/api/events";

export default function AllEventsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<EventItem[]>(ALL_EVENTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch live events from API
  useEffect(() => {
    let isMounted = true;
    async function loadEvents() {
      setIsLoading(true);
      try {
        const response = await fetchEvents({ pageSize: 50, status: "Published" });
        if (isMounted && response.events) {
          setEvents(response.events);
        }
      } catch (err) {
        console.error("Failed to load events dynamically:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute live event counts per category
  const counts: Record<string, number> = {
    all: events.length,
    cultural: events.filter((e) => e.category === "cultural").length,
    sports: events.filter((e) => e.category === "sports").length,
    health: events.filter((e) => e.category === "health").length,
    eco: events.filter((e) => e.category === "eco").length,
    charity: events.filter((e) => e.category === "charity").length,
  };

  // Filter events based on selected category
  const filteredEvents = events.filter((e) => {
    if (selectedCategory === "all") return true;
    return e.category === selectedCategory;
  });

  return (
    <section id="all-events-grid" className="w-full py-16 bg-neutral-50/50 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Explore All Events
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto mt-3 font-medium">
          Filter our ongoing celebrations, upcoming health camps, cultural festivals, and community initiatives.
        </p>
        <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
      </div>

      {/* Interactive Category Filter Bar */}
      <AllEventsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={counts}
      />

      {/* Active & Upcoming Events Grid */}
      <EventsGrid events={filteredEvents} isLoading={isLoading} />
    </section>
  );
}
