"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { Calendar, Users, Heart, Award, ChevronLeft, ChevronRight, MapPin, ArrowUpRight, Mail } from "lucide-react"

export type CommunityEvent = {
  id: string
  title: string
  role: string
  date: string
  category: string
  description: string
  tags: string[]
  images: string[]
  accent: string
  href?: string
}

export default function CommunityPage({ events }: { events: CommunityEvent[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category).filter(Boolean)))]

  const filtered = activeCategory === "All"
    ? events
    : events.filter(e => e.category === activeCategory)

  return (
    <>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* 1. HERO SECTION: DESKTOP SPLIT / MOBILE STACK */}
        <section className="w-full pt-20 md:pt-24 pb-12 md:pb-16 border-b border-border bg-background relative">
          <div className="site-container space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Hero Headline, Role Tags & CTAs (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
                    <span className="px-3 py-1 rounded-2xl bg-[#0056D2] text-white border border-[#0056D2] shadow-xs">
                      NACOS FUTO
                    </span>
                    <span className="px-3 py-1 rounded-2xl bg-card text-foreground border border-border shadow-xs">
                      IEEE Student Branch
                    </span>
                    <span className="px-3 py-1 rounded-2xl bg-card text-foreground border border-border shadow-xs">
                      GDG Owerri
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight font-heading">
                    Community &amp; Tech Advocacy
                  </h1>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-light">
                    Empowering developers, directing student tech councils, organizing hackathons, and volunteering to foster an inclusive, collaborative tech ecosystem where everyone can thrive.
                  </p>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/contact"
                    className="bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl border border-[#0056D2] shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Users size={15} />
                    <span>Join The Community</span>
                  </Link>

                  <a
                    href="#community-grid"
                    className="bg-card hover:bg-secondary text-foreground border border-border rounded-2xl font-extrabold text-xs uppercase tracking-wider px-6 py-3 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore Initiatives</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              {/* Right Column: Integrated Featured Community Highlight Card (lg:col-span-5) */}
              <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 shadow-md flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0056D2]">
                      FEATURED HIGHLIGHT
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      FLAGSHIP INITIATIVE
                    </span>
                  </div>

                  <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden border border-border bg-[#020617]">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"
                      alt="Nestor volunteering at community event"
                      fill
                      className="object-cover object-[50%_18%]"
                      priority
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      NACOS FUTO Director of Software
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      Spearheading software development, technical bootcamps, and digital capacity building for over 3,000 computing undergraduates.
                    </p>
                  </div>
                </div>

                <Link href="/community/nacos-futo-ict-directorate" className="block pt-2">
                  <div className="w-full py-2.5 rounded-2xl bg-[#0056D2] hover:bg-[#0044a8] text-white text-center font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>View Community Profile</span>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>

            </div>

          </div>
        </section>



        {/* 3. SEGMENTED FILTER BAR & CARDS GRID */}
        <section id="community-grid" className="w-full py-12 md:py-16 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-foreground font-heading">
                All Community Initiatives
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "RESULT" : "RESULTS"}
              </span>
            </div>

            {/* Segmented Filter Bar */}
            <div className="p-1.5 rounded-2xl bg-card border border-border shadow-sm flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer select-none rounded-2xl border ${
                    activeCategory === cat
                      ? "bg-[#0056D2] text-white border-[#0056D2]"
                      : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filtered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isExpanded={expandedId === event.id}
                  onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-border/60 text-muted-foreground font-mono text-xs uppercase">
                <Award className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                <p>No community entries found under &quot;{activeCategory}&quot;.</p>
              </div>
            )}
          </div>
        </section>

        {/* 4. FINAL CALL TO ACTION */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0B1C2C] dark:bg-[#0F172A] text-[#F1F5F9] rounded-2xl border border-border shadow-xl p-8 sm:p-12 md:p-16 text-center space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase max-w-3xl mx-auto font-heading leading-snug">
                Let&apos;s Build Stronger Tech Ecosystems Together
              </h2>

              <p className="text-[#CBD5E1] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                Interested in inviting Nestor for technical keynotes, community mentorship, student hackathon organization, or developer advocacy partnerships?
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="bg-[#0056D2] hover:bg-[#0044a8] text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-2xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Users size={15} />
                  <span>Get Involved</span>
                </Link>

                <a
                  href="mailto:nestoranyanwu@gmail.com"
                  className="bg-[#020617] hover:bg-[#1E293B] text-[#F1F5F9] border border-[#1E293B] rounded-2xl font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Mail size={15} />
                  <span>Contact Nestor</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

function EventCard({
  event,
  isExpanded,
  onToggle,
}: {
  event: CommunityEvent
  isExpanded: boolean
  onToggle: () => void
}) {
  const [imgIdx, setImgIdx] = useState(0)
  const hasImages = event.images && event.images.length > 0

  return (
    <div
      className="group border border-border bg-card rounded-2xl p-5 flex flex-col justify-between h-full transition-all shadow-sm hover:shadow-lg hover:border-[#0056D2] hover:-translate-y-1 cursor-pointer"
      onClick={onToggle}
    >
      <div className="space-y-4">
        {/* Cover Image Container */}
        {hasImages ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#020617] border border-border">
            <Image
              src={event.images[imgIdx]}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-2xl bg-[#0056D2] text-white shadow-xs">
              {event.category}
            </span>

            {event.images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {event.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                    className={`w-2 h-2 rounded-full transition-all border border-[#020617] ${i === imgIdx ? "bg-[#0056D2]" : "bg-white/80"}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-20 rounded-2xl bg-secondary flex items-center justify-between px-4 border border-border">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-2xl bg-[#0056D2] text-white">
              {event.category}
            </span>
            <Users className="w-5 h-5 text-[#0056D2]" />
          </div>
        )}

        {/* Content Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-accent" />
              {event.date}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
            {event.title}
          </h3>

          <p className="text-xs font-bold text-accent uppercase tracking-wider">
            {event.role}
          </p>

          <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
            {event.description}
          </p>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase px-2 py-0.5 bg-secondary text-foreground border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
        {event.href ? (
          <Link
            href={event.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-accent uppercase tracking-wider transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="text-xs font-mono text-accent uppercase font-bold flex items-center gap-1">
            <span>{isExpanded ? "Collapse" : "Read Summary"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  )
}
