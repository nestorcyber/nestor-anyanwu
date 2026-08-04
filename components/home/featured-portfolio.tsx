import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import ProjectCard from "@/components/shared/project-card"
import { getPortfolioProjects } from "@/lib/keystatic"
import { ArrowUpRight } from "lucide-react"

export default async function FeaturedPortfolio() {
  const projects = await getPortfolioProjects()

  // Filter featured projects, or fall back to top 3
  const featured = projects.filter((p) => p.featured)
  const displayProjects = featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 3)

  return (
    <SectionContainer id="portfolio">
      <SectionHeader
        badge="FEATURED PORTFOLIO"
        title="Selected Work & Engineering"
        subtitle="Exploring technical engineering deliverables, design systems, and digital platforms built to empower communities."
      />

      {displayProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category || "DEVELOPMENT"}
              description={project.shortDescription}
              technologies={project.technologies}
              link={`/portfolio/${project.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No featured portfolio projects available.
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link href="/portfolio">
          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/50 hover:border-accent hover:text-accent px-8 py-3.5 rounded-none transition-all cursor-pointer">
            <span>VIEW ALL PORTFOLIO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}
