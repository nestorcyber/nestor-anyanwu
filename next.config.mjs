/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://www.googletagmanager.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://api.iconify.design https://cdn.simpleicons.org https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data: https://cdn.jsdelivr.net https://db.onlinewebfonts.com",
  "connect-src 'self' https://*.supabase.co https://api.cloudinary.com https://api.iconify.design https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  "media-src 'self' https://res.cloudinary.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ")

const nextConfig = {
  compress: true,
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ["cloudinary", "isomorphic-dompurify", "jsdom"],
  outputFileTracingExcludes: {
    "*": [
      "node_modules/cloudinary/**/*",
      ".git/**/*",
      ".next/cache/**/*",
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "recharts",
      "clsx",
      "tailwind-merge",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/portfolio/projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/portfolio/certifications",
        destination: "/certifications",
        permanent: true,
      },
      {
        source: "/portfolio/experience",
        destination: "/experience",
        permanent: true,
      },
      {
        source: "/portfolio/memberships",
        destination: "/memberships",
        permanent: true,
      },
      {
        source: "/affiliations",
        destination: "/memberships",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

export default nextConfig
