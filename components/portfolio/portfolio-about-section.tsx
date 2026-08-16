import React from "react"
import Link from "next/link"
import { User, ArrowRight } from "lucide-react"
import type { SiteSettings } from "@/lib/content"

export default function PortfolioAboutSection({ settings }: { settings?: SiteSettings }) {
  const aboutText =
    settings?.aboutParagraph ||
    "I am an ICT Director, Software Engineer, IT Consultant, and Community Leader. I build digital infrastructure, lead tech communities like NACOS FUTO & GDG, advocate for data privacy, and deliver production software solutions. From directing national computing initiatives to engineering web applications and mentoring student developers, my mission centers on leveraging technology to drive real-world impact and empower future builders."

  return (
    <section id="about" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header - Matching all other portfolio sections */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">About Me</h2>
              <p className="text-xs text-muted-foreground">Background, leadership roles, engineering vision, and community impact.</p>
            </div>
          </div>
        </div>

        {/* Centered Content with Standard Portfolio Text Colors & Size */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-base text-muted-foreground font-medium leading-relaxed text-center">
            {aboutText}
          </p>

          <div className="flex justify-center pt-2">
            <Link href="/about">
              <button className="bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
