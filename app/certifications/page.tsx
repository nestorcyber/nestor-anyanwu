import { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import CertificationCard from "@/components/shared/certification-card"
import { getCertifications } from "@/lib/content"
import { ArrowLeft, Award, ShieldCheck } from "lucide-react"

export const revalidate = 60

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
          {/* Top Breadcrumb & Page Banner */}
          <div className="w-full bg-card/60 border-b border-border/70 py-8">
            <div className="site-container space-y-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent hover:underline uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Main Portfolio</span>
              </Link>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                    All Licenses & Certifications
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Complete archive of verified engineering accreditations, technical credentials, and leadership awards.
                  </p>
                </div>
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
