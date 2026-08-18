import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"
import SiteShell from "@/components/site-shell"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import "./globals.css"

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading-fallback",
  display: "swap",
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-fallback",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
    template: "%s | Nestor Anyanwu",
  },
  description:
    "Official website of Nestor Anyanwu (Nestor Cyber). Tech Leader, Software Developer, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems.",
  applicationName: "Nestor Anyanwu",
  keywords: [
    "Nestor Anyanwu",
    "Nestor Cyber",
    "FUTO",
    "NACOS FUTO",
    "SICT",
    "Computer Science FUTO",
    "tech advocate",
    "software developer",
    "web developer",
    "tech leadership",
    "community builder",
    "Nigeria tech",
    "AI",
    "technology",
    "design",
    "tech advocacy",
    "leadership",
    "innovation",
    "data privacy",
    "IEEE",
    "NIRA",
  ],
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787007449/DSC_5940_1_2_ee43kp.jpg",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787007449/DSC_5940_1_2_ee43kp.jpg",
        sizes: "180x180",
      },
    ],
  },
  authors: [{ name: "Nestor Anyanwu" }],
  creator: "Nestor Anyanwu",
  publisher: "Nestor Anyanwu",
  metadataBase: new URL("https://nestor.name.ng"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://nestor.name.ng",
    siteName: "Nestor Anyanwu",
    title: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
    description:
      "Discover the journey of Nestor Anyanwu - a tech professional driving digital innovation, building communities, and creating meaningful impact through technology and design.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OG%20quote-BHHcl2O0kvGuuo2DaGtrRhPArOE0Ph.jpg",
        width: 1200,
        height: 630,
        alt: "Nestor Anyanwu - Tech Advocate & Community Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestor Anyanwu (Nestor Cyber) | Software Engineer & Tech Leader",
    description:
      "Tech professional, software developer, and community leader driving innovation and impact in Nigeria's digital ecosystem.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OG%20quote-BHHcl2O0kvGuuo2DaGtrRhPArOE0Ph.jpg"],
    creator: "@nestorcyber",
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
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nestor Anyanwu",
    alternateName: "Nestor Cyber",
    url: "https://nestor.name.ng",
    jobTitle: "Director of ICT, Software Developer & Community Leader",
    worksFor: {
      "@type": "Organization",
      name: "NACOS FUTO",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Federal University of Technology Owerri (FUTO)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Owerri",
      addressRegion: "Imo State",
      addressCountry: "Nigeria",
    },
    description:
      "Nigerian tech professional driving digital innovation through software development, design, and community leadership at NACOS FUTO.",
    sameAs: [
      "https://twitter.com/nestorcyber",
      "https://linkedin.com/in/nestoranyanwu",
      "https://github.com/nestoranyanwu",
      "https://www.behance.net/nestorcyber",
    ],
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Artificial Intelligence",
      "Graphic Design",
      "Brand Identity",
      "Data Privacy",
      "Tech Community Leadership",
    ],
  }

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Anyanwu Nestor Ifeanyi",
    alternateName: ["Nestor Anyanwu", "Nestor Cyber", "nestor.name.ng"],
    url: "https://nestor.name.ng",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nestor.name.ng/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en" className={`bg-background ${headingFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/z3wgqisj/image/upload/v1787007449/DSC_5940_1_2_ee43kp.jpg" />
        <meta name="application-name" content="Anyanwu Nestor Ifeanyi" />
        <script
          id="schema-org-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          id="schema-org-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SiteShell>{children}</SiteShell>
          <Analytics />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
