"use client";

import React from "react";
import VolunteerCTA from "@/components/ui/volunteer-cta";

export default function AllEventsCommunityCTA() {
  return (
    <VolunteerCTA
      title={
        <>
          Join the Cultural Legacy.<br />
          <span className="text-saffron">Be the Change.</span>
        </>
      }
      description="Direct event logistics, coordinate safety marshals, organize cultural festivals, or participate in 50+ blood donation camps. Shree Pratishtan channels your energy directly into community progress across Indira Nagar, Nashik."
      buttonText="Become a Volunteer / Organizer"
      buttonLink="/volunteer"
    />
  );
}
