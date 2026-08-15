import React from "react"
import type { SkillGroup } from "@/lib/content"
import { Wrench, CheckCircle2 } from "lucide-react"

export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Section Title Header */}
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Skills & Endorsements</h2>
              <p className="text-xs text-muted-foreground">Core competencies, technical frameworks, brand design tools, and engineering capabilities.</p>
            </div>
          </div>

          {/* Skills Categorized Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group, idx) => (
              <div key={idx} className="p-5 bg-secondary/30 border border-border/60 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <h3 className="text-sm font-bold text-foreground">
                    {group.category}
                  </h3>
                  <span className="text-[11px] font-mono text-accent font-semibold">
                    {group.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 bg-card border border-border/70 rounded-lg text-xs font-semibold text-foreground flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{skill.name}</span>
                      {skill.years ? <span className="text-[10px] text-muted-foreground">({skill.years})</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

