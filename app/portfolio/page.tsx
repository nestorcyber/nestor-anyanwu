import { Metadata } from "next"
import PortfolioHero from "@/components/portfolio/portfolio-hero"
import PortfolioAboutSection from "@/components/portfolio/portfolio-about-section"
import PortfolioStats from "@/components/portfolio/portfolio-stats"
import ServicesGrid from "@/components/portfolio/services-grid"
import FeaturedProjectsShowcase from "@/components/portfolio/featured-projects-showcase"
import SkillsMatrix from "@/components/portfolio/skills-matrix"
import ProfessionalExperience from "@/components/portfolio/professional-experience"
import CertificationsGrid from "@/components/portfolio/certifications-grid"
import MembershipsSection from "@/components/portfolio/memberships-section"
import TestimonialsCarousel from "@/components/portfolio/testimonials-carousel"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import Footer from "@/components/footer"
import {
  getCertifications,
  getJourneyItems,
  getPortfolioStats,
  getProjectItems,
  getServices,
  getSkillGroups,
  getSiteSettings,
} from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Portfolio & Engineering Evidence | Nestor Anyanwu (Nestor Cyber)",
  description: "Explore the portfolio, production software deliverables, brand systems, and engineering capabilities of Nestor Anyanwu.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio & Engineering Evidence | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore the portfolio, production software deliverables, brand systems, and engineering capabilities of Nestor Anyanwu.",
    url: "/portfolio",
  },
  twitter: {
    title: "Portfolio & Engineering Evidence | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore the portfolio, production software deliverables, brand systems, and engineering capabilities of Nestor Anyanwu.",
  },
}

export default async function PortfolioPage() {
  const [stats, services, projects, skillGroups, journeyTimeline, certificationsList, siteSettings] =
    await Promise.all([
      getPortfolioStats(),
      getServices(),
      getProjectItems(),
      getSkillGroups(),
      getJourneyItems(),
      getCertifications(),
      getSiteSettings(),
    ])

  const membershipsList = journeyTimeline.filter((j) => j.type === "membership")

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div className="w-full">
          <PortfolioHero settings={siteSettings} stats={stats} />
          <PortfolioAboutSection settings={siteSettings} />
          <SkillsMatrix skillGroups={skillGroups} />
          <ServicesGrid services={services} />
          <FeaturedProjectsShowcase projects={projects} />
          <ProfessionalExperience journeyTimeline={journeyTimeline} />
          <CertificationsGrid certificationsList={certificationsList} />
          <MembershipsSection membershipsList={membershipsList} />
          <TestimonialsCarousel />
          <PortfolioCTA
            title="Have a Project or Product in Mind?"
            description="Let's turn your vision into high-impact software, scalable web applications, and enterprise design systems that command credibility."
            buttonText="Start A Project"
            buttonHref="/contact"
          />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
