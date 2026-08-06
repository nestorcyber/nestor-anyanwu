import React from "react"
import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/shared/section-header"
import type { ProjectItem } from "@/lib/content"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredList = projects.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-16 border-b-2 border-slate-900 dark:border-slate-800 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          badge="FLAGSHIP DELIVERABLES"
          title="Featured Case Studies"
          subtitle="Primary engineering deliverables spanning web applications, visual design, and software infrastructure."
        />

        <div className="space-y-10">
          {featuredList.map((project, idx) => (
            <div
              key={project.id || idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card border-2 border-slate-900/20 dark:border-slate-800 p-6 sm:p-8 rounded-none transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:border-accent"
            >
              {/* Preview Image Column (Col 1-7) */}
              <div className="lg:col-span-7 relative aspect-video w-full overflow-hidden border-2 border-slate-900/20 dark:border-slate-800 bg-slate-950">
                <Image
                  src={project.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Column (Col 8-12) */}
              <div className="lg:col-span-5 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b-2 border-slate-900/10 dark:border-slate-800 pb-2.5">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider px-2 py-0.5 border border-accent/40 bg-accent/10">
                      {project.category || "DEVELOPMENT"}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {project.status || "PRODUCTION"}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight font-heading">
                    {project.title}
                  </h3>

                  {project.role && (
                    <p className="text-xs font-mono font-bold text-muted-foreground uppercase">
                      Role: <span className="text-foreground">{project.role}</span>
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono uppercase px-2.5 py-0.5 bg-secondary text-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                  {project.slug ? (
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : project.links.demo ? (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : null}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card text-foreground border-2 border-slate-900 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github size={14} />
                      <span>Code</span>
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
