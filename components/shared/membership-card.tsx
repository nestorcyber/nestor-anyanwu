import React from "react"
import Image from "next/image"
import { Building2, ShieldCheck, Globe, Cpu, Network, Award } from "lucide-react"
import type { JourneyItem } from "@/lib/content"

export interface MembershipCardItem {
  id: string
  organization: string
  role: string
  date: string
  description?: string
  focus?: string[]
  image?: string
  logo?: string
  chapter?: string
}

// ─── 6 Distinct Generative Corner Graphics (Matching User's Reference) ───

function GraphicContourWave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M160 30 C120 40 100 80 80 120 C65 145 40 155 0 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M160 50 C125 58 110 92 90 128 C78 148 55 158 20 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <path d="M160 70 C130 76 120 104 100 136 C90 152 70 160 40 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M160 90 C135 95 128 116 112 144 C104 156 88 160 60 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M160 110 C142 114 136 128 124 150 C118 158 105 160 80 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M160 130 C148 133 144 140 136 154 C132 159 122 160 100 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  )
}

function GraphicDotMatrixWave({ className }: { className?: string }) {
  const dots: { cx: number; cy: number; r: number; opacity: number }[] = []
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 14; row++) {
      const x = 50 + col * 12 + Math.sin(row * 0.4) * 14
      const y = 20 + row * 10
      if (x <= 160 && y <= 160) {
        const dist = Math.sqrt(Math.pow(160 - x, 2) + Math.pow(160 - y, 2))
        const opacity = Math.max(0.2, 1 - dist / 160)
        dots.push({ cx: x, cy: y, r: col % 2 === 0 ? 1.8 : 2.2, opacity })
      }
    }
  }
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="currentColor" fillOpacity={d.opacity} />
      ))}
    </svg>
  )
}

function GraphicNestedChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M60 160 L160 60 L160 85 L85 160 Z" fill="currentColor" opacity="0.95" />
      <path d="M85 160 L160 85 L160 110 L110 160 Z" fill="currentColor" opacity="0.75" />
      <path d="M110 160 L160 110 L160 135 L135 160 Z" fill="currentColor" opacity="0.5" />
      <path d="M135 160 L160 135 L160 155 L155 160 Z" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function GraphicBubbleClusters({ className }: { className?: string }) {
  const circles = [
    { cx: 145, cy: 145, r: 12 },
    { cx: 120, cy: 140, r: 8 },
    { cx: 140, cy: 115, r: 9 },
    { cx: 100, cy: 130, r: 6 },
    { cx: 125, cy: 100, r: 7 },
    { cx: 145, cy: 85, r: 8 },
    { cx: 85, cy: 145, r: 5 },
    { cx: 80, cy: 115, r: 4 },
    { cx: 105, cy: 90, r: 5 },
    { cx: 135, cy: 65, r: 6 },
    { cx: 110, cy: 65, r: 4 },
    { cx: 90, cy: 85, r: 3 },
    { cx: 65, cy: 130, r: 3 },
    { cx: 70, cy: 100, r: 3 },
    { cx: 150, cy: 50, r: 5 },
    { cx: 125, cy: 45, r: 4 },
  ]
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="currentColor" fillOpacity={0.85 - i * 0.035} />
      ))}
    </svg>
  )
}

