import React from "react"
import { Building2, CalendarCheck, HeartHandshake, Users, Sparkles, Award } from "lucide-react"
import type { PortfolioStat } from "@/lib/content"

interface ImpactSnapshotProps {
  stats?: PortfolioStat[]
}

const DEFAULT_ICONS = [Building2, Users, CalendarCheck, HeartHandshake, Award, Sparkles]

export default function ImpactSnapshot({ stats }: ImpactSnapshotProps) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="w-full py-12 md:py-16 bg-slate-900/90 dark:bg-slate-900/40 border-b border-border/70 text-white">
      <div className="site-container">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            stats.length >= 4
              ? "lg:grid-cols-4"
              : stats.length === 3
              ? "lg:grid-cols-3"
              : "lg:grid-cols-2"
          } gap-6`}
        >
          {stats.map((stat, idx) => {
            const Icon = DEFAULT_ICONS[idx % DEFAULT_ICONS.length]
            return (
              <div
                key={stat.id || idx}
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
                  {stat.description && (
                    <p className="text-xs text-slate-400 font-normal leading-relaxed">
                      {stat.description}
                    </p>
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
