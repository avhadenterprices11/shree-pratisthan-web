"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import GalleryFilters from "../gallery-filters";

import { PHOTO_ITEMS } from "@/app/gallery/gallery-data";

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  // Stagger grid item updates on category or pagination changes
  useEffect(() => {
    gsap.fromTo(
      ".photo-card-row",
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" }
    );
  }, [activeCategory, visibleCount]);

  const filteredPhotos = activeCategory === "all" 
    ? PHOTO_ITEMS 
    : PHOTO_ITEMS.filter(p => p.category === activeCategory);

  const displayedPhotos = filteredPhotos.slice(0, visibleCount);

  // Helper to determine width and aspect ratio classes for each photo card
  const getCardLayout = (index: number, totalCount: number) => {
    if (totalCount <= 3) {
      return {
        widthClass: "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]",
        aspectClass: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]"
      };
    }

    const isWide = index === 1 || index === 5 || index === 8;

    if (isWide) {
      return {
        widthClass: "w-full sm:w-full lg:w-[calc(66.666%-16px)]",
        aspectClass: "aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/7]"
      };
    }

    return {
      widthClass: "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]",
      aspectClass: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]"
    };
  };

  return (
    <section 
      ref={gridRef}
      id="photo-gallery"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Our Photographic Records
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters below heading */}
        <div className="mb-12">
          <GalleryFilters 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {/* Photo Grid (Flex Bento Layout) */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[1600px] w-full mx-auto">
          {displayedPhotos.map((item, index) => {
            const layout = getCardLayout(index, displayedPhotos.length);
            return (
              <Link 
                href={`/gallery/${item.id}`}
                key={item.id || index}
                className={`photo-card-row group relative overflow-hidden rounded-block border border-saffron/10 shadow-md flex flex-col justify-between p-6 transition-all duration-500 hover:shadow-2xl cursor-pointer ${layout.widthClass} ${layout.aspectClass}`}
              >
                {/* Background Image */}
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                />

                {/* Ambient Dark/Saffron Gradient Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:via-black/45 transition-all duration-300 z-10" />

                {/* Tag */}
                <div className="relative z-20 self-start bg-white/90 text-saffron font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm">
                  {item.category}
                </div>

                {/* Narrative label */}
                <div className="relative z-20 mt-auto translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight font-heading">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Load More Button */}
        {visibleCount < filteredPhotos.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-saffron hover:bg-saffron/90 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer"
            >
              Load More Photos ({filteredPhotos.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
