import React from "react"
import SectionHeader from "@/components/shared/section-header"
import type { SkillGroup } from "@/lib/content"

export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section className="w-full py-16 md:py-24 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="TECHNICAL STACK"
          title="Skills & Technologies"
          subtitle="Structured breakdown of tools, frameworks, languages, and design software used across production projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-8 bg-card border border-border/60 hover:border-accent rounded-none space-y-6 grid-cell-card"
            >
              <h3 className="text-lg font-extrabold text-foreground tracking-tight uppercase border-b border-border/40 pb-3 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-xs font-mono text-accent uppercase">
                  {group.skills.length} TECHS
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-secondary/40 border border-border/50 rounded-none flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-xs font-bold text-foreground">
                        {skill.name}
                      </h3>
                      {skill.experienceLevel && (
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {skill.experienceLevel}
                        </p>
                      )}
                    </div>
                    {skill.years && (
                      <span className="text-[10px] font-mono text-accent font-bold px-2 py-0.5 bg-accent/10 border border-accent/20">
                        {skill.years}
                      </span>
                    )}
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
