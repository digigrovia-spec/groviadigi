import "../index.css";
import { Inter, Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { LoadingScreen } from "@/components/ui/loading-screen";

// ─── Analytics & Verification ────────────────────────────────────────────────
// TODO: Replace with your real GA4 Measurement ID (e.g. G-XXXXXXXXXX)
// Get it from: GA4 → Admin → Data Streams → your stream → Measurement ID
const GA_MEASUREMENT_ID = "G-H95KS7EC5W"; // ← PASTE YOUR ID HERE

// TODO: Replace with your Google Search Console verification code
// Get it from: GSC → Add Property → HTML tag → content="..."
const GSC_VERIFICATION = "_2MQEmNn4y1i7-R2yNfKDM26P_gi1gtdobumv3BVdFg"; // ← PASTE YOUR CODE HERE
// ─────────────────────────────────────────────────────────────────────────────


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500"],
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["800", "900"],
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["italic"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["500"],   // font-mono-tag only uses font-weight: 500
});


export const metadata = {
  metadataBase: new URL("https://groviadigi.in"),
  title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
  description: "Premium digital marketing agency built in Rajasthan, trusted across India. SEO, social media, performance marketing, GEO, web & AI-CRM systems. Book your free strategy call.",
  keywords: [
    // Primary
    "digital marketing agency in india",
    "digital marketing services",
    "best digital marketing agency",
    "ai digital marketing agency",
    "digital marketing for small business",
    // Local — Rajasthan
    "digital marketing agency in rajasthan",
    "digital marketing company in rajasthan",
    "best digital marketing agency in rajasthan",
    "seo services in rajasthan",
    "social media marketing agency in rajasthan",
    "google ads agency in rajasthan",
    "website development company in rajasthan",
    "digital marketing services rajasthan",
    // Rajasthan
    "digital marketing agency in rajasthan state",
    "best seo company in rajasthan region",
    // Services
    "performance marketing agency",
    "seo services india",
    "generative engine optimization",
    "email marketing services india",
    "lead generation agency india",
    "website development company in india",
    "crm setup services",
    "social media marketing services",
    // GEO differentiator
    "geo services",
    "ai search optimization",
    "chatgpt seo services",
    "google ai overview optimization",
    "answer engine optimization",
  ],
  authors: [{ name: "Grovia Digi" }],
  // Google Search Console ownership verification
  verification: {
    google: GSC_VERIFICATION,
  },
  openGraph: {
    title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
    description: "Premium digital marketing agency built in Rajasthan, trusted across India. SEO, social media, performance marketing, GEO, web & AI-CRM systems.",
    url: "https://groviadigi.in",
    siteName: "Grovia Digi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grovia Digi — Digital Marketing Agency in Rajasthan, India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
    description: "Premium digital marketing agency built in Rajasthan. SEO, performance marketing, GEO, web & AI-CRM. Free strategy call.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://groviadigi.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Analytics 4 — loads after page is interactive to not block render */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <LoadingScreen />
          <SmoothScroll />
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
