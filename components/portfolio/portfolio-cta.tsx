import React from "react"
import Link from "next/link"
import { ArrowUpRight, Calendar, Mail } from "lucide-react"

export default function PortfolioCTA() {
  return (
    <section className="w-full py-20 md:py-28 bg-primary text-primary-foreground border-b border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-accent block">
          HAVE AN IDEA?
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase max-w-3xl mx-auto">
          Let's Build Something Meaningful
        </h2>

        <p className="text-primary-foreground/80 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Ready to kick off a software project, enterprise branding, technical advisory, or community leadership initiative? Get in touch today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/contact">
            <button className="bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase px-8 py-4 rounded-none shadow-lg transition-all flex items-center gap-2 cursor-pointer">
              <span>Start A Project</span>
              <ArrowUpRight size={16} />
            </button>
          </Link>

          <Link href="/contact">
            <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 font-bold text-xs md:text-sm tracking-wider uppercase px-8 py-4 rounded-none transition-all flex items-center gap-2 cursor-pointer">
              <Calendar size={16} />
              <span>Book A Consultation</span>
            </button>
          </Link>

          <a
            href="mailto:nestoranyanwu@gmail.com"
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 font-bold text-xs md:text-sm tracking-wider uppercase px-8 py-4 rounded-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <Mail size={16} />
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </section>
  )
}
