import React from "react"
import Link from "next/link"
import { User, ArrowRight } from "lucide-react"
import type { SiteSettings } from "@/lib/content"

export default function PortfolioAboutSection({ settings }: { settings?: SiteSettings }) {
  const aboutText =
    settings?.aboutParagraph ||
    "I am an ICT Director, Software Engineer, IT Consultant, and Community Leader. I build digital infrastructure, lead tech communities like NACOS FUTO & GDG, advocate for data privacy, and deliver production software solutions. From directing national computing initiatives to engineering web applications and mentoring student developers, my mission centers on leveraging technology to drive real-world impact and empower future builders."

  return (
    <section id="about" className="w-full py-8 md:py-10 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Core Focus
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Engineering, design, and ICT leadership.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Centered Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-base text-muted-foreground font-medium leading-relaxed text-center">
            {aboutText}
          </p>

          <div className="flex justify-center pt-2">
            <Link href="/about">
              <button className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
