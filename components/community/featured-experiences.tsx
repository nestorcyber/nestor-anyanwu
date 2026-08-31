"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight, ExternalLink, CheckCircle2, Sparkles, Compass } from "lucide-react"

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
}

interface FeaturedExperiencesProps {
  experiences?: FeaturedExperienceItem[]
}

export default function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  const displayItems = experiences ?? []
  if (displayItems.length === 0) return null

  const [leadItem, ...supportingItems] = displayItems

  return (
    <section id="experiences" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center">
      <div className="site-container space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0075ff]/10 border border-[#0075ff]/20 text-xs font-mono font-semibold text-[#0075ff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNITY HIGHLIGHTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-foreground tracking-tight font-heading">
            Featured Volunteer <span className="text-[#0075ff]">Experiences</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Selected case studies where technical leadership, event production, and developer advocacy created measurable impact across student communities and tech summits.
          </p>

          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 1. Lead Featured Case Study (Split Hero Card) */}
        {leadItem && (
          <article className="rounded-3xl bg-slate-900 text-white overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 hover:border-[#0075ff]/60 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Media (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden bg-slate-950">
                {leadItem.coverImage && (
                  <Image
                    src={leadItem.coverImage}
                    alt={leadItem.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0075ff] text-white text-xs font-bold font-mono tracking-wider shadow-md">
                    FEATURED CASE STUDY
                  </span>
                </div>
              </div>

              {/* Right Content (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-sky-400">
                      {leadItem.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#0075ff]" />
                          {leadItem.date}
                        </span>
                      )}
                      {leadItem.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0075ff]" />
                          {leadItem.location}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      {leadItem.slug ? (
                        <Link href={`/community/${leadItem.slug}`} className="hover:underline">
                          {leadItem.title}
                        </Link>
                      ) : (
                        leadItem.title
                      )}
                    </h3>

                    {leadItem.role && (
                      <p className="text-xs sm:text-sm font-semibold text-slate-300">
                        {leadItem.role} {leadItem.organization && <span>&bull; <span className="text-sky-400">{leadItem.organization}</span></span>}
                      </p>
                    )}
                  </div>

                  {leadItem.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {leadItem.description}
                    </p>
                  )}

                  {/* Bullet Contributions */}
                  {leadItem.contributions && leadItem.contributions.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Key Impact Deliverables
                      </h4>
                      <ul className="space-y-1.5">
                        {leadItem.contributions.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-[#0075ff] shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Tag list & Link */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  {leadItem.skills && leadItem.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {leadItem.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {leadItem.slug && (
                      <Link
                        href={`/community/${leadItem.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0075ff] hover:text-sky-300 transition-colors cursor-pointer"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {leadItem.externalUrl && (
                      <a
                        href={leadItem.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>View Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </article>
        )}

        {/* 2. Supporting Case Study Grid */}
        {supportingItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportingItems.map((item) => (
              <article
                key={item.id}
                className="group rounded-3xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Image */}
                  {item.coverImage && (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-border/60">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      {item.date && <span>{item.date}</span>}
                      {item.location && <span>{item.location}</span>}
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {item.slug ? (
                        <Link href={`/community/${item.slug}`} className="hover:underline">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>

                    {item.role && (
                      <p className="text-xs font-semibold text-[#0075ff]">
                        {item.role} {item.organization && <span>&bull; {item.organization}</span>}
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                      {item.description}
                    </p>
                  )}

                  {/* Bullets */}
                  {item.contributions && item.contributions.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                      {item.contributions.slice(0, 2).map((c, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0075ff] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills & Action Link */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.skills.map((s, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-[#0075ff]/10 text-[#0075ff] text-[11px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.slug && (
                    <Link
                      href={`/community/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0075ff] hover:underline pt-1 cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 3. Action Button: View Full Experience Roadmap */}
        <div className="flex items-center justify-center pt-4 sm:pt-6">
          <Link
            href="/community/roadmap"
            className="h-11 sm:h-12 w-full sm:w-auto px-7 sm:px-9 rounded-xl bg-[#0070f3] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Compass className="w-4 h-4" />
            <span>View Full Community Roadmap</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
