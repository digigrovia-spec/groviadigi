/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.4", "localhost"],

  // Compress all responses
  compress: true,

  // Optimize images — use modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
  },

  // Experimental optimizations
  experimental: {
    // Tree-shake heavy libraries — works with Turbopack
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
    ],
  },

  // Empty turbopack config silences the webpack warning
  // (Next.js 16 uses Turbopack by default; no webpack overrides needed
  //  since framer-motion is no longer used in any component)
  turbopack: {},
};

export default nextConfig;
