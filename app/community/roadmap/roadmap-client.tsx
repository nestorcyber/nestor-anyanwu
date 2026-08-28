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
  Truck,
  LayoutGrid,
  ArrowLeft,
  Search,
  CheckCircle2,
  X,
  Maximize2,
} from "lucide-react"
import type { CommunityEntry } from "@/lib/content"
import Footer from "@/components/footer"
import CommunityCTA from "@/components/community/community-cta"

interface RoadmapClientProps {
  entries: CommunityEntry[]
}

const PILLAR_CATEGORIES = [
  "All",
  "Community & DevRel",
  "Technical & Systems",
  "Design & Brand Staging",
  "Media & Documentation",
  "Logistics & Hospitality",
  "Event Setup & Staging",
] as const

type PillarCategory = typeof PILLAR_CATEGORIES[number]

function getInitiativeCategory(entry: CommunityEntry): PillarCategory {
  const text = `${entry.organization} ${entry.role} ${entry.tags?.join(" ") || ""} ${entry.description}`.toLowerCase()
  if (text.includes("media") || text.includes("photo") || text.includes("camera") || text.includes("press") || text.includes("video") || text.includes("documentation")) {
    return "Media & Documentation"
  }
  if (text.includes("design") || text.includes("brand") || text.includes("visual") || text.includes("graphic") || text.includes("collateral")) {
    return "Design & Brand Staging"
  }
  if (text.includes("ict") || text.includes("tech") || text.includes("code") || text.includes("developer") || text.includes("web") || text.includes("software") || text.includes("systems") || text.includes("infrastructure")) {
    return "Technical & Systems"
  }
  if (text.includes("logistics") || text.includes("front desk") || text.includes("hospitality") || text.includes("check-in") || text.includes("protocol") || text.includes("welfare")) {
    return "Logistics & Hospitality"
  }
  if (text.includes("setup") || text.includes("staging") || text.includes("stage") || text.includes("hall") || text.includes("venue")) {
    return "Event Setup & Staging"
  }
  return "Community & DevRel"
}

function getInitiativeIcon(category: PillarCategory) {
  switch (category) {
    case "Media & Documentation":
      return Camera
    case "Design & Brand Staging":
      return Palette
    case "Technical & Systems":
      return Code2
    case "Logistics & Hospitality":
      return Truck
    case "Event Setup & Staging":
      return LayoutGrid
    case "Community & DevRel":
    default:
      return Users2
  }
}

export default function RoadmapClient({ entries }: RoadmapClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Filter items based on search and contribution category
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const category = getInitiativeCategory(item)

      // Category filter matching How I Contribute
      if (selectedCategory !== "All") {
        if (category !== selectedCategory) {
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
  }, [entries, selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full font-sans">
      
      {/* ─── Simple Clean Hero Header (Matching Certifications Style) ─── */}
      <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-16">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-4">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#0075ff]" />
              <span>Back to Community</span>
            </Link>
            <span>/</span>
            <span className="text-[#0075ff] font-semibold">Community Roadmap</span>
          </div>

          {/* Left-Aligned Heading with Verified Icon */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight font-heading leading-[1.18]">
              Community &amp; <span className="text-[#0075ff]">Volunteering</span>{" "}
              <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                Roadmap
                <span className="inline-flex items-center justify-center text-[#0075ff] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 drop-shadow-[0_4px_12px_rgba(0,117,255,0.3)] align-middle">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.28 4.22l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-3xl">
              Explore a chronological roadmap documenting grassroots tech leadership, student engineering chapters, developer conferences, and community advocacy initiatives.
            </p>
          </div>

        </div>
      </div>

      {/* ─── Main Content Section ─── */}
      <main className="flex-1 w-full relative py-10 sm:py-14 md:py-16">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
          
          {/* ─── Simple Search & Category Filter Bar (Matching Journal Style) ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
            
            {/* Category Filter Buttons (How I Contribute Pillars) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {PILLAR_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#0075ff] text-white border-[#0075ff] shadow-xs font-bold"
                      : "bg-secondary/70 text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Simple Search Input Box */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search initiatives..."
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-secondary/70 border border-border/80 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075ff]"
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

          </div>

          {/* Filter Status */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
            <span>
              Showing {filteredEntries.length} of {entries.length} initiatives
            </span>
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="text-[#0075ff] hover:underline cursor-pointer font-bold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* ─── Road Timeline Track ─── */}
          {filteredEntries.length > 0 ? (
            <div className="relative max-w-4xl mx-auto pt-4 pb-4">
              
              {/* Vertical Highway Road Track (Left Side) */}
              <div className="absolute left-5 sm:left-7 md:left-9 top-4 bottom-8 w-6 sm:w-7 md:w-8 -translate-x-1/2 bg-slate-900 dark:bg-slate-950 border-x-2 border-slate-700/80 dark:border-slate-800 rounded-full shadow-inner flex items-center justify-center pointer-events-none overflow-hidden z-0">
                {/* Center Road Dashed Lane Divider */}
                <div className="w-[2px] h-full bg-[repeating-linear-gradient(to_bottom,#0075ff_0,#0075ff_14px,transparent_14px,transparent_28px)] opacity-80" />
              </div>

              {/* Road Milestones Items */}
              <div className="space-y-10 sm:space-y-12 relative z-10">
                {filteredEntries.map((item, idx) => {
                  const category = getInitiativeCategory(item)
                  const InitiativeIcon = getInitiativeIcon(category)
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
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-mono font-bold text-[#0075ff] uppercase tracking-wider">
                                  {item.organization}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground font-semibold">
                                  {category}
                                </span>
                              </div>
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
              <p className="text-xs text-muted-foreground">Try clearing your search query or selecting a different category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
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
