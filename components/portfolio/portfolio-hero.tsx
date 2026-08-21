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
    <section className="relative w-full h-[calc(100svh-3.5rem)] md:h-[calc(100svh-4rem)] min-h-[560px] md:min-h-[640px] max-h-[1080px] bg-slate-950 overflow-hidden flex flex-col justify-end">
      
      {/* 1. Full-Bleed Background Image (Clear, Untinted on the Subject) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/devfest24-solo.jpg"
          alt={settings?.authorName || "Nestor Anyanwu"}
          fill
          priority
          className="object-cover object-[78%_18%] sm:object-[72%_18%] md:object-[68%_20%] lg:object-[64%_22%] xl:object-[60%_25%]"
          sizes="100vw"
        />
      </div>

      {/* 2. Desktop Left-Side Organic Fluid Gradient (Confined to bottom-left so main picture stays clear) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 0% 100%, rgba(0, 85, 255, 0.96) 0%, rgba(0, 117, 255, 0.85) 35%, rgba(11, 28, 44, 0.65) 60%, transparent 80%),
            radial-gradient(circle 480px at 0% 65%, rgba(0, 117, 255, 0.85) 0%, rgba(11, 28, 44, 0.45) 50%, transparent 75%)
          `,
        }}
      />

      {/* 2b. Mobile & Tablet Responsive Gradient (Leaves upper subject face un-tinted and darkens bottom for text legibility) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none lg:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(11, 28, 44, 0) 0%, rgba(11, 28, 44, 0.15) 30%, rgba(11, 28, 44, 0.8) 55%, #0B1C2C 95%)`,
        }}
      />

      {/* 3. Bottom-Aligned Content anchored to standard site grid margin */}
      <div className="relative z-20 w-full site-container pt-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 lg:gap-12">
          
          {/* Left Typography Block (Aligned to site-container edge) */}
          <div className="max-w-xl space-y-3.5 sm:space-y-4 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] font-heading drop-shadow-md">
              Strategic Engineering.<br />
              Sustainable Impact.
            </h1>
            
            <p className="text-white/85 text-xs sm:text-sm md:text-[15px] max-w-md lg:max-w-lg leading-relaxed font-normal drop-shadow-xs">
              Building scalable software systems, high-converting digital products, and modern web applications through hands-on engineering, intuitive UI/UX design, and proactive tech leadership.
            </p>
          </div>

          {/* Right Bottom-Aligned Floating Glassmorphic Stat Card */}
          <div className="shrink-0 self-start sm:self-auto lg:self-end">
            <div className="bg-black/40 dark:bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2 sm:space-y-2.5 min-w-[170px] max-w-[220px] text-white">
              
              {/* Avatar Stack with Green Plus Badge */}
              <div className="flex items-center -space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-xs shrink-0">
                  <Image
                    src="/bwai-i.jpg"
                    alt="Client avatar"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-xs shrink-0">
                  <Image
                    src="/devfest24-duo.jpg"
                    alt="Partner avatar"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-xs shrink-0">
                  <Image
                    src="/gire-solo.jpg"
                    alt="Builder avatar"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 bg-[#22c55e] text-white flex items-center justify-center shadow-xs shrink-0">
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

        </div>
      </div>

    </section>
  )
}