function GraphicDiagonalHatch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="oval-clip">
          <ellipse cx="150" cy="150" rx="80" ry="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#oval-clip)">
        {[-40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((offset, i) => (
          <line
            key={i}
            x1={offset}
            y1={0}
            x2={offset + 160}
            y2={160}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  )
}

function GraphicConfettiDashes({ className }: { className?: string }) {
  const dashes = [
    { x: 130, y: 140, rot: 25 },
    { x: 110, y: 135, rot: -40 },
    { x: 145, y: 120, rot: 60 },
    { x: 95, y: 145, rot: 15 },
    { x: 125, y: 110, rot: -30 },
    { x: 140, y: 95, rot: 45 },
    { x: 80, y: 130, rot: 70 },
    { x: 105, y: 115, rot: 10 },
    { x: 120, y: 85, rot: -55 },
    { x: 145, y: 70, rot: 35 },
    { x: 70, y: 145, rot: -20 },
    { x: 90, y: 95, rot: 50 },
    { x: 110, y: 65, rot: -15 },
    { x: 135, y: 45, rot: 40 },
    { x: 60, y: 115, rot: 30 },
    { x: 80, y: 75, rot: -45 },
  ]
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {dashes.map((d, i) => (
        <rect
          key={i}
          x={d.x}
          y={d.y}
          width="4"
          height="14"
          rx="2"
          transform={`rotate(${d.rot} ${d.x} ${d.y})`}
          fill="currentColor"
          fillOpacity={0.85}
        />
      ))}
    </svg>
  )
}

const GRAPHIC_COMPONENTS = [
  GraphicContourWave,
  GraphicDotMatrixWave,
  GraphicNestedChevron,
  GraphicBubbleClusters,
  GraphicDiagonalHatch,
  GraphicConfettiDashes,
]

// Distinct brand palette for logo boxes & corner graphics
const BRAND_PALETTES = [
  { logoBg: "bg-[#0075ff] text-white", graphicColor: "text-[#0075ff]" },
  { logoBg: "bg-[#8b5cf6] text-white", graphicColor: "text-[#8b5cf6]" },
  { logoBg: "bg-[#eab308] text-slate-950", graphicColor: "text-[#eab308]" },
  { logoBg: "bg-[#10b981] text-white", graphicColor: "text-[#10b981]" },
  { logoBg: "bg-[#f97316] text-white", graphicColor: "text-[#f97316]" },
  { logoBg: "bg-[#ef4444] text-white", graphicColor: "text-[#ef4444]" },
]

function getMembershipVisuals(membership: MembershipCardItem, index: number) {
  const text = `${membership.id} ${membership.organization} ${membership.role}`.toLowerCase()
  let paletteIdx = index % BRAND_PALETTES.length
  let chapter = "Nigeria Chapter"

  if (text.includes("ieee")) {
    paletteIdx = 0 // Blue
    chapter = "FUTO Student Branch"
  } else if (text.includes("ncs") || text.includes("computer society")) {
    paletteIdx = 1 // Purple
    chapter = "National Authority"
  } else if (text.includes("ndpc") || text.includes("privacy")) {
    paletteIdx = 2 // Yellow / Amber
    chapter = "Federal Agency"
  } else if (text.includes("isoc") || text.includes("internet society")) {
    paletteIdx = 3 // Green
    chapter = "Nigeria Chapter"
  } else if (text.includes("aaai") || text.includes("intelligence")) {
    paletteIdx = 4 // Orange
    chapter = "Nigeria Chapter"
  } else if (text.includes("fintech") || text.includes("nacos")) {
    paletteIdx = 5 // Red
    chapter = "National Association"
  }

  const GraphicComp = GRAPHIC_COMPONENTS[index % GRAPHIC_COMPONENTS.length]
  const palette = BRAND_PALETTES[paletteIdx]

  return { GraphicComp, palette, chapter }
}

function getOrgFallbackIcon(org: string) {
  const lower = org.toLowerCase()
  if (lower.includes("privacy") || lower.includes("ndpc")) return ShieldCheck
  if (lower.includes("ai") || lower.includes("intelligence") || lower.includes("aaai")) return Cpu
  if (lower.includes("internet") || lower.includes("isoc") || lower.includes("nira")) return Globe
  if (lower.includes("ieee") || lower.includes("engineer")) return Network
  return Award
}

export function getMembershipImage(item: { id?: string; organization?: string; title?: string; image?: string; logo?: string }): string {
  if (item.logo) return item.logo
  if (item.image) return item.image
  return ""
}

export function mapJourneyToMembership(item: JourneyItem): MembershipCardItem {
  const org = item.organization && item.organization.trim() ? item.organization : item.title
  const role = item.role && item.role.trim() ? item.role : (item.organization && item.organization.trim() ? item.title : "Member")
  const logo = item.images && item.images.length > 0 && !item.images[0].includes("placeholder") ? item.images[0] : undefined
  const details = item.details && item.details.length > 0 ? item.details : []
  const chapter = details.length > 0 ? details[0] : undefined
  return {
    id: String(item.id),
    organization: org,
    role: role,
    date: item.date || "2025 - Present",
    description: item.description,
    focus: details,
    logo: logo,
    image: logo,
    chapter: chapter,
  }
}

export default function MembershipCard({
  membership,
  index = 0,
}: {
  membership: MembershipCardItem
  index?: number
}) {
  const logoSrc = membership.logo || membership.image
  const hasValidLogo =
    logoSrc &&
    !logoSrc.includes("placeholder") &&
    (logoSrc.startsWith("http") || logoSrc.startsWith("/"))

  const { GraphicComp, palette, chapter } = getMembershipVisuals(membership, index)
  const FallbackIcon = getOrgFallbackIcon(membership.organization)

  return (
    <article className="group relative flex flex-col justify-between aspect-square w-full bg-white dark:bg-[#0E1724] text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-800/90 hover:border-[#0075ff]/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none">
      
      {/* ─── Bottom-Right Decorative Generative Pattern Graphic (Matching Reference Image) ─── */}
      <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none transition-transform duration-500 group-hover:scale-105 overflow-hidden">
        <GraphicComp className={`w-full h-full ${palette.graphicColor} opacity-75 dark:opacity-85`} />
      </div>

      {/* ─── Top Row: Organization Logo Container (Left) + Date (Right) ─── */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        
        {/* Logo Badge Container: Significantly enlarged for maximum legibility */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl ${
            hasValidLogo
              ? "bg-white border border-slate-200/90 dark:border-slate-700/80 shadow-xs"
              : palette.logoBg + " shadow-sm"
          } flex items-center justify-center p-1.5 sm:p-2 overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105`}
        >
          {hasValidLogo ? (
            <div className="relative w-full h-full">
              <Image
                src={logoSrc!}
                alt={membership.organization}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          ) : (
            <FallbackIcon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2] shrink-0" />
          )}
        </div>

        {/* Date / Tenure Tag (Top-Right) */}
        {membership.date && (
          <span className="text-xs sm:text-sm font-mono font-medium text-slate-500 dark:text-slate-400 tracking-tight pt-1">
            {membership.date}
          </span>
        )}
      </div>

      {/* ─── Middle Section: Role & Organization Name (Exact Reference Placement) ─── */}
      <div className="relative z-10 space-y-1.5 my-auto max-w-[80%] pt-4">
        {/* Role Subtitle */}
        <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
          {membership.role || "Member"}
        </p>

        {/* Organization Name */}
        <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight font-heading leading-tight group-hover:text-[#0075ff] dark:group-hover:text-sky-400 transition-colors line-clamp-2">
          {membership.organization}
        </h3>
      </div>

      {/* ─── Bottom-Left: Chapter / Location (Matching Reference) ─── */}
      <div className="relative z-10 pt-2">
        <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
          {membership.chapter || chapter}
        </p>
      </div>

    </article>
  )
}
