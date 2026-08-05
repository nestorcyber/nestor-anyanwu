import React from "react"
import Image from "next/image"
import SectionHeader from "@/components/shared/section-header"
import type { ProjectItem } from "@/lib/content"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredList = projects.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-16 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="FEATURED SHOWCASE"
          title="Flagship Projects"
          subtitle="A selection of primary deliverables spanning visual branding, software applications, and national ICT portals."
        />

        <div className="space-y-16">
          {featuredList.map((project, idx) => (
            <div
              key={project.id || idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/60 border border-border/60 hover:border-accent p-8 md:p-10 rounded-none transition-all duration-300 grid-cell-card"
            >
              {/* Preview Image Column (Col 1-7) */}
              <div className="lg:col-span-7 relative aspect-video w-full overflow-hidden border border-border/40 bg-slate-950">
                <Image
                  src={project.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Details Column (Col 8-12) */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/30 pb-3">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest">
                      {project.category || "DEVELOPMENT"}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase font-mono">
                      {project.status || "COMPLETED"}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    {project.title}
                  </h3>

                  {project.role && (
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Role: {project.role}
                    </p>
                  )}

                  <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold uppercase px-3 py-1 bg-secondary text-foreground border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/40">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-none flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {project.links.caseStudy && (
                    <a
                      href={project.links.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-none flex items-center gap-1.5 transition-colors"
                    >
                      <span>Case Study</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-card hover:bg-accent hover:text-white border border-border text-foreground transition-all"
                      aria-label="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
