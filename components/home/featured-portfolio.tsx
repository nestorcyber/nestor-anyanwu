import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import ProjectCard from "@/components/shared/project-card"
import { getPortfolioProjects } from "@/lib/content"
import { ArrowRight } from "lucide-react"

export default async function FeaturedPortfolio() {
  const projects = await getPortfolioProjects()

  // Filter featured projects, or fall back to top 3
  const featured = projects.filter((p) => p.featured)
  const displayProjects = featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 3)

  return (
    <SectionContainer id="portfolio" className="bg-slate-50/60 dark:bg-slate-900/30">
      <SectionHeader
        badge="Featured Portfolio"
        title="Selected Work & Engineering"
        subtitle="Highlighted software and design deliverables."
      />

      {displayProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category || "Software Development"}
              description={project.shortDescription}
              technologies={[...project.technologies]}
              link={`/portfolio/${project.slug}`}
              image={project.coverImage}
              date={project.completionDate || undefined}
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
          <button className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-foreground border border-foreground/50 hover:border-accent hover:text-accent px-7 py-3 rounded-xl transition-all cursor-pointer">
            <span>View All Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}
