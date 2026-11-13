"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import type { ProjectItem } from "@/lib/content"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import {
  FOLDER_THEMES,
  FolderTabSlope,
  formatCategoryLabel,
} from "@/components/shared/project-card"

function getProjectHref(project: ProjectItem): string {
  if (project.slug) return `/portfolio/${project.slug}`
  return project.links?.caseStudy || project.links?.demo || "/projects"
}

function getTabSlotStyle(slot: number, slotCount: number): React.CSSProperties {
  if (slotCount <= 1) {
    return { left: "0%", width: "36%" }
  }

  const slotPct = 100 / slotCount

  if (slot === 0) {
    return {
      left: "0%",
      width: `calc(${slotPct}% + 16px)`,
    }
  }

  if (slot === slotCount - 1) {
    return {
      right: "0%",
      width: `calc(${slotPct}% + 16px)`,
    }
  }

  return {
    left: `calc(${slot * slotPct}% - 12px)`,
    width: `calc(${slotPct}% + 24px)`,
  }
}

export default function FeaturedProjectsShowcase({ projects }: { projects: ProjectItem[] }) {
  const featuredOnly = projects.filter((p) => p.featured)
  const displayProjects = featuredOnly.length > 0 ? featuredOnly : projects
  const slotCount = Math.max(1, Math.min(displayProjects.length, 6))

  return (
    <section
      id="featured"
      className="w-full py-16 md:py-24 border-b border-border/70 bg-background"
    >
      <div className="container-webflow space-y-12 md:space-y-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Highlighted software and design builds—scroll through the lapped project folders or click any folder to inspect the full build.
          </p>
          <div className="w-14 h-1 bg-[#0056D2] rounded-2xl mt-2" />
        </div>

        {/* Lapped Multi-Tab Office Folder Stack */}
        {displayProjects.length > 0 && (
          <div className="relative max-w-4xl mx-auto flex flex-col gap-10 sm:gap-14 lg:gap-16 pb-6 lg:pb-8">
            {displayProjects.map((project, idx) => {
              const href = getProjectHref(project)
              const theme = FOLDER_THEMES[idx % FOLDER_THEMES.length]
              const categoryLabel = formatCategoryLabel(project.category)
              const slot = idx % slotCount
              const isLeftEdge = slot === 0
              const isRightEdge = slot === slotCount - 1 && slotCount > 1
              const tabSlotStyle = getTabSlotStyle(slot, slotCount)

              const bodyCornerClass = isLeftEdge
                ? "rounded-2xl rounded-tl-none"
                : isRightEdge
                  ? "rounded-2xl rounded-tr-none"
                  : "rounded-2xl"

              return (
                <div
                  key={project.id || project.slug || idx}
                  style={{ zIndex: idx + 1 }}
                  className="sticky top-[4.25rem] lg:top-[4.75rem] pointer-events-none"
                >
                  {/* Top Row: Staggered Category Tab Bulge (Left -> Middle -> Right) */}
                  <div className="relative h-[40px] w-full pointer-events-none">
                      <Link
                        href={href}
                        aria-label={`View ${categoryLabel} project: ${project.title}`}
                        style={tabSlotStyle}
                        className="group/tab pointer-events-auto absolute -bottom-px h-[40px] flex items-end focus-visible:outline-none"
                      >
                        {!isLeftEdge && <FolderTabSlope side="left" color={theme.bg} />}

                        <div
                          style={{
                            backgroundColor: theme.bg,
                            color: theme.text,
                          }}
                          className={`relative flex-1 h-[40px] px-2.5 sm:px-4 flex items-center justify-center transition-opacity duration-200 group-hover/tab:opacity-95 ${
                            isLeftEdge ? "rounded-tl-2xl" : ""
                          } ${isRightEdge ? "rounded-tr-2xl" : ""}`}
                        >
                          <span className="font-heading text-[11px] sm:text-sm font-bold tracking-tight truncate">
                            {categoryLabel}
                          </span>
                        </div>

                        {!isRightEdge && <FolderTabSlope side="right" color={theme.bg} />}
                      </Link>
                    </div>

                    {/* Folder Body: Title Row Next, Followed by Full Project Picture */}
                    <Link
                      href={href}
                      aria-label={`View project details for ${project.title}`}
                      className="group pointer-events-auto block focus-visible:outline-none"
                    >
                      <article
                        style={{ backgroundColor: theme.bg }}
                        className={`relative flex flex-col ${bodyCornerClass} overflow-hidden transition-transform duration-300`}
                      >
                        {/* Project Title Header Bar */}
                        <div
                          style={{ color: theme.text }}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 shrink-0"
                        >
                          <h3 className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight font-heading truncate min-w-0">
                            {project.title}
                          </h3>

                          <span
                            aria-hidden="true"
                            style={{ borderColor: theme.arrowBorder }}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15 shrink-0"
                          >
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>

                        {/* Project Thumbnail Picture Below Title Inside Folder */}
                        <div className="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5">
                          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 896px"
                                priority={idx === 0}
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                <Sparkles className="w-10 h-10 text-slate-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* View All Projects Button */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/projects"
            className="h-11 sm:h-12 px-6 bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold text-xs sm:text-sm tracking-wider rounded-2xl shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <span>Explore All Projects &amp; Deliverables</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  )
}
