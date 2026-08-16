import { Metadata } from "next"
import PortfolioHero from "@/components/portfolio/portfolio-hero"
import PortfolioAboutSection from "@/components/portfolio/portfolio-about-section"
import PortfolioStats from "@/components/portfolio/portfolio-stats"
import ServicesGrid from "@/components/portfolio/services-grid"
import FeaturedProjectsShowcase from "@/components/portfolio/featured-projects-showcase"
import ProjectLibrary from "@/components/portfolio/project-library"
import SkillsMatrix from "@/components/portfolio/skills-matrix"
import ProfessionalExperience from "@/components/portfolio/professional-experience"
import CertificationsGrid from "@/components/portfolio/certifications-grid"
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

import PortfolioSidebar from "@/components/portfolio/portfolio-sidebar"

export const revalidate = 60

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

  return (
    <main className="min-h-screen bg-background">
      <PortfolioHero settings={siteSettings} stats={stats} />

      {/* Main Content Layout with Sticky Twitter-Style Desktop Navigation Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
        
        {/* Desktop Sticky Sidebar */}
        <PortfolioSidebar
          projectCount={projects.length}
          skillGroupCount={skillGroups.length}
          expCount={journeyTimeline.length}
          certCount={certificationsList.length}
        />

        {/* Main Sections Stream */}
        <div className="flex-1 min-w-0 space-y-4">
          <PortfolioAboutSection settings={siteSettings} />
          <FeaturedProjectsShowcase projects={projects} />
          <SkillsMatrix skillGroups={skillGroups} />
          <ProfessionalExperience journeyTimeline={journeyTimeline} />
          <CertificationsGrid certificationsList={certificationsList} />
          <ProjectLibrary projects={projects} />
          <ServicesGrid services={services} />
          <TestimonialsCarousel />
        </div>

      </div>

      <PortfolioCTA />
      <Footer />
    </main>
  )
}
