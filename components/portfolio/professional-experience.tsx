import React from "react"
import Link from "next/link"
import type { JourneyItem } from "@/lib/content"
import { ArrowRight } from "lucide-react"
import ExperienceSplitCard from "@/components/shared/experience-card"

export default function ProfessionalExperience({
  journeyTimeline,
}: {
  journeyTimeline?: JourneyItem[]
} = {}) {
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
      title: "Director of Information Communication Technology",
      organization: "Nigeria Association of Computing Students (NACOS)",
      role: "Director of ICT",
      date: "Dec 2025 - Present",
      description:
        "Directing national and chapter digital infrastructure, technical workshops, and engineering initiatives serving over 5,000 computing students across South-East Nigeria.",
      type: "work",
      details: ["ICT Directorship", "Tech Leadership", "Ecosystem Strategy", "Developer Programs"],
    },
    {
      id: "3",
      title: "Information Technology Consultant",
      organization: "Nobelton Consults",
      role: "IT Consultant",
      date: "May 2024 - Present",
      description:
        "Providing strategic IT consulting, enterprise technology audits, web systems delivery, and digital transformation advisory for high-growth ventures and commercial clients.",
      type: "work",
      details: ["IT Consulting", "Infrastructure Audits", "Systems Strategy", "Corporate Training"],
    },
    {
      id: "4",
      title: "Developer Relations & Visual Design Lead",
      organization: "Google Developer Groups (GDG) Owerri",
      role: "Lead Designer & Events Support",
      date: "Sep 2024 - Present",
      description:
        "Leading brand systems, keynote visual assets, developer relations, and stage production graphics for 1,500+ engineers at South-East Nigeria's largest developer conferences.",
      type: "work",
      details: ["Developer Relations", "Visual Systems", "Community Advocacy", "Event Staging"],
    },
  ]

  const displayItems =
    journeyTimeline && journeyTimeline.length > 0
      ? journeyTimeline.filter((j) => j.type === "work").slice(0, 4)
      : coreExperiences

  return (
    <section id="experience" className="w-full py-16 md:py-24 border-b border-border/70 bg-card/20 relative">
      {/* Contained ambient glow layer (isolated from section so sticky lapping works) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0056D2]/5 dark:bg-[#0056D2]/10 rounded-full blur-3xl" />
      </div>

      <div className="site-container relative z-10 space-y-12 md:space-y-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Verified engineering track record, technical directorship, and full-stack software delivery.
          </p>
          <div className="w-14 h-1 bg-[#0056D2] rounded-2xl mt-2" />
        </div>

        {/* Lapped Visible Card Stack (Stepped Sticky Deck) */}
        <div className="relative max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-8 lg:pb-10">
          {displayItems.map((item, idx) => {
            const total = displayItems.length
            const stepPx = 24
            const bottomStepCount = total - 1 - idx
            const deckScale = 1 - bottomStepCount * 0.015

            return (
              <div
                key={item.id || idx}
                style={{
                  zIndex: idx + 1,
                  top: `calc(5.5rem + ${idx * stepPx}px)`,
                  paddingBottom: `${bottomStepCount * stepPx}px`,
                  marginBottom: `-${bottomStepCount * stepPx}px`,
                }}
                className="sticky pointer-events-none"
              >
                <ExperienceSplitCard
                  item={item}
                  index={idx}
                  scale={deckScale}
                  elevatedStackShadow
                />
              </div>
            )
          })}
        </div>

        {/* View All Experience Button */}
        <div className="flex justify-center pt-2">
          <Link
            href="/experience"
            className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-2xl bg-[#0056D2] hover:bg-[#0044a8] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>View All Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
