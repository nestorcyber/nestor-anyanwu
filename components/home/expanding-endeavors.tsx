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
  imageClassName?: string
  objectPosition?: string
}

export default function ExpandingEndeavors() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const endeavors: EndeavorItem[] = [
    {
      id: "technology-leadership",
      title: "Technology & Leadership",
      subtitle: "Strategic Direction & Advocacy",
      description: "Directing technology council strategy, student engineering initiatives, and digital transformation across the ecosystem.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
      link: "/about",
      buttonText: "Explore Leadership Profile",
      ariaLabel: "Explore Nestor Anyanwu's technology leadership profile",
    },
    {
      id: "ai-design-software",
      title: "AI & Design & Software Engineering",
      subtitle: "Intelligent Systems & Visual Craft",
      description: "Building full-stack web applications, integrating AI workflows, and crafting human-centered visual design systems.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1785966495/nestor/gallery/techadv1_dyclrm.jpg",
      link: "/projects",
      buttonText: "View Engineering & AI Work",
      ariaLabel: "View Nestor Anyanwu's AI, design, and software engineering work",
      objectPosition: "object-[50%_15%]",
    },
    {
      id: "community-devrel",
      title: "Community & DevRel",
      subtitle: "Developer Relations & Ecosystems",
      description: "Empowering developer networks, technical advocacy, bootcamps, and hackathons to nurture the next generation of builders.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787285712/nestor/gallery/IMG_0452_a2kkcl.jpg",
      link: "/community",
      buttonText: "Explore Community Initiatives",
      ariaLabel: "Explore Nestor Anyanwu's developer relations and community initiatives",
      imageClassName: "scale-140 origin-[50%_15%]",
      objectPosition: "object-[50%_10%]",
    },
    {
      id: "product-it-consulting",
      title: "Product & IT Consulting",
      subtitle: "Product Strategy & Architecture",
      description: "Managing product roadmaps, technical advisory, system audits, and enterprise IT consulting to drive sustainable scale.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787285480/nestor/gallery/f3_0_2_tww32b.jpg",
      link: "/contact",
      buttonText: "Request Product Advisory",
      ariaLabel: "Request product management and IT consulting from Nestor Anyanwu",
      imageClassName: "scale-140 origin-[50%_15%]",
      objectPosition: "object-[50%_10%]",
    },
    {
      id: "volunteering-impact",
      title: "Volunteering & Impact",
      subtitle: "Inclusive Growth & Mentorship",
      description: "Volunteering, mentorship, and grassroots initiatives dedicated to building an inclusive tech ecosystem where everyone can thrive.",
      image: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787284547/nestor/gallery/IMG_7002_kin2gh.jpg",
      link: "/about",
      buttonText: "Discover Impact Story",
      ariaLabel: "Discover Nestor Anyanwu's volunteering and impact mission",
    },
  ]

  return (
    <section className="w-full py-8 md:py-10 border-b border-border/60 bg-background overflow-hidden">

      {/* Centered Section Header */}
      <div className="site-container mb-8 text-center space-y-3">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-heading">
          Core Disciplines & Focus
        </h2>
        <p className="text-sm md:text-base text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
          Bridging software engineering, AI innovation, product strategy, and community leadership to build an inclusive, collaborative ecosystem where every builder can thrive.
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
              className={`object-cover ${item.objectPosition || "object-[50%_20%]"} ${item.imageClassName || ""}`}
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
                className={`object-cover ${item.objectPosition || "object-[50%_20%]"} ${item.imageClassName || ""} transition-all duration-500 ease-out ${isHovered ? "scale-110 filter brightness-100" : "scale-100 filter brightness-75 grayscale-[20%]"
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
