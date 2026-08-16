"use client"

import React from "react"
import Image from "next/image"
import type { SkillGroup } from "@/lib/content"
import { Wrench, Layers } from "lucide-react"
import { SkillIcon } from "@/components/admin/icon-picker"




export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section id="skills" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Skills and Technologies</h2>
              <p className="text-xs text-muted-foreground">Software products, frameworks, design applications, and developer tools used across projects.</p>
            </div>
          </div>
        </div>

        {/* LinkedIn "Connected Apps" Card Grid Styling */}
        <div className="space-y-8">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>{group.category}</span>
              </h3>

              {/* Connected Apps Horizontal Card Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {group.skills.map((skill, i) => {
                  return (
                    <div
                      key={i}
                      className="p-3.5 bg-card border border-border/80 hover:border-accent rounded-xl flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all duration-200 group"
                    >
                      {/* Logo Icon Container */}
                      <div className="w-10 h-10 rounded-lg bg-secondary/80 border border-border/60 shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                        <SkillIcon
                          provider={skill.iconProvider}
                          name={skill.iconName || skill.name}
                          rawUrl={skill.icon}
                          fallbackText={skill.name.charAt(0)}
                          className="w-full h-full object-contain dark:invert-[0.1]"
                        />
                      </div>

                      {/* Tech Name & Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate group-hover:text-accent transition-colors">
                          {skill.name}
                        </p>
                        {skill.years ? (
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            {skill.years}
                          </p>
                        ) : skill.experienceLevel ? (
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            {skill.experienceLevel}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
