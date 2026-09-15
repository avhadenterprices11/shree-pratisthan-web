import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryItem } from "../gallery-data";
import { ArrowLeft, Calendar, Tag, Info, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    return {
      title: "Gallery Item Not Found",
    };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: `${item.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: item.description,
      url: `https://www.shreepratishthan.com/gallery/${item.id}`,
      images: [{ url: item.src, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: item.description,
      images: [item.src],
    },
  };
}

import GalleryDetailContent from "@/components/gallery/gallery-detail-content";

export default async function GalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    notFound();
  }

  return <GalleryDetailContent item={item} />;
}
