"use client"

import React from "react"
import Link from "next/link"
import type { JourneyItem } from "@/lib/content"
import { ArrowUpRight } from "lucide-react"

export interface ProfessionalExperienceProps {
  journeyTimeline?: JourneyItem[]
}

export default function ProfessionalExperience({
  journeyTimeline,
}: ProfessionalExperienceProps = {}) {
  const coreExperiences: JourneyItem[] = [
    {
      id: "1",
      title: "Lead Full-Stack Engineer & System Architect",
      organization: "Software Engineering & Digital Platforms",
      role: "Lead Full-Stack Engineer",
      date: "2025 - Present",
      description: "",
      type: "work",
    },
    {
      id: "2",
      title: "Director of Information Communication Technology",
      organization: "Nigeria Association of Computing Students (NACOS)",
      role: "Director of ICT",
      date: "Dec 2025 - Present",
      description: "",
      type: "work",
    },
    {
      id: "3",
      title: "Information Technology Consultant",
      organization: "Nobelton Consults",
      role: "IT Consultant",
      date: "May 2024 - Present",
      description: "",
      type: "work",
    },
    {
      id: "4",
      title: "Developer Relations & Visual Design Lead",
      organization: "Google Developer Groups (GDG) Owerri",
      role: "Lead Designer & Events Support",
      date: "Sep 2024 - Present",
      description: "",
      type: "work",
    },
  ]

  const displayItems =
    journeyTimeline && journeyTimeline.length > 0
      ? journeyTimeline.filter((j) => j.type === "work").slice(0, 4)
      : coreExperiences

  return (
    <section id="experience" className="w-full py-16 md:py-24 border-b border-border/70 bg-background transition-colors">
      <div className="site-container max-w-5xl space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-400 dark:border-slate-600">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
              Experience
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-normal pt-2">
              Verified career roadmap and engineering positions.
            </p>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 rounded-2xl bg-[#0056D2] hover:bg-[#0044a8] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer shrink-0 group"
          >
            <span>View All Experience</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Minimal Linear Rows with Distinct, Visible Divider Lines */}
        <div className="flex flex-col">
          {displayItems.map((item, idx) => (
            <Link
              key={item.id || idx}
              href="/experience"
              className="group py-5 sm:py-7 flex items-baseline justify-between gap-4 px-2 -mx-2 rounded-2xl hover:bg-slate-500/5 transition-all cursor-pointer border-b border-slate-400 dark:border-slate-600"
            >
              {/* Left Column: Number + Position at Top & Company Under */}
              <div className="flex items-start gap-3 sm:gap-6 md:gap-8 min-w-0">
                <span className="font-heading font-medium text-base sm:text-xl md:text-2xl text-muted-foreground/60 group-hover:text-foreground transition-colors w-7 sm:w-9 shrink-0 pt-0.5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-heading font-extrabold text-base sm:text-xl md:text-2xl text-foreground tracking-tight group-hover:text-[#0056D2] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {item.organization}
                  </p>
                </div>
              </div>

              {/* Right Column: Date/Year exactly as typed/stored */}
              <div className="shrink-0 pl-3 sm:pl-6 flex items-center gap-2 text-right">
                <span className="font-heading font-semibold text-xs sm:text-sm md:text-base text-foreground group-hover:text-[#0056D2] transition-colors select-none whitespace-nowrap">
                  {item.date}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-[#0056D2] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 hidden sm:block shrink-0" />
              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  )
}
