import React from "react"
import { Code2, Palette, CalendarCheck2, Users2, CheckCircle2 } from "lucide-react"

const PILLARS = [
  {
    id: "tech",
    icon: Code2,
    title: "Technology & Systems",
    subtitle: "Web, Infrastructure & Support",
    description:
      "Architecting digital portals, automating registration workflows, maintaining technical infrastructure, and providing hands-on technical guidance for community projects.",
    points: [
      "Custom web platforms & chapter portals",
      "Git & open-source developer workshops",
      "Technical audits & digital infrastructure",
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Brand Systems & Design",
    subtitle: "Visual Communication & Collateral",
    description:
      "Crafting unified visual identities, stage graphics, keynote slides, and promotional assets that elevate community events to world-class standards.",
    points: [
      "Conference branding & keynote visual decks",
      "Badges, merchandise & digital passes",
      "Social campaigns & marketing design",
    ],
  },
  {
    id: "events",
    icon: CalendarCheck2,
    title: "Event Operations & Logistics",
    subtitle: "Coordination, Setup & Staging",
    description:
      "Managing on-ground venue logistics, AV systems, attendee registration flow, and real-time crisis resolution during live summits and hackathons.",
    points: [
      "Venue coordination & AV technical setup",
      "Attendee check-in & delegate hospitality",
      "Multi-track speaker stage management",
    ],
  },
  {
    id: "community",
    icon: Users2,
    title: "Community Building & DevRel",
    subtitle: "Advocacy, Mentorship & Growth",
    description:
      "Empowering emerging engineers through inclusive mentorship, community advocacy, ecosystem partnerships, and creating open platforms for collaboration.",
    points: [
      "Developer relations & community outreach",
      "Student tech mentorship & career guidance",
      "Cross-chapter partnerships & hackathons",
    ],
  },
]

export default function ContributionPillars() {
  return (
    <section id="contributions" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center">
      <div className="site-container space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            How I <span className="text-[#0075ff]">Contribute</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            My core contribution areas combining technical execution, creative design, operational rigor, and human-centric community mentorship.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.id}
                className="p-7 rounded-3xl bg-white dark:bg-card border border-border/80 hover:border-[#0075ff] transition-all duration-300 group flex flex-col justify-between space-y-6 shadow-xs hover:shadow-xl min-h-[380px]"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-md border border-[#0075ff]/30 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#0075ff]">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#0075ff]">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {pillar.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0075ff] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
