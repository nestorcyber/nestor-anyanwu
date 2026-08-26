import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function HomeCTA() {
  return (
    <section className="w-full py-14 md:py-18 bg-[#0B1C2C] text-white border-b border-border/60 relative overflow-hidden">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 text-center space-y-8">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl mx-auto font-heading">
          Let's Build an Inclusive Tech Ecosystem Together
        </h2>

        <p className="text-primary-foreground/80 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Whether you're looking to build software, integrate AI, direct product strategy, consult on IT architecture, or collaborate on developer relations and community initiatives, let's connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase pl-7 pr-3 py-2.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-3 cursor-pointer group"
          >
            <span>Start A Collaboration</span>
            <span className="w-8 h-8 rounded-lg bg-black/25 dark:bg-black/40 text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
