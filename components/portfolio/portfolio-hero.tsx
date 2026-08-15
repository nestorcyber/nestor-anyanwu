import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, ShieldCheck, MapPin, Users, Building2, GraduationCap, Send, MoreHorizontal } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full bg-background border-b border-border/70 relative">
      
      {/* 1. Edge-to-Edge Cover Photo Banner */}
      <div className="h-52 sm:h-72 lg:h-80 w-full relative bg-slate-900 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
          alt="Nestor Anyanwu Cover Banner"
          fill
          className="object-cover opacity-90 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      {/* 2. Edge-to-Edge Profile Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 -mt-20 sm:-mt-28 mb-8">
          
          {/* Profile Avatar */}
          <div className="relative">
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-background bg-slate-900 overflow-hidden shadow-xl relative shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
                alt="Nestor Anyanwu Avatar"
                fill
                className="object-cover object-[50%_15%]"
              />
            </div>
            <div className="absolute bottom-3 right-3 w-6 h-6 bg-emerald-500 rounded-full border-2 border-background" title="Available for work / consulting"></div>
          </div>

          {/* Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
            <Link href="/contact">
              <button className="bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer">
                <Send size={15} />
                <span>Open to Work / Contact</span>
              </button>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download size={15} />
              <span>Resume / CV</span>
            </a>

            <div className="p-3 rounded-full border border-border bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer transition-colors">
              <MoreHorizontal size={18} />
            </div>
          </div>

        </div>

        {/* Profile Information Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bio Info (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Name & Verification Badge */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                  Nestor Anyanwu
                </h1>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Profile</span>
                </div>
              </div>

              <p className="text-base sm:text-xl text-foreground font-medium mt-2 leading-relaxed">
                Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here.
              </p>
            </div>

            {/* Location & Connections */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="inline-flex items-center gap-1.5 text-foreground/90 font-semibold">
                <MapPin className="w-4 h-4 text-accent" />
                Owerri, Imo State, Nigeria
              </span>
              <span>•</span>
              <Link href="/contact" className="text-accent hover:underline font-bold">
                Contact info
              </Link>
              <span>•</span>
              <span className="text-accent font-bold">
                500+ connections
              </span>
            </div>

            {/* Open To Work Banner */}
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-accent text-sm block">Open to work & Consulting</span>
                <span className="text-muted-foreground">Software Engineer, Brand Designer & IT Architect roles</span>
              </div>
              <Link href="/contact" className="text-accent font-bold hover:underline shrink-0 text-xs">
                See details →
              </Link>
            </div>
          </div>

          {/* Side Institutional Highlights (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/60 lg:pl-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-accent shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground line-clamp-1 text-sm">NACOS National & FUTO</p>
                <p className="text-muted-foreground">Director of ICT & Tech Lead</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-accent shrink-0 shadow-2xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground line-clamp-1 text-sm">Federal University of Technology Owerri</p>
                <p className="text-muted-foreground">Computer Science B.Tech</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
