"use client"

import React, { useState, useMemo } from "react"
import Image from "next/image"
import type { JourneyItem } from "@/lib/content"
import {
  Briefcase,
  Calendar,
  Building2,
  Search,
  Award,
  ExternalLink,
  MapPin,
  Sparkles,
  Milestone,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react"

export default function ExperienceClient({
  initialItems,
}: {
  initialItems: JourneyItem[]
}) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter out any volunteer items strictly to display only professional work, engineering, and leadership track records
  const professionalItems = useMemo(() => {
    return initialItems.filter((item) => {
      const isVolunteer =
        item.type === "volunteer" ||
        item.title?.toLowerCase().includes("volunteer") ||
        item.role?.toLowerCase().includes("volunteer") ||
        item.description?.toLowerCase().includes("volunteer")
      return !isVolunteer
    })
  }, [initialItems])

  // Filter by search keyword
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return professionalItems
    const q = searchQuery.toLowerCase().trim()
    return professionalItems.filter((item) => {
      const matchTitle = item.title?.toLowerCase().includes(q)
      const matchOrg = item.organization?.toLowerCase().includes(q)
      const matchRole = item.role?.toLowerCase().includes(q)
      const matchDesc = item.description?.toLowerCase().includes(q)
      const matchDetails = item.details?.some((d) => d.toLowerCase().includes(q))
      return matchTitle || matchOrg || matchRole || matchDesc || matchDetails
    })
  }, [professionalItems, searchQuery])

  return (
    <div className="site-container py-10 md:py-16 space-y-12">
      
      {/* Top Roadmap Controls & Milestone Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card/60 border border-border/80 shadow-2xs backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0075ff]/10 text-[#0075ff] flex items-center justify-center font-bold shrink-0">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-foreground font-heading">
              Career Roadmap &amp; Engineering Trajectory
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing {filteredItems.length} verified professional milestones &amp; industry leadership roles.
            </p>
          </div>
        </div>

        {/* Search Milestone Box */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, stack, or organization..."
            className="w-full bg-background border border-border/80 text-foreground placeholder:text-muted-foreground/60 text-xs pl-9 pr-8 py-2 rounded-xl focus:outline-none focus:border-[#0075ff] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground font-mono"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Modern Connected Roadmap Timeline Track */}
      <div className="relative">
        
        {/* Continuous Central Glowing Roadmap Spine Line */}
        <div className="absolute left-4 sm:left-8 md:left-1/2 top-4 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0075ff] via-[#0075ff]/60 to-transparent pointer-events-none hidden md:block" />
        
        {/* Mobile Left-Aligned Spine Line */}
        <div className="absolute left-6 top-4 bottom-8 w-0.5 bg-gradient-to-b from-[#0075ff] via-[#0075ff]/60 to-transparent pointer-events-none md:hidden" />

        {/* Roadmap Nodes & Milestone Cards */}
        <div className="space-y-12 md:space-y-16">
          {filteredItems.map((item, idx) => {
            const isEven = idx % 2 === 0

            return (
              <div
                key={item.id || idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                
                {/* 1. Milestone Roadmap Card Content (Half width on desktop) */}
                <div className="w-full md:w-[calc(50%-3rem)] pl-14 sm:pl-16 md:pl-0">
                  <article className="group relative bg-card/80 dark:bg-card border border-border/80 hover:border-[#0075ff]/60 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4">
                    
                    {/* Top Tag & Date Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono font-extrabold px-2.5 py-1 rounded-md bg-[#0075ff]/10 text-[#0075ff] border border-[#0075ff]/20 flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3" />
                          <span>Professional Role</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground">
                        <Calendar size={13} className="text-[#0075ff]" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Role Title & Organization */}
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-[#0075ff] transition-colors font-heading tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{item.organization}</span>
                        </span>
                        {item.role && item.role !== item.title && (
                          <span className="text-muted-foreground font-normal">
                            • {item.role}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Key Competencies / Skill Chips */}
                    {item.details && item.details.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-border/40">
                        {item.details.map((detail, i) => (
                          <span
                            key={i}
                            className="text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border/70 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#0075ff] shrink-0" />
                            <span>{detail}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Visual Evidence / Photo Documentation if Available */}
                    {item.images && item.images.length > 0 && (
                      <div className="pt-3 border-t border-border/40 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                          Visual Evidence ({item.images.length})
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-0.5">
                          {item.images.map((imgUrl, imgIdx) => (
                            <a
                              key={imgIdx}
                              href={imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/img relative aspect-video rounded-lg overflow-hidden border border-border/80 bg-neutral-900 block"
                            >
                              <Image
                                src={imgUrl}
                                alt={`${item.title} documentation ${imgIdx + 1}`}
                                fill
                                unoptimized={imgUrl.startsWith("http") && !imgUrl.includes("res.cloudinary.com") && !imgUrl.includes("blob.vercel-storage.com")}
                                sizes="(max-width: 640px) 50vw, 33vw"
                                className="object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <ExternalLink className="w-3.5 h-3.5 text-white" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </article>
                </div>

                {/* 2. Central Roadmap Checkpoint Node on the Spine */}
                <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-[#0075ff] shadow-[0_0_15px_rgba(0,117,255,0.4)] flex items-center justify-center text-[#0075ff]">
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* 3. Balanced Spacer Column on Desktop */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />

              </div>
            )
          })}
        </div>

      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl space-y-3">
          <p className="text-sm font-semibold text-foreground">No career milestone matches your search.</p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 bg-[#0075ff] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  )
}

