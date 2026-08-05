import React from "react"
import type { PortfolioStat } from "@/lib/content"

export default function PortfolioStats({ stats }: { stats: PortfolioStat[] }) {
  return (
    <section className="w-full bg-secondary/40 py-12 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-border/40">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 md:p-6 flex flex-col justify-between space-y-2"
            >
              <span className="text-3xl md:text-5xl font-extrabold text-accent tracking-tight">
                {stat.value}
              </span>
              <div>
                <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                  {stat.label}
                </h4>
                {stat.description && (
                  <p className="text-[11px] text-muted-foreground font-light leading-relaxed mt-1">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
