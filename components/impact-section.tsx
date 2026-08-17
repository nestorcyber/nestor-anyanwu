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
  category = "Impact & Vision",
  title = "Building prosperity & self-sufficiency",
  description = "Empowering developers, students, and communities.",
  ctaText = "Let's Collaborate",
  ctaLink = "/contact",
  pillarsTitle = "Our 7 Key Pillars are:",
  pillars = [
    "Software Engineering",
    "Tech Leadership",
    "Economic Impact",
    "Community Logistics",
    "Cultural Inclusion",
    "Environmental Tech",
    "Social Development",
  ],
  stats = [
    {
      value: "30%",
      label: "Growth",
      description:
        "Annual expansion across student tech initiatives, open-source projects, and enterprise solutions.",
    },
    {
      value: "5000+",
      label: "Ecosystem Impact",
      description:
        "Engineers, students, and tech leaders empowered through workshops, keynotes, and developer initiatives.",
    },
  ],
  heroImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
  heroImageAlt = "Nestor Anyanwu",
}: ImpactSectionProps) {
  return (
    <section className="w-full font-sans border-y border-border overflow-hidden">
      {/* 
        3-Column Layout:
        - Column 1 & 2 (Primary Brand Dark Navy): Main content, 7 Pillars checkmark list, CTA button
        - Column 3 (Secondary Brand Light Neutral / Dark Card): Stats & key numbers with theme adaptation
        - Column 4 (Image Column): High quality image with dynamic hover effects
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] w-full">
        {/* LEFT BRAND PRIMARY CONTAINER */}
        <div className="lg:col-span-6 bg-[#0B1C2C] text-white relative p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />

          <div className="relative z-10 space-y-8">
            <p className="text-sm md:text-base font-bold tracking-widest uppercase text-sky-400">
              {category}
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Description column */}
              <div className="md:col-span-6 space-y-4 text-slate-200 text-sm md:text-base leading-relaxed font-medium">
                <p>{description}</p>
                {pillarsTitle && (
                  <p className="font-bold text-white pt-2">
                    {pillarsTitle}
                  </p>
                )}
              </div>

              {/* Pillars Checkmark List */}
              <div className="md:col-span-6 space-y-2.5">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <span className="flex-shrink-0 text-sky-400 bg-sky-400/20 rounded-full p-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-sky-400" />
                    </span>
                    <span className="text-sm md:text-base font-bold tracking-wide text-white">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href={ctaLink} className="inline-block">
                <button className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs md:text-sm tracking-wider uppercase px-8 py-4 rounded-none shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer">
                  <span>{ctaText}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* MIDDLE STATS CONTAINER */}
        <div className="lg:col-span-3 bg-slate-50 text-slate-900 dark:bg-slate-900/90 dark:text-slate-100 p-8 md:p-12 flex flex-col justify-center gap-8 border-t lg:border-t-0 lg:border-l border-border/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.label}
              </div>
              {stat.description && (
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium max-w-xs">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE CONTAINER */}
        <div className="lg:col-span-3 relative min-h-[380px] lg:min-h-full w-full bg-slate-950 overflow-hidden">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          {/* Floating Action Button */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20">
            <Link
              href="/contact"
              aria-label="Contact Nestor Cyber"
              className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground flex items-center justify-center shadow-xl border border-border/20 transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
