"use client"

import React, { useState } from "react"
import SectionHeader from "@/components/shared/section-header"
import ProjectCard from "@/components/shared/project-card"
import type { ProjectItem } from "@/lib/content"

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
    <section className="w-full py-12 md:py-16 border-b-2 border-slate-900 dark:border-slate-800 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="PROJECT LIBRARY"
          title="Complete Work Archives"
          subtitle="Filter through the catalog of software builds, web infrastructure, brand design systems, and automation projects."
        />

        {/* Segmented Neubrutalist Filter Bar */}
        <div className="p-1 bg-card border-2 border-slate-900 dark:border-slate-800 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer select-none rounded-none border-2 ${
                activeCategory === cat
                  ? "bg-accent text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:border-slate-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid Container */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
          <div className="text-center py-12 text-xs font-mono uppercase text-muted-foreground border-2 border-dashed border-border/60">
            No projects found under category &quot;{activeCategory}&quot;.
          </div>
        )}
      </div>
    </section>
  )
}
