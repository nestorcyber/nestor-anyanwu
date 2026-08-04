import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import ProjectCard from "@/components/shared/project-card"
import { projects } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"

export default function FeaturedPortfolio() {
  return (
    <SectionContainer id="portfolio">
      <SectionHeader
        badge="FEATURED PORTFOLIO"
        title="Selected Work & Engineering"
        subtitle="Exploring technical engineering deliverables, design systems, and digital platforms built to empower communities."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            category={project.technologies[0] || "DEVELOPMENT"}
            description={project.description}
            technologies={project.technologies}
            link={project.links.demo}
          />
        ))}
      </div>

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
