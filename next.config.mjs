/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "recharts", "framer-motion", "html-to-image", "@radix-ui/react-icons"],
  },


  // ─── IMAGE OPTIMIZATION ──────────────────────────────────────────────────
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: "https", hostname: "images.inc42.com" },
      { protocol: "https", hostname: "assets.inc42.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.browserstack.com" },
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year (31,536,000s)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── COMPRESSION ────────────────────────────────────────────────────────
  compress: true,

  // ─── HEADERS ────────────────────────────────────────────────────────────
  async headers() {
    return [
      // Global security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",       value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.ezoic.net https://*.id5-sync.com https://static.cloudflareinsights.com https://*.trustpilot.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: https://images.upforge.org; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https: wss:; frame-src 'self' https:; require-trusted-types-for 'script';",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      // Blog pages edge cache - 1 day s-maxage, 7 days SWR
      {
        source: "/blog",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/blog/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // OG images - cache 1 day
      {
        source: "/og/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Static images - cache 1 year immutable
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(png|jpg|jpeg|webp|avif|svg|ico|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Static assets (JS, CSS, fonts) - cache 1 year
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Public files - cache 1 day
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      // Public, read-mostly pages: allow Cloudflare to serve cached HTML while
      // Next.js/ISR keeps the application data fresh at the origin.
      {
        source: "/registry",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600, stale-if-error=1800",
          },
        ],
      },
      {
        source: "/quiz",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600, stale-if-error=1800",
          },
        ],
      },
      {
        source: "/quiz/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600, stale-if-error=1800",
          },
        ],
      },
      {
        source: "/startup/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=86400",
          },
        ],
      },
      {
        source: "/startups/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=1800, stale-if-error=3600",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=1800, stale-if-error=3600",
          },
        ],
      },
      // API routes - route handlers decide whether GET is cacheable; POST stays no-store.
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://upforge.org",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, x-upforge-domain",
          },
          {
            key: "Vary",
            value: "Origin",
          },
          {
            key: "Access-Control-Max-Age",
            value: "7200",
          },
        ],
      },
    ]
  },

  // ─── REDIRECTS ──────────────────────────────────────────────────────────
  async redirects() {
    return [
      // ─── CANONICAL STARTUP PROFILE ───────────────────────────────────────
      // /registry/:slug is a legacy duplicate of /startup/:slug.
      // Keep one indexable URL so Google does not have to choose between two
      // near-identical profile documents.
      { source: "/registry/:slug", destination: "/startup/:slug", permanent: true },

      // ─── SECTOR URL BUG FIXES ─────────────────────────────────────────────
      // These fix old broken slugs that had & encoded as literal chars.
      // All redirect to the canonical slug produced by categoryToSlug().
      { source: "/startups/ai-&-technology", destination: "/startups/ai-technology", permanent: true },
      { source: "/startups/ai-%26-technology", destination: "/startups/ai-technology", permanent: true },
      { source: "/startups/artificial-intelligence", destination: "/startups/ai-technology", permanent: true },
      { source: "/startups/AITechnology", destination: "/startups/ai-technology", permanent: true },
      { source: "/startups/e-commerce-&-d2c", destination: "/startups/e-commerce-d2c", permanent: true },
      { source: "/startups/e-commerce-%26-d2c", destination: "/startups/e-commerce-d2c", permanent: true },
      { source: "/startups/ecommerce-&-d2c", destination: "/startups/e-commerce-d2c", permanent: true },
      { source: "/startups/fintech-&-payments", destination: "/startups/fintech-payments", permanent: true },
      { source: "/startups/fintech-%26-payments", destination: "/startups/fintech-payments", permanent: true },
      { source: "/startups/edtech-&-language-learning", destination: "/startups/edtech-language-learning", permanent: true },
      { source: "/startups/edtech-%26-language-learning", destination: "/startups/edtech-language-learning", permanent: true },
      { source: "/startups/ai-design-&-creativity", destination: "/startups/ai-design-creativity", permanent: true },
      { source: "/startups/ai-design-%26-creativity", destination: "/startups/ai-design-creativity", permanent: true },
      // ─── OBSOLETE / REMOVED SLUGS 301 REDIRECTS ────────────────────────────
      { source: "/indian-unicorns", destination: "/blog/top-indian-unicorns-2026", permanent: true },
      { source: "/blog/tier-2-tier-3-indian-cities-producing-startups-2026", destination: "/blog/india-startup-ecosystem-2026", permanent: true },
    ]
  },

  // ─── GENERAL CONFIG ─────────────────────────────────────────────────────
  trailingSlash: false,
  reactStrictMode: true,
}

export default nextConfig
