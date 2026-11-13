import React from "react"
import type { JourneyItem } from "@/lib/content"
import ExperienceSplitCard, {
  getExperienceAccent,
} from "@/components/shared/experience-card"

export default function ExperienceClient({
  initialItems,
}: {
  initialItems: JourneyItem[]
}) {
  // Filter items to display professional work, engineering, and leadership track records
  const professionalItems = initialItems.filter((item) => {
    const t = (item.type || "").toLowerCase()
    const d = Array.isArray(item.details)
      ? item.details.map((x) => x.toLowerCase())
      : []
    const isExplicitWork =
      t === "work" ||
      t === "milestone" ||
      d.some(
        (x) =>
          x.includes("work") ||
          x.includes("professional") ||
          x.includes("milestone") ||
          x.includes("career")
      )

    if (isExplicitWork) return true

    // If it's pure membership or pure volunteer with no work tag, filter out from career experience
    const isPureVolunteer =
      t === "volunteer" && !d.some((x) => x.includes("work"))
    const isPureMembership =
      t === "membership" && !d.some((x) => x.includes("work"))
    return !isPureVolunteer && !isPureMembership
  })

  return (
    <div className="site-container py-10 md:py-14">
      {/* Side Road + Connected Scrollable Experience Cards List (Non-Stacking) */}
      {professionalItems.length > 0 ? (
        <div className="relative max-w-6xl mx-auto">
          {/* Continuous Vertical Side Road */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-6 md:left-8 top-3 bottom-3 w-5 sm:w-6 md:w-7 -translate-x-1/2 pointer-events-none rounded-2xl bg-[#0F172A] border-x-2 border-[#0056D2]/60 shadow-[0_0_24px_rgba(0,86,210,0.2)] overflow-hidden"
          >
            {/* Dashed Center Highway Lane Line */}
            <div
              className="w-[2px] h-full mx-auto opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #0056D2 0px, #0056D2 12px, transparent 12px, transparent 24px)",
              }}
            />
            {/* Top & Bottom Soft Road Edge Fades */}
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Scrollable Vertical List of Split Experience Cards */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12 py-2">
            {professionalItems.map((item, idx) => {
              const { hex, rgb } = getExperienceAccent(idx)
              const stepLabel = String(idx + 1).padStart(2, "0")

              return (
                <div
                  key={item.id || idx}
                  className="relative pl-11 sm:pl-16 md:pl-20"
                >
                  {/* Horizontal Connector Bridge Linking Side Road to Card */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 sm:left-6 md:left-8 top-10 md:top-1/2 -translate-y-1/2 w-7 sm:w-10 md:w-12 h-[2.5px] pointer-events-none flex items-center justify-end"
                    style={{
                      background: `linear-gradient(90deg, #0056D2 0%, rgba(${rgb}, 0.95) 100%)`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-2xl translate-x-1/2"
                      style={{
                        backgroundColor: hex,
                        boxShadow: `0 0 10px rgba(${rgb}, 0.85)`,
                      }}
                    />
                  </div>

                  {/* Road Checkpoint Milestone Node */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 sm:left-6 md:left-8 top-10 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-2xl bg-[#020617] border-2 flex items-center justify-center z-10 select-none"
                    style={{
                      borderColor: hex,
                      boxShadow: `0 0 18px rgba(${rgb}, 0.45)`,
                    }}
                  >
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-[#F1F5F9] tracking-tight">
                      {stepLabel}
                    </span>
                  </div>

                  {/* Shared Experience Split Card */}
                  <ExperienceSplitCard
                    item={item}
                    index={idx}
                    showMetaFooter
                  />
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl">
          No experience milestones found.
        </div>
      )}
    </div>
  )
}
