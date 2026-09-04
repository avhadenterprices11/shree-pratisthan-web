import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import Footer from "@/components/home/footer";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const headingFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sansFont.variable} ${headingFont.variable}`}
    >
      <body className="min-h-full flex flex-col relative">
        <ScrollProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
