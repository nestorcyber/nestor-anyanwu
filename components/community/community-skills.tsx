import React from "react"
import {
  Users,
  Compass,
  Megaphone,
  Palette,
  GraduationCap,
  Network,
  Mic,
  ShieldAlert,
  Sparkles,
} from "lucide-react"

const COMMUNITY_SKILLS = [
  {
    id: "leadership",
    title: "Executive & Team Leadership",
    description:
      "Guiding multi-disciplinary student and volunteer teams, setting strategic direction, and aligning cross-functional deliverables under demanding timelines.",
    icon: Compass,
    level: "Core Capability",
  },
  {
    id: "event-ops",
    title: "Event Staging & Operations",
    description:
      "Comprehensive venue coordination, audiovisual oversight, stage cues, delegate registration flow, and on-site hospitality for 1,500+ attendees.",
    icon: Network,
    level: "Verified Execution",
  },
  {
    id: "devrel",
    title: "Developer Relations & Advocacy",
    description:
      "Connecting tech ecosystems, promoting developer tools, organizing hackathons, and fostering inclusive environments for emerging engineers.",
    icon: Megaphone,
    level: "Specialized Focus",
  },
  {
    id: "brand-staging",
    title: "Brand Systems & Stage Visuals",
    description:
      "Creating unified conference brand identities, keynote slide decks, LED backdrop visuals, physical badges, and promotional campaigns.",
    icon: Palette,
    level: "Creative Mastery",
  },
  {
    id: "mentorship",
    title: "Technical Mentorship & Teaching",
    description:
      "Designing hands-on programming bootcamps, Git/GitHub workshops, and personal career mentorship sessions for university students.",
    icon: GraduationCap,
    level: "Community Service",
  },
  {
    id: "crisis-management",
    title: "Live Logistics & Crisis Resolution",
    description:
      "Rapid problem-solving, real-time schedule alignment, vendor coordination, and technical troubleshooting during high-stakes live summits.",
    icon: ShieldAlert,
    level: "Operational Rigor",
  },
]

export default function CommunitySkills() {
  return (
    <section id="skills" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center">
      <div className="site-container space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Skills Gained Through <span className="text-[#0075ff]">Service</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Practical leadership, communication, operational rigor, and technical mastery honed through real-world community execution.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Visual Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMMUNITY_SKILLS.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.id}
                className="p-7 rounded-3xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top Icon & Level Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-md border border-[#0075ff]/30 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#0075ff]">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#0075ff]/10 text-[#0075ff] border border-[#0075ff]/20">
                      {skill.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
