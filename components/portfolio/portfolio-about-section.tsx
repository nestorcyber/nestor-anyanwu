import React from "react"
import Link from "next/link"
import { User, ArrowRight } from "lucide-react"
import type { SiteSettings } from "@/lib/content"

export default function PortfolioAboutSection({ settings }: { settings?: SiteSettings }) {
  const aboutText =
    "I operate at the intersection of full-stack engineering, AI workflows, and tech leadership. Through developer relations, product management, and hands-on volunteering, I work to bridge raw technical capability with human potential — building tools, systems, and communities that drive measurable impact and open opportunities for all."

  return (
    <section id="about" className="w-full py-8 md:py-10 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="container-webflow space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Core Focus
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Engineering precision, strategic IT consulting, and community leadership.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Centered Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-base text-muted-foreground font-medium leading-relaxed text-center">
            {aboutText}
          </p>

          <div className="flex justify-center pt-2">
            <Link
              href="/about"
              className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-xs active:scale-98 transition-all inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
