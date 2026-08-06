import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, ArrowUpRight, Code, Layout, Users, Zap } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="w-full pt-20 md:pt-24 pb-12 md:pb-16 border-b-2 border-slate-900 dark:border-slate-800 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hero Text & Identity Tags (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Role Tags Pill Bar */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="px-2.5 py-1 bg-accent text-white border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Software Engineer
                </span>
                <span className="px-2.5 py-1 bg-card text-foreground border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                  Brand Designer
                </span>
                <span className="px-2.5 py-1 bg-card text-foreground border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]">
                  Community Leader
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-tight font-heading">
                Crafting Digital Products & Tech Systems
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-light">
                A directory of software applications, brand design systems, and ICT infrastructure projects built across technology engineering, design advocacy, and community leadership.
              </p>
            </div>

            {/* Action Buttons: Download CV & Contact */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 border-2 border-slate-900 dark:border-slate-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>

              <Link href="/contact">
                <button className="bg-card hover:bg-secondary text-foreground border-2 border-slate-900 dark:border-slate-700 font-extrabold text-xs uppercase tracking-wider px-6 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer">
                  <span>Contact Me</span>
                  <ArrowUpRight size={15} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Integrated Featured Hero Preview Card (lg:col-span-5) */}
          <div className="lg:col-span-5 border-2 border-slate-900 dark:border-slate-800 bg-card p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b-2 border-slate-900/10 dark:border-slate-800 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                  FEATURED DELIVERABLE
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  ACTIVE PRODUCTION
                </span>
              </div>

              <div className="relative w-full h-[180px] sm:h-[220px] overflow-hidden border-2 border-slate-900/20 dark:border-slate-800 bg-slate-950">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
                  alt="NACOS FUTO Website Development"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-foreground leading-snug">
                  NACOS FUTO Official Portal
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  National ICT portal, student management architecture, and digital learning portal for 3,000+ computer science undergraduates.
                </p>
              </div>
            </div>

            <Link href="/portfolio/nacos-futo-website-development" className="block pt-2">
              <div className="w-full py-2.5 bg-primary text-white text-center font-extrabold text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span>Explore Flagship Build</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
