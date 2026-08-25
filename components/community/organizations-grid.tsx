import React from "react"
import { Building2, Globe, Users, ArrowUpRight, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react"

interface OrganizationItem {
  id: string
  name: string
  acronym?: string
  role: string
  period: string
  description: string
  type: string
  link?: string
  icon: React.ElementType
}

const ORGANIZATIONS: OrganizationItem[] = [
  {
    id: "gdg",
    name: "Google Developer Groups (GDG)",
    acronym: "GDG Owerri",
    role: "Lead Brand Designer & Events Support",
    period: "2024 - Present",
    description:
      "Creating event visual systems, keynote graphics, and developer engagement materials for major regional developer conferences.",
    type: "Tech Community",
    icon: Globe,
    link: "https://gdg.community.dev/gdg-owerri/",
  },
  {
    id: "nacos",
    name: "Nigeria Association of Computing Students",
    acronym: "NACOS National & FUTO",
    role: "Director of ICT",
    period: "2025 - Present",
    description:
      "Leading technical infrastructure, digital strategy, student hackathons, and software engineering mentorship programs.",
    type: "Computing Authority",
    icon: Cpu,
  },
  {
    id: "ieee",
    name: "IEEE Student Branch",
    acronym: "IEEE FUTO",
    role: "Event Logistics & Technical Support",
    period: "2026 - Present",
    description:
      "Supporting engineering summits, symposium registration, and technical operations for student engineers.",
    type: "Professional Engineering",
    icon: Layers,
  },
  {
    id: "aws",
    name: "AWS Cloud Club",
    acronym: "AWS FUTO",
    role: "Attendee Coordination & Front Desk",
    period: "2025",
    description:
      "Organizing cloud practitioners meetups, attendee check-ins, and foundational AWS serverless learning sessions.",
    type: "Cloud Community",
    icon: Sparkles,
  },
  {
    id: "cmx",
    name: "CMX Global Community",
    acronym: "CMX",
    role: "Graphic Designer",
    period: "2024 - Present",
    description:
      "Designing community assets, social collateral, and event banners for global community management practitioners.",
    type: "Community Network",
    icon: Users,
  },
  {
    id: "ndpc",
    name: "Nigeria Data Protection Commission",
    acronym: "NDPC",
    role: "Data Privacy Ambassador",
    period: "2025 - Present",
    description:
      "Advocating for data privacy best practices, NDPA regulatory compliance, and digital safety in tech chapters.",
    type: "Governance & Privacy",
    icon: ShieldCheck,
  },
  {
    id: "fintech",
    name: "Fintech Association of Nigeria",
    acronym: "FintechNGR",
    role: "Member",
    period: "2024 - Present",
    description:
      "Participating in fintech development discussions, digital payments literacy, and ecosystem networking.",
    type: "Fintech Industry",
    icon: Building2,
  },
  {
    id: "fle",
    name: "FLE Global",
    acronym: "FLE Global",
    role: "Event Operations & Setup Lead",
    period: "2025",
    description:
      "Managing venue setup, AV staging, and guest coordination for international leadership and hospitality conferences.",
    type: "Leadership & Enterprise",
    icon: Users,
  },
]

export default function OrganizationsGrid() {
  return (
    <section id="organizations" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-white dark:bg-background flex flex-col justify-center">
      <div className="site-container space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Organizations &amp; <span className="text-[#0075ff]">Communities</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            A curated list of technology associations, student chapters, non-profits, and global networks where I have served and contributed.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ORGANIZATIONS.map((org) => {
            const Icon = org.icon
            return (
              <div
                key={org.id}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-card border border-border/80 hover:border-[#0075ff] transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-xs hover:shadow-lg"
              >
                <div className="space-y-3">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {org.period}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-foreground font-heading tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {org.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#0075ff] mt-0.5">
                      {org.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                    {org.description}
                  </p>
                </div>

                {/* Footer Tag / Link */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {org.type}
                  </span>
                  {org.link && (
                    <a
                      href={org.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0075ff] hover:underline inline-flex items-center gap-0.5 font-bold text-[11px]"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
