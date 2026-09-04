"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, PhoneCall, Building2, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Registered Head Office",
    details: [
      "Shree Pratishtan Mandal,",
      "Indira Nagar,",
      "Nashik, MH - 422009",
    ],
    icon: MapPin,
  },
  {
    title: "Administrative Coordinates",
    details: [
      "Inquiries: Info@shreepratishthan.com",
      "Helpline: +91 9922786608",
      "WhatsApp: +91 9922786608",
    ],
    icon: PhoneCall,
  },
  {
    title: "Registered Trust Entity",
    details: [
      "कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था",
      "Indira Nagar, Nashik",
      "Bank: Samarth Sahakari Bank",
    ],
    icon: Building2,
  },
  {
    title: "Trust Registrations & Motto",
    details: [
      "Reg No: nashik/0000153/2018",
      "Founder: ॲड श्याम धर्मराज बडोदे",
      "वारसा संस्कृतीचा, ध्यास समाजसेवेचा",
    ],
    icon: ShieldCheck,
  },
];

export default function ContactInformation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Official Contact Directory
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARDS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="info-card glass-panel group p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div>
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron/10 to-saffron/5 border border-saffron/20 flex items-center justify-center text-saffron group-hover:scale-110 group-hover:border-saffron/40 group-hover:shadow-md group-hover:shadow-saffron/10 transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5">
                    {item.details.map((line, idx) => {
                      if (line.includes("Info@shreepratishthan.com")) {
                        return (
                          <p key={idx} className="text-sm text-slate-grey font-medium leading-relaxed">
                            Email:{" "}
                            <a
                              href="mailto:Info@shreepratishthan.com"
                              className="text-saffron font-bold hover:underline"
                            >
                              Info@shreepratishthan.com
                            </a>
                          </p>
                        );
                      }
                      if (line.includes("+91 9922786608")) {
                        const isWhatsApp = line.toLowerCase().includes("whatsapp");
                        return (
                          <p key={idx} className="text-sm text-slate-grey font-medium leading-relaxed">
                            {isWhatsApp ? "WhatsApp: " : "Helpline: "}
                            <a
                              href={isWhatsApp ? "https://wa.me/919922786608" : "tel:+919922786608"}
                              target={isWhatsApp ? "_blank" : undefined}
                              rel={isWhatsApp ? "noopener noreferrer" : undefined}
                              className="text-saffron font-bold hover:underline"
                            >
                              +91 9922786608
                            </a>
                          </p>
                        );
                      }
                      return (
                        <p key={idx} className="text-sm text-slate-grey font-medium leading-relaxed">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 text-[10px] text-saffron uppercase font-bold tracking-widest">
                  Official Directory
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
