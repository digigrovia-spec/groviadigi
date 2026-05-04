import "../index.css";
import { Inter, Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { LoadingScreen } from "@/components/ui/loading-screen";

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
  metadataBase: new URL("https://groviadigi.com"),
  title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
  description: "Premium digital marketing agency built in Ajmer, trusted across India. SEO, social media, paid ads, GEO, web & AI-CRM systems. Book your free strategy call.",
  keywords: [
    // Primary
    "digital marketing agency in india",
    "digital marketing services",
    "best digital marketing agency",
    "ai digital marketing agency",
    "digital marketing for small business",
    // Local — Ajmer
    "digital marketing agency in ajmer",
    "digital marketing company in ajmer",
    "best digital marketing agency in ajmer",
    "seo services in ajmer",
    "social media marketing agency in ajmer",
    "google ads agency in ajmer",
    "website development company in ajmer",
    "digital marketing services ajmer rajasthan",
    // Rajasthan
    "digital marketing agency in rajasthan",
    "best seo company in rajasthan",
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
  openGraph: {
    title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
    description: "Premium digital marketing agency built in Ajmer, trusted across India. SEO, social media, paid ads, GEO, web & AI-CRM systems.",
    url: "https://groviadigi.com",
    siteName: "Grovia Digi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grovia Digi — Digital Marketing Agency in Ajmer, India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grovia Digi — Digital Marketing Agency in India | AI-Powered Growth",
    description: "Premium digital marketing agency built in Ajmer. SEO, paid ads, GEO, web & AI-CRM. Free strategy call.",
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
    canonical: "https://groviadigi.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
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
