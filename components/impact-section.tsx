"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowUpRight } from "lucide-react"

export interface ImpactSectionProps {
  category?: string
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  pillarsTitle?: string
  pillars?: string[]
  stats?: Array<{
    value: string
    label: string
    description?: string
  }>
  heroImage?: string
  heroImageAlt?: string
}

export default function ImpactSection({
  category = "Impact & Reach",
  title = "Engineering Progress, Leadership & Ecosystem Impact",
  description = "From architecting software and AI solutions to tech leadership, developer relations, product management, IT consulting, and volunteering — every role I take on is driven by one conviction: creating an impact and an inclusive and collaborative tech ecosystem where everyone and anyone can thrive.",
  ctaText = "LET'S COLLABORATE",
  ctaLink = "/contact",
  pillarsTitle = "Core Focus Areas:",
  pillars = [
    "Software Engineering & Web Development",
    "AI & Technology Workflows",
    "Tech Leadership & Strategy",
    "Developer Relations (DevRel)",
    "Product Management & IT Consulting",
    "Design & Visual Systems",
    "Community Building & Volunteering",
  ],
  stats = [
    {
      value: "2000+",
      label: "People Reached",
      description:
        "Computing students, developers, and tech leaders empowered through workshops, events, and digital platforms.",
    },
    {
      value: "25+",
      label: "Projects Completed",
      description:
        "Production software, web apps, brand design systems, and engineering deliverables.",
    },
    {
      value: "12+",
      label: "Organizations & Communities",
      description:
        "National bodies, student chapters, tech startups, and developer communities served and supported.",
    },
  ],
  heroImage = "https://res.cloudinary.com/z3wgqisj/image/upload/v1785966495/techadv1_dyclrm.jpg",
  heroImageAlt = "Nestor Anyanwu at community event",
}: ImpactSectionProps) {
  return (
    <section id="impact" className="w-full font-sans border-y border-border/80 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:h-[540px] w-full">
        
        {/* LEFT CONTAINER (6 cols) */}
        <div className="lg:col-span-6 bg-[#0B1C2C] text-white relative p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden h-full">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />

          <div className="relative z-10 space-y-4 lg:space-y-5 my-auto">
            {/* Category Subtitle */}
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#0075ff] dark:text-sky-400 block">
              {category}
            </span>

            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white font-heading">
              {title}
            </h2>

            {/* 2-Column Content: Description on Left, 7 Pillars on Right */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
              {/* Description side */}
              <div className="sm:col-span-6 space-y-2.5">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  {description}
                </p>
                {pillarsTitle && (
                  <p className="text-xs font-bold text-white pt-1">
                    {pillarsTitle}
                  </p>
                )}
              </div>

              {/* Pillars list side */}
              <div className="sm:col-span-6 space-y-2">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <span className="shrink-0 text-sky-400 bg-sky-400/15 rounded-full p-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    </span>
                    <span className="text-xs font-medium tracking-wide text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href={ctaLink} className="inline-block">
                <button className="bg-[#0075ff] hover:bg-[#0060d0] text-white font-bold text-xs tracking-wider px-6 py-3 rounded-xl shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer">
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* MIDDLE STATS CONTAINER (3 cols) */}
        <div className="lg:col-span-3 bg-[#081525] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-white/10 h-full">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-4xl font-black text-sky-400 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white font-heading">
                {stat.label}
              </div>
              {stat.description && (
                <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE CONTAINER (3 cols) */}
        <div className="lg:col-span-3 relative min-h-[300px] lg:h-full w-full bg-slate-950 overflow-hidden">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          {/* Floating Action Button */}
          <div className="absolute bottom-5 right-5 flex flex-col gap-3 z-20">
            <Link
              href={ctaLink}
              aria-label="Contact Nestor Anyanwu"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0075ff] text-white hover:bg-[#0060d0] flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
