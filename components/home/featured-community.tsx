"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function FeaturedCommunity() {
  // 7 evenly-spaced photographic items across a circular dome arc with guaranteed non-overlapping spacing
  const curveCards = [
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837125/nestor/gallery/futo-1.jpg",
      alt: "FUTO Computing Community",
      angle: 192, // Far left bottom
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837084/nestor/gallery/bwai-me.jpg",
      alt: "Build with AI Workshop",
      angle: 158, // Lower-mid left
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837107/nestor/gallery/devfest25-1.jpg",
      alt: "DevFest Speaker & Advocacy",
      angle: 124, // Upper left
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837146/nestor/gallery/gida-team-moment.jpg",
      alt: "GIDA Community Leadership",
      angle: 90, // Top center apex
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837102/nestor/gallery/devfest24-group.jpg",
      alt: "DevFest Regional Community",
      angle: 56, // Upper right
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837078/nestor/gallery/aws-team.jpg",
      alt: "AWS Community Builders",
      angle: 22, // Lower-mid right
    },
    {
      src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837144/nestor/gallery/gida-large-group.jpg",
      alt: "Grassroots Tech Hackathon",
      angle: -12, // Far right bottom
    },
  ]

  // Radial positioning calculations
  // Elliptical arc radii (% from center)
  const radiusX = 43
  const radiusY = 40

  return (
    <section id="community-work" className="w-full relative overflow-hidden bg-background pt-10 sm:pt-14 md:pt-18 pb-4 sm:pb-6 md:pb-8 border-b border-border/60">
      
      {/* Background Soft Glow Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Dome Arch Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
        
        {/* Curved / Arch Image Orbit (Visible on md and lg screens) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
          {curveCards.map((card, idx) => {
            const rad = (card.angle * Math.PI) / 180
            // Calculate center-relative percentages (50% is origin)
            const leftPercent = 50 - radiusX * Math.cos(rad)
            const topPercent = 50 - radiusY * Math.sin(rad)
            
            // Tangent rotation along the arc
            const rotationDeg = (90 - card.angle) * 0.85

            return (
              <div
                key={idx}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
                }}
                className="absolute pointer-events-auto transition-all duration-300 ease-out hover:scale-108 hover:rotate-0 hover:z-30 cursor-pointer group"
              >
                {/* Compact, cleanly separated photo card */}
                <div
                  className="w-[100px] h-[120px] md:w-[115px] md:h-[140px] lg:w-[130px] lg:h-[155px] rounded-xl md:rounded-2xl overflow-hidden bg-card p-0.5 sm:p-1 border border-white/80 dark:border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.7)] transition-all duration-300"
                >
                  <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden bg-slate-900">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Subtle Gradient Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Center Content Block (Directly in the focal center of the arc) */}
        <div className="relative z-20 text-center max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4 py-6">
          
          {/* Large Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-foreground tracking-tight font-heading leading-[1.12] sm:leading-[1.1] text-balance">
            Community &amp; Volunteer Impact
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-lg sm:max-w-xl mx-auto text-balance">
            Explore initiatives where developer advocacy, technical mentorship, and grassroots leadership merge to empower emerging engineers across Nigeria.
          </p>

          {/* Exactly ONE Standard Site Button */}
          <div className="pt-1 sm:pt-2 flex justify-center">
            <Link
              href="/community"
              className="bg-[#0070f3] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm tracking-wide px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Community Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* Mobile / Small Screen Swipeable Gallery (For screens below md) */}
      <div className="md:hidden mt-2 pb-2 px-4 sm:px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x snap-mandatory">
          {curveCards.map((photo, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-36 sm:w-44 aspect-square rounded-xl overflow-hidden bg-card border border-white/80 dark:border-slate-800 shadow-md p-0.5"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
