"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@") || cleanEmail.startsWith("@") || cleanEmail.endsWith("@")) {
      setStatus("error");
      setFeedbackMsg("Please enter a valid email address (e.g. name@domain.com)");
      return;
    }

    setStatus("submitting");
    setFeedbackMsg("");

    setTimeout(() => {
      setStatus("success");
      setFeedbackMsg("Subscribed! Thank you for joining our newsletter.");
      setEmail("");

      setTimeout(() => {
        setStatus("idle");
        setFeedbackMsg("");
      }, 4000);
    }, 500);
  };

  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden border-t border-white/10 select-none">


      {/* 1. Giant Awwwards-Style Header Marquee */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-10 bg-[#111] flex border-b border-white/5">
        {/* Left & Right Gradient Soft Fades */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#111] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10" />

        <div className="inline-flex gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-16 text-4xl sm:text-6xl md:text-[5vw] font-black uppercase font-sans">
          <span className="text-white">Devotion & Service!</span>
          <span className="text-outline">Shree Pratishtan</span>
          <span className="text-saffron">Indira Nagar • Nashik</span>
          <span className="text-white">✦</span>
        </div>
        <div className="inline-flex gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-16 text-4xl sm:text-6xl md:text-[5vw] font-black uppercase font-sans" aria-hidden="true">
          <span className="text-white">Devotion & Service!</span>
          <span className="text-outline">Shree Pratishtan</span>
          <span className="text-saffron">Indira Nagar • Nashik</span>
          <span className="text-white">✦</span>
        </div>
      </div>

      {/* 2. Footer Content Grid */}
      <div className="max-w-7xl mx-auto relative z-10 py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Left Block: Description & Email Subscription */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20 bg-white/5 shrink-0 shadow-md">
                <Image 
                  src="/logo.png" 
                  alt="Shree Pratisthan Official Logo" 
                  fill 
                  sizes="44px" 
                  className="object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black tracking-tight text-white font-heading">
                  SHREE <span className="text-saffron">PRATHISHTHAN</span>
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">
                  कै. धर्मराज बडोदे बहुउद्देशीय सेवाभावी संस्था
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-md font-light font-sans">
              Rooted in Indira Nagar, Nashik since 2006 under the leadership of Adv. Shyam Badode, Shree Pratishtan unites cultural heritage, youth sportsmanship, and selfless community welfare. Get trust announcements and volunteering calls directly in your inbox.
            </p>

            <div className="w-full max-w-md">
              <form 
                onSubmit={handleSubscribe}
                noValidate
                className="flex items-center bg-[#1c1c1c] border border-white/10 rounded-full p-1.5 w-full focus-within:border-saffron/50 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className="bg-transparent text-xs sm:text-sm text-white placeholder-white/30 px-5 py-3 outline-none flex-grow w-full"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-white hover:bg-neutral-200 text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-6 sm:px-8 py-3 rounded-full transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>

              {status === "error" && feedbackMsg && (
                <p className="text-[11px] text-red-400 font-medium mt-2 px-4 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {feedbackMsg}
                </p>
              )}

              {status === "success" && feedbackMsg && (
                <p className="text-[11px] text-emerald-400 font-medium mt-2 px-4 flex items-center gap-1.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {feedbackMsg}
                </p>
              )}
            </div>
          </div>

          {/* Right Block: Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Quick links</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li><Link href="/" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Home</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Events</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Community</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">About Us</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Gallery</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Support &amp; Legal</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Terms &amp; Conditions</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Committees &amp; Trustees</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Register As Volunteer</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Contact &amp; Help Desk</Link></li>
              </ul>
            </div>

            {/* Follow Us On */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Follow us on</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Facebook <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Instagram <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    YouTube <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Twitter <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* 3. Lower Metadata Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-white/30">
          <div>
            © {new Date().getFullYear()} Shree Pratishtan (Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha — Reg: nashik/0000153/2018). All Rights Reserved.
          </div>
          <div className="flex gap-1.5 items-center font-sans font-light">
            <span>Designed with Devotion</span>
            <span className="text-white text-sm">❤</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
