import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export interface PortfolioCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function PortfolioCTA({
  title = "Let's Build Something Impactful",
  description = "Ready to kick off a software build, enterprise brand system, technical advisory, or community tech initiative? Get in touch today.",
  buttonText = "Start A Project",
  buttonHref = "/contact",
}: PortfolioCTAProps) {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] py-16 md:py-24 bg-background flex flex-col justify-center">
      <div className="site-container">
        <div className="bg-[#0B1C2C] text-white border border-border/80 rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
          {/* Blueprint grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              {title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>

            {/* Exactly ONE CTA Button */}
            <div className="flex items-center justify-center pt-3">
              <Link
                href={buttonHref}
                className="bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase pl-7 pr-3 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-3 cursor-pointer group"
              >
                <span>{buttonText}</span>
                <span className="w-8 h-8 rounded-lg bg-black/25 dark:bg-black/40 text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
