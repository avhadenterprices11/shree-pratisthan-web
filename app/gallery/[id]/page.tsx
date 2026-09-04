import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryItem } from "../gallery-data";
import { ArrowLeft, Calendar, Tag, Info, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    return {
      title: "Gallery Item Not Found",
    };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: `${item.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: item.description,
      url: `https://www.shreepratishthan.com/gallery/${item.id}`,
      images: [{ url: item.src, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: item.description,
      images: [item.src],
    },
  };
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen py-28 px-6 md:px-12 relative overflow-hidden bg-transparent">
      {/* Decorative ambient backgrounds */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-1/3 opacity-60" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        {/* Navigation Link back */}
        <div className="mb-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-saffron hover:text-saffron/85 font-extrabold text-xs uppercase tracking-widest transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </Link>
        </div>

        {/* Details Wrapper */}
        <div className="glass-panel p-6 sm:p-12 rounded-block border border-saffron/20 relative overflow-hidden bg-white/75 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-block border border-saffron/10 shadow-lg bg-neutral-100">
              <Image
                src={item.src}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-5 space-y-6">
              {/* Header section tags */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-slate-200/60 shadow-sm">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                {item.metric && (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-amber-200/50 shadow-sm">
                    <Award className="w-3 h-3" />
                    {item.metric}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight font-heading">
                {item.title}
              </h1>

              {/* Description quote block */}
              <div className="flex gap-3 border-l-4 border-saffron pl-4 py-1">
                <p className="text-base sm:text-lg font-bold text-slate-800 italic leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Event overview detailed text */}
              <div className="border-t border-saffron/10 pt-6">
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground font-heading mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-saffron" />
                  Event Overview & Impact
                </h2>
                <p className="text-sm sm:text-base text-slate-grey leading-relaxed whitespace-pre-line">
                  {item.details}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
