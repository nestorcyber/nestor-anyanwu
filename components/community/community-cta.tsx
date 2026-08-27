import React from "react"
import Link from "next/link"
import { ArrowRight, HeartHandshake } from "lucide-react"

export interface CommunityCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function CommunityCTA({
  title = "Let's Build Something That Matters.",
  description = "Whether you are organizing a developer conference, spearheading a grassroots tech chapter, looking for a technical workshop speaker, or launching a community impact initiative, I am always open to meaningful collaborations.",
  buttonText = "Collaborate With Me",
  buttonHref = "/contact",
}: CommunityCTAProps) {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] py-16 md:py-24 bg-background flex flex-col justify-center">
      <div className="site-container">
        <div className="bg-[#0B1C2C] text-white border border-border/80 rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
          {/* Blueprint grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Top Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[#0075ff] border border-white/15 mx-auto">
              <HeartHandshake className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading leading-tight text-white">
              {title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>

            {/* Exactly ONE CTA Button */}
            <div className="flex items-center justify-center pt-3">
              <Link
                href={buttonHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
