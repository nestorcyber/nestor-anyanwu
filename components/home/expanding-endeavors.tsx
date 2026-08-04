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
  const [activeId, setActiveId] = useState<string>("software-engineering")

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
      
      {/* Padded Centered Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Core Initiatives
        </h2>
        <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
          As a technology engineer and community leader, my engagements span software development, ICT leadership, visual design, and advisory.
        </p>
        <div className="h-1 w-16 bg-accent mx-auto mt-3" />
      </div>

      {/* 100% Full Width Edge-to-Edge 5-Column Grid */}
      <div className="w-full h-[580px] md:h-[520px] flex flex-col md:flex-row gap-0 overflow-hidden border-y border-border/60 bg-slate-950">
        {endeavors.map((item) => {
          const isActive = activeId === item.id

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={`relative h-full transition-all duration-500 ease-out cursor-pointer overflow-hidden group border-r border-slate-800/60 last:border-r-0 flex flex-col justify-between ${
                isActive
                  ? "flex-[3.5] md:flex-[3.5]"
                  : "flex-1 md:flex-1"
              }`}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  isActive ? "scale-105" : "scale-100 filter grayscale md:grayscale-[30%]"
                }`}
              />

              {/* Dark Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent transition-opacity duration-300 ${
                  isActive ? "opacity-90" : "opacity-80"
                }`}
              />

              {/* Top Empty Space */}
              <div className="relative z-10 p-6" />

              {/* Bottom Content Area */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                <div className="p-6 md:p-8 space-y-3 text-white">
                  
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className={`font-extrabold tracking-tight transition-all duration-300 ${
                      isActive ? "text-2xl md:text-3xl text-white" : "text-lg md:text-xl text-slate-100"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Active State Details: Accent Line & Description */}
                  {isActive && (
                    <div className="space-y-3 animate-fade-in-up">
                      <div className="h-0.5 w-12 bg-accent" />
                      <p className="text-xs md:text-sm text-slate-200 font-light leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  )}

                </div>

                {/* READ MORE Button (Glued to bottom when active) */}
                <div className={`transition-all duration-300 ${isActive ? "opacity-100 block" : "opacity-0 hidden"}`}>
                  <Link href={item.link} className="block w-full">
                    <div className="w-full bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-4 flex items-center justify-between transition-colors cursor-pointer">
                      <span>READ MORE</span>
                      <ArrowRight size={16} />
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
