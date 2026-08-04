"use client"

import React, { useState } from "react"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import { Code, Users, Shield, BookOpen, Globe, Palette } from "lucide-react"

export default function PersonalPhilosophy() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const values = [
    {
      icon: Code,
      title: "Technology Should Solve Real Problems",
      description: "I build software because I believe every line of code is a chance to make someone's life easier, faster, or more dignified. Not for the code — for the human at the end of it.",
      number: "01",
      color: "#0ea5e9",
    },
    {
      icon: Users,
      title: "The Next Generation Deserves Mentors",
      description: "I lead because when I was starting out, I needed someone to show me the way. I refuse to let the next generation figure it out alone. Every workshop, every talk — I'm paying it forward.",
      number: "02",
      color: "#7c3aed",
    },
    {
      icon: Shield,
      title: "Trust Is the Foundation of Digital Growth",
      description: "I advocate for ethics and privacy because Africa's digital future cannot be built on exploitation. People deserve to know how their data is used — and I intend to make sure they do.",
      number: "03",
      color: "#e11d48",
    },
    {
      icon: BookOpen,
      title: "Curiosity Is a Superpower",
      description: "I keep learning because the moment I stop, I stop growing — and so does everyone around me. I study, write, and teach not just to stay relevant, but to stay useful.",
      number: "04",
      color: "#059669",
    },
    {
      icon: Globe,
      title: "Community Is Where Change Begins",
      description: "I invest in communities because the most powerful transformations don't start with governments or corporations — they start with people who care enough to show up for each other.",
      number: "05",
      color: "#d97706",
    },
    {
      icon: Palette,
      title: "Great Ideas Deserve Great Presentation",
      description: "I design because I've seen brilliant ideas fail due to poor communication. When something looks credible, it gets taken seriously — and serious ideas deserve a serious visual voice.",
      number: "06",
      color: "#db2777",
    },
  ]

  return (
    <SectionContainer id="philosophy">
      <SectionHeader
        badge="PERSONAL PHILOSOPHY"
        title="Why I Build & Lead"
        subtitle="Technology is not merely a profession—it is a platform for impact, a catalyst for economic growth, and a tool for shaping an empowered future."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border/60 divide-y md:divide-y lg:divide-y-0 divide-border/60">
        {values.map((v, idx) => {
          const Icon = v.icon
          const isHovered = hoveredIdx === idx

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative group flex flex-col items-center text-center p-8 md:p-10 overflow-hidden cursor-default transition-all duration-500"
              style={{
                background: isHovered
                  ? `linear-gradient(160deg, ${v.color}15 0%, transparent 70%)`
                  : "transparent",
              }}
            >
              {/* Animated corner accent */}
              <div
                className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out"
                style={{
                  width: isHovered ? "100%" : "0%",
                  backgroundColor: v.color,
                }}
              />

              {/* Background number watermark */}
              <span
                className="absolute bottom-4 right-4 text-7xl font-black leading-none select-none pointer-events-none transition-all duration-500"
                style={{
                  color: v.color,
                  opacity: isHovered ? 0.08 : 0.04,
                  transform: isHovered ? "scale(1.15)" : "scale(1)",
                }}
              >
                {v.number}
              </span>

              {/* Icon ring */}
              <div
                className="relative mb-6 w-16 h-16 flex items-center justify-center transition-all duration-500"
                style={{
                  border: `2px solid ${isHovered ? v.color : "rgba(148,163,184,0.2)"}`,
                  background: isHovered ? `${v.color}15` : "transparent",
                  transform: isHovered ? "rotate(5deg) scale(1.08)" : "rotate(0deg) scale(1)",
                }}
              >
                <Icon
                  className="w-7 h-7 transition-all duration-500"
                  style={{ color: isHovered ? v.color : "var(--muted-foreground)", strokeWidth: 1.5 }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-sm md:text-base font-extrabold tracking-tight leading-snug mb-3 transition-colors duration-300"
                style={{ color: isHovered ? v.color : "var(--foreground)" }}
              >
                {v.title}
              </h3>

              {/* Accent line */}
              <div
                className="h-[2px] mb-4 transition-all duration-500"
                style={{
                  width: isHovered ? "40px" : "24px",
                  backgroundColor: v.color,
                  opacity: isHovered ? 1 : 0.4,
                }}
              />

              {/* Description */}
              <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-[220px]">
                {v.description}
              </p>
            </div>
          )
        })}
      </div>
    </SectionContainer>
  )
}
