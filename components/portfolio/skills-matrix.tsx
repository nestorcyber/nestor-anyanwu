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
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight font-heading">
                Skills & Technologies
              </h2>
              <p className="text-xs text-muted-foreground">
                Software products, frameworks, design applications, and tools used across projects.
              </p>
            </div>
          </div>
        </div>

        {/* Squircle App Logo Carousels moving in opposite directions */}
        <div className="relative w-full space-y-4 pt-1">
          
          {/* Side Fade Masks for Seamless In/Out Effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-20" />

          {/* Row 1: Leftward Moving Carousel */}
          <div className="overflow-hidden w-full py-1">
            <div className="animate-marquee gap-3.5 sm:gap-5">
              {row1.map((skill, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="group relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-accent/80 flex items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Clean Center Logo Icon filling ~65% space */}
                  <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SkillIcon
                      provider={skill.iconProvider}
                      name={skill.iconName || skill.name}
                      rawUrl={skill.icon}
                      fallbackText={skill.name.charAt(0)}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Sleek Floating Hover Tooltip */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-bold rounded-md whitespace-nowrap shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 z-30">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Separator Line between Top & Bottom Carousels */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent my-1" />

          {/* Row 2: Rightward Moving Carousel */}
          <div className="overflow-hidden w-full py-1">
            <div className="animate-marquee-reverse gap-3.5 sm:gap-5">
              {row2.map((skill, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="group relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-accent/80 flex items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Clean Center Logo Icon filling ~65% space */}
                  <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SkillIcon
                      provider={skill.iconProvider}
                      name={skill.iconName || skill.name}
                      rawUrl={skill.icon}
                      fallbackText={skill.name.charAt(0)}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Sleek Floating Hover Tooltip */}
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-bold rounded-md whitespace-nowrap shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-200 z-30">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

