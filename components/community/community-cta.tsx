import React from "react"
import Link from "next/link"
import { ArrowUpRight, HeartHandshake } from "lucide-react"

export interface CommunityCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function CommunityCTA({
  title = "Let's Build Something That Matters",
  description = "Whether you are organizing a developer conference, spearheading a grassroots tech chapter, looking for a technical workshop speaker, or launching a community impact initiative, I am always open to meaningful collaborations.",
  buttonText = "Collaborate With Me",
  buttonHref = "/contact",
}: CommunityCTAProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-[#0B1C2C] text-white border-b border-border/60 relative overflow-hidden">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 text-center space-y-6">
        {/* Top Icon Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[#0075ff] border border-white/15 mx-auto">
          <HeartHandshake className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto font-heading">
          {title}
        </h2>

        <p className="text-slate-200 sm:text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href={buttonHref}
            className="h-11 sm:h-12 bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase pl-6 sm:pl-7 pr-2.5 sm:pr-3 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <span>{buttonText}</span>
            <span className="w-8 h-8 rounded-lg bg-black/25 dark:bg-black/40 text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
