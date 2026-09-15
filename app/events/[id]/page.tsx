import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventById, ALL_EVENTS } from "@/lib/events-data";
import { fetchEvents, fetchEventByIdOrSlug } from "@/lib/api/events";
import EventDetailContent from "@/components/events/event-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { events } = await fetchEvents({ pageSize: 100 });
    const dynamicIds = events.map((e) => ({ id: e.id }));
    const staticIds = ALL_EVENTS.map((e) => ({ id: e.id }));

    // Combine and deduplicate IDs
    const allIds = Array.from(new Set([...dynamicIds.map(d => d.id), ...staticIds.map(s => s.id)]));
    return allIds.map(id => ({ id }));
  } catch {
    return ALL_EVENTS.map((event) => ({
      id: event.id,
    }));
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = (await fetchEventByIdOrSlug(id)) || getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found | Shree Pratishtan (श्री प्रतिष्ठान)",
      description: "The requested event could not be found.",
    };
  }

  const pageTitle = event.metaTitle || `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`;
  const pageDescription = event.metaDescription || event.description || `Join ${event.title} organized by Shree Pratishtan in ${event.location}.`;
  const canonicalUrl = `https://www.shreepratishthan.com/events/${event.id}`;
  const imageUrl = event.mainImage.startsWith("http")
    ? event.mainImage
    : `https://www.shreepratishthan.com${event.mainImage.startsWith("/") ? "" : "/"}${event.mainImage}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      event.title,
      event.categoryLabel,
      event.location,
      "Shree Pratishtan",
      "Indira Nagar Nashik",
      "Nashik Events",
      "Maharashtra Cultural Festivals",
      ...(event.tags || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "Shree Pratishtan (श्री प्रतिष्ठान)",
      locale: "en_IN",
      type: "article",
      publishedTime: event.rawStartDate,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
      creator: "@shreepratishthan",
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = (await fetchEventByIdOrSlug(id)) || getEventById(id);

  if (!event) {
    notFound();
  }

  const canonicalUrl = `https://www.shreepratishthan.com/events/${event.id}`;
  const fullImageUrl = event.mainImage.startsWith("http")
    ? event.mainImage
    : `https://www.shreepratishthan.com${event.mainImage.startsWith("/") ? "" : "/"}${event.mainImage}`;

  // Structured Data (JSON-LD) for Schema.org Event
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "url": canonicalUrl,
    "startDate": event.rawStartDate || new Date().toISOString(),
    "endDate": event.rawEndDate || new Date().toISOString(),
    "eventStatus": event.status === "completed"
      ? "https://schema.org/EventMovedOnline"
      : "https://schema.org/EventScheduled",
    "eventAttendanceMode": event.mode === "online"
      ? "https://schema.org/OnlineEventAttendanceMode"
      : event.mode === "hybrid"
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    "location": event.mode === "online"
      ? {
        "@type": "VirtualLocation",
        "url": event.meetingUrl || canonicalUrl,
      }
      : {
        "@type": "Place",
        "name": event.venueName || event.location,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": event.address || event.location,
          "addressLocality": event.city || "Nashik",
          "addressRegion": event.state || "Maharashtra",
          "postalCode": event.zipCode || "",
          "addressCountry": event.country || "IN",
        },
      },
    "image": [
      fullImageUrl,
      ...(event.galleryImages || []).map((img) =>
        img.startsWith("http") ? img : `https://www.shreepratishthan.com${img.startsWith("/") ? "" : "/"}${img}`
      ),
    ],
    "organizer": {
      "@type": "Organization",
      "name": event.organizerName || "Shree Pratishtan Trust",
      "url": "https://www.shreepratishthan.com",
      "telephone": event.organizerPhone,
      "email": event.organizerEmail,
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "price": "0",
      "priceCurrency": "INR",
      "availability": event.status === "completed"
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      "validFrom": event.rawStartDate || new Date().toISOString(),
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetailContent event={event} />
    </>
  );
}
