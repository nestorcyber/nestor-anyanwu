"use client"

import React, { useState, useEffect } from "react"
import {
  User,
  Compass,
  Award,
  Cpu,
  PenTool,
  Users,
  HeartHandshake,
  ArrowUp,
  Search,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export interface AboutSidebarItem {
  id: string
  label: string
  icon: React.ReactNode
}

export default function AboutSidebarNav() {
  const [activeSection, setActiveSection] = useState<string>("hero")

  const navItems: AboutSidebarItem[] = [
    {
      id: "hero",
      label: "Executive Profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "journey",
      label: "My Journey",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: "advocate",
      label: "01. Tech Advocate",
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: "ai",
      label: "02. AI Enthusiast",
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      id: "designer",
      label: "03. Ingenious Designer",
      icon: <PenTool className="w-5 h-5" />,
    },
    {
      id: "leader",
      label: "04. Community Leader",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "service",
      label: "Service & Growth",
      icon: <HeartHandshake className="w-5 h-5" />,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i]
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -80
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <aside className="w-72 shrink-0 hidden lg:block border-r border-border/70 bg-card/40 backdrop-blur-md sticky top-14 md:top-16 self-start">
      <div className="p-5 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto flex flex-col justify-between">
        
        <div className="space-y-6">
          {/* Sidebar Top Header Logo / Branding */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center font-bold font-mono">
                N
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground truncate">Nestor Anyanwu</h3>
                <p className="text-[11px] font-mono text-muted-foreground">About & Vision</p>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-secondary transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Navigation Items (SlothUI / Twitter Sidebar Style) */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground px-3 block mb-2">
              Page Contents
            </span>
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-left group ${
                    isActive
                      ? "bg-accent text-white shadow-xs font-bold"
                      : "text-foreground hover:bg-secondary/80 hover:text-accent"
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-accent"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Quick Action Box at bottom of Sidebar */}
        <div className="p-4 bg-secondary/50 border border-border/80 rounded-xl space-y-3">
          <p className="text-xs font-bold text-foreground">Explore Deliverables</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            View full software projects, case studies, and engineering evidence.
          </p>
          <Link href="/portfolio">
            <button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all">
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </aside>
  )
}
