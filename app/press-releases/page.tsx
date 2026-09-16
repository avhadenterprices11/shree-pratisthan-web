import React from "react";
import type { Metadata } from "next";
import PressReleasesClient from "@/components/press-releases";

export const metadata: Metadata = {
  title: "Press & Releases | Shree Pratisthan",
  description:
    "Official announcements, community updates, press releases, event coverage, and media resources from Shree Pratisthan (Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha), Indira Nagar, Nashik.",
  openGraph: {
    title: "Press & Releases | Shree Pratisthan",
    description:
      "Official press releases, community updates, event coverage, and media resources from Shree Pratisthan in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.com/press-releases",
    images: [
      {
        url: "/events_ganeshotsav_2024_jejuri.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Pratisthan Press & Releases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Releases | Shree Pratisthan",
    description:
      "Official announcements, press releases, and media highlights from Shree Pratisthan, Indira Nagar, Nashik.",
    images: ["/events_ganeshotsav_2024_jejuri.jpg"],
  },
  alternates: {
    canonical: "https://www.shreepratishthan.com/press-releases",
  },
};

export default function PressReleasesPage() {
  return (
    <main className="w-full min-h-screen bg-transparent">
      <PressReleasesClient />
    </main>
  );
}
