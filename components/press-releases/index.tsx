"use client";

import React, { useState } from "react";
import PressHero from "./hero";
import FeaturedRelease from "./featured-release";
import ReleaseArchive from "./release-archive";
import CommunityHighlights from "./community-highlights";
import OfficialStatements from "./official-statements";
import PressContact from "./press-contact";
import ReleaseModal from "./release-modal";
import { PRESS_RELEASES, PressRelease, OfficialAnnouncement } from "@/lib/press-data";

export default function PressReleasesClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRelease, setActiveRelease] = useState<PressRelease | null>(null);
  const [activeAnnouncement, setActiveAnnouncement] = useState<OfficialAnnouncement | null>(null);

  const featuredRelease = PRESS_RELEASES.find((r) => r.isFeatured) || PRESS_RELEASES[0];

  const handleOpenReleaseModal = (release: PressRelease) => {
    setActiveAnnouncement(null);
    setActiveRelease(release);
    setModalOpen(true);
  };

  const handleOpenAnnouncementModal = (announcement: OfficialAnnouncement) => {
    setActiveRelease(null);
    setActiveAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveRelease(null);
    setActiveAnnouncement(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent">
      {/* 1. HERO — PRESS & RELEASES */}
      <PressHero />

      {/* 2. FEATURED / LATEST RELEASE */}
      <FeaturedRelease
        release={featuredRelease}
        onReadFullRelease={handleOpenReleaseModal}
      />

      {/* 3. PRESS RELEASE ARCHIVE */}
      <ReleaseArchive
        releases={PRESS_RELEASES}
        onReadRelease={handleOpenReleaseModal}
      />

      {/* 4. EVENT & COMMUNITY HIGHLIGHTS */}
      <CommunityHighlights />

      {/* 5. OFFICIAL STATEMENTS / ANNOUNCEMENTS */}
      <OfficialStatements
        onSelectAnnouncement={handleOpenAnnouncementModal}
      />

      {/* 6. MEDIA / PRESS CONTACT */}
      <PressContact />

      {/* Interactive Modal Reader */}
      <ReleaseModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        release={activeRelease}
        announcement={activeAnnouncement}
      />
    </div>
  );
}
