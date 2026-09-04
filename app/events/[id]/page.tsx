import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById, ALL_EVENTS } from "@/lib/events-data";
import { fetchEvents, fetchEventByIdOrSlug } from "@/lib/api/events";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  PhoneCall, 
  ExternalLink,
  Info,
  Users,
  Tag,
  Sparkles,
  Building,
  CheckCircle2,
  Video,
  Shield,
  Globe,
  Hourglass,
  UserCheck,
  Play,
  HeartHandshake
} from "lucide-react";

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

      <main className="min-h-screen py-28 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background">
        {/* Decorative ambient backgrounds */}
        <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
        <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-1/3 opacity-60" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 space-y-12">
          {/* Back Link */}
          <div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-saffron hover:text-saffron/85 font-extrabold text-xs uppercase tracking-widest transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to All Events
            </Link>
          </div>

          {/* Main Showcase Hero Panel */}
          <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-saffron/20 relative overflow-hidden bg-white/80 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Image / Media Showcase */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-saffron/15 shadow-md bg-neutral-100 group">
                  <Image
                    src={event.mainImage || "/hero_ganesh.png"}
                    alt={event.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center bg-saffron text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      {event.categoryLabel}
                    </span>
                    
                    {/* Event Mode Badge */}
                    <span className="inline-flex items-center gap-1 bg-slate-900/90 text-white backdrop-blur-md font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md border border-white/10">
                      {event.mode === "online" ? (
                        <>
                          <Video className="w-3 h-3 text-emerald-400" /> Virtual Online
                        </>
                      ) : event.mode === "hybrid" ? (
                        <>
                          <Globe className="w-3 h-3 text-amber-400" /> Hybrid Event
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-saffron" /> In-Person
                        </>
                      )}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${
                        event.status === "upcoming"
                          ? "bg-emerald-600 text-white"
                          : event.status === "active"
                          ? "bg-amber-500 text-white animate-pulse"
                          : "bg-neutral-800 text-neutral-200"
                      }`}
                    >
                      {event.status === "upcoming"
                        ? "Upcoming Event"
                        : event.status === "active"
                        ? "Happening Now"
                        : "Completed Archive"}
                    </span>
                  </div>
                </div>

                {/* Tags if available */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center pt-1">
                    <Tag className="w-3.5 h-3.5 text-saffron" />
                    {event.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold border border-neutral-200 shadow-sm"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Details & CTAs */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold text-saffron uppercase tracking-widest font-mono block">
                  {event.tagline}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading leading-tight uppercase tracking-tight">
                  {event.title}
                </h1>

                {/* Description Highlight block */}
                <div className="border-l-4 border-saffron pl-4 py-1 bg-amber-50/50 rounded-r-xl">
                  <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Registration Deadline Container */}
                <div className="p-3 sm:p-3.5 px-4 rounded-xl sm:rounded-2xl border border-neutral-200/80 bg-neutral-50/70 text-xs sm:text-sm text-slate-700 flex items-center gap-1.5 shadow-sm">
                  <span className="font-bold text-neutral-800">Deadline:</span>
                  <span className="text-neutral-600 font-medium">
                    {event.regEndAt
                      ? `Closes on ${new Date(event.regEndAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                      : event.id === "ganesh-utsav-2026"
                      ? "Closes on August 25, 2026"
                      : event.date
                      ? `Closes prior to ${event.date.split("–")[0].trim()}`
                      : "Closes prior to event start"}
                  </span>
                </div>

                {/* Quick Details List */}
                <div className="border-t border-saffron/10 pt-5 space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Date: </span>
                      <span className="text-neutral-700 font-medium">{event.date}</span>
                      {event.timezone && <span className="text-[11px] text-neutral-500 block sm:inline sm:ml-2">Timezone: {event.timezone}</span>}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Time: </span>
                      <span className="text-neutral-700 font-medium">{event.time}</span>
                      {event.allDay && <span className="text-[11px] text-emerald-600 font-semibold block sm:inline sm:ml-2">(Full Day Event)</span>}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Venue: </span>
                      <span className="text-neutral-700 font-medium">{event.venueName || event.location}</span>
                      {event.address && event.venueName && event.address !== event.venueName && (
                        <span className="text-[11px] text-neutral-500 block">{event.address}</span>
                      )}
                    </div>
                  </div>

                  {/* Virtual Link if available */}
                  {(event.mode === "online" || event.mode === "hybrid") && event.meetingUrl && (
                    <div className="flex items-start gap-3 p-3 bg-blue-50/80 rounded-xl border border-blue-200/60 text-blue-900">
                      <Video className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Virtual Session ({event.virtualPlatform || "Online"})
                        </span>
                        <a
                          href={event.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 hover:text-blue-900 font-bold underline inline-flex items-center gap-1"
                        >
                          Access Live Meeting Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  {event.status !== "completed" && (
                    <Link
                      href={`/event-booking?event=${event.id}`}
                      className="w-full py-4 px-8 bg-[#e03d00] hover:bg-[#c93600] text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-saffron/25 transition-all text-center flex items-center justify-center gap-2.5"
                    >
                      <Ticket className="w-5 h-5" /> BOOK ENTRY PASS
                    </Link>
                  )}

                  {event.mapUrl && event.mode !== "online" && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-neutral-200"
                    >
                      <MapPin className="w-4 h-4 text-saffron" /> Map Directions
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Key Metrics Callout Row */}
          {event.metrics && event.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {event.metrics.map((m, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-saffron/15 text-center space-y-1.5 bg-white/80 shadow-sm">
                  <span className="text-2xl sm:text-4xl font-black text-saffron font-heading block">{m.value}</span>
                  <span className="text-[11px] text-slate-grey font-extrabold uppercase tracking-wider">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Registration & Accessibility Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Registration Window Information */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/20 bg-white/85 shadow-md space-y-5">
              <div className="flex items-center gap-2 border-b border-saffron/10 pb-4">
                <Hourglass className="w-5 h-5 text-saffron" />
                <h3 className="text-xl font-extrabold font-heading text-foreground uppercase tracking-tight">
                  Registration Window & Capacity
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                {event.regStartAt && (
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-medium">Registration Opens:</span>
                    <span className="font-bold text-neutral-900">{new Date(event.regStartAt).toLocaleString()}</span>
                  </div>
                )}
                {event.regEndAt && (
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-medium">Registration Closes:</span>
                    <span className="font-bold text-neutral-900">{new Date(event.regEndAt).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Maximum Capacity:</span>
                  <span className="font-bold text-neutral-900">
                    {event.capacityNumber ? `${event.capacityNumber.toLocaleString()} Attendees` : "Unlimited / Open Entry"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Waitlist Support:</span>
                  <span className={`font-bold ${event.waitlistEnabled ? "text-emerald-600" : "text-neutral-600"}`}>
                    {event.waitlistEnabled ? "Available if fully booked" : "Standard Entry"}
                  </span>
                </div>
                {event.checkInMode && (
                  <div className="flex justify-between py-1.5">
                    <span className="text-neutral-500 font-medium">Check-In Method:</span>
                    <span className="font-bold text-neutral-900 capitalize">{event.checkInMode} verification</span>
                  </div>
                )}
              </div>
            </div>

            {/* Accessibility & Safety Notes */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/20 bg-white/85 shadow-md space-y-5">
              <div className="flex items-center gap-2 border-b border-saffron/10 pb-4">
                <Shield className="w-5 h-5 text-saffron" />
                <h3 className="text-xl font-extrabold font-heading text-foreground uppercase tracking-tight">
                  Accessibility & Guest Safety
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {event.accessibilityNotes ||
                    "Venue provides accessible ramp entry, clean sanitization stations, and dedicated volunteer support for senior citizens and differently-abled guests."}
                </p>

                {event.organizerPhone && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-saffron/20 text-xs text-amber-900 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-saffron flex-shrink-0" />
                    <span>Emergency Staff Contact: <strong>{event.organizerPhone}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Promo Video Showcase (if present) */}
          {event.promoVideoUrl && (
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-saffron/20 bg-white/85 shadow-lg space-y-6">
              <div className="flex items-center gap-2 border-b border-saffron/10 pb-4">
                <Play className="w-5 h-5 text-saffron" />
                <h2 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">
                  PROMOTIONAL VIDEO SHOWCASE
                </h2>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl">
                <video
                  src={event.promoVideoUrl}
                  controls
                  className="w-full h-full object-contain"
                  poster={event.mainImage}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {/* Program Agenda & Timeline */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-saffron/20 bg-white/85 shadow-xl space-y-8">
              <div className="border-b border-saffron/10 pb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-saffron" />
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-foreground uppercase tracking-tight">
                  PROGRAM AGENDA & TIMELINE
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-white border border-saffron/15 rounded-2xl shadow-sm hover:border-saffron/40 transition-all"
                  >
                    <span className="px-3.5 py-1.5 bg-saffron text-white font-mono font-bold text-xs rounded-full whitespace-nowrap shadow-sm">
                      {item.time}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-foreground text-base font-heading">{item.title}</h4>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-grey leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Partners & Sponsors Sections */}
          {((event.partners && event.partners.length > 0) || (event.sponsors && event.sponsors.length > 0)) && (
            <div className="space-y-8">
              {/* Partners */}
              {event.partners && event.partners.length > 0 && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/20 bg-white/85 shadow-md space-y-6">
                  <div className="flex items-center gap-2 border-b border-saffron/10 pb-4">
                    <HeartHandshake className="w-5 h-5 text-saffron" />
                    <h3 className="text-xl font-bold font-heading text-foreground uppercase tracking-tight">
                      Official Event Partners
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {event.partners.map((partner, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 shadow-sm hover:shadow-md hover:border-saffron/40 transition-all"
                      >
                        {partner.logo ? (
                          <div className="relative h-12 w-full">
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <Building className="w-8 h-8 text-neutral-400" />
                        )}
                        <span className="font-bold text-xs text-neutral-900 line-clamp-1">{partner.name}</span>
                        {partner.link && (
                          <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 font-bold inline-flex items-center gap-0.5 hover:underline"
                          >
                            Website <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/20 bg-white/85 shadow-md space-y-6">
                  <div className="flex items-center gap-2 border-b border-saffron/10 pb-4">
                    <Building className="w-5 h-5 text-saffron" />
                    <h3 className="text-xl font-bold font-heading text-foreground uppercase tracking-tight">
                      Event Sponsors & Patrons
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {event.sponsors.map((sponsor, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 shadow-sm hover:shadow-md hover:border-saffron/40 transition-all"
                      >
                        {sponsor.logo ? (
                          <div className="relative h-12 w-full">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <Building className="w-8 h-8 text-neutral-400" />
                        )}
                        <span className="font-bold text-xs text-neutral-900 line-clamp-1">{sponsor.name}</span>
                        {sponsor.tier && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[9px] font-bold uppercase tracking-wider">
                            {sponsor.tier}
                          </span>
                        )}
                        {sponsor.link && (
                          <a
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 font-bold inline-flex items-center gap-0.5 hover:underline"
                          >
                            Website <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Photo Gallery Grid */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-saffron/20 bg-white/85 shadow-xl space-y-6">
              <h2 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">
                EVENT MOMENTS GALLERY
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {event.galleryImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video w-full rounded-2xl overflow-hidden border border-saffron/10 shadow-sm group bg-neutral-100">
                    <Image
                      src={img}
                      alt={`${event.title} photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hosts, Contacts & Map Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Host & Helpline */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/15 bg-white/85 space-y-4">
              <h3 className="font-extrabold font-heading text-foreground text-lg flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-saffron" />
                Event Organizer & Support
              </h3>
              <div className="space-y-2 text-sm text-slate-700 font-medium">
                <p><strong>Primary Host:</strong> {event.organizerName}</p>
                {event.coHosts && event.coHosts.length > 0 && (
                  <p><strong>Co-Hosts:</strong> {event.coHosts.join(", ")}</p>
                )}
                <p><strong>Phone:</strong> {event.organizerPhone}</p>
                <p><strong>Email:</strong> {event.organizerEmail}</p>
              </div>
            </div>

            {/* Venue Location Coordinates */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saffron/15 bg-white/85 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold font-heading text-foreground text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-saffron" />
                  Venue Location
                </h3>
                <p className="text-sm text-slate-700 font-medium mt-2">
                  {event.venueName && <span className="font-bold block">{event.venueName}</span>}
                  {event.address || event.location}
                </p>
              </div>

              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md"
                >
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5 text-saffron" />
                </a>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
