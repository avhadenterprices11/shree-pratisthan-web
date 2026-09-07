import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Shree Pratishtan (श्री प्रतिष्ठान). Reach our administrative office in Indira Nagar, Nashik for event collaborations, blood donation drives, sports leagues, CSR partnerships, or general support.",
  openGraph: {
    title: "Contact Us | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Reach our office in Indira Nagar, Nashik for event collaborations, blood donation drives, sports leagues, or general support.",
    url: "https://www.shreepratishthan.com/contact",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Contact Shree Pratishtan" }],
  },
  twitter: {
    title: "Contact Us | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Reach our office in Indira Nagar, Nashik for event collaborations, blood drives, or general support.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.com/contact" },
};

import ContactInformation from "@/components/contact/contact-information";
import CommitteeDirectory from "@/components/contact/committee-directory";
import ContactForm from "@/components/contact/contact-form";
import LocationMap from "@/components/contact/location-map";
import ContactSocialMedia from "@/components/contact/social-media";
import ContactSupportCTA from "@/components/contact/support-cta";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Addresses & Registration Codes Info */}
      <ContactInformation />

      {/* 2. Area Coordinators Telephone Directories */}
      <CommitteeDirectory />

      {/* 3. Active Messaging Intake Form */}
      <ContactForm />

      {/* 4. Styled HQ Geographic Coordinates */}
      <LocationMap />

      {/* 5. Social Channels Visual Grid */}
      <ContactSocialMedia />

      {/* 6. Action Guides Conversion Block */}
      <ContactSupportCTA />
    </main>
  );
}
