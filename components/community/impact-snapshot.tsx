import React from "react"
import type { PortfolioStat } from "@/lib/content"

interface ImpactSnapshotProps {
  stats?: PortfolioStat[]
}

const TILE_THEMES = [
  {
    container: "bg-[#0056D2] hover:bg-[#0044a8] text-white",
    dot: "bg-white",
    desc: "text-white/85",
  },
  {
    container: "bg-[#020617] hover:bg-[#070e20] dark:bg-[#020617] dark:hover:bg-[#070e20] text-[#F1F5F9]",
    dot: "bg-[#F1F5F9]",
    desc: "text-[#CBD5E1]",
  },
  {
    container: "bg-[#CBD5E1] hover:bg-slate-300 text-[#020617] dark:bg-[#1E293B] dark:hover:bg-[#253347] dark:text-[#F1F5F9]",
    dot: "bg-[#020617] dark:bg-[#F1F5F9]",
    desc: "text-[#020617]/80 dark:text-[#CBD5E1]",
  },
  {
    container: "bg-white hover:bg-slate-50 text-[#020617] dark:bg-[#0F172A] dark:hover:bg-[#162032] dark:text-[#F1F5F9]",
    dot: "bg-[#020617] dark:bg-[#F1F5F9]",
    desc: "text-slate-600 dark:text-[#CBD5E1]",
  },
]

export default function ImpactSnapshot({ stats }: ImpactSnapshotProps) {
  if (!stats || stats.length === 0) return null

  const gridColsClass =
    stats.length >= 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : stats.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2"

  return (
    <section
      aria-label="Community Impact Metrics"
      className="w-full border-b border-border/70 transition-colors overflow-hidden"
    >
      <div
        className={`w-full grid ${gridColsClass} gap-0 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10`}
      >
        {stats.map((stat, idx) => {
          const tileTheme = TILE_THEMES[idx % TILE_THEMES.length]
          return (
            <div
              key={idx}
              className={`relative p-6 sm:p-8 lg:p-10 xl:p-12 min-h-[175px] sm:min-h-[200px] lg:min-h-[220px] flex flex-col justify-between transition-colors duration-300 ${tileTheme.container}`}
            >
              {/* Top Row: Large Metric Value + Top-Right Square Indicator */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-none font-heading">
                  {stat.value}
                </span>
                <span
                  className={`w-2 h-2 shrink-0 mt-1 ${tileTheme.dot}`}
                  aria-hidden="true"
                />
              </div>

              {/* Bottom Row: Label / Description + Bottom-Right Square Indicator */}
              <div className="flex items-end justify-between gap-4 pt-6 sm:pt-8">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold tracking-normal leading-snug">
                    {stat.label}
                  </h3>
                  {stat.description && (
                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${tileTheme.desc}`}>
                      {stat.description}
                    </p>
                  )}
                </div>
                <span
                  className={`w-2 h-2 shrink-0 mb-1 ${tileTheme.dot}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
