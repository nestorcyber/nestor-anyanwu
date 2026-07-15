"use client"

import { useState } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import { Calendar, Users, Heart, Award, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const volunteerEvents = [
  {
    id: 1,
    title: "IEEE FUTO Student Branch",
    role: "Event Logistics",
    date: "May 2026 – Present",
    category: "Engineering",
    description: "Supporting IEEE FUTO Student Branch events through logistics coordination and on-ground event management.",
    tags: ["Event Logistics", "IEEE", "Engineering"],
    images: [],
    accent: "#2563eb",
  },
  {
    id: 2,
    title: "Federal University of Technology Owerri",
    role: "Media Team",
    date: "Dec 2025 – Present",
    category: "Media",
    description: "Contributing to FUTO's official media team, supporting documentation, photography, and visual communications for university events.",
    tags: ["Photography", "Media", "Documentation"],
    images: [],
    accent: "#7c3aed",
  },
  {
    id: 3,
    title: "Emerging Leaders Conference",
    role: "Media Team",
    date: "Dec 2025",
    category: "Leadership",
    description: "Served on the Media Team for the Emerging Leaders Conference by GOTNI, capturing impactful moments and supporting digital documentation of this leadership event.",
    tags: ["Media", "Leadership", "GOTNI"],
    images: [],
    accent: "#0891b2",
  },
  {
    id: 4,
    title: "Edensprime Hospitality Summit",
    role: "Event Setup",
    date: "Nov 2025",
    category: "Events",
    description: "Contributed to the success of the Edensprime Hospitality Summit through dedicated event setup and coordination.",
    tags: ["Event Setup", "Hospitality", "FLE Global"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden3%280%29-Md3eT61Brp60MhmfTcGcfxvEaFIHqs.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden5-LDykBdjx1JiJvGYDIdliITuBi0V8Ke.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden1-iePEIbrkoW7wba4cbBoCLfkFEsqQTU.jpg",
    ],
    accent: "#d97706",
  },
  {
    id: 5,
    title: "FLE Conference",
    role: "Event Setup",
    date: "Nov 2025",
    category: "Leadership",
    description: "Supported the Faith Life, Leadership & Entrepreneurship Conference by managing event setup logistics behind the scenes.",
    tags: ["Event Setup", "Entrepreneurship", "FLE Global"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle2%280%29-FfRbgx2cSla1HuEuvaPzlOe8rKfEcm.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle4-n7IdoFLGvctWYMK2ZspbSaqYEJz6n7.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle1%280%29-RFztiDFA8wlZ5TUikrNKon6EVYY0te.jpg",
    ],
    accent: "#059669",
  },
  {
    id: 6,
    title: "DevFest Owerri 2025",
    role: "Major Designer & Events Support",
    date: "Nov 2025",
    category: "Tech",
    description: "Supported the largest developer festival in South-East Nigeria through major design contributions and event logistics.",
    tags: ["Graphic Design", "GDG", "Tech Festival"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
    ],
    accent: "#4f46e5",
  },
  {
    id: 7,
    title: "Gold In Real Estate Conference",
    role: "Media Team & Welfare Team",
    date: "Nov 2025",
    category: "Media",
    description: "Served on both the Media and Welfare teams, capturing key moments while ensuring the comfort of guests and speakers.",
    tags: ["Media", "Welfare", "Real Estate"],
    images: [],
    accent: "#b45309",
  },
  {
    id: 8,
    title: "FUTO Alumni Homecoming 2025",
    role: "Media and Photography",
    date: "Aug 2025",
    category: "Media",
    description: "Captured memorable moments from FUTO Alumni Homecoming 2025 through professional media and photography.",
    tags: ["Photography", "Alumni", "FUTO"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3%280%29-0OUNedcByaDnTaTWc7tAWWQQ2E60ff.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f2%280%29-pBS7ttoTwcS5IQq7BxPQga9W14pDXS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1%280%29-wdxseBoOzK6wN6TpiXjYnUVh67MS1C.jpg",
    ],
    accent: "#0284c7",
  },
  {
    id: 9,
    title: "Tech Nexus FUTO",
    role: "Design, Event Setup & Photography",
    date: "Aug 2025",
    category: "Tech",
    description: "Contributed to event design, setup, and photography at Tech Nexus — a community tech event at FUTO.",
    tags: ["Design", "Photography", "GDG Campus"],
    images: [],
    accent: "#4f46e5",
  },
  {
    id: 10,
    title: "AWS Cloud Club FUTO",
    role: "Front Desk",
    date: "Aug – Sep 2025",
    category: "Tech",
    description: "Served at the front desk for AWS Cloud Club FUTO events, managing attendee registration and on-site coordination.",
    tags: ["AWS", "Cloud Community", "Event Coordination"],
    images: [],
    accent: "#f59e0b",
  },
  {
    id: 11,
    title: "GDG on Campus FUTO",
    role: "Graphic Designer",
    date: "Jul 2025 – Present",
    category: "Design",
    description: "Designing visual content and brand communications for GDG on Campus FUTO, supporting student developer community events.",
    tags: ["Graphic Design", "GDG", "Campus"],
    images: [],
    accent: "#10b981",
  },
  {
    id: 12,
    title: "Hack4Futo",
    role: "Graphic Designer",
    date: "Jun 2025 – Present",
    category: "Design",
    description: "Creating design assets and visual branding for Hack4Futo, a student-driven hackathon and innovation community.",
    tags: ["Hackathon", "Branding", "Design"],
    images: [],
    accent: "#6366f1",
  },
  {
    id: 13,
    title: "CMX",
    role: "Graphic Designer",
    date: "Dec 2024 – Present",
    category: "Design",
    description: "Designing visual content and community assets for CMX, a global community management network.",
    tags: ["Graphic Design", "Community", "Global"],
    images: [],
    accent: "#ec4899",
  },
  {
    id: 14,
    title: "GDG Owerri",
    role: "Graphic Designer",
    date: "Sep 2024 – Present",
    category: "Design",
    description: "Creating visual assets, branding materials, and design support for Google Developer Group Owerri events.",
    tags: ["Graphic Design", "GDG", "Branding"],
    images: [],
    accent: "#0ea5e9",
  },
]

const categories = ["All", "Tech", "Design", "Media", "Events", "Leadership", "Engineering"]

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = activeCategory === "All"
    ? volunteerEvents
    : volunteerEvents.filter(e => e.category === activeCategory)

  return (
    <>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* Hero Section - Creative Split */}
        <section className="relative bg-primary overflow-hidden min-h-[100svh] md:min-h-[90vh] flex items-center">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />

          {/* Full bleed image — right half desktop / full bleed mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"
              alt="Nestor volunteering at community event"
              fill
              className="object-cover object-top md:object-center"
              priority
            />
            {/* Gradient fade — stronger on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/30 lg:bg-gradient-to-r lg:from-primary lg:via-primary/60 lg:to-transparent" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary to-transparent" />
          </div>

          {/* Text content — left / centered on mobile */}
          <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-16 pb-40 md:py-24 max-w-7xl mx-auto w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-8 bg-accent" />
                <p className="text-accent text-xs font-black tracking-widest uppercase">
                  Giving Back · Making Impact
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-5 leading-none tracking-tighter">
                Community<br />
                <span className="text-accent">&</span><br />
                <span className="italic font-light text-white/60">Volunteering</span>
              </h1>

              <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed font-medium mb-8 border-l-2 border-accent/40 pl-4">
                &ldquo;Service is the rent you pay for room on this earth.&rdquo; — From tech festivals to leadership conferences,
                here&apos;s a living record of impact, creativity and community across Nigeria.
              </p>

              {/* Stat pills — inline on all screens */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: <Heart className="w-3.5 h-3.5" />, label: `${volunteerEvents.length}+ Engagements` },
                  { icon: <Users className="w-3.5 h-3.5" />, label: "6+ Communities" },
                  { icon: <Calendar className="w-3.5 h-3.5" />, label: "Since 2021" },
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: "5+ Institutions" },
                  { icon: <Award className="w-3.5 h-3.5" />, label: "Media · Design · Logistics" },
                ].map((pill) => (
                  <div key={pill.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-white/80 text-xs font-semibold">
                    <span className="text-accent">{pill.icon}</span>
                    {pill.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-14 md:top-16 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 md:px-12 lg:px-24 py-3">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-transparent text-foreground/60 border-border hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Cards Grid */}
        <section className="px-6 md:px-12 lg:px-24 py-14">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-center py-24 text-foreground/40">
                <Award className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">No entries in this category</p>
              </div>
            )}
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
  event: (typeof volunteerEvents)[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  const [imgIdx, setImgIdx] = useState(0)
  const hasImages = event.images && event.images.length > 0

  return (
    <div
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col ${
        isExpanded ? "ring-2 ring-accent" : ""
      }`}
      onClick={onToggle}
    >
      {/* Image or Color Block */}
      {hasImages ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.images[imgIdx]}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category badge */}
          <span
            className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: event.accent }}
          >
            {event.category}
          </span>
          {/* Image nav dots */}
          {event.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {event.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white scale-125" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
          {/* Arrows */}
          {event.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + event.images.length) % event.images.length) }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % event.images.length) }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      ) : (
        <div
          className="h-24 flex items-end px-5 pb-4 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${event.accent}22, ${event.accent}44)` }}
        >
          <div
            className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20"
            style={{ backgroundColor: event.accent }}
          />
          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: event.accent }}
          >
            {event.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {event.date}
            </p>
            <h3 className="text-base font-extrabold text-foreground leading-tight">{event.title}</h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: event.accent }}>{event.role}</p>
          </div>
        </div>

        {/* Expanded description */}
        {isExpanded && (
          <p className="text-sm text-foreground/70 leading-relaxed mt-3 mb-3 border-t border-border pt-3">
            {event.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold border"
              style={{ color: event.accent, borderColor: `${event.accent}44`, backgroundColor: `${event.accent}11` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[10px] text-foreground/30 mt-3 font-medium">
          {isExpanded ? "Click to collapse" : "Click to read more"}
        </p>
      </div>
    </div>
  )
}
