import { GalleryItem } from "@/app/gallery/gallery-data";
import { Language } from "@/context/LanguageContext";

export interface VideoItem {
  title: string;
  category: string;
  duration: string;
  src: string;
  thumbnail: string;
  poster?: string;
  location?: string;
}

export const VIDEO_ITEMS: VideoItem[] = [
  {
    title: "Ganeshotsav Maha Aarti & Live Visarjan Miravnuk",
    category: "Festivals",
    duration: "4:30",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/events_ganeshotsav_2024_jejuri.jpg",
    poster: "/events_ganeshotsav_2024_jejuri.jpg",
    location: "Nashik Ground",
  },
  {
    title: "Gudipadwa Bhavya Swagat Yatra & Lezim Troupes",
    category: "Swagat Yatra",
    duration: "3:45",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/events_swagat_yatra_2022.jpg",
    poster: "/events_swagat_yatra_2022.jpg",
    location: "Indira Nagar",
  },
  {
    title: "50+ Blood Donation Drive & Civil Hospital Lifeline",
    category: "Social Seva",
    duration: "2:50",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/volunteer_hero.jpg",
    poster: "/volunteer_hero.jpg",
    location: "Nashik Civil Hospital",
  },
  {
    title: "Mahashivratri 108-ft Mahamrutyunjay Mandir Darshan",
    category: "Festivals",
    duration: "5:15",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/mahashivratri.jpg",
    poster: "/images/mahashivratri.jpg",
    location: "Nashik",
  },
];

export function getLocalizedGalleryItem(rawItem: GalleryItem, language: Language): GalleryItem {
  if (!rawItem) return rawItem;
  return {
    ...rawItem,
    title: rawItem.title,
    description: rawItem.description,
    details: rawItem.details,
    category: rawItem.category,
  };
}

export function getLocalizedVideos(language: Language): VideoItem[] {
  return VIDEO_ITEMS;
}
