"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Shree Ganeshotsav Celebrations",
    tag: "Ganeshotsav",
    image: "/ganeshotsav_2017_jaipur.jpg",
  },
  {
    title: "Gudipadwa Swagat Yatra",
    tag: "Swagat Yatra",
    image: "/swagat_yatra.jpg",
  },
  {
    title: "Navratri Garba & Dandiya",
    tag: "Navratri",
    image: "/navratri_2022.jpg",
  },
  {
    title: "Mass Blood Donation Drives",
    tag: "Health & Seva",
    image: "/gallery_dahi_handi_pyramids.png",
  },
  {
    title: "International Yoga Day Camps",
    tag: "Wellness",
    image: "/gallery_gauri_ganpati_decor.png",
  },
  {
    title: "Annual Cricket & Sports Leagues",
    tag: "Youth Sports",
    image: "/gallery_shiv_jayanti_rally.png",
  },
];

export default function GalleryPreview() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const itemsData = [
    {
      title: t("galleryPreview.i1Title"),
      tag: t("galleryPreview.i1Tag"),
      image: "/ganeshotsav_2017_jaipur.jpg",
    },
    {
      title: t("galleryPreview.i2Title"),
      tag: t("galleryPreview.i2Tag"),
      image: "/swagat_yatra.jpg",
    },
    {
      title: t("galleryPreview.i3Title"),
      tag: t("galleryPreview.i3Tag"),
      image: "/navratri_2022.jpg",
    },
    {
      title: t("galleryPreview.i4Title"),
      tag: t("galleryPreview.i4Tag"),
      image: "/gallery_dahi_handi_pyramids.png",
    },
    {
      title: t("galleryPreview.i5Title"),
      tag: t("galleryPreview.i5Tag"),
      image: "/gallery_gauri_ganpati_decor.png",
    },
    {
      title: t("galleryPreview.i6Title"),
      tag: t("galleryPreview.i6Tag"),
      image: "/gallery_shiv_jayanti_rally.png",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Reveal header texts and link (desktop & tablet)
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".gallery-reveal-header",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );

        // 2. Desktop curved path entry animation
        const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
        items.forEach((item, index) => {
          const col = index % 3;
          let startProps = {};

          if (col === 0) {
            startProps = { x: -80, y: 50, rotation: -6, opacity: 0 };
          } else if (col === 1) {
            startProps = { x: 0, y: 80, scale: 0.95, opacity: 0 };
          } else {
            startProps = { x: 80, y: 50, rotation: 6, opacity: 0 };
          }

          gsap.fromTo(
            item,
            startProps,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
                end: "top 65%",
                scrub: 1,
              }
            }
          );
        });
      });

      // 3. Mobile clean entrance (guaranteed 100% visible, zero blank screens)
      mm.add("(max-width: 767px)", () => {
        gsap.set(".gallery-reveal-header, .gallery-item", {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger after DOM renders & images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleResizeOrScroll = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResizeOrScroll, { passive: true });

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-2 sm:pt-6 md:pt-12 pb-10 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background z-20 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 sm:mb-10 md:mb-14 gap-3 sm:gap-6">
          <div className="max-w-2xl">
            <h2 className="gallery-reveal-header text-2xl sm:text-3xl md:text-[36px] font-normal text-foreground tracking-tight font-heading leading-snug py-1">
              {t("galleryPreview.title")}
            </h2>
          </div>
          <a
            href="/gallery"
            className="gallery-reveal-header group inline-flex items-center gap-2 text-saffron font-bold uppercase text-xs sm:text-sm tracking-widest hover:text-gold transition-colors font-sans cursor-pointer"
            data-hover="pointer"
          >
            {t("galleryPreview.viewAll")}
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
          </a>
        </div>

        {/* Bento/Masonry-inspired dynamic grid */}
        <div ref={gridRef} className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {itemsData.map((item, index) => {
            const isTall = index === 1 || index === 4;
            return (
              <div
                key={index}
                className={`gallery-item group relative overflow-hidden rounded-2xl sm:rounded-block border border-saffron/10 dark:border-white/10 shadow-md ${
                  isTall ? "lg:row-span-2 min-h-[240px] sm:min-h-[360px]" : "min-h-[200px] sm:min-h-[260px]"
                } flex flex-col justify-between p-4 sm:p-7 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_20px_50px_rgba(226,88,34,0.15)] hover:border-saffron/30`}
              >
                {/* Full-bleed Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={index < 2}
                />

                {/* Ambient Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-all duration-500 group-hover:via-black/50 group-hover:to-black/20" />

                {/* Category Tag */}
                <div className="relative z-20 self-start bg-white/95 dark:bg-[#18181b]/95 text-saffron font-bold text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-saffron/20 dark:border-white/10 shadow-md font-sans">
                  {item.tag}
                </div>

                {/* Title & Interactive Underline */}
                <div className="relative z-20 mt-auto">
                  <h3 className="text-base sm:text-xl md:text-2xl font-normal text-white tracking-tight leading-tight font-heading group-hover:text-gold transition-colors duration-300 flex flex-col gap-1 sm:gap-1.5">
                    {item.title}
                    <span className="w-0 h-[2px] bg-gold transition-all duration-500 ease-out group-hover:w-16" />
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


