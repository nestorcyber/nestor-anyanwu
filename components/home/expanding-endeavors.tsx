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
  buttonText: string
  ariaLabel: string
}

export default function ExpandingEndeavors() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const endeavors: EndeavorItem[] = [
    {
      id: "software-web-engineering",
      title: "Software & Web Dev",
      subtitle: "Software Engineering & Architecture",
      description: "Building scalable web applications, robust APIs, and high-performance software systems designed for reliability and speed.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/projects",
      buttonText: "Explore Engineering Projects",
      ariaLabel: "Explore Nestor Anyanwu's software engineering and web development portfolio",
    },
    {
      id: "ai-technology",
      title: "AI & Technology",
      subtitle: "Artificial Intelligence & Automation",
      description: "Integrating generative AI models, machine learning APIs, and intelligent tech workflows to solve complex real-world problems.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
      link: "/portfolio",
      buttonText: "Explore AI & Tech Work",
      ariaLabel: "View Nestor Anyanwu's AI and technology integration projects",
    },
    {
      id: "devrel-community",
      title: "DevRel & Community",
      subtitle: "Developer Relations & Volunteering",
      description: "Activating developer ecosystems, technical advocacy, workshops, and volunteering to empower the next generation of tech leaders.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      link: "/community",
      buttonText: "View DevRel & Volunteering",
      ariaLabel: "View Nestor Anyanwu's developer relations and community initiatives",
    },
    {
      id: "product-it-consulting",
      title: "Product & IT Consulting",
      subtitle: "Product Management & Architecture",
      description: "Directing product roadmaps, technical advisory, system audits, and enterprise IT consulting to drive organizational growth.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg",
      link: "/contact",
      buttonText: "Request IT & Product Advisory",
      ariaLabel: "Contact Nestor Anyanwu for product management and IT consulting",
    },
    {
      id: "design-impact",
      title: "Design & Impact",
      subtitle: "Visual Systems & Creating Impact",
      description: "Designing brand systems, user experiences, and visual communication — all with the single goal of creating real-world impact.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
      link: "/about",
      buttonText: "Discover Impact Mission",
      ariaLabel: "Discover Nestor Anyanwu's design systems and impact mission",
    },
  ]

  return (
    <section className="w-full py-8 md:py-10 border-b border-border/60 bg-background overflow-hidden">

      {/* Centered Section Header */}
      <div className="site-container mb-8 text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Core Disciplines & Focus
        </h2>
        <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
          Technology, Design, AI, Leadership, Volunteering, IT Consulting, DevRel, Software Engineering, Web Dev, Community Building & Product Management — creating an inclusive and collaborative tech ecosystem where everyone and anyone can thrive.
        </p>
        <div className="h-1 w-16 bg-accent mx-auto mt-3" />
      </div>

      {/* MOBILE LAYOUT: Full-width edge-to-edge stacked cards */}
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
              <div className="p-5 space-y-2 text-white">
                <h3 className="text-xl font-extrabold tracking-tight text-white font-heading">
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
              <Link href={item.link} className="block w-full" aria-label={item.ariaLabel}>
                <div className="w-full bg-[#0075ff] hover:bg-[#0060d0] text-white font-extrabold text-xs tracking-wider px-6 py-4 flex items-center justify-between transition-colors">
                  <span>{item.buttonText}</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT: 5 Equal Width Columns */}
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
                className={`object-cover transition-all duration-500 ease-out ${isHovered ? "scale-105 filter brightness-100" : "scale-100 filter brightness-75 grayscale-[20%]"
                  }`}
              />

              {/* Dark Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-95" : "opacity-85"
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
                    className={`transition-all duration-300 ease-in-out ${isHovered
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
                  className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                >
                  <Link href={item.link} className="block w-full" aria-label={item.ariaLabel}>
                    <div className="w-full bg-[#0075ff] hover:bg-[#0060d0] text-white font-extrabold text-xs tracking-wider px-5 py-3.5 flex items-center justify-between transition-colors cursor-pointer">
                      <span>{item.buttonText}</span>
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
