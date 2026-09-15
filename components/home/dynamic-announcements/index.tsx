"use client";

import React, { useEffect, useState } from "react";
import { Bell, Calendar, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface DynamicAnnouncement {
  id: string;
  type: "announcement" | "news" | "event_update" | "notice";
  title: string | { en?: string; mr?: string; hi?: string };
  content: string | { en?: string; mr?: string; hi?: string };
  category: string | { en?: string; mr?: string; hi?: string };
  date: string;
  priority?: "normal" | "high" | "urgent";
}

export default function DynamicAnnouncements() {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<DynamicAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/content");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("[DynamicAnnouncements] Error fetching updates:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || items.length === 0) {
    return null; // Silent if no dynamic announcements to preserve exact existing layout
  }

  // Pick primary featured announcement
  const featured = items[0];

  const getLocalized = (val: string | { en?: string; mr?: string; hi?: string } | undefined) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[language] || val.en || val.mr || "";
  };

  const categoryText = getLocalized(featured.category);
  const titleText = getLocalized(featured.title);
  const contentText = getLocalized(featured.content);

  return (
    <section className="relative z-20 w-full bg-charcoal/95 border-y border-saffron/20 py-4 px-4 sm:px-6 lg:px-8 shadow-inner overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-24 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Badge & Live Content */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron shrink-0">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
              {categoryText || "Notice"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-bold text-white font-sans truncate">
              {titleText}
            </h3>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <p className="text-xs text-neutral-300 font-sans line-clamp-1">
              {contentText}
            </p>
          </div>
        </div>

        {/* Right: Date & Manage Link */}
        <div className="flex items-center gap-4 shrink-0 self-end md:self-auto text-xs">
          <span className="text-neutral-400 flex items-center gap-1 text-[11px] font-sans">
            <Calendar className="w-3 h-3 text-saffron/70" />
            {featured.date}
          </span>

          <Link
            href="/admin/content"
            className="group inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-neutral-300 hover:text-white transition"
          >
            <Sparkles className="w-3 h-3 text-saffron" />
            <span>Admin Portal</span>
            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
