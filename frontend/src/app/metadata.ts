import { Metadata } from "next";
import { PROFILE_DATA } from "@/constants/profile";

/**
 * SEO Metadata 생성
 */
export const metadata: Metadata = {
  title: PROFILE_DATA.title,
  description: PROFILE_DATA.description,
  keywords: [...PROFILE_DATA.keywords],
  authors: [{ name: PROFILE_DATA.name, url: PROFILE_DATA.github }],
  creator: PROFILE_DATA.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://yourdomain.com",
    title: PROFILE_DATA.title,
    description: PROFILE_DATA.description,
    siteName: "Oh Sungwoo Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oh Sungwoo Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PROFILE_DATA.title,
    description: PROFILE_DATA.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};
