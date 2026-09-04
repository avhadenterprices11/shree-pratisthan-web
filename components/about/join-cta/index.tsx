"use client";

import VolunteerCTA from "@/components/ui/volunteer-cta";

export default function AboutJoinCTA() {
  return (
    <VolunteerCTA
      title={
        <>
          Help Us Write the<br />
          <span className="text-saffron">Next Chapter</span>
        </>
      }
      description="Join our 100+ active members and volunteer network in Indira Nagar, Nashik to celebrate culture, empower youth, and drive social progress."
      buttonText="Sign Up As Volunteer"
      buttonLink="/volunteer"
    />
  );
}
