import React from "react"
import Link from "next/link"
import type { JourneyItem } from "@/lib/content"
import { Briefcase, Calendar, Building2, ArrowRight } from "lucide-react"

export default function ProfessionalExperience({
  journeyTimeline,
  limit = 4,
}: {
  journeyTimeline: JourneyItem[]
  limit?: number
}) {
  const workExperience = journeyTimeline.length
    ? journeyTimeline.filter(
        (item) =>
          !item.type ||
          item.type.toLowerCase().includes("work") ||
          item.type.toLowerCase().includes("exp") ||
          item.type.toLowerCase().includes("role") ||
          item.type.toLowerCase().includes("career")
      )
    : []
  const allItems = workExperience.length ? workExperience : journeyTimeline
  const displayItems = limit && limit > 0 ? allItems.slice(0, limit) : allItems

  return (
    <section id="experience" className="w-full py-12 md:py-16 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="container-webflow space-y-8">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Engineering and leadership track record.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Timeline Experience Items (Limited to 4) */}
        <div className="divide-y divide-border/60">
          {displayItems.map((exp, idx) => (
            <div key={exp.id || idx} className="py-6 first:pt-0 last:pb-0 flex gap-4 sm:gap-5 items-start">
              
              {/* Organization Icon Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent font-bold text-base shadow-2xs">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Experience Info Content */}
              <div className="space-y-1.5 sm:space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                    {exp.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar size={13} />
                    {exp.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-accent">
                  {exp.organization} {exp.role ? `• ${exp.role}` : ""}
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 max-w-4xl line-clamp-3">
                  {exp.description}
                </p>

                {exp.details && exp.details.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {exp.details.map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 bg-secondary text-foreground rounded-full border border-border/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* View All Experiences Button */}
        <div className="flex justify-center pt-6 border-t border-border/60">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-accent hover:bg-accent/90 text-white font-extrabold text-xs tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Explore Full Experience History</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

      </div>
    </section>
  )
}
