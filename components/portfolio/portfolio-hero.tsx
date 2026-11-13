"use client"

import React from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import type { SiteSettings, PortfolioStat } from "@/lib/content"

export default function PortfolioHero({
  settings,
  stats,
}: {
  settings?: SiteSettings
  stats?: PortfolioStat[]
}) {
  const primaryStat = stats && stats.length > 0 ? stats[0] : null
  const statValue = primaryStat?.value || "25+"
  const statLabel = primaryStat?.label || "Projects & solutions delivered world-wide."

  return (
    <section className="relative w-full h-screen min-h-screen h-[100dvh] min-h-[100dvh] bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837104/nestor/gallery/devfest24-solo.jpg"
          alt={settings?.authorName || "Nestor Anyanwu"}
          fill
          priority
          className="object-cover object-[50%_20%] sm:object-[62%_20%] md:object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Balanced Center-Contrast Scrim & Brand Blue Vignette */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at center, rgba(0, 86, 210, 0.25) 0%, rgba(2, 6, 23, 0.58) 55%, rgba(2, 6, 23, 0.85) 100%)
          `,
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* 3. Dead-Center Giant Display Headline & Subtext */}
      <div className="relative z-20 w-full site-container flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-black tracking-tight leading-[1.05] font-heading text-white text-center max-w-6xl mx-auto [text-shadow:_0_6px_32px_rgba(0,0,0,0.85)]">
          Strategic Engineering.
          <br />
          Sustainable Impact.
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide text-slate-200/95 max-w-2xl mx-auto [text-shadow:_0_2px_16px_rgba(0,0,0,0.85)]">
          5+ Years of Delivering Excellence Across Industries
        </p>
      </div>

      {/* 4. Bottom-Right Floating Glassmorphic Stat Card (Anchored at bottom so centered headline stays dead-center) */}
      <div className="hidden sm:block absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
        <div className="bg-[#0F172A]/85 backdrop-blur-xl border border-[#1E293B] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2 sm:space-y-2.5 min-w-[170px] max-w-[220px] text-[#F1F5F9]">
          
          {/* Avatar Stack with Brand Plus Badge */}
          <div className="flex items-center -space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0F172A] overflow-hidden relative shadow-xs shrink-0">
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837081/nestor/gallery/bwai-i.jpg"
                alt="Client avatar"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0F172A] overflow-hidden relative shadow-xs shrink-0">
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837095/nestor/gallery/devfest24-duo.jpg"
                alt="Partner avatar"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0F172A] overflow-hidden relative shadow-xs shrink-0">
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837150/nestor/gallery/gire-solo.jpg"
                alt="Builder avatar"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0F172A] bg-[#0056D2] text-white flex items-center justify-center shadow-xs shrink-0">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Big Stat Number */}
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            {statValue}
          </div>

          {/* Stat Subtitle */}
          <p className="text-[11px] sm:text-xs text-white/80 leading-snug font-normal">
            {statLabel}
          </p>

        </div>
      </div>

    </section>
  )
}
