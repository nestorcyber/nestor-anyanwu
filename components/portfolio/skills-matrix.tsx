import React from "react"
import type { SkillGroup } from "@/lib/content"
import { Wrench, CheckCircle2 } from "lucide-react"

export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Skills & Endorsements</h2>
            <p className="text-xs text-muted-foreground">Core competencies, technical frameworks, brand design tools, and engineering capabilities.</p>
          </div>
        </div>

        {/* Skills Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="p-6 bg-secondary/20 border border-border/70 rounded-2xl space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-base font-bold text-foreground">
                  {group.category}
                </h3>
                <span className="text-xs font-mono text-accent font-semibold">
                  {group.skills.length} skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-card border border-border/80 rounded-xl text-xs font-semibold text-foreground flex items-center gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{skill.name}</span>
                    {skill.years ? <span className="text-[11px] text-muted-foreground">({skill.years})</span> : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
