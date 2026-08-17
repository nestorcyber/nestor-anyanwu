"use client"

import React from "react"
import type { SkillGroup } from "@/lib/content"
import { Wrench } from "lucide-react"
import { SkillIcon } from "@/components/admin/icon-picker"

export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  // Flatten all skills across groups into a single array (no category groupings)
  const allSkills = skillGroups.flatMap((group) => group.skills)

  if (!allSkills.length) return null

  // Ensure enough items for seamless infinite ticker loop
  const baseSkills = allSkills.length < 12 ? [...allSkills, ...allSkills, ...allSkills, ...allSkills] : allSkills

  // Split into 2 rows for opposite scrolling directions
  const midIndex = Math.ceil(baseSkills.length / 2)
  const row1Raw = baseSkills.slice(0, midIndex)
  const row2Raw = baseSkills.slice(midIndex)

  // Double each row array so 0% to -50% translateX marquee animation is 100% seamless
  const row1 = [...row1Raw, ...row1Raw]
  const row2 = [...row2Raw, ...row2Raw]

  return (
    <section id="skills" className="w-full py-14 md:py-20 border-b border-border/70 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Technologies & Tools
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Software products, frameworks, design applications, and tools used across projects.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Squircle App Logo Carousels moving in opposite directions */}
        <div className="relative w-full space-y-6 pt-1">

          {/* Subtle Narrow Edge Blur & Soft Fade Overlay */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background via-background/60 to-transparent backdrop-blur-[1px] z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background via-background/60 to-transparent backdrop-blur-[1px] z-20" />

          {/* Row 1: Leftward Moving Carousel */}
          <div className="overflow-hidden w-full py-2">
            <div className="animate-marquee gap-5 sm:gap-7">
              {row1.map((skill, idx) => (
                <div key={`r1-${idx}`} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-accent/80 flex items-center justify-center p-3 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SkillIcon
                        provider={skill.iconProvider}
                        name={skill.iconName || skill.name}
                        rawUrl={skill.icon}
                        fallbackText={skill.name.charAt(0)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-foreground/90 max-w-[80px] sm:max-w-[100px] truncate text-center transition-colors group-hover:text-accent">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Separator Line between Top & Bottom Carousels */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent my-1" />

          {/* Row 2: Rightward Moving Carousel */}
          <div className="overflow-hidden w-full py-2">
            <div className="animate-marquee-reverse gap-5 sm:gap-7">
              {row2.map((skill, idx) => (
                <div key={`r2-${idx}`} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-accent/80 flex items-center justify-center p-3 transition-all duration-300 group-hover:-translate-y-1">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SkillIcon
                        provider={skill.iconProvider}
                        name={skill.iconName || skill.name}
                        rawUrl={skill.icon}
                        fallbackText={skill.name.charAt(0)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-foreground/90 max-w-[80px] sm:max-w-[100px] truncate text-center transition-colors group-hover:text-accent">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

