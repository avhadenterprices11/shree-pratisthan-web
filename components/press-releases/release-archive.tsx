"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Calendar, ArrowRight, Filter, Tag, RotateCcw } from "lucide-react";
import { PressRelease, PressCategory, PRESS_CATEGORIES } from "@/lib/press-data";

interface ReleaseArchiveProps {
  releases: PressRelease[];
  onReadRelease: (release: PressRelease) => void;
}

export default function ReleaseArchive({ releases, onReadRelease }: ReleaseArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<PressCategory>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(releases.map((r) => r.year.toString())));
    return ["All", ...years.sort((a, b) => Number(b) - Number(a))];
  }, [releases]);

  // Real-time filtering logic
  const filteredReleases = useMemo(() => {
    return releases.filter((release) => {
      // Category match
      const categoryMatch =
        selectedCategory === "All" || release.category === selectedCategory;

      // Year match
      const yearMatch =
        selectedYear === "All" || release.year.toString() === selectedYear;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        release.title.toLowerCase().includes(query) ||
        release.summary.toLowerCase().includes(query) ||
        release.category.toLowerCase().includes(query) ||
        release.location.toLowerCase().includes(query);

      return categoryMatch && yearMatch && searchMatch;
    });
  }, [releases, selectedCategory, selectedYear, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedYear("All");
    setSearchQuery("");
  };

  return (
    <section id="press-archive" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative bg-transparent">
      <div className="max-w-[1400px] w-auto mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-neutral-200 dark:border-white/10 pb-6 sm:pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-saffron" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-saffron font-sans">
                OFFICIAL COMMUNIQUES &amp; ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              Press Releases
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans max-w-xl">
              Explore previous official announcements, statements, and community updates issued by Shree Pratisthan.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search releases..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-[#161619] border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-saffron/80 focus:ring-1 focus:ring-saffron/40 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Controls: Category Pills & Year Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {PRESS_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-sans ${
                    isActive
                      ? "bg-saffron text-white shadow-md shadow-saffron/20 border border-saffron"
                      : "bg-white/60 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Year Filter Dropdown & Match Count */}
          <div className="flex items-center gap-4 shrink-0 text-xs font-sans text-neutral-500 dark:text-neutral-400 self-end lg:self-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-saffron" />
              <span>Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white dark:bg-[#161619] border border-neutral-300 dark:border-white/10 rounded-lg px-2.5 py-1 text-neutral-800 dark:text-neutral-200 text-xs focus:outline-none focus:border-saffron cursor-pointer"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year === "All" ? "All Years" : year}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[11px] text-neutral-400">
              Showing {filteredReleases.length} {filteredReleases.length === 1 ? "release" : "releases"}
            </span>
          </div>

        </div>

        {/* Releases Cards Grid */}
        {filteredReleases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredReleases.map((release) => (
              <article
                key={release.id}
                className="group flex flex-col justify-between rounded-2xl sm:rounded-block overflow-hidden bg-white/70 dark:bg-[#121214] border border-neutral-200 dark:border-white/10 hover:border-saffron/40 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md"
              >
                {/* Card Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={release.image}
                    alt={release.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-saffron border border-saffron/30 font-sans">
                      {release.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-white/80 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-saffron" />
                    <span>{release.date}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-heading font-medium tracking-tight text-neutral-900 dark:text-white leading-snug group-hover:text-saffron transition-colors duration-200 line-clamp-2">
                      {release.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed line-clamp-3">
                      {release.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => onReadRelease(release)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-saffron hover:text-saffron/80 group-hover:translate-x-1 transition-all duration-200 cursor-pointer font-sans"
                    >
                      <span>Read Release</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[10px] text-neutral-400 font-sans">
                      Indira Nagar
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 sm:py-24 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-white/10 p-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-medium text-neutral-900 dark:text-white">
              No press releases match your filter
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans max-w-md mx-auto">
              We couldn&apos;t find any releases matching your current search query or category filters. Try adjusting your parameters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-saffron transition-colors cursor-pointer font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
