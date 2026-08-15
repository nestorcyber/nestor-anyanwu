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
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Section Title Header */}
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Experience</h2>
              <p className="text-xs text-muted-foreground">Professional roles, tech leadership, and engineering advisory positions held.</p>
            </div>
          </div>

          {/* Timeline Experience Items */}
          <div className="divide-y divide-border/60">
            {displayItems.map((exp, idx) => (
              <div key={exp.id || idx} className="py-6 first:pt-2 last:pb-2 flex gap-4 items-start">
                
                {/* Organization Icon Avatar */}
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent font-bold text-sm">
                  <Building2 className="w-5 h-5" />
                </div>

                {/* Experience Info Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {exp.date}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-accent">
                    {exp.organization} {exp.role ? `• ${exp.role}` : ""}
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {exp.description}
                  </p>

                  {exp.details && exp.details.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.details.map((d, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-0.5 bg-secondary text-foreground rounded-full border border-border/60"
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
      </div>
    </section>
  )
}

