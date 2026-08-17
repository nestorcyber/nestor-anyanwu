import React from "react"
import Link from "next/link"
import type { ProjectItem } from "@/lib/content"
import { ArrowRight } from "lucide-react"
import ProjectCard from "@/components/shared/project-card"

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredOnly = projects.filter((p) => p.featured)
  const featuredList = featuredOnly.length > 0 ? featuredOnly.slice(0, 3) : projects.slice(0, 3)

  return (
    <section id="featured" className="w-full py-8 md:py-10 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Highlighted software and design builds.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Featured Long Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredList.map((project) => (
            <ProjectCard
              key={project.id || project.slug}
              title={project.title}
              category={project.category || "DEVELOPMENT"}
              description={project.description}
              technologies={project.technologies || []}
              link={`/portfolio/${project.slug}`}
              image={project.image}
              role={project.role || "Lead Architect"}
              date="2026-05-12"
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/projects"
            className="px-4 sm:px-6 py-2.5 sm:py-3.5 bg-accent hover:bg-accent/90 text-white font-extrabold text-[11px] sm:text-xs tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer text-center"
          >
            <span>Explore All Projects & Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  )
}
