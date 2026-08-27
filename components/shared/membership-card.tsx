import React from "react"
import Image from "next/image"
import type { JourneyItem } from "@/lib/content"

export interface MembershipCardItem {
  id: string
  organization: string
  role: string
  date: string
  description: string
  focus: string[]
  image?: string
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
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837096/nestor/gallery/devfest24-friends.jpg"
  }
  if (text.includes("fintech") || text.includes("finance") || text.includes("investment")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837148/nestor/gallery/gire-hall.jpg"
  }
  if (text.includes("nira") || text.includes("registration") || text.includes("domain")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837148/nestor/gallery/gire-hall.jpg"
  }
  if (text.includes("gotni") || text.includes("leaders")) {
    return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837059/nestor/certificates/gotni-cert.jpg"
  }
  return "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837175/nestor/gallery/tech-nexus-team.jpg"
}

export function mapJourneyToMembership(item: JourneyItem): MembershipCardItem {
  const org = item.organization || item.title
  const image = item.images && item.images.length > 0 ? item.images[0] : undefined
  const details = item.details && item.details.length > 0 ? item.details : []
  return {
    id: String(item.id),
    organization: org,
    role: item.role || item.title || "Member",
    date: item.date || "2025 - Present",
    description: item.description,
    focus: details,
    image: image || getMembershipImage({ id: String(item.id), organization: org, image }),
  }
}

export default function MembershipCard({ membership }: { membership: MembershipCardItem }) {
  const membershipImg = membership.image || getMembershipImage(membership)

  return (
    <article className="group relative flex flex-col justify-between h-full bg-card text-card-foreground border border-border/80 hover:border-[#0075ff]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* ─── Top Section: 4:3 Landscape Image (Clean, 100% visible, No Overlays) ─── */}
      <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-border/60">
        <Image
          src={membershipImg}
          alt={`${membership.organization} Membership`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ─── Bottom Section: Standard Dashboard Details Layout ─── */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Organization Title */}
          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#0075ff] transition-colors font-heading tracking-tight leading-snug line-clamp-2">
            {membership.organization}
          </h3>

          {/* Role & Date Line */}
          <div className="flex items-center justify-between text-xs gap-2 pt-0.5">
            <span className="font-semibold text-[#0075ff] dark:text-sky-400">
              {membership.role}
            </span>
            {membership.date && (
              <span className="font-mono text-muted-foreground text-[11px] shrink-0">
                {membership.date}
              </span>
            )}
          </div>

          {/* Description */}
          {membership.description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal line-clamp-3 pt-1">
              {membership.description}
            </p>
          )}
        </div>

        {/* Details / Focus Tags */}
        {membership.focus && membership.focus.length > 0 && (
          <div className="pt-3 border-t border-border/60">
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
          </div>
        )}
      </div>
    </article>
  )
}
