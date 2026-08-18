import React from "react"
import type { PortfolioStat } from "@/lib/content"

export default function PortfolioStats({ stats }: { stats: PortfolioStat[] }) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="w-full py-8 border-b border-border/70 bg-background">
      <div className="container-webflow">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 bg-card border border-border/80 rounded-xl shadow-2xs hover:border-accent/60 transition-all space-y-1.5"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-accent font-heading tracking-tight">
                {stat.value}
              </div>
              <h3 className="text-sm font-bold text-foreground tracking-tight">
                {stat.label}
              </h3>
              {stat.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
