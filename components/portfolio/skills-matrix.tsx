"use client"

import React, { useMemo } from "react"
import type { SkillGroup } from "@/lib/content"
import { SkillIcon } from "@/components/admin/icon-picker"

type SkillItem = SkillGroup["skills"][number]

function SkillSquircleTile({
  skill,
  className = "",
}: {
  skill: SkillItem
  className?: string
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer select-none">
      <div
        title={skill.name}
        className={`w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-white text-slate-950 dark:bg-white dark:text-slate-950 border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-3.5 sm:p-4 shrink-0 ${className}`}
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-110">
          <SkillIcon
            provider={skill.iconProvider}
            name={skill.iconName || skill.name}
            rawUrl={skill.icon}
            fallbackText={skill.name.charAt(0)}
            className="w-full h-full max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      <span className="text-[10px] sm:text-[11px] font-semibold text-foreground/85 max-w-[80px] sm:max-w-[96px] truncate text-center transition-colors group-hover:text-accent">
        {skill.name}
      </span>
    </div>
  )
}

export default function SkillsMatrix({
  skillGroups,
}: {
  skillGroups: SkillGroup[]
}) {
  // Flatten all skills across groups
  const allSkills = useMemo(() => {
    const flattened = skillGroups.flatMap((group) => group.skills)
    if (!flattened.length) return []
    // Ensure plenty of tiles (at least 30 items) for rich continuous scrolling
    let pool = [...flattened]
    while (pool.length < 30) {
      pool = [...pool, ...flattened]
    }
    return pool
  }, [skillGroups])

  if (!allSkills.length) return null

  // Partition into exactly 3 columns across all screen sizes
  const col1Raw = allSkills.filter((_, i) => i % 3 === 0)
  const col2Raw = allSkills.filter((_, i) => i % 3 === 1)
  const col3Raw = allSkills.filter((_, i) => i % 3 === 2)

  // Duplicate each column array so vertical marquee is 100% continuous, infinite and seamless
  const col1 = [...col1Raw, ...col1Raw]
  const col2 = [...col2Raw, ...col2Raw]
  const col3 = [...col3Raw, ...col3Raw]

  return (
    <section
      id="skills"
      className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 sm:py-20 md:py-24 border-b border-border/70 bg-background overflow-hidden relative flex flex-col justify-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (lg and up): 3 Continuous Infinite Flowing Columns           */}
      {/* Generous left-padding to prevent hover scale clipping on the left edge    */}
      {/* ========================================================================= */}
      <div 
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%] xl:w-[50%] overflow-hidden z-10 pointer-events-auto [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
      >
        {/* 3 Animated Columns with extra left/right padding for hover clearance */}
        <div className="grid grid-cols-3 gap-4 xl:gap-5 h-full pl-10 pr-6 xl:pl-16 xl:pr-12">
          
          {/* Column 1: Scrolling Upwards */}
          <div className="overflow-visible flex flex-col justify-start h-full py-2">
            <div className="animate-marquee-vertical gap-4 xl:gap-5">
              {col1.map((skill, idx) => (
                <SkillSquircleTile
                  key={`c1-${idx}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Scrolling Downwards */}
          <div className="overflow-visible flex flex-col justify-start h-full py-2">
            <div className="animate-marquee-vertical-reverse gap-4 xl:gap-5">
              {col2.map((skill, idx) => (
                <SkillSquircleTile
                  key={`c2-${idx}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>

          {/* Column 3: Scrolling Upwards */}
          <div className="overflow-visible flex flex-col justify-start h-full py-2">
            <div className="animate-marquee-vertical-slow gap-4 xl:gap-5">
              {col3.map((skill, idx) => (
                <SkillSquircleTile
                  key={`c3-${idx}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Section Content Container */}
      <div className="site-container relative z-20">
        
        {/* DESKTOP Left Column: Heading & Pitch */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left py-4 max-w-xl">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-foreground tracking-tight font-heading leading-[1.06]">
                Technologies &amp;{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#0075ff] inline-block">
                  Tools
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground font-normal leading-relaxed max-w-md">
                Explore the modern frameworks, developer tools, programming languages, and creative suites powering production software and scalable digital systems.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VIEW (< lg): Centered 3-Column Isometric 3D View          */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col space-y-8 text-center sm:text-left">
          
          {/* Mobile Top Content */}
          <div className="space-y-3.5 max-w-xl mx-auto sm:mx-0">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-foreground tracking-tight font-heading leading-tight">
              Technologies &amp; <span className="text-[#0075ff]">Tools</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-normal leading-relaxed">
              Explore the modern frameworks, developer tools, programming languages, and creative suites powering production software.
            </p>
          </div>

          {/* Full Screen-Width Centered 3D Perspective Grid Container */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 h-[380px] sm:h-[440px] overflow-hidden [perspective:1200px] pt-4 -mb-16 sm:-mb-20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] flex justify-center items-center">
            
            {/* 3D Tilted Grid */}
            <div className="w-[140%] sm:w-[120%] shrink-0 flex justify-center items-center gap-3.5 sm:gap-5 [transform:rotateX(42deg)_rotateZ(-20deg)_scale(1.18)] [transform-origin:center_center]">
              
              {/* Column 1 */}
              <div className="overflow-visible flex flex-col justify-start">
                <div className="animate-marquee-vertical gap-3.5 sm:gap-5">
                  {col1.map((skill, idx) => (
                    <SkillSquircleTile
                      key={`m1-${idx}`}
                      skill={skill}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  ))}
                </div>
              </div>

              {/* Column 2 */}
              <div className="overflow-visible flex flex-col justify-start">
                <div className="animate-marquee-vertical-reverse gap-3.5 sm:gap-5">
                  {col2.map((skill, idx) => (
                    <SkillSquircleTile
                      key={`m2-${idx}`}
                      skill={skill}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  ))}
                </div>
              </div>

              {/* Column 3 */}
              <div className="overflow-visible flex flex-col justify-start">
                <div className="animate-marquee-vertical-slow gap-3.5 sm:gap-5">
                  {col3.map((skill, idx) => (
                    <SkillSquircleTile
                      key={`m3-${idx}`}
                      skill={skill}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
