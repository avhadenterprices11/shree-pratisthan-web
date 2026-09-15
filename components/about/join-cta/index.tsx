"use client";

import VolunteerCTA from "@/components/ui/volunteer-cta";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutJoinCTA() {
  const { t } = useLanguage();

  return (
    <VolunteerCTA
      title={
        <>
          {t("aboutPage.joinCTA.titlePart1")}<br />
          <span className="text-saffron">{t("aboutPage.joinCTA.titlePart2")}</span>
        </>
      }
      description={t("aboutPage.joinCTA.description")}
      buttonText={t("aboutPage.joinCTA.button")}
      buttonLink="/volunteer"
    />
  );
}
