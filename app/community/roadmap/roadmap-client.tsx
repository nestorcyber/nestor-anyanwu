"use client"

import React, { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  HeartHandshake,
  MapPin,
  Camera,
  Palette,
  Code2,
  Users2,
  CalendarCheck2,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  X,
  Maximize2,
  Award,
  Layers,
} from "lucide-react"
import type { CommunityEntry } from "@/lib/content"
import Footer from "@/components/footer"
import CommunityCTA from "@/components/community/community-cta"

interface RoadmapClientProps {
  entries: CommunityEntry[]
}

function getInitiativeIcon(entry: CommunityEntry) {
  const text = `${entry.organization} ${entry.role} ${entry.tags?.join(" ") || ""} ${entry.description}`.toLowerCase()
  if (text.includes("media") || text.includes("photo") || text.includes("camera") || text.includes("video")) {
    return Camera
  }
  if (text.includes("design") || text.includes("brand") || text.includes("visual") || text.includes("graphic")) {
    return Palette
  }
  if (text.includes("ict") || text.includes("tech") || text.includes("code") || text.includes("developer") || text.includes("web") || text.includes("software") || text.includes("cloud")) {
    return Code2
  }
  if (text.includes("logistics") || text.includes("setup") || text.includes("event") || text.includes("summit") || text.includes("conference") || text.includes("stage")) {
    return CalendarCheck2
  }
  if (text.includes("lead") || text.includes("director") || text.includes("ambassador") || text.includes("president")) {
    return Users2
  }
  return HeartHandshake
}

