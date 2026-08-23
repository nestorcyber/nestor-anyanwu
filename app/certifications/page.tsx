import { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import CertificationCard from "@/components/shared/certification-card"
import { getCertifications } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Licenses & Certifications | Nestor Anyanwu (Nestor Cyber)",
  description: "Explore verified licenses, engineering accreditations, technical credentials, and professional leadership certifications earned by Nestor Anyanwu.",
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "Licenses & Certifications | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore verified licenses, engineering accreditations, technical credentials, and professional leadership certifications earned by Nestor Anyanwu.",
    url: "/certifications",
  },
  twitter: {
    title: "Licenses & Certifications | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore verified licenses, engineering accreditations, technical credentials, and professional leadership certifications earned by Nestor Anyanwu.",
  },
}

export default async function CertificationsPage() {
  const certificationsList = await getCertifications()

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          {/* Top Hero Section */}
          <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-16">
            <div className="site-container space-y-4">
              
              {/* Left-Aligned Heading with Verified Checkmark Beside Text */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight font-heading leading-[1.18]">
                  Verified <span className="text-[#0075ff]">Licenses &amp;</span>{" "}
                  <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    Certifications
                    <span className="inline-flex items-center justify-center text-[#0075ff] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 drop-shadow-[0_4px_12px_rgba(0,117,255,0.3)] align-middle">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.28 4.22l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
                      </svg>
                    </span>
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-3xl">
                  Explore verified credentials, professional engineering accreditations, industry licenses, and leadership qualifications earned by Nestor Anyanwu.
                </p>
              </div>

            </div>
          </div>

          {/* All Certifications 3-in-a-Row Grid Container */}
          <div className="site-container py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {certificationsList.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>

            {certificationsList.length === 0 && (
              <div className="p-12 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl">
                No certifications found.
              </div>
            )}
          </div>

          <PortfolioCTA />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
