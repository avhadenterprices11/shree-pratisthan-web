"use client";

import React, { useEffect, useRef, useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { ChevronDown, Send, Check, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SUBJECT_OPTIONS = [
  "General Inquiry / Support",
  "Volunteer Registration",
  "Blood Donation & Health Camps",
  "Sports & Event Participation",
];

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-slide-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }
    if (!message.trim()) {
      newErrors.message = "Please type a message";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 contact-slide-in">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-8 font-heading">
              Get in Touch
            </h2>
            <p className="text-base text-slate-grey leading-relaxed mb-8">
              Have questions regarding our cultural celebrations, blood donation drives, sports leagues, or volunteering? Reach out to our central administrative desk in Indira Nagar, Nashik.
            </p>

            <div className="space-y-6">
              {/* Telephone */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Helpline Phone</span>
                  <span className="text-base font-extrabold text-foreground font-heading">+91 9922786608</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Administrative Mail</span>
                  <span className="text-base font-extrabold text-foreground font-heading">Info@shreepratishthan.com</span>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Headquarters Office</span>
                  <span className="text-base font-extrabold text-foreground font-heading">Indira Nagar, Nashik, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 contact-slide-in glass-panel p-8 sm:p-10 rounded-block border border-saffron/20 bg-white/90 backdrop-blur-md shadow-xl">
            <h3 className="text-2xl font-extrabold text-foreground mb-6 font-heading">Send a Message</h3>

            {status === "success" ? (
              <div className="py-8 px-6 text-center space-y-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-emerald-950 font-heading">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you <strong>{name}</strong>! We have received your inquiry under subject <strong>&quot;{selectedSubject}&quot;</strong>. Our desk will email you at <strong>{email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2 font-heading">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-interactive border bg-background/80 focus:outline-none focus:ring-2 text-sm transition-all ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-saffron/20 focus:border-saffron focus:ring-saffron/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2 font-heading">Your Email</label>
                    <input 
                      type="text" 
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-interactive border bg-background/80 focus:outline-none focus:ring-2 text-sm transition-all ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-saffron/20 focus:border-saffron focus:ring-saffron/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Premium Custom Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2 font-heading">Subject</label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-interactive border border-saffron/25 bg-background/80 hover:bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-sm text-foreground flex items-center justify-between transition-all cursor-pointer shadow-xs"
                  >
                    <span className="font-medium">{selectedSubject}</span>
                    <ChevronDown className={`w-4 h-4 text-saffron transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-saffron/25 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {SUBJECT_OPTIONS.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSelectedSubject(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                            selectedSubject === option
                              ? "bg-saffron/10 text-saffron font-bold"
                              : "text-foreground hover:bg-saffron/5"
                          }`}
                        >
                          <span>{option}</span>
                          {selectedSubject === option && <Check className="w-4 h-4 text-saffron" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2 font-heading">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Type message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-interactive border bg-background/80 focus:outline-none focus:ring-2 text-sm transition-all resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-saffron/20 focus:border-saffron focus:ring-saffron/20"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <LiquidMetalButton
                    type="submit"
                    variant="themed"
                    size="lg"
                    disabled={status === "submitting"}
                    icon={status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    className="w-full text-xs uppercase font-extrabold tracking-widest font-heading cursor-pointer disabled:opacity-70"
                    data-hover="pointer"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </LiquidMetalButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
