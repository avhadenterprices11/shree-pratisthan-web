import React from "react";
import type { Metadata } from "next";
import EventBookingHero from "@/components/event-booking/hero";
import EventBookingContainer from "@/components/event-booking";

export const metadata: Metadata = {
  title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Book your passes and register for upcoming Shree Pratishtan cultural celebrations, Gudipadwa Swagat Yatra, Ganeshotsav, Navratri, health camps, and sports leagues in Indira Nagar, Nashik.",
  openGraph: {
    title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Book your passes and register for upcoming cultural celebrations and social drives in Indira Nagar, Nashik. Get your instant digital pass with QR verification.",
    url: "https://www.shreepratishthan.com/event-booking",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Event Booking Shree Pratishtan" }],
  },
  twitter: {
    title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Book passes for upcoming cultural celebrations and social drives in Indira Nagar, Nashik.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/event-booking" },
};

export default function EventBookingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pb-20 bg-background relative overflow-hidden">
      {/* 1. Next-Level Interactive Hero Component */}
      <EventBookingHero />

      {/* 2. Main Multi-Step Form Interactive Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
        <EventBookingContainer />
      </div>
    </main>
  );
}
