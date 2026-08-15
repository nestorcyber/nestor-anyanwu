import React from "react"
import type { JourneyItem } from "@/lib/content"
import { Briefcase, Calendar, Building2 } from "lucide-react"

export default function ProfessionalExperience({ journeyTimeline }: { journeyTimeline: JourneyItem[] }) {
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
  const displayItems = workExperience.length ? workExperience : journeyTimeline

  return (
    <section className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Experience</h2>
            <p className="text-xs text-muted-foreground">Professional roles, tech leadership, and engineering advisory positions held.</p>
          </div>
        </div>

        {/* Timeline Experience Items */}
        <div className="divide-y divide-border/60">
          {displayItems.map((exp, idx) => (
            <div key={exp.id || idx} className="py-6 first:pt-0 last:pb-0 flex gap-5 items-start">
              
              {/* Organization Icon Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent font-bold text-base shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>

              {/* Experience Info Content */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-foreground">
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

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 max-w-4xl">
                  {exp.description}
                </p>

                {exp.details && exp.details.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.details.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1 bg-secondary text-foreground rounded-full border border-border/70"
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

      </div>
    </section>
  )
}
