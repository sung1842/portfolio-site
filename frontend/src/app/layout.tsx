import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost } from "next/font/google";
import { PROFILE_DATA } from "@/constants/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ["latin"],
});

/**
 * SEO Metadata
 */
export const metadata: Metadata = {
  title: {
    template: `%s | ${PROFILE_DATA.name}`,
    default: PROFILE_DATA.title,
  },
  description: PROFILE_DATA.description,
  keywords: [...PROFILE_DATA.keywords],
  authors: [{ name: PROFILE_DATA.name, url: PROFILE_DATA.github }],
  creator: PROFILE_DATA.name,
  metadataBase: new URL("https://portfolio-site-alpha-umber.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: PROFILE_DATA.title,
    description: PROFILE_DATA.description,
    siteName: `${PROFILE_DATA.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: PROFILE_DATA.title,
    description: PROFILE_DATA.description,
    creator: `@${PROFILE_DATA.name.toLowerCase().replace(/\s/g, "")}`,
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
    // google: "your-google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jost.className} m-0 p-0 antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}
