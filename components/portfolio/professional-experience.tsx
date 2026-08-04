import React from "react"
import SectionHeader from "@/components/shared/section-header"
import { journeyTimeline } from "@/lib/data"
import { Briefcase, Calendar } from "lucide-react"

export default function ProfessionalExperience() {
  const workExperience = journeyTimeline.filter((item) => item.type === "work")

  return (
    <section className="w-full py-16 md:py-24 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="PROFESSIONAL EXPERIENCE"
          title="Career Milestones & Roles"
          subtitle="Key technical leadership, engineering advisory, and institutional roles held across organizations."
        />

        <div className="space-y-8 max-w-5xl">
          {workExperience.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-8 border border-border/60 hover:border-accent bg-card/60 rounded-none grid-cell-card flex flex-col md:flex-row justify-between gap-6 transition-all duration-300"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">
                    {exp.role || "PROFESSIONAL ROLE"}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Calendar size={13} />
                    {exp.date}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight uppercase">
                  {exp.title}
                </h3>

                <p className="text-xs font-bold text-muted-foreground uppercase font-mono">
                  {exp.organization}
                </p>

                <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                  {exp.description}
                </p>

                {exp.details && exp.details.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.details.map((d, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-medium uppercase px-2.5 py-1 bg-secondary text-foreground rounded-none border border-border/40"
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
