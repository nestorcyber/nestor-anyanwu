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
  heroImage?: string
  heroImageAlt?: string
}

export default function ImpactSection({
  category = "GET TO KNOW",
  title = "Engineering Progress, Strategic Leadership & Ecosystem Impact",
  description = "From architecting software systems and AI workflows to tech leadership, developer relations, product consulting, and volunteering: every role I take on is driven by one conviction: creating real impact and an inclusive, collaborative tech ecosystem where everyone can thrive.",
  ctaText = "Let's Collaborate",
  ctaLink = "/contact",
  pillars = [
    "Architecting scalable software, modern web apps & intelligent AI workflows",
    "Directing national ICT strategy, student computing & builder governance",
    "Cultivating developer ecosystems, tech summits, bootcamps & hackathons",
    "Delivering enterprise product strategy, tech audits & IT advisory",
  ],
}: ImpactSectionProps) {
  return (
    <section id="impact" className="w-full relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-y border-slate-800 font-sans">
      
      {/* Background Ambient Glow Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#0075ff]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: OVERLAPPING GALLERY / POLAROID PHOTO COLLAGE (5 COLS) ─── */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-start">
            
            {/* Dot-grid ambient accent behind collage (like reference) */}
            <div className="absolute -inset-4 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

            <div className="relative w-full max-w-[420px] sm:max-w-[460px] h-[400px] sm:h-[450px] md:h-[480px] mx-auto lg:mx-0">
              
              {/* Photo 1 (Main Speaking Keynote - Top Left, white polaroid mat frame with subtle tilt) */}
              <div className="absolute top-0 left-0 w-[60%] h-[68%] bg-white p-2.5 sm:p-3 pb-5 sm:pb-7 rounded-sm sm:rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-10 -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out group">
                <div className="relative w-full h-full overflow-hidden bg-slate-900">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1785966495/nestor/gallery/techadv1_dyclrm.jpg"
                    alt="Nestor Anyanwu speaking at community tech event"
                    fill
                    sizes="(max-width: 768px) 60vw, 30vw"
                    className="object-cover object-[50%_12%] group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Photo 2 (Collaboration / Builder Network - Top Right, enlarged white polaroid mat frame elevated higher) */}
              <div className="absolute -top-9 sm:-top-12 right-0 w-[54%] sm:w-[56%] h-[56%] sm:h-[58%] bg-white p-2.5 sm:p-3 pb-5 sm:pb-7 rounded-sm sm:rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.75)] z-20 rotate-3 hover:rotate-0 transition-transform duration-500 ease-out group">
                <div className="relative w-full h-full overflow-hidden bg-slate-900">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787284951/nestor/gallery/IMG_20260520_182757_818_dptwte.jpg"
                    alt="Nestor Anyanwu community and leadership event"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-[50%_0%] scale-210 origin-[50%_0%] -translate-y-36 sm:-translate-y-44 group-hover:scale-215 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Photo 3 (Leadership & Engineering - Bottom Right/Front, prominent overlapping polaroid mat frame) */}
              <div className="absolute bottom-0 right-3 sm:right-6 w-[58%] h-[58%] bg-white p-2.5 sm:p-3 pb-5 sm:pb-7 rounded-sm sm:rounded-md shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-30 -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out group">
                <div className="relative w-full h-full overflow-hidden bg-slate-900">
                  <Image
                    src="https://res.cloudinary.com/z3wgqisj/image/upload/v1785966488/nestor/about/about_fm7rwu.jpg"
                    alt="Nestor Anyanwu executive leadership and engineering"
                    fill
                    sizes="(max-width: 768px) 55vw, 25vw"
                    className="object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ─── RIGHT COLUMN: CONTENT, PILLARS & CTAS (7 COLS) ─── */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-7">
            
            {/* Category header with blue bar */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-1 bg-[#0075ff] rounded-full inline-block" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0075ff] dark:text-sky-400">
                  {category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
                {title}
              </h2>
            </div>

            {/* Paragraph description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {description}
            </p>

            {/* Checkmarked Core Pillars */}
            <div className="space-y-2.5 pt-1">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5 group">
                  <span className="shrink-0 mt-0.5 text-sky-400 bg-sky-400/15 rounded-full p-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-[#0075ff] dark:text-sky-400" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>

            {/* Single Action Button leading to About Page */}
            <div className="pt-2">
              <Link
                href={ctaLink || "/about"}
                className="h-11 sm:h-12 bg-[#0075ff] hover:bg-[#0060d0] text-white font-extrabold text-xs tracking-wider px-6 sm:px-7 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{ctaText || "Discover More"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
