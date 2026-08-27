import React from "react"
import Image from "next/image"
import { ShieldCheck, Globe, Cpu, Award, Network, Building2, CheckCircle2 } from "lucide-react"
import type { JourneyItem } from "@/lib/content"

export interface MembershipCardItem {
  id: string
  organization: string
  acronym: string
  role: string
  date: string
  description: string
  focus: string[]
  icon: React.ElementType
  image?: string
}

/**
 * Blue Ribbon Overlay:
 * Clean, modern blue ribbon shape starting from the top edge with the iconic
 * swallowtail (inverted-V) notch at the bottom.
 */
export function BlueRibbonOverlay() {
  return (
    <div className="absolute top-0 left-6 sm:left-7 z-20 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none">
      <svg
        width="32"
        height="48"
        viewBox="0 0 32 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-7.5 sm:w-6 sm:h-9"
      >
        <defs>
          <linearGradient id="memberBlueRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0075ff" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="memberBlueFoldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#075985" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* Top Fold starting flush from edge */}
        <path d="M 3 0 L 29 0 L 32 5 L 0 5 Z" fill="url(#memberBlueFoldDark)" />

        {/* Main Body with Swallowtail (Inverted V) Notch */}
        <path d="M 1 4 L 31 4 L 31 42 L 16 33 L 1 42 Z" fill="url(#memberBlueRibbon)" />

        {/* Left inner shadow */}
        <path d="M 1 4 L 5 4 L 5 39 L 1 42 Z" fill="#075985" opacity="0.35" />

        {/* Right edge highlight */}
        <path d="M 27 4 L 31 4 L 31 42 L 27 39 Z" fill="#bae6fd" opacity="0.35" />
      </svg>
    </div>
  )
}

export function getMembershipIcon(org: string, details: string[] = []): React.ElementType {
  const text = `${org} ${details.join(" ")}`.toLowerCase()
  if (text.includes("ai") || text.includes("intelligence") || text.includes("machine") || text.includes("aaai")) return Cpu
  if (text.includes("privacy") || text.includes("security") || text.includes("protection") || text.includes("nira") || text.includes("ndpc")) return ShieldCheck
  if (text.includes("internet") || text.includes("isoc") || text.includes("web") || text.includes("domain") || text.includes("global")) return Globe
  if (text.includes("fintech") || text.includes("finance") || text.includes("payment") || text.includes("invest") || text.includes("asset")) return Network
  if (text.includes("society") || text.includes("ncs") || text.includes("nacos") || text.includes("association") || text.includes("institution")) return Building2
  return Award
}

export function getMembershipImage(item: { id?: string; organization?: string; title?: string; image?: string }): string {
  if (item.image) return item.image
  const text = `${item.id || ""} ${item.organization || ""} ${item.title || ""}`.toLowerCase()

  if (text.includes("privacy") || text.includes("ndpc")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837064/nestor/certificates/ndpc-cert.jpg"
  }
  if (text.includes("ieee") || text.includes("engineer")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837061/nestor/certificates/ieee-cert.jpg"
  }
  if (text.includes("ncs") || text.includes("computer society")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837125/nestor/gallery/futo-1.jpg"
  }
  if (text.includes("aaai") || text.includes("artificial intelligence") || text.includes("ai")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837087/nestor/gallery/bwai-team.jpg"
  }
  if (text.includes("isoc") || text.includes("internet society")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837093/nestor/gallery/developer-conference.jpg"
  }
  if (text.includes("fintech") || text.includes("finance") || text.includes("investment")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837164/nestor/gallery/real-estate-conference.jpg"
  }
  if (text.includes("nira") || text.includes("registration") || text.includes("domain")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837148/nestor/gallery/gire-hall.jpg"
  }
  if (text.includes("gotni") || text.includes("leaders")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837059/nestor/certificates/gotni-cert.jpg"
  }
  return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837168/nestor/gallery/tech-community.jpg"
}

