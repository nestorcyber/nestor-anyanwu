import { Metadata } from "next"
import PortfolioHero from "@/components/portfolio/portfolio-hero"
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
} from "@/lib/content"

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
  const [stats, services, projects, skillGroups, journeyTimeline, certificationsList] =
    await Promise.all([
      getPortfolioStats(),
      getServices(),
      getProjectItems(),
      getSkillGroups(),
      getJourneyItems(),
      getCertifications(),
    ])

  return (
    <main className="min-h-screen bg-background">
      <PortfolioHero />
      <PortfolioStats stats={stats} />
      <ServicesGrid services={services} />
      <FeaturedProjectsShowcase projects={projects} />
      <ProjectLibrary projects={projects} />
      <SkillsMatrix skillGroups={skillGroups} />
      <ProfessionalExperience journeyTimeline={journeyTimeline} />
      <CertificationsGrid certificationsList={certificationsList} />
      <TestimonialsCarousel />
      <PortfolioCTA />
      <Footer />
    </main>
  )
}
