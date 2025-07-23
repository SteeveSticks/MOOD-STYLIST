import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Halamd | AI Mood Stylist",
    template: "%s - Halamd",
  },
  description:
    "Discover the perfect outfit for your mood with our AI-powered fashion app. Get personalized clothing suggestions based on your gender and emotions. Stylish, modern, and tailored just for you — fashion meets AI!",
  twitter: {
    card: "summary_large_image",
    title: "Halamd | AI Mood Stylist",
    description:
      "Discover the perfect outfit for your mood with our AI-powered fashion app. Get personalized clothing suggestions based on your gender and emotions. Stylish, modern, and tailored just for you — fashion meets AI!",
    creator: "@AdebanjoSt63916",
    images: ["https://halamdcom.vercel.app/img/AIMoodLogo.jpg"],
  },
  keywords: [
    "AI outfit generator",
    "mood-based outfit suggestions",
    "AI fashion stylist",
    "personalized outfit ideas",
    "outfit recommender app",
    "AI clothing recommendations",
    "virtual fashion assistant",
    "dress for your mood app",
    "mood fashion AI",
    "AI wardrobe planner",
    "Adebanjo Stephen",
  ],
  authors: [{ name: "Adebanjo Stephen" }],
  creator: "Adebanjo Stephen",
  publisher: "Adebanjo Stephen",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "img/AIMoodLogo.jpg",
    shortcut: "img/AIMoodLogo.jpg",
    apple: "img/AIMoodLogo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://halamdcom.vercel.app/",
    siteName: "Halamd | AI Mood Stylist",
    title: "Halamd | AI Mood Stylist",
    description:
      "Discover the perfect outfit for your mood with our AI-powered fashion app. Get personalized clothing suggestions based on your gender and emotions. Stylish, modern, and tailored just for you — fashion meets AI!",
    images: [
      {
        url: "https://halamdcom.vercel.app/img/AIMoodLogo.jpg",
        width: 1200,
        height: 630,
        alt: "Halamd | AI Mood Stylist",
      },
    ],
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
    google: "google1e2a135e5d17db61.html",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Halamd | AI Mood Stylist",
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AI Mood Stylist",
      description:
        "AI Mood Stylist helps you choose the perfect outfit based on your mood and gender. Smart, stylish, and tailored just for you.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "All",
      url: "https://halamdcom.vercel.app/",
      offers: {
        "@type": "Offer",
        price: "0", // if it's free
        priceCurrency: "USD",
      },
    }),
  }}
/>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased min-h-screen w-full relative text-gray-800 font-mono`}
      >
        {/* Circuit Board - Light Pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
          }}
        />
        <div>
          <div>
            <Header />
          </div>
          {children}
          <SpeedInsights />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
