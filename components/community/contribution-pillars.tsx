import React from "react"
import {
  Camera,
  Code2,
  Palette,
  Users2,
  Truck,
  LayoutGrid,
  UserCheck,
  CheckCircle2,
  Layers,
} from "lucide-react"

const VOLUNTEER_UNITS = [
  {
    id: "media",
    icon: Camera,
    title: "Media & Documentation",
    subtitle: "Photography, Press & Video Coverage",
    description:
      "Capturing high-impact event moments, executive panel discussions, keynote sessions, and managing digital distribution for attendee and press archives.",
    points: [
      "On-site event photography & video capture.",
      "Keynote documentation & press distribution.",
      "Digital visual asset post-production & archiving.",
    ],
  },
  {
    id: "technical",
    icon: Code2,
    title: "Technical & Systems Support",
    subtitle: "Web, Infrastructure & Live AV Systems",
    description:
      "Architecting digital registration portals, automating check-in flows, maintaining technical infrastructure, and providing hands-on technical workshop setup.",
    points: [
      "Custom web platforms & ticketing portals.",
      "Live developer workshops & technical setup.",
      "Technical audits & internet connectivity.",
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Design & Brand Staging",
    subtitle: "Visual Identity, Stage Decks & Collaterals",
    description:
      "Crafting unified visual identities, stage graphics, keynote slides, digital passes, badges, and promotional assets that elevate community summits.",
    points: [
      "Conference branding & keynote visual decks.",
      "LED stage backdrops, badges & delegate passes.",
      "Digital banners & social campaign graphics.",
    ],
  },
  {
    id: "community",
    icon: Users2,
    title: "Community Management & DevRel",
    subtitle: "Advocacy, Student Mentorship & Growth",
    description:
      "Empowering emerging engineers through inclusive mentorship, community advocacy, ecosystem partnerships, and creating active spaces for collaboration.",
    points: [
      "Developer chapter advocacy & outreach.",
      "Student tech mentorship & career guidance.",
      "Cross-chapter partnerships & hackathon support.",
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Front Desk Operations",
    subtitle: "Registration Desks, Flow & Delegate Hospitality",
    description:
      "Managing attendee registration check-in, delegate kit distribution, VIP protocol hospitality, material transport, and rapid crisis troubleshooting during live conferences.",
    points: [
      "Attendee check-in, credential verification & delegate kits.",
      "VIP, speaker & executive delegate protocol hospitality.",
      "Vendor logistics, material flow & real-time crisis resolution.",
    ],
  },
  {
    id: "event-setup",
    icon: LayoutGrid,
    title: "Event Setup & Staging",
    subtitle: "Venue Layout, Acoustics & Stage Cues",
    description:
      "Overseeing hall arrangement, acoustic alignment, stage construction, directional signage, and backstage speaker cues for seamless session execution.",
    points: [
      "Stage setup, lighting & acoustic flow.",
      "Hall layout, seat planning & signage placement.",
      "Backstage speaker readiness & cue management.",
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
            The core functional units where I deploy hands-on execution during tech conferences, student computing leadership, hackathons, and community summits.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 7 Volunteer Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {VOLUNTEER_UNITS.map((unit, idx) => {
            const Icon = unit.icon
            const unitNumber = String(idx + 1).padStart(2, "0")

            return (
              <div
                key={unit.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-card border border-border/80 hover:border-[#0075ff] transition-all duration-300 group flex flex-col justify-between space-y-5 shadow-xs hover:shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon and Unit Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-md border border-[#0075ff]/30 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#0075ff]">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                      UNIT {unitNumber}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-[#0075ff]">
                      {unit.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                    {unit.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {unit.points.map((point, pIdx) => (
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
