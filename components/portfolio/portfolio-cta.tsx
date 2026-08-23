import React from "react"
import Link from "next/link"
import { ArrowUpRight, Calendar, Mail } from "lucide-react"

export default function PortfolioCTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container-webflow">
        <div className="bg-[#0B1C2C] text-white border border-border/80 rounded-2xl shadow-md p-8 sm:p-12 md:p-16 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto font-heading leading-snug">
            Let's Build Something Impactful
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Ready to kick off a software build, enterprise brand system, technical advisory, or community tech initiative? Get in touch today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white font-extrabold text-[11px] sm:text-xs tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-xs active:scale-98 transition-all inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <span>Start A Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <Link
              href="/contact"
              className="bg-card text-foreground border border-border/80 hover:bg-secondary font-extrabold text-[11px] sm:text-xs tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-xs active:scale-98 transition-all inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Book Consultation</span>
            </Link>

            <a
              href="mailto:nestoranyanwu@gmail.com"
              className="bg-card text-foreground border border-border/80 hover:bg-secondary font-extrabold text-[11px] sm:text-xs tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl shadow-xs active:scale-98 transition-all inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
