import { Metadata } from "next"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import ExperienceClient from "@/components/experience/experience-client"
import { getJourneyItems } from "@/lib/content"
import { Briefcase } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Experience & Career Journey | Nestor Anyanwu (Nestor Cyber)",
  description: "Comprehensive timeline of software engineering roles, technical advisory positions, developer relations initiatives, and community leadership milestones.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience & Career Journey | Nestor Anyanwu (Nestor Cyber)",
    description: "Comprehensive timeline of software engineering roles, technical advisory positions, developer relations initiatives, and community leadership milestones.",
    url: "/experience",
  },
  twitter: {
    title: "Experience & Career Journey | Nestor Anyanwu (Nestor Cyber)",
    description: "Comprehensive timeline of software engineering roles, technical advisory positions, developer relations initiatives, and community leadership milestones.",
  },
}

export default async function ExperiencePage() {
  const journeyTimeline = await getJourneyItems()

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          {/* Top Hero Section matching Certifications Standard */}
          <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-16">
            <div className="site-container space-y-4">
              
              {/* Left-Aligned Heading with Briefcase Icon Beside Text */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight font-heading leading-[1.18]">
                  Career <span className="text-[#0075ff]">Roadmap</span>{" "}
                  <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    &amp; Experience
                    <span className="inline-flex items-center justify-center text-[#0075ff] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 drop-shadow-[0_4px_12px_rgba(0,117,255,0.3)] align-middle">
                      <Briefcase className="w-full h-full" />
                    </span>
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-3xl">
                  Chronological roadmap of software engineering positions, technical leadership roles, organizational directorships, and verified professional deliverables.
                </p>
              </div>

            </div>
          </div>

          {/* Interactive Filterable Timeline Content */}
          <ExperienceClient initialItems={journeyTimeline} />

          {/* Portfolio CTA */}
          <PortfolioCTA />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
