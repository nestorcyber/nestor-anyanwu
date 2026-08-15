import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, ArrowUpRight, ShieldCheck, MapPin, Users, Building2, GraduationCap, Briefcase, Plus, Send, MoreHorizontal } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full pt-6 md:pt-10 pb-10 border-b border-border/70 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* LinkedIn-Style Profile Main Card */}
        <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm relative">
          
          {/* 1. Cover Photo Banner */}
          <div className="h-44 sm:h-60 w-full relative bg-slate-900 overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
              alt="Nestor Anyanwu Cover Banner"
              fill
              className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          </div>

          {/* 2. Profile Details & Avatar Section */}
          <div className="px-6 sm:px-10 pb-8 relative pt-0">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 -mt-16 sm:-mt-24 mb-6">
              
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border-4 border-card bg-slate-900 overflow-hidden shadow-lg relative shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
                    alt="Nestor Anyanwu Avatar"
                    fill
                    className="object-cover object-[50%_15%]"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card" title="Available for work / consulting"></div>
              </div>

              {/* Action Buttons Bar (LinkedIn Profile Style) */}
              <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
                <Link href="/contact">
                  <button className="bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer">
                    <Send size={14} />
                    <span>Open to Work / Contact</span>
                  </button>
                </Link>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Resume / CV</span>
                </a>

                <div className="p-2.5 rounded-full border border-border bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer transition-colors">
                  <MoreHorizontal size={16} />
                </div>
              </div>

            </div>

            {/* Profile Information & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Bio Info (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Name & Verification Badge */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                      Nestor Anyanwu
                    </h1>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-[11px] font-semibold rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Profile</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-foreground font-semibold mt-1 leading-snug">
                    Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here.
                  </p>
                </div>

                {/* Location & Connections */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-medium">
                  <span className="inline-flex items-center gap-1.5 text-foreground/80">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
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

                {/* Open To Work Pill Banner */}
                <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-accent block">Open to work & Consulting</span>
                    <span className="text-muted-foreground text-[11px]">Software Engineer, Brand Designer & IT Architect roles</span>
                  </div>
                  <Link href="/contact" className="text-accent font-bold hover:underline shrink-0 text-xs">
                    See details →
                  </Link>
                </div>
              </div>

              {/* Side Company / Education Info Cards (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-3 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/60 lg:pl-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-accent shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground line-clamp-1">NACOS National & FUTO</p>
                    <p className="text-muted-foreground text-[11px]">Director of ICT & Tech Lead</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-accent shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground line-clamp-1">Federal University of Technology Owerri</p>
                    <p className="text-muted-foreground text-[11px]">Computer Science B.Tech</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}



