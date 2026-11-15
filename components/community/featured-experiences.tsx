"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles, Layers } from "lucide-react"

export interface FeaturedExperienceItem {
  id: string
  title: string
  organization: string
  role: string
  date: string
  location?: string
  coverImage: string
  description: string
  contributions: string[]
  skills: string[]
  externalUrl?: string
  slug?: string
  featured?: boolean
  impactStats?: Array<{ value: string; label: string }>
  gallery?: string[]
}

export interface FeaturedExperiencesProps {
  experiences?: FeaturedExperienceItem[]
}

function extractYear(dateStr?: string): string {
  if (!dateStr) return "2026"
  const match = dateStr.match(/\b(20\d{2})\b/)
  if (match) return match[1]
  return dateStr.trim()
}

export default function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  const displayItems = experiences ?? []
  if (displayItems.length === 0) return null

  return (
    <section
      id="experiences"
      className="w-full py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center transition-colors"
      aria-label="Volunteer Experiences Portfolio"
    >
      <div className="site-container space-y-12 sm:space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl bg-[#0056D2]/10 border border-[#0056D2]/20 text-[#0056D2] text-xs font-mono font-bold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5 text-[#0056D2]" />
            <span>Curated Volunteer Archive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-foreground tracking-tight font-heading leading-tight">
            Featured Volunteer <span className="text-[#0056D2]">Experiences</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            A curated portfolio of grassroots leadership, developer advocacy, and technical event production across universities, developer ecosystems, and tech summits.
          </p>

          <div className="w-16 h-1 bg-[#0056D2] rounded-2xl" />
        </div>

        {/* Uniform Landscape Card Grid (Responsive 1/2/3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8">
          {displayItems.map((item, idx) => (
            <article key={item.id || idx} className="group flex flex-col">
              <Link
                href={item.slug ? `/community/${item.slug}` : "#"}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2] rounded-2xl"
                aria-label={`View ${item.organization || item.title}`}
              >
                {/* Media Frame in Uniform Landscape Ratio (16:10) with Universal rounded-2xl Radius */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-border/60 transition-all duration-300 group-hover:border-[#0056D2]/60 group-hover:shadow-lg">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.organization || item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      priority={idx < 3}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
                      <Sparkles className="w-8 h-8" />
                    </div>
                  )}

                  {/* Subtle Overlay & Floating Hover Cue */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-2xl bg-black/75 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Clean Bottom Metadata Line (Title on Left, Year on Right) */}
                <div className="mt-3 sm:mt-4 space-y-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground tracking-tight group-hover:text-[#0056D2] transition-colors truncate">
                      {item.organization || item.title}
                    </h3>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-muted-foreground shrink-0">
                      {extractYear(item.date)}
                    </span>
                  </div>

                  {item.role && (
                    <p className="text-xs font-medium text-muted-foreground truncate group-hover:text-foreground/90 transition-colors">
                      {item.role}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 sm:pt-10">
          <Link
            href="/community/roadmap"
            className="h-11 sm:h-12 w-full sm:w-auto px-7 sm:px-9 rounded-2xl bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>View Full Community Roadmap</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/contact"
            className="h-11 sm:h-12 w-full sm:w-auto px-6 rounded-2xl bg-secondary hover:bg-slate-200 dark:hover:bg-slate-800 text-foreground font-bold text-xs sm:text-sm border border-border transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Propose Collaboration</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
