import React from "react"
import { Building2, CalendarCheck, HeartHandshake, Users } from "lucide-react"

interface ImpactSnapshotProps {
  organizationCount?: number
  eventCount?: number
  volunteerCount?: number
  peopleReached?: string
}

export default function ImpactSnapshot({
  organizationCount = 8,
  eventCount = 15,
  volunteerCount = 12,
  peopleReached = "3,500+",
}: ImpactSnapshotProps) {
  const stats = [
    {
      id: "orgs",
      value: `${organizationCount}+`,
      label: "Organizations & Communities",
      subtext: "Leadership, directorships & active memberships",
      icon: Building2,
    },
    {
      id: "events",
      value: `${eventCount}+`,
      label: "Conferences & Summits",
      subtext: "Technical staging, branding & operations",
      icon: CalendarCheck,
    },
    {
      id: "volunteering",
      value: `${volunteerCount}+`,
      label: "Volunteer Engagements",
      subtext: "Hands-on grassroots contributions & advisory",
      icon: HeartHandshake,
    },
    {
      id: "reach",
      value: peopleReached,
      label: "Community Members Impacted",
      subtext: "Attendees, student developers & mentees",
      icon: Users,
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-slate-900/90 dark:bg-slate-900/40 border-b border-border/70 text-white">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className="p-6 rounded-2xl bg-white/5 dark:bg-card/60 border border-white/10 dark:border-slate-800 hover:border-[#0075ff]/60 transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight group-hover:text-[#0075ff] transition-colors">
                    {stat.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-slate-800 text-[#0075ff] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-200 tracking-wide">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
