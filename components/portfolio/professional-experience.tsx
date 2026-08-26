import React from "react"
import Link from "next/link"
import type { JourneyItem } from "@/lib/content"
import {
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Play,
  Briefcase,
} from "lucide-react"

export default function ProfessionalExperience({
  journeyTimeline,
}: {
  journeyTimeline?: JourneyItem[]
} = {}) {
  // Professional milestones integrating Software Engineering, DevRel, Tech Leadership, Design, and Impact
  const coreExperiences: JourneyItem[] = [
    {
      id: "1",
      title: "Lead Full-Stack Engineer & System Architect",
      organization: "Software Engineering & Digital Platforms",
      role: "Lead Full-Stack Engineer",
      date: "2025 - Present",
      description:
        "Architecting resilient full-stack web applications, scalable backend API systems, and AI automation pipelines with a focus on type safety, high throughput, and enterprise-grade performance.",
      type: "work",
      details: ["Software Engineering", "Web Development", "AI Workflows", "API Architecture"],
    },
    {
      id: "2",
      title: "Director of Technology & Developer Relations (DevRel)",
      organization: "Technology Strategy & Community Programs",
      role: "Director of ICT & DevRel Lead",
      date: "2024 - Present",
      description:
        "Directing technological infrastructure, digital strategy, and ecosystem developer relations, leading hands-on workshops, hackathons, and high-impact tech community initiatives.",
      type: "work",
      details: ["DevRel", "Community Building", "IT Consulting", "Impact & Volunteering"],
    },
  ]

  const displayItems = coreExperiences

  const getSpineIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-[#0075ff]" />
      case 1:
        return <Globe className="w-5 h-5 text-[#0075ff]" />
      default:
        return <Code2 className="w-5 h-5 text-[#0075ff]" />
    }
  }

  return (
    <section
      id="experience"
      className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background ambient lighting in brand electric blue */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Career <span className="text-[#0075ff]">Roadmap</span> &amp; Experience
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Verified engineering track record, technical directorship, and full-stack software delivery.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-1" />
        </div>

        {/* Connected Roadmap Timeline Track */}
        <div className="relative max-w-5xl mx-auto pt-4 pb-2">
          
          {/* Continuous Central Glowing Roadmap Spine Line in Brand Electric Blue (Desktop) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#0075ff] via-[#0075ff]/60 to-transparent pointer-events-none hidden md:block" />

          {/* Continuous Left-Aligned Glowing Spine Line (Mobile) */}
          <div className="absolute left-6 top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#0075ff] via-[#0075ff]/60 to-transparent pointer-events-none md:hidden" />

          {/* Roadmap Milestone Items */}
          <div className="space-y-12 md:space-y-16">
            {displayItems.map((item, idx) => {
              const isEven = idx % 2 === 0

              return (
                <div
                  key={item.id || idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* 1. Milestone Roadmap Card Content */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-14 sm:pl-16 md:pl-0">
                    <article className="group relative bg-white dark:bg-card border border-slate-200/90 dark:border-slate-800 hover:border-[#0075ff] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,117,255,0.12)] transition-all duration-300 space-y-4">
                      
                      {/* Speech Bubble Notch pointing to center spine on Desktop */}
                      {isEven ? (
                        <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-l-[10px] border-l-white dark:border-l-card" />
                      ) : (
                        <div className="hidden md:block absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[9px] border-y-transparent border-r-[10px] border-r-white dark:border-r-card" />
                      )}

                      {/* Header Block: Title & Domain */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-foreground font-heading tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-[#0075ff] mt-1">
                          {item.organization}
                        </p>
                      </div>

                      {/* Description Bullet Point */}
                      <div className="pt-1">
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          <Play className="w-2.5 h-2.5 mt-1.5 fill-[#0075ff] text-[#0075ff] shrink-0" />
                          <span>{item.description}</span>
                        </div>
                      </div>

                      {/* Brand Colored Skills / Focus Tag Chips */}
                      {item.details && item.details.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                          {item.details.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-lg bg-[#0075ff]/10 text-[#0075ff] border border-[#0075ff]/20 text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </article>
                  </div>

                  {/* 2. Central Glowing Node Icon Badge on Spine */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-0 md:-translate-y-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-[0_0_18px_rgba(0,117,255,0.35)] border-2 border-[#0075ff]/70 transition-all duration-300 hover:scale-110 hover:border-[#0075ff] hover:shadow-[0_0_24px_rgba(0,117,255,0.55)]">
                      {getSpineIcon(idx)}
                    </div>
                  </div>

                  {/* 3. Opposite Side Date Timestamp (Desktop) in Brand Color */}
                  <div
                    className={`hidden md:flex w-[calc(50%-2.5rem)] items-center ${
                      isEven ? "justify-start pl-6" : "justify-end pr-6 text-right"
                    }`}
                  >
                    <span className="text-sm font-bold font-mono text-[#0075ff] tracking-wide px-3 py-1 rounded-md bg-[#0075ff]/5 border border-[#0075ff]/15">
                      {item.date}
                    </span>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

        {/* View All Experience Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View All Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