export function extractAcronym(org: string): string {
  const parenMatch = org.match(/\(([^)]+)\)/)
  if (parenMatch && parenMatch[1]) return parenMatch[1]
  const words = org.split(" ").filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
  if (words.length >= 2 && words.length <= 5) {
    return words.map((w) => w[0]).join("")
  }
  return "Affiliation"
}

export function mapJourneyToMembership(item: JourneyItem): MembershipCardItem {
  const org = item.organization || item.title
  const image = item.images && item.images.length > 0 ? item.images[0] : undefined
  return {
    id: String(item.id),
    organization: org,
    acronym: extractAcronym(org),
    role: item.role || item.title || "Member",
    date: item.date || "2025 - Present",
    description: item.description,
    focus: item.details && item.details.length > 0 ? item.details : ["Professional Council", "Governance", "Technology"],
    icon: getMembershipIcon(org, item.details),
    image: image || getMembershipImage({ id: String(item.id), organization: org, image }),
  }
}

export default function MembershipCard({ membership }: { membership: MembershipCardItem }) {
  const Icon = membership.icon
  const membershipImg = membership.image || getMembershipImage(membership)

  // Concave Inner Curves Path Definition (Matching Certificate Silhouette)
  const certInnerCurvePath =
    "M 0.055 0 L 0.945 0 A 0.055 0.038 0 0 0 1 0.038 L 1 0.962 A 0.055 0.038 0 0 0 0.945 1 L 0.055 1 A 0.055 0.038 0 0 0 0 0.962 L 0 0.038 A 0.055 0.038 0 0 0 0.055 0 Z"

  return (
    <div className="group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1">
      {/* Hidden SVG Definitions for Global Card Inner Curves Clipping */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id={`member-curve-clip-${membership.id}`} clipPathUnits="objectBoundingBox">
            <path d={certInnerCurvePath} />
          </clipPath>
        </defs>
      </svg>

      {/* Main Card Shell clipped with Inner Curves */}
      <article
        style={{ clipPath: `url(#member-curve-clip-${membership.id})` }}
        className="relative flex flex-col justify-between h-full bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-2xl transition-all duration-300 z-10"
      >
        {/* ─── Top Section: 4:3 Landscape Membership Image ─── */}
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Blue Ribbon Overlay starting flush from top edge */}
          <BlueRibbonOverlay />

          {/* Floating Role / Status Tag at Top Right */}
          <div className="absolute top-3.5 right-3.5 z-20">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-slate-950/80 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3 h-3 text-[#0075ff]" />
              <span>{membership.role}</span>
            </span>
          </div>

          {/* Nested 4:3 Landscape Image filling container */}
          <Image
            src={membershipImg}
            alt={`${membership.organization} Membership`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Bottom Gradient Shadow for readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

          {/* Bottom Overlay Info (Emblem & Acronym) */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900/90 text-[#0075ff] border border-white/15 flex items-center justify-center backdrop-blur-sm shadow-sm">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200 drop-shadow-sm">
                {membership.acronym}
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-300 drop-shadow-sm">
              {membership.date}
            </span>
          </div>
        </div>

        {/* ─── Bottom Section: Details, Description, Tags ─── */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-2">
            {/* Organization Title */}
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#0075ff] transition-colors font-heading tracking-tight leading-snug line-clamp-2">
              {membership.organization}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal line-clamp-3">
              {membership.description}
            </p>
          </div>

          {/* Focus Skill Chips & Verification Status */}
          <div className="space-y-3 pt-3 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-1.5">
              {membership.focus.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-medium border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-foreground/80">Active Member</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                Accredited Council
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* SVG Vector Outer Border with Matching Inner Curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 5.5 0 L 94.5 0 A 5.5 3.8 0 0 0 100 3.8 L 100 96.2 A 5.5 3.8 0 0 0 94.5 100 L 5.5 100 A 5.5 3.8 0 0 0 0 96.2 L 0 3.8 A 5.5 3.8 0 0 0 5.5 0 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="text-slate-200 dark:text-slate-800 group-hover:text-[#0075ff]/70 transition-colors duration-300"
        />
      </svg>
    </div>
  )
}
