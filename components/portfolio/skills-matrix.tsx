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
  const baseSkills = allSkills.length < 10 ? [...allSkills, ...allSkills, ...allSkills] : allSkills

  // Split into 2 rows for opposite scrolling directions
  const midIndex = Math.ceil(baseSkills.length / 2)
  const row1Raw = baseSkills.slice(0, midIndex)
  const row2Raw = baseSkills.slice(midIndex)

  // Double each row array so 0% to -50% translateX marquee animation is 100% seamless
  const row1 = [...row1Raw, ...row1Raw]
  const row2 = [...row2Raw, ...row2Raw]

  return (
    <section id="skills" className="w-full py-16 md:py-24 border-b border-border/70 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-heading">
                Skills & Technologies
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Software products, frameworks, design applications, and tools used across projects.
              </p>
            </div>
          </div>
        </div>

        {/* Squircle App Logo Carousels moving in opposite directions */}
        <div className="relative w-full space-y-6 pt-2">
          
          {/* Side Fade Masks for Seamless In/Out Effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          {/* Row 1: Leftward Moving Carousel */}
          <div className="overflow-hidden w-full py-2">
            <div className="animate-marquee gap-4 sm:gap-6">
              {row1.map((skill, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-3xl sm:rounded-[28px] bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-accent/80 flex flex-col items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer relative"
                >
                  {/* Large Center Squircle Logo Icon */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SkillIcon
                      provider={skill.iconProvider}
                      name={skill.iconName || skill.name}
                      rawUrl={skill.icon}
                      fallbackText={skill.name.charAt(0)}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Clean Tooltip/Badge on Hover */}
                  <span className="text-[10px] sm:text-xs font-bold text-foreground truncate max-w-full mt-1.5 opacity-80 group-hover:opacity-100 group-hover:text-accent transition-all">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Moving Carousel */}
          <div className="overflow-hidden w-full py-2">
            <div className="animate-marquee-reverse gap-4 sm:gap-6">
              {row2.map((skill, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-3xl sm:rounded-[28px] bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-accent/80 flex flex-col items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer relative"
                >
                  {/* Large Center Squircle Logo Icon */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SkillIcon
                      provider={skill.iconProvider}
                      name={skill.iconName || skill.name}
                      rawUrl={skill.icon}
                      fallbackText={skill.name.charAt(0)}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Clean Tooltip/Badge on Hover */}
                  <span className="text-[10px] sm:text-xs font-bold text-foreground truncate max-w-full mt-1.5 opacity-80 group-hover:opacity-100 group-hover:text-accent transition-all">
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

