import React from "react"
import Link from "next/link"
import { Download, Mail, ArrowUpRight } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full pt-24 pb-12 md:pt-28 md:pb-16 border-b border-border/60 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
        
        <div className="flex items-center gap-3">
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            PORTFOLIO & ENGINEERING EVIDENCE
          </span>
          <span className="text-xs text-muted-foreground font-mono uppercase">
            // DELIVERABLES & CAPABILITY
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight max-w-4xl">
          Crafting Digital Products & Technology Infrastructure
        </h1>

        <p className="text-sm md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
          A collection of the products, brands, and digital experiences I've built across software engineering, digital design, and community technology leadership.
        </p>

        {/* Action Buttons: Download CV & Contact Me */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase px-7 py-3.5 rounded-none shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} />
            <span>Download CV</span>
          </a>

          <Link href="/contact">
            <button className="bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 font-bold text-xs md:text-sm tracking-wider uppercase px-7 py-3.5 rounded-none transition-all flex items-center gap-2 cursor-pointer">
              <span>Contact Me</span>
              <ArrowUpRight size={16} />
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}
