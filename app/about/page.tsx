import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Discover the 20-year journey of Shree Pratishtan (कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था), Indira Nagar, Nashik. Founded in 2006 by 20 cricket enthusiasts, led by Adv. Shyam Dharmaraj Badode.",
  openGraph: {
    title: "About Us | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Our founding story from 2006 cricket roots, 20 founding pillars, bilingual vision, and leadership of Adv. Shyam Dharmaraj Badode in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.org/about",
    images: [{ url: "/about_showcase.png", width: 1200, height: 630, alt: "About Shree Pratishtan" }],
  },
  twitter: {
    title: "About Us | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Our founding story from 2006 cricket roots, 20 founding pillars, bilingual vision, and leadership of Adv. Shyam Dharmaraj Badode in Indira Nagar, Nashik.",
    images: ["/about_showcase.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/about" },
};

import AboutHero from "@/components/about/hero";
import AboutStory from "@/components/about/story";
import AboutVision from "@/components/about/vision";
import AboutMission from "@/components/about/mission";
import AboutValues from "@/components/about/values";
import AboutTimeline from "@/components/about/timeline";
import AboutCommittee from "@/components/about/committee";
import AboutAchievements from "@/components/about/achievements";
import AboutJoinCTA from "@/components/about/join-cta";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* 1. Hero Landing Block */}
      <AboutHero />

      {/* 2. Trust Founding Story */}
      <AboutStory />

      {/* 3. Vision statement */}
      <AboutVision />

      {/* 4. Mission statement */}
      <AboutMission />

      {/* 5. Values checklist */}
      <AboutValues />

      {/* 6. Milestones Vertical Progress Timeline */}
      <AboutTimeline />

      {/* 7. Committee Trustees Grid */}
      <AboutCommittee />

      {/* 8. Credentials & Achievements Panel */}
      <AboutAchievements />

      {/* 9. Join Onboarding Call-out */}
      <AboutJoinCTA />
    </main>
  );
}
