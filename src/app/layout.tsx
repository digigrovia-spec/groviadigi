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
  metadataBase: new URL("https://lamairatravel.com"),
  title: "Lamaira Travel — Luxury Travel & Safari Experiences in Accra, Ghana",
  description: "Your trusted travel and tours company in Accra, Ghana. We provide flight tickets, tour packages, hotel bookings, and unforgettable safari experiences worldwide.",
  keywords: [
    "travel agency accra ghana",
    "luxury safari packages africa",
    "flight tickets accra",
    "visa assistance ghana",
    "hotel booking services",
    "holiday packages africa",
    "car rental accra",
    "cruise trips",
    "international travel partner ghana",
    "best travel agency accra",
  ],
  authors: [{ name: "Lamaira Travel" }],
  openGraph: {
    title: "Lamaira Travel — Luxury Travel & Safari Experiences in Accra, Ghana",
    description: "Your trusted travel and tours company in Accra, Ghana. We provide flight tickets, tour packages, hotel bookings, and unforgettable safari experiences worldwide.",
    url: "https://lamairatravel.com",
    siteName: "Lamaira Travel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lamaira Travel — Luxury Travel & Safari Experiences",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamaira Travel — Luxury Travel & Safari Experiences in Accra, Ghana",
    description: "Your trusted travel and tours company in Accra, Ghana. Flight tickets, tour packages, and unforgettable safari experiences.",
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
    canonical: "https://lamairatravel.com",
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
