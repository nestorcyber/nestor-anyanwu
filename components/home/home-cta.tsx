import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function HomeCTA() {
  return (
    <section className="w-full py-14 md:py-18 bg-primary text-primary-foreground border-b border-border/60 relative overflow-hidden">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-sky-400 block">
          COLLABORATION & INITIATIVES
        </span>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
          Let's Build Impactful Technology Together
        </h2>

        <p className="text-primary-foreground/80 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Whether you are looking to build a digital product, collaborate on community tech programs, or invite me for a speaking engagement—let's connect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/contact">
            <button className="bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-none shadow-lg transition-all flex items-center gap-2 cursor-pointer">
              <span>Start A Collaboration ↗</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
