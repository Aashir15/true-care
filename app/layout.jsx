import { Hind } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReferralTracker from "@/components/ReferralTracker";

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://trucaredealer.com"),

  title: {
    default: "TruCare Protection | Protection Plans & Service Solutions",
    template: "%s | TruCare Protection",
  },

  description:
    "TruCare Protection provides protection plans and service solutions for appliances, electronics, furniture, and other eligible products.",

  keywords: [
    "TruCare Protection",
    "protection plans",
    "appliance protection",
    "electronics protection",
    "furniture protection",
    "extended protection plans",
    "product protection plans",
    "service plans",
  ],

  authors: [
    {
      name: "TruCare Protection",
    },
  ],

  creator: "TruCare Protection",
  publisher: "TruCare Protection",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TruCare Protection | Protection Plans & Service Solutions",
    description:
      "Protection plans and service solutions designed to give customers confidence when the unexpected happens.",
    url: "https://trucaredealer.com",
    siteName: "TruCare Protection",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/trucare-og.webp",
        width: 1200,
        height: 630,
        alt: "TruCare Protection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TruCare Protection | Protection Plans & Service Solutions",
    description:
      "Protection plans and service solutions designed for everyday unexpected product issues.",
    images: ["/assets/trucare-og.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hind.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
          <ReferralTracker />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}