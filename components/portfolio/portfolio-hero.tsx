import React from "react"
import Link from "next/link"
import { Download, Send, Sparkles } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full pt-12 md:pt-16 pb-12 md:pb-16 border-b border-border/70 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Status Badge */}
        <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent border border-accent/30 text-xs font-mono font-bold uppercase tracking-wider rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio & Engineering Deliverables</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider font-semibold">Available for Work</span>
          </div>
        </div>

        {/* Role Tags */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold uppercase tracking-wider pt-1">
          <span className="px-2.5 py-1 bg-accent text-white rounded-md">
            Software Engineering
          </span>
          <span className="px-2.5 py-1 bg-secondary text-foreground rounded-md border border-border">
            Brand Systems
          </span>
          <span className="px-2.5 py-1 bg-secondary text-foreground rounded-md border border-border">
            IT Consulting
          </span>
        </div>

        {/* Name and Buttons on the SAME LINE on Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight font-heading">
            Nestor Anyanwu
          </h1>

          {/* Buttons styled as rounded-xl pill-rectangles */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/contact">
              <button className="bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer">
                <Send size={16} />
                <span>Message / Contact</span>
              </button>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/80 hover:bg-secondary border border-border/80 text-foreground font-semibold text-sm px-6 py-3 rounded-xl shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download size={16} />
              <span>Resume / CV</span>
            </a>
          </div>
        </div>

        {/* Bio Description Paragraph */}
        <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
          Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here.
        </p>

      </div>
    </section>
  )
}
