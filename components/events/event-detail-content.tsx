"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Ticket, 
  ShieldCheck, 
  Share2, 
  Check, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  HeartHandshake, 
  Award, 
  PhoneCall, 
  Info, 
  Video, 
  AlertCircle, 
  Building2, 
  QrCode, 
  Sparkles,
  Building,
} from "lucide-react";
import { EventItem, getLocalizedEvent } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

export default function EventDetailContent({ event: rawEvent }: { event: EventItem }) {
  const { t, language } = useLanguage();
  const event = getLocalizedEvent(rawEvent, language);
  const [copied, setCopied] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const displayImages = useMemo(() => {
    const list = [event.mainImage, ...(event.galleryImages || [])].filter(Boolean);
    const unique = Array.from(new Set(list));
    while (unique.length < 3 && unique.length > 0) {
      unique.push(unique[0]);
    }
    return unique;
  }, [event.mainImage, event.galleryImages]);

  const activeImage = displayImages[selectedImageIndex] || displayImages[0];

  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.venueName || event.location);
    const formatCalDate = (d?: string) => {
      if (!d) return "";
      try {
        return new Date(d).toISOString().replace(/-|:|\.\d+/g, "");
      } catch {
        return "";
      }
    };
    const start = formatCalDate(event.rawStartDate || event.startDate);
    const end = formatCalDate(event.rawEndDate || event.endDate) || start;
    const dates = start ? `&dates=${start}/${end}` : "";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}${dates}&details=${details}&location=${location}`;
  }, [event]);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const isRegistrationOpen = 
    event.isRegistrationOpen ?? (
      event.registrationStatus === "open" || 
      event.registrationStatus === "closing_soon" || 
      event.registrationStatus === "free_entry" || 
      (!event.registrationStatus && event.status !== "completed")
    );

  const getSponsorTierLabel = (tier: string) => {
    if (tier === "Title Sponsor") {
      return language === "mr" ? "मुख्य प्रायोजक" : language === "hi" ? "शीर्ष प्रायोजक" : "Title Sponsor";
    }
    if (tier === "Gold Sponsor") {
      return language === "mr" ? "सुवर्ण प्रायोजक" : language === "hi" ? "स्वर्ण प्रायोजक" : "Gold Sponsor";
    }
    if (tier === "Powered By") {
      return language === "mr" ? "सहकार्य" : language === "hi" ? "सहयोगी" : "Powered By";
    }
    if (tier === "Associate Sponsor") {
      return language === "mr" ? "सह-प्रायोजक" : language === "hi" ? "सह-प्रायोजक" : "Associate Sponsor";
    }
    return tier;
  };

  return (
    <main className="min-h-screen bg-warm-white dark:bg-background pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 selection:bg-saffron selection:text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12">

        {/* Top Breadcrumb & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-saffron/15 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-grey dark:text-neutral-300 font-sans">
            <Link href="/events" className="hover:text-saffron transition-colors">
              {t("eventsPage.detail.breadcrumb")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
            <span className="text-saffron font-bold truncate max-w-[200px] sm:max-w-[320px]">
              {event.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20 font-sans">
              {t("eventsPage.detail.dossierBadge")}
            </span>
          </div>
        </div>

        {/* 1. Main Glassmorphic Showcase Panel - Full Width Image Grid & Written Data Below */}
        <div className="glass-panel relative p-4 sm:p-7 md:p-8 lg:p-10 rounded-2xl sm:rounded-block border border-saffron/25 dark:border-white/10 bg-gradient-to-br from-white/95 via-white/90 to-amber-50/40 dark:from-[#141416]/95 dark:via-[#121214]/95 dark:to-[#18181b]/95 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(226,88,34,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] dark:shadow-none overflow-hidden">
          {/* Top Luxury Metallic Gradient Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-saffron to-gold via-marigold to-transparent" />

          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-saffron/12 via-gold/8 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-500/10 via-saffron/8 to-transparent blur-3xl" />

          <div className="relative z-10 space-y-8 sm:space-y-10">
            
            {/* FULL WIDTH IMAGE GRID */}
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px]">
                {/* Main Feature Photo (md:col-span-8) */}
                <div className="h-[240px] sm:h-[280px] md:h-full md:col-span-8 relative rounded-2xl sm:rounded-block overflow-hidden border border-black/5 dark:border-white/10 shadow-xl bg-neutral-950 group select-none">
                  <Image
                    src={activeImage}
                    alt={event.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 68vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Diagonal Light Shimmer Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />

                  {/* Vignette Gradients for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badges Top Overlay */}
                  <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 right-3.5 sm:right-5 flex flex-wrap items-center justify-between gap-2 z-10">
                    <div className="flex flex-wrap gap-2">
                      {event.categoryLabel ? (
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-saffron to-amber-600 text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-3 sm:px-3.5 py-1.5 rounded-full shadow-lg shadow-saffron/30 border border-white/25 font-sans backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-amber-200" />
                          {event.categoryLabel}
                        </span>
                      ) : null}

                      {event.eventMode ? (
                        <span className="inline-flex items-center gap-1.5 bg-neutral-950/75 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-full shadow-md font-sans backdrop-blur-md border border-white/20">
                          <MapPin className="w-3 h-3 text-gold" />
                          {event.eventMode}
                        </span>
                      ) : null}
                    </div>

                    {event.checkInMode ? (
                      <span className="inline-flex items-center gap-1.5 bg-white/90 text-neutral-900 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.16em] px-3 py-1.5 rounded-full shadow-md font-sans backdrop-blur-md border border-white/80">
                        <QrCode className="w-3 h-3 text-saffron" />
                        {event.checkInMode}
                      </span>
                    ) : null}
                  </div>

                  {/* Bottom Trust Prestige Bar on Image */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3 text-white z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-saffron flex items-center justify-center text-white shadow-md ring-2 ring-white/30">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gold leading-tight">
                          {language === "mr" ? "श्री प्रतिष्ठान अधिकृत" : language === "hi" ? "श्री प्रतिष्ठान आधिकारिक" : "Shree Pratisthan Official"}
                        </p>
                        <p className="text-xs text-white/90 font-medium">{event.city}, {event.state || "Maharashtra"}</p>
                      </div>
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-widest bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-white/90 shadow-xs">
                      {language === "mr" ? "स्थापना २००६" : language === "hi" ? "स्था. 2006" : "Est. 2006"}
                    </div>
                  </div>
                </div>

                {/* Secondary Photos Stack (md:col-span-4) */}
                <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-4 md:grid-rows-2 gap-3 sm:gap-4 h-[110px] sm:h-[130px] md:h-full">
                  {/* Photo 2 */}
                  <div 
                    onClick={() => setSelectedImageIndex(1)}
                    className={`relative rounded-2xl sm:rounded-block overflow-hidden border ${selectedImageIndex === 1 ? 'border-saffron ring-2 ring-saffron/50' : 'border-black/5 dark:border-white/10'} shadow-md bg-neutral-950 group select-none cursor-pointer transition-all`}
                  >
                    <Image
                      src={displayImages[1]}
                      alt={`${event.title} moment 2`}
                      fill
                      sizes="(max-width: 768px) 50vw, 32vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                      {language === "mr" ? "संग्रह ०२" : language === "hi" ? "संग्रह 02" : "Archive 02"}
                    </span>
                  </div>

                  {/* Photo 3 */}
                  <div 
                    onClick={() => setSelectedImageIndex(2)}
                    className={`relative rounded-2xl sm:rounded-block overflow-hidden border ${selectedImageIndex === 2 ? 'border-saffron ring-2 ring-saffron/50' : 'border-black/5 dark:border-white/10'} shadow-md bg-neutral-950 group select-none cursor-pointer transition-all`}
                  >
                    <Image
                      src={displayImages[2]}
                      alt={`${event.title} moment 3`}
                      fill
                      sizes="(max-width: 768px) 50vw, 32vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                    
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                      {language === "mr" ? "संग्रह ०३" : language === "hi" ? "संग्रह 03" : "Archive 03"}
                    </span>

                    {/* Quick Link to Moments Gallery */}
                    <a
                      href="#moments-gallery"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 inline-flex items-center gap-1.5 bg-neutral-900/90 hover:bg-black text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md border border-white/25 shadow-md transition-all font-sans z-10"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>{t("eventsPage.detail.momentsGalleryTitle")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WRITTEN DATA (BELOW THE IMAGE GRID) */}
            <div className="space-y-6 sm:space-y-8 pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                
                {/* Main Written Story: Title, Tagline, Editorial Quote */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5">
                  {/* Eyebrow Pill */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-saffron/12 via-gold/15 to-saffron/5 border border-saffron/25 text-saffron font-sans shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                      {event.tagline}
                    </span>
                  </div>

                  {/* Event Heading */}
                  <h1 className="text-[32px] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-neutral-900 dark:text-neutral-100 font-heading leading-[1.12] uppercase tracking-tight">
                    {event.title}
                  </h1>

                  {/* Editorial Narrative Quote Box */}
                  <div className="relative rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-saffron/[0.04] via-amber-50/40 to-white/70 dark:from-[#18181b] dark:via-[#151517] dark:to-[#121214] border border-saffron/20 dark:border-white/10 shadow-xs overflow-hidden">
                    <div className="text-5xl sm:text-6xl text-saffron/12 font-serif leading-none absolute -top-1 right-3 pointer-events-none select-none">
                      “
                    </div>
                    <p className="relative z-10 text-base text-slate-700 dark:text-neutral-300 italic leading-relaxed font-sans">
                      &ldquo;{event.description}&rdquo;
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-saffron/10 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 font-sans">
                      <span className="font-semibold text-saffron">
                        {language === "mr" ? "श्री प्रतिष्ठान आयोजन समिती" : language === "hi" ? "श्री प्रतिष्ठान आयोजन समिति" : "Shree Pratisthan Organizing Committee"}
                      </span>
                      <span>{event.city}, {event.state || "Maharashtra"}</span>
                    </div>
                  </div>
                </div>

                {/* Booking & Registration Concierge Box */}
                <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white via-amber-50/25 to-white dark:from-[#18181b] dark:via-[#151517] dark:to-[#121214] border border-saffron/20 dark:border-white/10 shadow-lg space-y-4">
                  {/* Status strip */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-saffron/15 dark:border-white/10">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 font-sans">
                      {t("eventsPage.detail.registrationStatus")}
                    </span>

                    {(event.registrationStatus === "open" || (!event.registrationStatus && isRegistrationOpen)) && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/40 font-sans shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        {t("eventsPage.detail.open")}
                      </span>
                    )}
                    {event.registrationStatus === "closing_soon" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/40 font-sans shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                        {t("eventsPage.detail.closingSoon")}
                      </span>
                    )}
                    {event.registrationStatus === "free_entry" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800/40 font-sans shadow-xs">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        {t("eventsPage.detail.freeEntry")}
                      </span>
                    )}
                    {(!isRegistrationOpen || event.registrationStatus === "closed") && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 font-sans">
                        {t("eventsPage.detail.closed")}
                      </span>
                    )}
                  </div>

                  {event.registrationCloseDate && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-neutral-300 font-sans bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30 p-2 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-saffron shrink-0" />
                      <span><strong className="font-semibold">{t("eventsPage.detail.deadlineLabel")}:</strong> {event.registrationCloseDate}</span>
                    </div>
                  )}

                  {event.capacityNumber ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-neutral-300 font-sans bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 p-2 rounded-lg">
                      <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        <strong className="font-semibold">{language === "mr" ? "क्षमता" : language === "hi" ? "क्षमता" : "Capacity"}:</strong> {event.capacityNumber.toLocaleString()} {language === "mr" ? "भाविक / नागरिक" : language === "hi" ? "नागरिक" : "Devotees / Participants"}
                      </span>
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="space-y-2.5 pt-1">
                    {isRegistrationOpen ? (
                      <Link
                        href={`/event-booking?event=${event.id}`}
                        className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 bg-gradient-to-r from-saffron via-[#e75a1d] to-[#d96614] hover:from-[#d64d18] hover:to-[#c45308] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-xl shadow-saffron/25 hover:shadow-2xl hover:shadow-saffron/35 hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans cursor-pointer group/btn ring-1 ring-white/30 text-center"
                      >
                        <Ticket className="w-4 h-4 transition-transform group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                        <span>{t("eventsPage.detail.bookPassBtn")}</span>
                        <ChevronRight className="w-4 h-4 text-white/80 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold text-xs uppercase tracking-[0.2em] rounded-full font-sans cursor-not-allowed border border-neutral-300 dark:border-neutral-700">
                        <AlertCircle className="w-4 h-4" /> {t("eventsPage.detail.closed")}
                      </div>
                    )}

                    {/* Google Calendar Link Button */}
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-white dark:bg-[#1f1f23] hover:bg-neutral-50 dark:hover:bg-[#27272a] text-neutral-800 dark:text-neutral-200 rounded-full border border-saffron/20 dark:border-white/10 hover:border-saffron/40 font-bold text-xs uppercase tracking-wider font-sans transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer text-center"
                    >
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{language === "mr" ? "कॅलेंडरमध्ये नोंदवा" : language === "hi" ? "कैलेंडर में जोड़ें" : "Add to Google Calendar"}</span>
                    </a>

                    {/* Share Button with Live Feedback */}
                    <button
                      type="button"
                      onClick={handleShare}
                      aria-label="Share Event"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-white dark:bg-[#1f1f23] hover:bg-neutral-50 dark:hover:bg-[#27272a] text-neutral-800 dark:text-neutral-200 rounded-full border border-saffron/20 dark:border-white/10 hover:border-saffron/40 font-bold text-xs uppercase tracking-wider font-sans transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 dark:text-emerald-400">
                            {language === "mr" ? "लिंक क्लिपबोर्डवर सेव्ह झाली!" : language === "hi" ? "लिंक क्लिपबोर्ड पर कॉपी हो गई!" : "Link Copied to Clipboard!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-saffron" />
                          <span>{t("eventsPage.detail.shareBtn")}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Signals */}
                  <div className="pt-2 border-t border-saffron/10 dark:border-white/10 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-neutral-400 font-sans">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === "mr" ? "त्वरित पास" : language === "hi" ? "त्वरित पास" : "Instant Pass"}
                    </span>
                    <span className="text-slate-300 dark:text-neutral-600">•</span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === "mr" ? "क्यूआर चेक-इन" : language === "hi" ? "क्यूआर चेक-इन" : "QR Check-In"}
                    </span>
                    <span className="text-slate-300 dark:text-neutral-600">•</span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === "mr" ? "१००% मोफत" : language === "hi" ? "100% निःशुल्क" : "100% Free"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Quick Details Full-Width 4-Card Deck */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {/* Date Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/85 dark:bg-[#121214] border border-saffron/15 dark:border-white/10 hover:border-saffron/35 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#18181b] transition-all shadow-xs group/item">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center shrink-0 group-hover/item:bg-saffron group-hover/item:text-white transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-400">
                      {t("eventsPage.detail.dateLabel")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {event.date}
                  </p>
                </div>

                {/* Time Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/85 dark:bg-[#121214] border border-saffron/15 dark:border-white/10 hover:border-saffron/35 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#18181b] transition-all shadow-xs group/item">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-400">
                      {t("eventsPage.detail.timeLabel")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {event.time}
                  </p>
                </div>

                {/* Venue Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/85 dark:bg-[#121214] border border-saffron/15 dark:border-white/10 hover:border-saffron/35 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#18181b] transition-all shadow-xs group/item">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-gold/15 text-neutral-800 dark:text-gold flex items-center justify-center shrink-0 group-hover/item:bg-neutral-900 dark:group-hover/item:bg-neutral-100 group-hover/item:text-gold dark:group-hover/item:text-neutral-900 transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-400">
                      {t("eventsPage.detail.venueLabel")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate" title={`${event.venueName}, ${event.city}`}>
                    {event.venueName}
                  </p>
                </div>

                {/* Check-In / Mode Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/85 dark:bg-[#121214] border border-saffron/15 dark:border-white/10 hover:border-saffron/35 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#18181b] transition-all shadow-xs group/item">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                      <QrCode className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-400">
                      {language === "mr" ? "प्रवेश व स्वरूप" : language === "hi" ? "प्रवेश एवं माध्यम" : "Access & Mode"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {event.checkInMode && event.eventMode
                      ? `${event.checkInMode} • ${event.eventMode}`
                      : event.checkInMode || event.eventMode || "QR Digital Pass"}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Impact Metrics Callout Row - Premium Elevated Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {event.metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="glass-panel relative p-4 sm:p-6 rounded-2xl sm:rounded-interactive border border-saffron/20 dark:border-white/10 text-center space-y-1 bg-gradient-to-b from-white/95 to-amber-50/30 dark:from-[#18181b] dark:to-[#141416] shadow-sm hover:shadow-md hover:border-saffron/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-saffron/40 to-transparent group-hover:via-saffron transition-all" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-saffron font-heading block tracking-tight group-hover:scale-105 transition-transform duration-300">
                {m.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-grey dark:text-neutral-300 font-bold uppercase tracking-[0.16em] font-sans block">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* 3. Detailed Venue, Address & Google Maps Card */}
        <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-saffron/15 dark:border-white/10">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-saffron font-sans">
                <Building2 className="w-3.5 h-3.5" /> {t("eventsPage.detail.venue")}
              </span>
              <h2 className="text-2xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight mt-1">
                {event.venueName}
              </h2>
            </div>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white rounded-full text-xs font-bold uppercase tracking-[0.16em] hover:bg-black transition-all shadow-sm font-sans shrink-0"
            >
              {t("eventsPage.detail.openInMaps")} <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-base text-slate-700 dark:text-neutral-300 font-sans">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-neutral-400 block tracking-wider">{t("eventsPage.detail.streetAddress")}</span>
              <p className="mt-0.5 font-medium">{event.addressLine1}</p>
              {event.addressLine2 && <p className="text-slate-500 dark:text-neutral-400">{event.addressLine2}</p>}
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-neutral-400 block tracking-wider">{t("eventsPage.detail.cityState")}</span>
              <p className="mt-0.5 font-medium">{event.city}, {event.state}</p>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 dark:text-neutral-400 block tracking-wider">{t("eventsPage.detail.postalCountry")}</span>
              <p className="mt-0.5 font-medium">{event.postalCode || event.zipCode || "422009"}, {event.country || "India"}</p>
            </div>
          </div>
        </div>

        {/* 4. Accessibility & Safety Accommodations Section */}
        {event.accessibilityInfo && event.accessibilityInfo.length > 0 && (
          <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md space-y-4 sm:space-y-6">
            <div className="border-b border-saffron/15 dark:border-white/10 pb-3">
              <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-saffron/20 shadow-sm font-sans mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("eventsPage.detail.accessibility")}
              </span>
              <h2 className="text-2xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                {t("eventsPage.detail.accessibility")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {event.accessibilityInfo.map((facility: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-neutral-50/80 dark:bg-[#18181b] rounded-xl border border-black/5 dark:border-white/10">
                  <div className="w-6 h-6 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-sans font-medium">
                    {facility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Organization Operations Story */}
        <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md space-y-6">
          <div className="border-b border-saffron/15 dark:border-white/10 pb-4">
            <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-saffron/20 shadow-sm font-sans mb-1.5">
              <Info className="w-3.5 h-3.5" />
              {t("eventsPage.detail.operationsBadge")}
            </span>
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
              {t("eventsPage.detail.operationsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {event.organizedDetails.map((detail, idx) => (
              <div key={idx} className="space-y-1.5 border-l-2 border-saffron/40 pl-3.5 py-1">
                <h3 className="font-normal font-heading text-neutral-900 dark:text-neutral-100 text-lg uppercase">
                  {idx + 1}. {detail.heading}
                </h3>
                <p className="text-base text-slate-grey dark:text-neutral-300 leading-[1.7] font-sans font-normal">
                  {detail.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Agenda Timeline */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md space-y-6">
            <div className="border-b border-saffron/15 dark:border-white/10 pb-3">
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                {t("eventsPage.detail.schedule")}
              </h2>
            </div>

            <div className="space-y-3">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white/90 dark:bg-[#18181b] border border-saffron/10 dark:border-white/10 rounded-xl shadow-xs">
                  <span className="px-3 py-1 bg-saffron text-white font-mono font-bold text-xs rounded-full whitespace-nowrap shadow-xs">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-normal text-neutral-900 dark:text-neutral-100 text-base font-heading uppercase">{item.title}</h4>
                    <p className="text-base text-slate-grey dark:text-neutral-300 mt-0.5 leading-[1.6] font-sans font-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Promo Video Player */}
        {event.promoVideoUrl && (
          <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md space-y-4">
            <div className="flex items-center gap-2 border-b border-saffron/15 dark:border-white/10 pb-3">
              <Video className="w-5 h-5 text-saffron" />
              <h2 className="text-2xl sm:text-2xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                {t("eventsPage.detail.promoVideoTitle")}
              </h2>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-saffron/15 dark:border-white/10 shadow-inner bg-black">
              <iframe
                src={event.promoVideoUrl}
                title={`${event.title} Promo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* 8. Photo Moments Gallery Grid */}
        <div id="moments-gallery" className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] shadow-md space-y-4 sm:space-y-6 scroll-mt-24">
          <h2 className="text-2xl sm:text-2xl font-normal font-heading text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {t("eventsPage.detail.momentsGalleryTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {event.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-video w-full rounded-xl overflow-hidden border border-saffron/10 dark:border-white/10 shadow-xs group">
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

        {/* 9. Our Partners & Event Sponsors Grid */}
        {((event.partners && event.partners.length > 0) || (event.sponsors && event.sponsors.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Partners Card */}
            {event.partners && event.partners.length > 0 && (
              <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/15 dark:border-white/10 bg-white/80 dark:bg-[#121214] space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                  <HeartHandshake className="w-5 h-5 text-saffron" />
                  <h3 className="font-normal font-heading text-neutral-900 dark:text-neutral-100 text-base sm:text-lg uppercase">
                    {t("eventsPage.detail.partners")}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {event.partners.map((partner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-[#18181b] border border-black/5 dark:border-white/10 text-xs sm:text-sm font-sans gap-3">
                      <div className="flex items-center gap-2.5">
                        {partner.logo ? (
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white border border-black/5">
                            <Image src={partner.logo} alt={partner.name} fill className="object-contain p-1" />
                          </div>
                        ) : null}
                        <div>
                          <span className="font-bold text-slate-800 dark:text-neutral-200 block">{partner.name}</span>
                          {partner.link && (
                            <a
                              href={partner.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-blue-600 dark:text-blue-400 font-bold inline-flex items-center gap-0.5 hover:underline"
                            >
                              Website <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      {partner.role && (
                        <span className="text-[10px] uppercase font-bold text-saffron bg-saffron/10 px-2.5 py-0.5 rounded-full shrink-0">
                          {partner.role}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsors Card */}
            {event.sponsors && event.sponsors.length > 0 && (
              <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/15 dark:border-white/10 bg-white/80 dark:bg-[#121214] space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                  <Award className="w-5 h-5 text-gold" />
                  <h3 className="font-normal font-heading text-neutral-900 dark:text-neutral-100 text-base sm:text-lg uppercase">
                    {t("eventsPage.detail.sponsors")}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {event.sponsors.map((sponsor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-[#18181b] border border-black/5 dark:border-white/10 text-xs sm:text-sm font-sans gap-3">
                      <div className="flex items-center gap-2.5">
                        {sponsor.logo ? (
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white border border-black/5">
                            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain p-1" />
                          </div>
                        ) : null}
                        <div>
                          <span className="font-bold text-slate-800 dark:text-neutral-200 block">{sponsor.name}</span>
                          {sponsor.link && (
                            <a
                              href={sponsor.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-blue-600 dark:text-blue-400 font-bold inline-flex items-center gap-0.5 hover:underline"
                            >
                              Website <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-gold dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-2.5 py-0.5 rounded-full shrink-0">
                        {getSponsorTierLabel(sponsor.tier || "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 10. Helpline, Emergency Staff Contact & Location Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Emergency Coordinator Contact */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] space-y-3 shadow-sm">
            <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
              <PhoneCall className="w-5 h-5 text-saffron shrink-0" />
              <h3 className="font-normal font-heading text-neutral-900 dark:text-neutral-100 text-base sm:text-lg uppercase">
                {t("eventsPage.detail.organizer")}
              </h3>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-grey dark:text-neutral-300 font-sans">
              <p><strong>{t("eventsPage.detail.coordinatorLabel")}:</strong> {event.emergencyContactName || event.organizerName}</p>
              {event.coHosts && event.coHosts.length > 0 && (
                <p><strong>{language === "mr" ? "सह-आयोजक" : language === "hi" ? "सह-आयोजक" : "Co-Hosts"}:</strong> {event.coHosts.join(", ")}</p>
              )}
              <p><strong>{t("eventsPage.detail.hotlineLabel")}:</strong> <a href={`tel:${event.emergencyContactPhone || event.organizerPhone}`} className="text-saffron font-bold hover:underline">{event.emergencyContactPhone || event.organizerPhone}</a></p>
              <p><strong>{t("eventsPage.detail.emailLabel")}:</strong> <a href={`mailto:${event.organizerEmail}`} className="text-slate-800 dark:text-neutral-200 hover:underline">{event.organizerEmail}</a></p>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1 rounded-full inline-block">
                  {t("eventsPage.detail.active247")}
                </span>
              </div>
            </div>
          </div>

          {/* Location Summary */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/20 dark:border-white/10 bg-white/80 dark:bg-[#121214] space-y-3 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                <MapPin className="w-5 h-5 text-saffron shrink-0" />
                <h3 className="font-normal font-heading text-neutral-900 dark:text-neutral-100 text-base sm:text-lg uppercase">
                  {t("eventsPage.detail.locationCoordinates")}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 font-sans font-medium">
                {event.venueName || event.location} — {event.addressLine1 || event.location}, {event.city || "Nashik"}, {event.state || "Maharashtra"} {event.postalCode || event.zipCode || "422009"}
              </p>
            </div>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 py-3 px-6 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white rounded-full text-xs font-bold uppercase tracking-[0.16em] hover:bg-black transition-all shadow-md font-sans"
            >
              {t("eventsPage.detail.getDirections")} <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>

        </div>

      </div>
    </main>
  );
}
