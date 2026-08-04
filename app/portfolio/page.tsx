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

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero */}
      <PortfolioHero />

      {/* 2. Portfolio Highlights (Stats) */}
      <PortfolioStats />

      {/* 3. Services Grid */}
      <ServicesGrid />

      {/* 4. Featured Projects Showcase */}
      <FeaturedProjectsShowcase />

      {/* 5. Filterable Project Library */}
      <ProjectLibrary />

      {/* 6. Skills & Technology Matrix (Moved before Career Milestones) */}
      <SkillsMatrix />

      {/* 7. Professional Experience Timeline (Career Milestones) */}
      <ProfessionalExperience />

      {/* 8. Certifications & Professional Development */}
      <CertificationsGrid />

      {/* 9. Selected Testimonials */}
      <TestimonialsCarousel />

      {/* 10. Call to Action Banner */}
      <PortfolioCTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
