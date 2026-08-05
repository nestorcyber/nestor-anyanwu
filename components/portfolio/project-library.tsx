"use client"

import React, { useState } from "react"
import SectionHeader from "@/components/shared/section-header"
import ProjectCard from "@/components/shared/project-card"
import type { ProjectItem } from "@/lib/content"

export default function ProjectLibrary({ projects }: { projects: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const categories = ["All", "Software", "Web", "Design", "Branding", "Automation", "Open Source"]

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="w-full py-12 md:py-16 border-b border-border/60 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="PROJECT LIBRARY"
          title="Complete Work Archives"
          subtitle="Filter through the catalog of software builds, web infrastructure, brand design systems, and automation projects."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 border-b border-border/40 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none border ${
                activeCategory === cat
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid Container */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                title={project.title}
                category={project.category || "DEVELOPMENT"}
                description={project.description}
                technologies={project.technologies}
                link={project.slug ? `/portfolio/${project.slug}` : project.links.caseStudy || project.links.demo}
                image={project.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sm text-muted-foreground font-light">
            No projects found under category "{activeCategory}".
          </div>
        )}
      </div>
    </section>
  )
}
