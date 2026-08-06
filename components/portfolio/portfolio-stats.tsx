import React from "react"
import type { PortfolioStat } from "@/lib/content"

export default function PortfolioStats({ stats }: { stats: PortfolioStat[] }) {
  return (
    <section className="w-full py-10 border-b-2 border-slate-900 dark:border-slate-800 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const labelLower = stat.label.toLowerCase()
            let href = "#"
            if (labelLower.includes("project")) href = "#projects"
            else if (labelLower.includes("community")) href = "/community"
            else if (labelLower.includes("article") || labelLower.includes("journal") || labelLower.includes("write")) href = "/journal"
            else if (labelLower.includes("exp") || labelLower.includes("role") || labelLower.includes("year")) href = "#experience"
            else if (labelLower.includes("skill") || labelLower.includes("tech")) href = "#skills"

            return (
              <a
                key={idx}
                href={href}
                className="p-4 bg-card border-2 border-slate-900/20 dark:border-slate-800 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] flex flex-col justify-between space-y-2 group hover:border-accent hover:-translate-y-0.5 transition-all"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-accent font-heading group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                    {stat.label}
                  </h3>
                  {stat.description && (
                    <p className="text-[11px] text-muted-foreground font-light leading-snug mt-0.5 line-clamp-1">
                      {stat.description}
                    </p>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
