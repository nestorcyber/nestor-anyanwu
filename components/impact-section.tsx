"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react"

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
  title = "Engineering Progress, Building Communities",
  description = "From directing national computing initiatives to shipping production software and designing developer conference identities — every role I take on is rooted in one conviction: technology is most powerful when it serves people, not the other way around.",
  ctaText = "Let's Collaborate",
  ctaLink = "/contact",
  pillarsTitle = "How I show up:",
  pillars = [
    "Software Development & Delivery",
    "National ICT Strategy & Direction",
    "Developer Community Activation",
    "Graphic Design & Visual Systems",
    "Data Privacy Advocacy",
    "Technical Mentorship & Education",
    "IT Consulting & Digital Support",
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
    <section id="impact" className="w-full py-8 md:py-10 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Balanced Hierarchy */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-mono font-bold text-[#0075ff] tracking-wider uppercase block">
            {category}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground font-heading tracking-tight leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
              {description}
            </p>
          )}
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* 3-Column Unified Grid: Pillars Card, Stats Card & Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Pillars & Capabilities (5 cols) */}
          <div className="lg:col-span-5 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-5">
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground font-heading tracking-tight">
                {pillarsTitle}
              </h3>

              <div className="space-y-3">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-[#0075ff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#0075ff] transition-colors">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Button */}
            <div className="pt-2">
              <Link href={ctaLink} className="block w-full">
                <div className="w-full py-3.5 px-5 rounded-xl bg-[#0075ff] hover:bg-blue-600 text-white font-extrabold text-xs tracking-wider flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </div>
              </Link>
            </div>
          </div>

          {/* Card 2: Impact Metrics & Numbers (4 cols) */}
          <div className="lg:col-span-4 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between divide-y divide-border/60 shadow-xs">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${idx === 0 ? "pb-4" : idx === stats.length - 1 ? "pt-4" : "py-4"} space-y-1.5`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0075ff] font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-foreground font-heading">
                  {stat.label}
                </div>
                {stat.description && (
                  <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-2">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Card 3: Action Image Showcase (3 cols) */}
          <div className="lg:col-span-3 relative min-h-[320px] lg:min-h-full rounded-3xl overflow-hidden border border-border/70 bg-slate-950 shadow-xs group">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                <Sparkles className="w-8 h-8" />
              </div>
            )}
            
            {/* Bottom Gradient & Floating Link */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 right-4 z-10">
              <Link
                href={ctaLink}
                aria-label="Contact Nestor Anyanwu"
                className="w-11 h-11 rounded-xl bg-[#0075ff] text-white hover:bg-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
