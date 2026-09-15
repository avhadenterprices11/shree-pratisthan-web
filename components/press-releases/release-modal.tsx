"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, MapPin, User, CheckCircle2, Share2, Printer } from "lucide-react";
import { PressRelease, OfficialAnnouncement } from "@/lib/press-data";

interface ReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  release?: PressRelease | null;
  announcement?: OfficialAnnouncement | null;
}

export default function ReleaseModal({ isOpen, onClose, release, announcement }: ReleaseModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || (!release && !announcement)) return null;

  const isRelease = !!release;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareTitle = isRelease ? release.title : announcement?.title || "Shree Pratisthan Press";
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch {
        // Fallback copy
        navigator.clipboard.writeText(shareUrl);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121214] border border-white/10 rounded-2xl sm:rounded-block shadow-2xl z-10 text-white flex flex-col my-auto transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121214]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-saffron font-sans">
              {isRelease ? "Official Press Release" : "Official Public Statement"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print document"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share release"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-saffron text-white transition-colors ml-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 md:p-10 space-y-6">
          {isRelease && release ? (
            <>
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-saffron/15 text-saffron border border-saffron/30 font-sans">
                  {release.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-saffron" />
                  {release.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-saffron" />
                  {release.location}
                </span>
              </div>

              {/* Title */}
              <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-heading font-medium tracking-tight text-white leading-snug">
                {release.title}
              </h2>

              {/* Image if available */}
              {release.image && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg">
                  <Image
                    src={release.image}
                    alt={release.imageAlt || release.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Summary Lead */}
              <div className="p-4 rounded-xl bg-white/[0.03] border-l-4 border-saffron text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                {release.summary}
              </div>

              {/* Key Facts Bullets if present */}
              {release.keyFacts && release.keyFacts.length > 0 && (
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold font-sans">
                    Key Official Highlights
                  </p>
                  <ul className="space-y-2">
                    {release.keyFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75">
                        <CheckCircle2 className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-sans pt-2">
                {release.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Spokesperson & Signoff */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-saffron/20 border border-saffron/40 flex items-center justify-center text-saffron font-bold text-xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest font-sans">Issued Under Guidance Of</p>
                    <p className="text-sm font-bold text-white">{release.spokesperson}</p>
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <p className="text-[11px] text-white/40 font-sans">Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha</p>
                  <p className="text-[10px] text-gold/80 font-mono">Reg: nashik/0000153/2018</p>
                </div>
              </div>
            </>
          ) : announcement ? (
            <>
              {/* Announcement View */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/15 text-gold border border-gold/30 font-sans">
                  {announcement.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {announcement.date}
                </span>
                {announcement.priority === "urgent" && (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30">
                    High Priority
                  </span>
                )}
              </div>

              <h2 id="modal-title" className="text-xl sm:text-2xl font-heading font-medium tracking-tight text-white leading-snug">
                {announcement.title}
              </h2>

              <div className="p-4 rounded-xl bg-white/[0.03] border-l-4 border-gold text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                {announcement.summary}
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 text-sm sm:text-base text-white/75 leading-relaxed font-sans space-y-4">
                <p>{announcement.details}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-sans">
                <span>Indira Nagar, Nashik Office</span>
                <span>Helpline: +91 9922786608</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
