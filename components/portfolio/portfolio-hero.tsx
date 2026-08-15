import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, MapPin, Send, MoreHorizontal, ArrowUpRight } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full bg-background border-b border-border/70 relative">
      
      {/* 1. Natural Integrated Cover Photo Header (Smoothed gradient & backdrop blur bottom edge) */}
      <div className="h-60 sm:h-80 lg:h-96 w-full relative bg-slate-950 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
          alt="Nestor Anyanwu Banner"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Soft radial overlay and seamless fade to page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent backdrop-blur-[2px]"></div>
      </div>

      {/* 2. Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          
          {/* Identity & Headline */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent border border-accent/30 text-xs font-mono font-bold uppercase tracking-wider rounded-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>Available for Select Initiatives</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight font-heading">
              Nestor Anyanwu
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
              Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here.
            </p>
          </div>

          {/* Action Buttons with Slightly Rounded Rectangular Edges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/contact">
              <button className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md border border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer">
                <Send size={15} />
                <span>Contact Me</span>
              </button>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card hover:bg-secondary text-foreground font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md border border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download size={15} />
              <span>Resume / CV</span>
            </a>
          </div>

        </div>

        {/* Location & Meta info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium pt-2 border-t border-border/50">
          <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
            <MapPin className="w-4 h-4 text-accent" />
            Owerri, Imo State, Nigeria
          </span>
          <span>•</span>
          <Link href="/contact" className="text-accent hover:underline font-bold">
            Contact info
          </Link>
          <span>•</span>
          <span className="text-accent font-bold">
            500+ Connections & Collaborators
          </span>
        </div>

      </div>
    </section>
  )
}
