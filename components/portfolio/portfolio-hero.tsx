import React from "react"
import Link from "next/link"
import { Download, ArrowUpRight, Sparkles, ShieldCheck, MapPin, Users } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full pt-12 md:pt-16 pb-12 md:pb-16 border-b-2 border-slate-900 dark:border-slate-800 bg-background relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Breadcrumb & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent border border-accent/30 text-xs font-mono font-bold uppercase tracking-wider rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering & Design Deliverables</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider font-semibold">Available for Select Initiatives</span>
          </div>
        </div>

        {/* Hero Title & Identity Header */}
        <div className="max-w-4xl space-y-4 pt-2">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="px-2.5 py-1 bg-accent text-white border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Software Engineering
            </span>
            <span className="px-2.5 py-1 bg-card text-foreground border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
              Brand Systems
            </span>
            <span className="px-2.5 py-1 bg-card text-foreground border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
              IT Consulting
            </span>
          </div>

          {/* Name & Verification Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight font-heading">
              Nestor Anyanwu
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Verified Executive Profile</span>
            </div>
          </div>

          {/* Detailed Professional Profile Bio */}
          <div className="space-y-3 pt-1">
            <p className="text-base sm:text-xl font-medium text-foreground leading-relaxed">
              Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Owerri, Imo State, Nigeria
              </span>
              <span>•</span>
              <Link href="/contact" className="text-accent hover:underline font-bold">
                Contact Info
              </Link>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-foreground font-semibold">
                <Users className="w-3.5 h-3.5 text-accent" />
                500+ Connections & Tech Advocates
              </span>
            </div>
          </div>
        </div>

        {/* Hero Action Buttons & Quick Stats Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download size={15} />
              <span>Download Resume / CV</span>
            </a>

            <Link href="/contact">
              <button className="bg-card hover:bg-secondary text-foreground border-2 border-slate-900 dark:border-slate-700 font-extrabold text-xs uppercase tracking-wider px-6 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer">
                <span>Initiate Collaboration</span>
                <ArrowUpRight size={15} />
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground border-l-2 border-accent/40 pl-4 py-1">
            <div>
              <span className="block font-extrabold text-foreground text-sm">15+</span>
              <span className="uppercase text-[10px] tracking-wider">Shipped Projects</span>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div>
              <span className="block font-extrabold text-foreground text-sm">3,000+</span>
              <span className="uppercase text-[10px] tracking-wider">Users Impacted</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}


