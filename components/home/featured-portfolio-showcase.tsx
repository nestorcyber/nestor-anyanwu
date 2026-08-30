"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import type { PortfolioProject } from "@/lib/content"

interface FeaturedPortfolioShowcaseProps {
  projects: PortfolioProject[]
}

export default function FeaturedPortfolioShowcase({
  projects,
}: FeaturedPortfolioShowcaseProps) {
  // Fallback if projects array is empty
  const defaultList = projects.length > 0 ? projects : [
    {
      id: "demo-1",
      slug: "tech-nexus",
      title: "Tech Nexus & Cloud Infrastructure",
      coverImage: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837175/nestor/gallery/tech-nexus-team.jpg",
      category: "Software Development",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      featured: true,
      shortDescription: "Architecting resilient digital platforms and scalable software infrastructure.",
    } as unknown as PortfolioProject
  ]

  const activeProject = defaultList[0]

  return (
    <section id="portfolio" className="w-full py-12 sm:py-16 md:py-20 bg-background border-b border-border/60 relative overflow-hidden">
      
      {/* ── Mathematical Uniform Radius (R = 0.08) for All Inner & Outer Curves ── */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="uniformRadiusFilletClip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0, 0.08
              C 0, 0.0358, 0.0358, 0, 0.08, 0
              L 0.68, 0
              C 0.7242, 0, 0.76, 0.0358, 0.76, 0.08
              C 0.76, 0.1242, 0.7958, 0.16, 0.84, 0.16
              C 0.9284, 0.16, 1.0, 0.2316, 1.0, 0.32
              L 1.0, 0.68
              C 1.0, 0.7684, 0.9284, 0.84, 0.84, 0.84
              C 0.7958, 0.84, 0.76, 0.8758, 0.76, 0.92
              C 0.76, 0.9642, 0.7242, 1.0, 0.68, 1.0
              L 0.08, 1.0
              C 0.0358, 1.0, 0, 0.9642, 0, 0.92
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* ══════════ LEFT COLUMN: Perfectly Balanced Display Typography & Social Proof ══════════ */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7 sm:space-y-9">
            
            {/* Giant Display Headline */}
            <div className="space-y-2.5 sm:space-y-3.5">
              
              {/* Line 1: Look [*** Asterisk Pill Badge] */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-foreground">
                <span>Look</span>
                
                {/* Cyan / Light Blue Asterisk Pill */}
                <span className="inline-flex items-center justify-center gap-1.5 px-5 py-1 sm:px-6 sm:py-1.5 rounded-full border border-sky-300/80 dark:border-sky-500/40 bg-sky-100/70 dark:bg-sky-950/40 text-[#0075ff] dark:text-sky-400 text-2xl sm:text-3xl md:text-4xl">
                  <span>✦</span>
                  <span>✦</span>
                  <span>✦</span>
                </span>
              </div>

              {/* Line 2: [➔ Blue Arrow Pill] beyond */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-foreground">
                {/* Brand Electric Blue Circle with Arrow */}
                <span className="inline-flex items-center justify-center w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border-3 sm:border-4 border-[#0075ff]/80 bg-[#0075ff]/15 text-[#0075ff] dark:text-[#38bdf8] shadow-sm shrink-0">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 stroke-[3]" />
                </span>
                <span>beyond</span>
              </div>

              {/* Line 3: limits */}
              <div>
                <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-foreground">
                  limits
                </span>
              </div>

            </div>

            {/* Social Proof Avatars & Metric Bar */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-background overflow-hidden bg-slate-200 shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1785966488/nestor/about/about_fm7rwu.jpg"
                    alt="Nestor Anyanwu"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-background overflow-hidden bg-slate-200 shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837096/nestor/gallery/devfest24-friends.jpg"
                    alt="Tech Community"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-background overflow-hidden bg-slate-200 shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837087/nestor/gallery/bwai-team.jpg"
                    alt="Engineering Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-foreground font-heading leading-tight">
                  2,000+
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  People reached & empowered
                </p>
              </div>
            </div>

            {/* Direct Link / CTA to Portfolio Page */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#0075ff] text-white font-bold text-sm sm:text-base shadow-md hover:bg-[#0060df] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>

          {/* ══════════ RIGHT COLUMN: Clipped Image Card & Action Button ══════════ */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square">
              
              {/* ── Main Clipped Image Shell ── */}
              <Link
                href="/portfolio"
                className="block w-full h-full cursor-pointer group"
                aria-label="Go to Portfolio"
              >
                <article
                  style={{ clipPath: "url(#uniformRadiusFilletClip)" }}
                  className="relative w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                >
                  <Image
                    src={activeProject?.coverImage || "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837175/nestor/gallery/tech-nexus-team.jpg"}
                    alt={activeProject?.title || "Featured Deliverable"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover object-center"
                  />
                </article>
              </Link>

              {/* ── Top-Right Brand Blue Circle Button (↗) Linking to Portfolio Page ── */}
              <Link
                href="/portfolio"
                className="absolute top-0 right-0 w-15 h-15 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-[#0075ff] text-white flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#0060df] transition-all duration-300 z-30 cursor-pointer"
                aria-label="Go to Portfolio Page"
              >
                <ArrowUpRight className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 stroke-[2.5]" />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
