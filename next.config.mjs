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
  turbopack: {},

  // ─── Security & SEO HTTP Headers ─────────────────────────────────────────
  // Applied to every route. Improves security posture & search engine trust.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // Block clickjacking — page can only be framed by same origin
          { key: "X-Frame-Options",            value: "SAMEORIGIN" },
          // Stop legacy XSS filter (modern browsers use CSP instead)
          { key: "X-XSS-Protection",           value: "1; mode=block" },
          // Send full referrer on same-origin, only origin on cross-origin
          { key: "Referrer-Policy",             value: "strict-origin-when-cross-origin" },
          // Disable unnecessary browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Force HTTPS for 1 year (only enable once site is live on HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // ─────────────────────────────────────────────────────────────────────────
};

export default nextConfig;
