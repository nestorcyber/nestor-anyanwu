"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

export default function FeaturedCommunity() {
  const highlights = [
    "Empowering developer chapters, universities, and student computing bodies",
    "Organizing national tech summits, hackathons, and builder bootcamps",
    "Mentoring emerging software engineers and driving grassroots digital literacy",
  ]

  return (
    <section id="community-work" className="w-full relative overflow-hidden bg-background py-16 sm:py-20 md:py-28 border-b border-border/60">
      
      {/* Background Soft Glow Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* 2-Column Split: Overlapping Images with Sharp Edges (Left) + Left-Aligned Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Layered Overlapping Images with Sharp Edges & Thin Stroke */}
          <div className="lg:col-span-6 relative pb-10 sm:pb-14 pr-4 sm:pr-8">
            
            {/* Main Primary Image Card (Sharp Edges) */}
            <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/3.5] overflow-hidden bg-card border border-border/80 shadow-[0_16px_45px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837146/nestor/gallery/gida-team-moment.jpg"
                alt="Community Leadership Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping Secondary Accent Image Card (Sharp Edges & Thin Stroke) */}
            <div className="absolute -bottom-2 sm:-bottom-4 right-0 sm:right-2 w-[60%] sm:w-[54%] aspect-[4/3] overflow-hidden bg-card p-0.5 sm:p-1 border border-white/90 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.22)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-20 group">
              <div className="relative w-full h-full overflow-hidden bg-slate-900">
                <Image
                  src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787837078/nestor/gallery/aws-team.jpg"
                  alt="AWS Community Team & Builders"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
              </div>
            </div>

          </div>

          {/* Right Column: Left-Aligned Text, Highlights & Button */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            
            {/* Standard Heading Size */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight font-heading">
              Community &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070f3] via-sky-500 to-indigo-500">
                Volunteer Impact
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
              Explore initiatives where developer advocacy, technical mentorship, and grassroots leadership merge to empower emerging engineers across Nigeria.
            </p>

            {/* Key Value Points */}
            <div className="space-y-3 pt-1">
              {highlights.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#0070f3]/10 text-[#0070f3] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-normal">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Standard Left-Aligned Button */}
            <div className="pt-3 flex justify-start">
              <Link
                href="/community"
                className="h-11 sm:h-12 bg-[#0070f3] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm tracking-wide px-6 sm:px-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Community Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
