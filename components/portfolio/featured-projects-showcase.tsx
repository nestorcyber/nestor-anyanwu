import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProjectItem } from "@/lib/content"
import { ExternalLink, Star } from "lucide-react"

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredOnly = projects.filter((p) => p.featured)
  const featuredList = featuredOnly.length > 0 ? featuredOnly.slice(0, 3) : projects.slice(0, 3)

  return (
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Section Title Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Featured Deliverables</h2>
                <p className="text-xs text-muted-foreground">Highlighted production builds, design systems, and architecture case studies.</p>
              </div>
            </div>

            <Link href="/projects" className="text-xs font-bold text-accent hover:underline">
              View all projects →
            </Link>
          </div>

          {/* Featured Horizontal Cards Carousel / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredList.map((project, idx) => (
              <div
                key={project.id || idx}
                className="bg-secondary/30 border border-border/70 rounded-xl overflow-hidden flex flex-col justify-between hover:border-accent transition-all shadow-2xs group"
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

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider px-2 py-0.5 border border-accent/30 bg-accent/10 rounded-full">
                        {project.category || "DEVELOPMENT"}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {project.status || "PRODUCTION"}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="w-full py-2 bg-card hover:bg-accent hover:text-white border border-border text-foreground font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View Case Study</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
