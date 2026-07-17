import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import Navigation from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Nestor Cyber – Tech Advocate, Designer & Community Leader",
    template: "%s | Nestor Cyber",
  },
  description:
    "Nestor Anyanwu is a Nigerian tech professional, software developer, and community leader driving digital innovation and impact. Director of ICT at NACOS FUTO, Data Privacy Ambassador, IEEE member, involved in tech advocacy, design, and building inclusive tech ecosystems.",
  keywords: [
    "Nestor Cyber",
    "Nestor Anyanwu",
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
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-KYSpcrNz26o3mpB4HWBdr1BqrujpQi.png",
  },
  authors: [{ name: "Nestor Anyanwu" }],
  creator: "Nestor Anyanwu",
  publisher: "Nestor Anyanwu",
  metadataBase: new URL("https://nestor.name.ng"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://nestor.name.ng",
    siteName: "Nestor Cyber - Tech Leader & Designer",
    title: "Nestor Cyber – Tech Advocate, Designer & Community Leader",
    description:
      "Discover the journey of Nestor Anyanwu - a tech professional driving digital innovation, building communities, and creating meaningful impact through technology and design.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OG%20quote-BHHcl2O0kvGuuo2DaGtrRhPArOE0Ph.jpg",
        width: 1200,
        height: 630,
        alt: "Nestor Cyber - Tech Advocate & Community Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestor Cyber – Tech Advocate & Community Leader",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
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
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nestor Anyanwu",
              url: "https://nestor.name.ng",
              jobTitle: "Tech Professional, Software Developer & Community Leader",
              description:
                "Nigerian tech professional driving digital innovation through software development, design, and community leadership at NACOS FUTO.",
              sameAs: [
                "https://twitter.com/nestorcyber",
                "https://linkedin.com/in/nestoranyanwu",
                "https://github.com/nestoranyanwu",
                "https://www.behance.net/nestorcyber",
              ],
              knowsAbout: ["Technology", "Software Development", "Web Development", "AI", "Design", "Community Leadership", "Tech Advocacy"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navigation />
          <div className="pt-14 md:pt-16">
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
