import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community & Social Welfare | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Explore Shree Pratishtan's community initiatives: 50+ blood donation camps, free health diagnostics, tree plantation, and educational support in Indira Nagar, Nashik by कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था (Reg: nashik/0000153/2018).",
  openGraph: {
    title: "Community & Social Welfare | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Blood donation drives, health camps, tree plantation, and welfare initiatives in Indira Nagar, Nashik.",
    url: "https://www.shreepratishthan.org/community",
    images: [{ url: "/community_assembly.png", width: 1200, height: 630, alt: "Community Welfare by Shree Pratishtan" }],
  },
  twitter: {
    title: "Community & Social Welfare | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Blood donation, health camps, tree plantation, and welfare support in Indira Nagar, Nashik.",
    images: ["/community_assembly.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/community" },
};

import CommunityHero from "@/components/community/hero";
import CommunityMission from "@/components/community/mission";
import CommunityInitiatives from "@/components/community/initiatives";
import BloodDonation from "@/components/community/blood-donation";
import TreePlantation from "@/components/community/tree-plantation";
import CharitySocialWork from "@/components/community/charity-social-work";
import CommunityImpact from "@/components/community/impact";
import SuccessStories from "@/components/community/success-stories";
import JoinMission from "@/components/community/join-mission";

export default function CommunityPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <CommunityHero />

      {/* 2. Philosophy & Mission Statement */}
      <CommunityMission />

      {/* 3. Focus Initiatives Cards Grid */}
      <CommunityInitiatives />

      {/* 4. Blood Donation Campaigns Detail Section */}
      <BloodDonation />

      {/* 5. Tree Plantation & Environmental Section */}
      <TreePlantation />

      {/* 6. Charity & Material Social Work Section */}
      <CharitySocialWork />

      {/* 7. Live Metrics Counter Grid */}
      <CommunityImpact />

      {/* 8. Success Stories Slider/Carousel */}
      <SuccessStories />

      {/* 9. Volunteer Joining Onboarding CTA */}
      <JoinMission />
    </main>
  );
}
