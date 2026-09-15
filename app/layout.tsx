import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import Footer from "@/components/home/footer";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const eyebrowFont = Outfit({
  subsets: ["latin"],
  variable: "--font-eyebrow",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const BASE_URL = "https://www.shreepratishthan.org";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Shree Prathishthan | Cultural Heritage & Social Welfare Trust",
    template: "%s | Shree Prathishthan",
  },
  description:
    "Experience the legacy of Maharashtra. Shree Prathishthan organizes grand Ganeshotsav celebrations, Dahi Handi, medical camps, tree plantation drives, and rural support initiatives.",
  keywords: [
    "Shree Prathishthan",
    "Ganeshotsav",
    "Dahi Handi",
    "Maharashtra cultural trust",
    "NGO Pune",
    "volunteer Maharashtra",
    "social welfare trust",
    "Navratri",
  ],
  authors: [{ name: "Shree Prathishthan Trust" }],
  creator: "Shree Prathishthan Trust",
  publisher: "Shree Prathishthan Trust",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Shree Prathishthan",
    title: "Shree Prathishthan | Cultural Heritage & Social Welfare Trust",
    description:
      "Experience the legacy of Maharashtra. Grand festivals, medical camps, and rural support drives since 1994.",
    images: [
      {
        url: "/hero_ganesh.png",
        width: 1200,
        height: 630,
        alt: "Shree Prathishthan — Ganeshotsav Celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Prathishthan | Cultural Heritage & Social Welfare Trust",
    description:
      "Experience the legacy of Maharashtra. Grand festivals, medical camps, and rural support drives.",
    images: ["/hero_ganesh.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${sansFont.variable} ${headingFont.variable} ${eyebrowFont.variable}`}
    >
      <body className="min-h-full flex flex-col relative bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProvider>
              <CustomCursor />
              <Navbar />
              {children}
              <Footer />
            </ScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
