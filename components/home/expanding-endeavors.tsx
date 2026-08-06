"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export interface EndeavorItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  link: string
}

export default function ExpandingEndeavors() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const endeavors: EndeavorItem[] = [
    {
      id: "software-engineering",
      title: "Software Development",
      subtitle: "Web Platforms / Cloud & APIs",
      description: "Engineering scalable web applications, robust APIs, and modern cloud architectures built for performance and high reliability.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/portfolio",
    },
    {
      id: "tech-leadership",
      title: "Tech Leadership",
      subtitle: "NACOS National / IEEE FUTO",
      description: "Directing computing student councils, national ICT strategy, and event logistics across Nigerian higher education institutions.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
      link: "/about",
    },
    {
      id: "visual-brand-systems",
      title: "Design & Systems",
      subtitle: "GDG Owerri / DevFest Visuals",
      description: "Crafting visual identities, conference creative systems, and brand documentation for major developer festivals.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
      link: "/portfolio",
    },
    {
      id: "community-building",
      title: "Community Growth",
      subtitle: "Workshops / Mentorship",
      description: "Empowering thousands of computing students and software developers through hands-on technical workshops and hackathons.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      link: "/community",
    },
    {
      id: "technical-consulting",
      title: "Technical Advisory",
      subtitle: "Nobelton Consults / Advisory",
      description: "Providing strategic IT advisory, technology audits, and digital transformation consulting for growing organizations.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg",
      link: "/contact",
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 border-b border-border/60 bg-background overflow-hidden">
      
      {/* Centered Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Core Initiatives
        </h2>
        <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
          As a technology engineer and community leader, my engagements span software development, ICT leadership, visual design, and advisory.
        </p>
        <div className="h-1 w-16 bg-accent mx-auto mt-3" />
      </div>

      {/* MOBILE LAYOUT: Full-width edge-to-edge stacked cards (Original height & overlay style) where description & READ MORE button are always visible */}
      <div className="md:hidden w-full flex flex-col gap-0 border-y border-border/60 bg-slate-950">
        {endeavors.map((item) => (
          <div
            key={`mobile-${item.id}`}
            className="relative w-full h-[360px] overflow-hidden border-b border-slate-800/60 last:border-b-0 flex flex-col justify-between"
          >
            {/* Full Card Cover Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />

            {/* Top Spacer */}
            <div className="relative z-10 p-4" />

            {/* Bottom Details & Button */}
            <div className="relative z-10 flex flex-col justify-end">
              <div className="p-6 space-y-2 text-white">
                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-accent font-semibold uppercase tracking-wider">
                  {item.subtitle}
                </p>
                <div className="h-0.5 w-10 bg-accent my-2" />
                <p className="text-xs text-slate-200 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Always Visible Action Button */}
              <Link href={item.link} className="block w-full" aria-label={`Explore ${item.title}`}>
                <div className="w-full bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-4 flex items-center justify-between transition-colors">
                  <span>EXPLORE {item.title}</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT: 5 Equal Width Columns, Hover to Reveal Description & Read More Button (No Width Expanding) */}
      <div className="hidden md:flex w-full h-[500px] border-y border-border/60 bg-slate-950 overflow-hidden">
        {endeavors.map((item) => {
          const isHovered = hoveredId === item.id

          return (
            <div
              key={`desktop-${item.id}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex-1 h-full border-r border-slate-800/80 last:border-r-0 overflow-hidden group flex flex-col justify-between transition-all duration-300"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="20vw"
                className={`object-cover transition-all duration-500 ease-out ${
                  isHovered ? "scale-105 filter brightness-100" : "scale-100 filter brightness-75 grayscale-[20%]"
                }`}
              />

              {/* Dark Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent transition-opacity duration-300 ${
                  isHovered ? "opacity-95" : "opacity-85"
                }`}
              />

              {/* Top Padding / Spacer */}
              <div className="relative z-10 p-6" />

              {/* Bottom Content Area */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                <div className="p-6 space-y-3 text-white">
                  
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description revealed strictly on Hover */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isHovered
                        ? "opacity-100 max-h-40 translate-y-0"
                        : "opacity-0 max-h-0 translate-y-2 overflow-hidden pointer-events-none"
                    }`}
                  >
                    <div className="h-0.5 w-10 bg-accent my-2" />
                    <p className="text-xs text-slate-200 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>

                {/* Descriptive Action Button revealed strictly on Hover */}
                <div
                  className={`transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <Link href={item.link} className="block w-full" aria-label={`Explore ${item.title}`}>
                    <div className="w-full bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-widest px-5 py-3.5 flex items-center justify-between transition-colors cursor-pointer">
                      <span>EXPLORE {item.title}</span>
                      <ArrowRight size={15} />
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
