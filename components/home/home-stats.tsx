"use client"

import React from "react"
import { Users, Code2, Globe2, Sparkles, Building2, Layers } from "lucide-react"

export interface StatItem {
  value: string
  label: string
  description?: string
}

interface HomeStatsProps {
  stats?: StatItem[]
}

const STAT_ICONS = [Users, Layers, Globe2, Sparkles, Building2, Code2]

export default function HomeStats({ stats = [] }: HomeStatsProps) {
  if (!stats || stats.length === 0) return null

  return (
    <section id="key-metrics" aria-label="Impact and Key Metrics" className="w-full relative py-12 md:py-16 bg-slate-950 text-white border-b border-slate-800/80 overflow-hidden font-sans">
      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0075ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        <div
          className={`grid grid-cols-1 ${
            stats.length === 2
              ? "sm:grid-cols-2 max-w-3xl mx-auto"
              : stats.length === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : stats.length >= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 max-w-md mx-auto"
          } gap-6 md:gap-8`}
        >
          {stats.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length]

            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#0075ff]/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,117,255,0.12)] flex flex-col justify-between"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#0075ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight group-hover:text-[#0075ff] transition-colors">
                      {stat.value}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-[#0075ff] group-hover:bg-[#0075ff]/15 group-hover:border-[#0075ff]/30 flex items-center justify-center shrink-0 transition-all duration-300">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight mb-2">
                    {stat.label}
                  </h3>

                  {stat.description && (
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>

                {/* Subtle indicator dot/line */}
                <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0075ff]" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                    Verified Milestone
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
