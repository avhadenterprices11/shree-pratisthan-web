import React from "react";
import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/hero";
import FeaturedMemories from "@/components/gallery/featured-memories";
import PhotoGallery from "@/components/gallery/photo-gallery";
import VideoGallery from "@/components/gallery/video-gallery";
import ShareMemoriesCTA from "@/components/gallery/share-memories-cta";

export const metadata: Metadata = {
  title: "Media Gallery",
  description:
    "Browse Shree Pratishtan's photographic and video records: Shree Ganeshotsav, Gudipadwa Swagat Yatra, Navratri Garba, 50+ blood donation camps, and youth sports in Indira Nagar, Nashik.",
  openGraph: {
    title: "Media Gallery | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Photographic records: Shree Ganeshotsav, Gudipadwa Swagat Yatra, Navratri Garba, 50+ blood donation camps, and youth sports in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.com/gallery",
    images: [{ url: "/gallery_navratri_garba.png", width: 1200, height: 630, alt: "Shree Pratishtan Gallery" }],
  },
  twitter: {
    title: "Media Gallery | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Photographic records: Shree Ganeshotsav, Gudipadwa Swagat Yatra, 50+ blood donation camps, and sports in Indira Nagar, Nashik.",
    images: ["/gallery_navratri_garba.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-transparent">
      {/* 1. Hero Landing Block */}
      <GalleryHero />

      {/* 2. Iconic Showcase */}
      <FeaturedMemories />

      {/* 3. Filtered Photo Masonry Grid with Filters */}
      <PhotoGallery />

      {/* 4. Video Reels & Lightbox */}
      <VideoGallery />

      {/* 5. Image Upload Call-out */}
      <ShareMemoriesCTA />
    </main>
  );
}
