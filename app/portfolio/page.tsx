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
    <div className="min-h-screen bg-background flex flex-col xl:flex-row w-full">
      
      {/* Full-Height Left Navigation Sidebar (Desktop - Twitter/SlothUI app style) */}
      <PortfolioSidebar
        projectCount={projects.length}
        skillGroupCount={skillGroups.length}
        expCount={journeyTimeline.length}
        certCount={certificationsList.length}
      />

      {/* Main Feed Column (Hero, Sections & Footer) */}
      <main className="flex-1 min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          <PortfolioHero settings={siteSettings} stats={stats} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <PortfolioAboutSection settings={siteSettings} />
            <FeaturedProjectsShowcase projects={projects} />
            <SkillsMatrix skillGroups={skillGroups} />
            <ProfessionalExperience journeyTimeline={journeyTimeline} />
            <CertificationsGrid certificationsList={certificationsList} />
            <ProjectLibrary projects={projects} />
            <ServicesGrid services={services} />
            <TestimonialsCarousel />
          </div>

          <PortfolioCTA />
        </div>

        {/* Footer dynamically nested in main feed column */}
        <Footer />
      </main>
    </div>
  )
}