export default function RoadmapClient({ entries }: RoadmapClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Extract distinct years from durations (e.g., "Dec 2025 - Present", "Nov 2025", "2024")
  const years = useMemo(() => {
    const set = new Set<string>()
    entries.forEach((item) => {
      const match = item.duration.match(/20\d{2}/g)
      if (match) {
        match.forEach((y) => set.add(y))
      }
    })
    return Array.from(set).sort((a, b) => Number(b) - Number(a))
  }, [entries])

  // Extract distinct tags across all community initiatives
  const allTags = useMemo(() => {
    const set = new Set<string>()
    entries.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((t) => set.add(t.trim()))
      }
    })
    return ["All", ...Array.from(set)]
  }, [entries])

  // Filter items based on search, year, and tag
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      // Year filter
      if (selectedYear !== "all") {
        if (!item.duration.includes(selectedYear)) {
          return false
        }
      }

      // Tag filter
      if (selectedTag !== "all" && selectedTag !== "All") {
        if (!item.tags || !item.tags.includes(selectedTag)) {
          return false
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchText = `${item.organization} ${item.role} ${item.description} ${item.achievements?.join(" ") || ""} ${item.tags?.join(" ") || ""}`.toLowerCase()
        if (!matchText.includes(query)) {
          return false
        }
      }

      return true
    })
  }, [entries, selectedYear, selectedTag, searchQuery])

  const totalInitiatives = entries.length

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full font-sans">
      
      {/* ─── Hero Header & Breadcrumb ─── */}
      <header className="relative w-full bg-slate-950 text-white pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-800 overflow-hidden">
        {/* Background glow ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0075ff]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="site-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0075ff]" />
              <span>Back to Community</span>
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Community &amp; Advocacy Roadmap</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0075ff]/15 border border-[#0075ff]/30 text-xs font-mono font-bold text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY &amp; ADVOCACY INITIATIVES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight leading-[1.12] text-white">
              Community &amp; Volunteering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0075ff] via-sky-400 to-indigo-300">
                Roadmap
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
              Live chronological archive of community leadership initiatives, student engineering mentorship, tech summit operations, and grassroots advocacy programs.
            </p>
          </div>

          {/* Stat Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <p className="text-2xl sm:text-3xl font-black font-heading text-white">{totalInitiatives}+</p>
              <p className="text-xs text-slate-400 font-mono">Published Initiatives</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <p className="text-2xl sm:text-3xl font-black font-heading text-[#0075ff]">5,000+</p>
              <p className="text-xs text-slate-400 font-mono">Students &amp; Delegates</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <p className="text-2xl sm:text-3xl font-black font-heading text-sky-400">100%</p>
              <p className="text-xs text-slate-400 font-mono">Dashboard Synced</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <p className="text-2xl sm:text-3xl font-black font-heading text-indigo-400">Active</p>
              <p className="text-xs text-slate-400 font-mono">Grassroots Advocacy</p>
            </div>
          </div>

        </div>
      </header>

      {/* ─── Search, Filter Bar & Road Timeline ─── */}
      <main className="flex-1 w-full relative py-12 sm:py-16 md:py-20">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-10">
          
          {/* Controls: Search & Filters */}
          <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by initiative, chapter, role, or impact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075ff]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Year Select Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedYear === "all"
                      ? "bg-[#0075ff] text-white shadow-xs"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Years
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedYear === year
                        ? "bg-[#0075ff] text-white shadow-xs"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter Chips */}
            {allTags.length > 1 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border/50">
                <span className="text-xs font-mono font-bold text-muted-foreground mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  Focus Area:
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                        : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Filter Status Text */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
            <span>
              Showing {filteredEntries.length} of {totalInitiatives} Community &amp; Advocacy Initiatives
            </span>
            {(selectedYear !== "all" || selectedTag !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedYear("all")
                  setSelectedTag("all")
                  setSearchQuery("")
                }}
                className="text-[#0075ff] hover:underline cursor-pointer font-bold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* ─── The Complete Road Timeline Track ─── */}
          {filteredEntries.length > 0 ? (
            <div className="relative max-w-4xl mx-auto pt-6 pb-4">
              
              {/* Vertical Highway Road Track (Left Side) */}
              <div className="absolute left-5 sm:left-7 md:left-9 top-4 bottom-8 w-6 sm:w-7 md:w-8 -translate-x-1/2 bg-slate-900 dark:bg-slate-950 border-x-2 border-slate-700/80 dark:border-slate-800 rounded-full shadow-inner flex items-center justify-center pointer-events-none overflow-hidden z-0">
                {/* Center Road Dashed Lane Divider */}
                <div className="w-[2px] h-full bg-[repeating-linear-gradient(to_bottom,#0075ff_0,#0075ff_14px,transparent_14px,transparent_28px)] opacity-80" />
              </div>

              {/* Road Milestones Items */}
              <div className="space-y-10 sm:space-y-12 relative z-10">
                {filteredEntries.map((item, idx) => {
                  const InitiativeIcon = getInitiativeIcon(item)
                  const hasImage = item.coverImage && !item.coverImage.includes("placeholder")
                  const coverSrc = hasImage ? item.coverImage : (item.gallery && item.gallery[0] ? item.gallery[0] : null)

                  return (
                    <div
                      key={item.id || item.slug || idx}
                      className="relative flex items-start group"
                    >
                      {/* Waypoint Node (Centered on Left Road Track) */}
                      <div className="absolute left-5 sm:left-7 md:left-9 -translate-x-1/2 top-4 z-20">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-[0_0_18px_rgba(0,117,255,0.45)] border-2 border-[#0075ff] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#0075ff] group-hover:text-white">
                          <InitiativeIcon className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Horizontal Connector Branch */}
                      <div className="absolute left-5 sm:left-7 md:left-9 top-9 w-8 sm:w-10 md:w-12 h-[2px] bg-gradient-to-r from-[#0075ff] to-[#0075ff]/40 pointer-events-none z-10" />

                      {/* Milestone Card Container */}
                      <div className="w-full pl-14 sm:pl-18 md:pl-22">
                        <article className="bg-card border border-border/80 hover:border-[#0075ff] rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 relative">
                          {/* Pointer notch */}
                          <div className="hidden sm:block absolute -left-2 top-4 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-border" />

                          {/* Header Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-border/60">
                            <div className="space-y-0.5">
                              <h3 className="text-lg sm:text-xl font-bold text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                                {item.organization}
                              </h3>
                              {item.role && (
                                <p className="text-xs sm:text-sm font-semibold text-[#0075ff]">
                                  {item.role}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0075ff] px-2.5 py-1 rounded-md bg-[#0075ff]/10 border border-[#0075ff]/20 whitespace-nowrap">
                                <Calendar className="w-3 h-3" />
                                <span>{item.duration}</span>
                              </span>
                            </div>
                          </div>

                          {/* Photo Attachment (If available) */}
                          {coverSrc && (
                            <div
                              onClick={() => setSelectedImage(coverSrc)}
                              className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-border/60 cursor-pointer group/img"
                            >
                              <Image
                                src={coverSrc}
                                alt={item.organization}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                sizes="(max-width: 768px) 100vw, 650px"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-mono text-xs">
                                <Maximize2 className="w-4 h-4" />
                                <span>Click to expand</span>
                              </div>
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                            {item.description}
                          </p>

                          {/* Key Deliverables / Achievements */}
                          {item.achievements && item.achievements.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-border/60">
                              <h4 className="text-[11px] font-mono font-bold text-foreground/80 uppercase tracking-wider">
                                Key Impact Deliverables
                              </h4>
                              <ul className="space-y-1.5">
                                {item.achievements.map((achieve, aIdx) => (
                                  <li key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0075ff] shrink-0 mt-0.5" />
                                    <span>{achieve}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Impact Metrics Badges (If available) */}
                          {item.impactStats && item.impactStats.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                              {item.impactStats.map((stat, sIdx) => (
                                <div key={sIdx} className="p-2.5 rounded-xl bg-secondary/70 border border-border/50 text-center space-y-0.5">
                                  <p className="text-sm font-black font-heading text-[#0075ff]">{stat.value}</p>
                                  <p className="text-[10px] font-mono text-muted-foreground">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Detail / Skills Tag Chips */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
                              {item.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground text-[11px] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                        </article>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border/80 space-y-3">
              <p className="text-base font-bold text-foreground">No matching community initiatives found.</p>
              <p className="text-xs text-muted-foreground">Try clearing your search query or selecting a different year/filter.</p>
              <button
                onClick={() => {
                  setSelectedYear("all")
                  setSelectedTag("all")
                  setSearchQuery("")
                }}
                className="mt-2 text-xs font-bold text-[#0075ff] underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] h-[60vh] sm:h-[75vh] bg-slate-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
          >
            <Image
              src={selectedImage}
              alt="Initiative photograph"
              fill
              priority
              className="object-contain"
              sizes="1000px"
            />
          </div>
        </div>
      )}

      {/* ─── Bottom CTA ─── */}
      <CommunityCTA
        title="Ready to Partner on a Community Initiative?"
        description="Whether you are organizing a regional tech summit, looking for a technical workshop facilitator, or launching a grassroots student bootcamp, let's connect."
        buttonText="Propose A Collaboration"
        buttonHref="/contact"
      />

      {/* ─── Global Footer ─── */}
      <Footer />

    </div>
  )
}
