import React from "react"
import Image from "next/image"
import type { JourneyItem } from "@/lib/content"
import { ExternalLink } from "lucide-react"
import { FOLDER_THEMES } from "@/components/shared/project-card"

// Reuse the Featured Projects palette with vibrant accents tailored for dark experience cards
export const EXPERIENCE_ACCENTS = [
  FOLDER_THEMES[5].bg, // #4F46E5 Indigo Violet
  FOLDER_THEMES[2].bg, // #0056D2 Brand Electric Blue
  FOLDER_THEMES[1].bg, // #D25537 Terracotta
  FOLDER_THEMES[4].bg, // #0F766E Deep Teal
  FOLDER_THEMES[3].bg, // #C4A986 Warm Sand
  "#64748B", // Luminous slate variant for obsidian slot
]

export function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "")
  const num = parseInt(clean, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `${r}, ${g}, ${b}`
}

export function getExperienceAccent(index: number): { hex: string; rgb: string } {
  const hex = EXPERIENCE_ACCENTS[index % EXPERIENCE_ACCENTS.length]
  return { hex, rgb: hexToRgb(hex) }
}

const MASK_BORDER_STYLE: React.CSSProperties = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "exclude",
}

export interface ExperienceSplitCardProps {
  item: JourneyItem
  index: number
  scale?: number
  elevatedStackShadow?: boolean
  showMetaFooter?: boolean
}

export default function ExperienceSplitCard({
  item,
  index,
  scale = 1,
  elevatedStackShadow = false,
  showMetaFooter = false,
}: ExperienceSplitCardProps) {
  const { rgb } = getExperienceAccent(index)

  return (
    <article
      style={
        scale !== 1
          ? {
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }
          : undefined
      }
      className={`group pointer-events-auto relative bg-[#0F172A] rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[220px] sm:min-h-[240px] md:min-h-[250px] transition-transform duration-300 ${
        elevatedStackShadow
          ? "shadow-[0_-10px_28px_-10px_rgba(15,23,42,0.45),0_18px_44px_-14px_rgba(15,23,42,0.28)] dark:shadow-[0_-14px_34px_-8px_rgba(2,6,23,0.85),0_24px_60px_-14px_rgba(2,6,23,0.75)]"
          : "shadow-[0_14px_36px_-14px_rgba(15,23,42,0.25)] dark:shadow-[0_18px_46px_-14px_rgba(2,6,23,0.65)]"
      }`}
    >
      {/* Subtle Top-Edge Colored Highlight */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-10 pointer-events-none z-10"
        style={{
          background: `linear-gradient(180deg, rgba(${rgb}, 0.28) 0%, rgba(${rgb}, 0.06) 65%, transparent 100%)`,
        }}
      />

      {/* Outer Fading Colored Rim Border */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none z-20 p-[1.5px]"
        style={{
          ...MASK_BORDER_STYLE,
          background: `linear-gradient(95deg, rgba(${rgb}, 0.42) 0%, rgba(${rgb}, 0.55) 45%, rgba(${rgb}, 0.95) 78%, rgba(${rgb}, 1) 100%)`,
        }}
      />

      {/* Left Panel: Diagonal Sweep Accent Block (Date, Role/Title, Organization) */}
      <div
        className="relative w-full md:w-[47%] shrink-0 rounded-2xl overflow-hidden p-7 sm:p-8 md:p-9 flex flex-col justify-center gap-2 sm:gap-2.5"
        style={{
          background: `
            radial-gradient(circle at 92% 45%, rgba(241, 245, 249, 0.14) 0%, transparent 52%),
            linear-gradient(112deg, #0F172A 22%, rgba(${rgb}, 0.24) 50%, rgba(${rgb}, 0.82) 82%, rgba(${rgb}, 0.96) 100%)
          `,
        }}
      >
        {/* Subtle Inner Rim on Left Panel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none p-px"
          style={{
            ...MASK_BORDER_STYLE,
            background: `linear-gradient(110deg, rgba(${rgb}, 0.35) 0%, rgba(241, 245, 249, 0.2) 45%, rgba(${rgb}, 0.78) 100%)`,
          }}
        />

        {/* Subtle Dark Legibility Wash Behind Text on Left Edge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(2, 6, 23, 0.55) 0%, rgba(2, 6, 23, 0.22) 60%, transparent 100%)",
          }}
        />

        <div className="relative z-10 space-y-2 sm:space-y-2.5">
          <span className="block text-xs sm:text-sm font-medium text-[#CBD5E1]/90 tracking-wide font-sans">
            {item.date}
          </span>

          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#F1F5F9] font-heading tracking-tight leading-snug drop-shadow-[0_2px_12px_rgba(2,6,23,0.45)]">
            {item.title}
          </h3>

          <p className="text-xs sm:text-sm font-medium text-[#F1F5F9]/90 drop-shadow-[0_1px_8px_rgba(2,6,23,0.4)]">
            {item.organization}
          </p>
        </div>
      </div>

      {/* Right Panel: Sleek Dark Surface with Description */}
      <div className="relative flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 bg-[#0F172A] space-y-4">
        <p className="text-sm sm:text-[15px] md:text-base text-[#CBD5E1] leading-relaxed font-normal">
          {item.description}
        </p>

        {showMetaFooter && item.details && item.details.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {item.details.map((detail, i) => (
              <span
                key={i}
                style={{
                  borderColor: `rgba(${rgb}, 0.35)`,
                  backgroundColor: `rgba(${rgb}, 0.12)`,
                }}
                className="text-xs font-medium px-3 py-1 rounded-2xl border text-slate-200"
              >
                {detail}
              </span>
            ))}
          </div>
        )}

        {showMetaFooter && item.images && item.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {item.images.map((imgUrl, imgIdx) => (
              <a
                key={imgIdx}
                href={imgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/img relative aspect-video rounded-2xl overflow-hidden border border-[#1E293B] bg-[#020617] block"
              >
                <Image
                  src={imgUrl}
                  alt={`${item.title} documentation ${imgIdx + 1}`}
                  fill
                  unoptimized={
                    imgUrl.startsWith("http") &&
                    !imgUrl.includes("res.cloudinary.com") &&
                    !imgUrl.includes("blob.vercel-storage.com")
                  }
                  sizes="(max-width: 640px) 50vw, 220px"
                  className="object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
