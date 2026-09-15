import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shree Prathishthan — Maharashtra's trusted cultural heritage and social welfare trust. Organising Ganeshotsav, Dahi Handi, Navratri, blood donation camps, and rural relief drives across Pune and Mumbai.",
  openGraph: {
    title: "Shree Prathishthan | Home",
    description:
      "Maharashtra's trusted cultural heritage trust. Grand festivals, community service, and rural welfare drives.",
    url: "https://www.shreepratishthan.org",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Shree Prathishthan Home" }],
  },
  twitter: {
    title: "Shree Prathishthan | Home",
    description: "Maharashtra's trusted cultural heritage trust. Grand festivals and community service.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org" },
};

import Hero from "@/components/home/hero";
import AboutPreview from "@/components/home/about-preview";
import FestivalJourney from "@/components/home/festival-journey";
import FeaturedEvents from "@/components/home/featured-events";
import CommunityImpact from "@/components/home/community-impact";
import CulturalInitiatives from "@/components/home/social-work";
import GalleryPreview from "@/components/home/gallery-preview";
import Testimonials from "@/components/home/testimonials";
import VolunteerCTA from "@/components/ui/volunteer-cta";
import Sponsors from "@/components/home/sponsors";
import ContactCTA from "@/components/home/contact-cta";

export default function Home() {
  return (
    <main className="w-full min-h-screen block">
      {/* 1. Hero Landing Block */}
      <Hero />

      {/* 2. Editorial About Preview */}
      <AboutPreview />

      {/* 3. Timeline Milestone Journey */}
      <FestivalJourney />

      {/* 4. Ganeshotsav & Dahi Handi Featured Cards */}
      <FeaturedEvents />

      {/* 5. Live Metrics & Counter-ups */}
      <CommunityImpact />

      {/* 6. Horizontal Scroller of Cultural Initiatives */}
      <CulturalInitiatives />

      {/* 7. Media Masonry Grid */}
      <GalleryPreview />

      {/* 8. Patron & Volunteer Testimonial */}
      <Testimonials />

      {/* 9. Volunteer Conversion Banner */}
      <VolunteerCTA />

      {/* 10. Sponsors Infinite Scroll Ticker */}
      <Sponsors />

      {/* 11. Message Inbox & Administrative Coordinates */}
      <ContactCTA />
    </main>
  );
}
