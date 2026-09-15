import { EventItem } from "@/lib/events-data";
import { Language } from "@/context/LanguageContext";

/**
 * Returns localized event content based on active language (en, mr, hi)
 */
export function getLocalizedEvent(rawEvent: EventItem, language: Language): EventItem {
  if (!rawEvent) return rawEvent;

  // If translations or localization is needed, map accordingly; otherwise return rawEvent with all properties preserved
  return {
    ...rawEvent,
    title: rawEvent.title,
    description: rawEvent.description,
    categoryLabel: rawEvent.categoryLabel,
    date: rawEvent.date,
    time: rawEvent.time,
    location: rawEvent.location,
  };
}
