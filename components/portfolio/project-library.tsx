"use client"

import React, { useState } from "react"
import ProjectCard from "@/components/shared/project-card"
import type { ProjectItem } from "@/lib/content"
import { FolderKanban } from "lucide-react"

export default function ProjectLibrary({ projects }: { projects: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const defaultCategories = ["All", "Software", "Web", "Design", "Branding", "Automation", "Open Source"]
  const dynamicCategories = Array.from(
    new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))
  )
  const categories = Array.from(new Set([...defaultCategories, ...dynamicCategories]))

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Projects & Deliverables</h2>
            <p className="text-xs text-muted-foreground">Complete index of production builds, web infrastructure, brand systems, and engineering projects.</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-accent text-white border-accent shadow-2xs"
                  : "bg-secondary/60 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid Container */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-2">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                title={project.title}
                category={project.category || "DEVELOPMENT"}
                description={project.description}
                technologies={project.technologies}
                link={project.slug ? `/portfolio/${project.slug}` : project.links.caseStudy || project.links.demo}
                image={project.image}
                role={project.role}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-border rounded-xl text-xs text-muted-foreground">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  )
}
