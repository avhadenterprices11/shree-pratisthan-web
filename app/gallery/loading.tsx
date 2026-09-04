import React from "react";

export default function GalleryLoading() {
  return (
    <div
      className="min-h-screen bg-[#FBFBFA] pt-24 pb-16 px-6"
      role="status"
      aria-label="Loading gallery"
    >
      {/* Hero skeleton */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <div className="h-12 rounded-xl bg-slate-200/70 animate-pulse w-2/3 mx-auto" />
        <div className="h-4 rounded-lg bg-slate-200/50 animate-pulse w-1/2 mx-auto" />
        <div className="w-12 h-1 bg-saffron/20 mx-auto rounded-full animate-pulse" />
      </div>

      {/* Filter pills skeleton */}
      <div className="flex justify-center gap-3 mb-10" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 rounded-full bg-slate-200/60 animate-pulse" />
        ))}
      </div>

      {/* Photo grid skeleton — bento layout mimicking the real grid */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-5 justify-center" aria-hidden="true">
        {[
          "w-full sm:w-[calc(33%-12px)] aspect-[4/3]",
          "w-full sm:w-[calc(66%-12px)] aspect-[16/7]",
          "w-full sm:w-[calc(33%-12px)] aspect-[4/3]",
          "w-full sm:w-[calc(33%-12px)] aspect-[4/3]",
          "w-full sm:w-[calc(33%-12px)] aspect-[4/3]",
          "w-full sm:w-[calc(66%-12px)] aspect-[16/7]",
        ].map((classes, i) => (
          <div
            key={i}
            className={`${classes} rounded-2xl bg-slate-200/60 animate-pulse`}
          />
        ))}
      </div>
    </div>
  );
}
