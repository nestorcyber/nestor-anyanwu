import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProjectItem } from "@/lib/content"
import { ExternalLink, Star, ArrowRight } from "lucide-react"

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredOnly = projects.filter((p) => p.featured)
  const featuredList = featuredOnly.length > 0 ? featuredOnly.slice(0, 3) : projects.slice(0, 3)

  return (
    <section id="featured" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Highlighted production builds, web infrastructure, brand systems, and architecture case studies.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Featured Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredList.map((project, idx) => (
            <div
              key={project.id || idx}
              className="bg-card border border-border/70 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-accent transition-all shadow-xs group"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <Image
                    src={project.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider px-2.5 py-0.5 border border-accent/30 bg-accent/10 rounded-full">
                      {project.category || "DEVELOPMENT"}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {project.status || "PRODUCTION"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="w-full py-2.5 bg-secondary hover:bg-accent hover:text-white border border-border text-foreground font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>View Case Study</span>
                  <ExternalLink size={14} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/projects"
            className="px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All Projects & Deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
