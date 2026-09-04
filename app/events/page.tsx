import React from "react";
import type { Metadata } from "next";
import EventsHero from "@/components/events/hero";
import FeaturedFestivals from "@/components/events/featured-festivals";
import UpcomingEvents from "@/components/events/upcoming-events";
import Highlights from "@/components/events/highlights";
import AllEventsSection from "@/components/all-events/all-events-section";
import FestivalCalendar from "@/components/events/festival-calendar";
import EventJourney from "@/components/events/event-journey";
import PastEvents from "@/components/events/past-events";
import Registration from "@/components/events/registration";
import FAQ from "@/components/events/faq";

export const metadata: Metadata = {
  title: "Events & Cultural Festivals | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Discover upcoming cultural celebrations, Gudipadwa Swagat Yatra, Shree Ganeshotsav, Navratri, Shiv Jayanti, blood donation camps, and sports leagues at Shree Pratishtan, Indira Nagar, Nashik.",
  openGraph: {
    title: "Events & Cultural Festivals | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Discover upcoming cultural celebrations, Swagat Yatra, Ganeshotsav, Navratri, health camps, and sports tournaments in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.com/events",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Shree Pratishtan Events" }],
  },
  twitter: {
    title: "Events & Cultural Festivals | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Discover upcoming cultural celebrations and community drives at Shree Pratishtan in Indira Nagar, Nashik.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/events" },
};

export default function EventsPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Hero Landing Block */}
      <EventsHero />

      {/* 2. Featured Festivals Showcase */}
      <FeaturedFestivals />

      {/* 3. Upcoming Events & Campaigns */}
      <UpcomingEvents />

      {/* 4. Event Highlights */}
      <Highlights />

      {/* 4b. All Events Explorer & Grid */}
      <AllEventsSection />

      {/* 5. Annual Festival Calendar */}
      <FestivalCalendar />

      {/* 6. Event Journey Timeline */}
      <EventJourney />

      {/* 7. Past Events Archive */}
      <PastEvents />

      {/* 8. Event Volunteer & Booking Registration */}
      <Registration />

      {/* 9. Event Frequently Asked Questions */}
      <FAQ />
    </main>
  );
}
