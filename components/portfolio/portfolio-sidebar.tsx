"use client"

import React, { useState, useEffect } from "react"
import {
  User,
  Star,
  Wrench,
  Briefcase,
  Award,
  FolderGit2,
  Grid,
  MessageSquare,
  ArrowUp,
} from "lucide-react"

export interface PortfolioSidebarItem {
  id: string
  label: string
  count?: number | string
  icon: React.ReactNode
}

export default function PortfolioSidebar({
  projectCount,
  skillGroupCount,
  expCount,
  certCount,
}: {
  projectCount?: number
  skillGroupCount?: number
  expCount?: number
  certCount?: number
}) {
  const [activeSection, setActiveSection] = useState<string>("about")

  const navItems: PortfolioSidebarItem[] = [
    {
      id: "about",
      label: "About Me",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "featured",
      label: "Featured Work",
      count: 3,
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "skills",
      label: "Skills & Tech",
      count: skillGroupCount || 5,
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      id: "experience",
      label: "Experience",
      count: expCount || 6,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: "certifications",
      label: "Certifications",
      count: certCount || 4,
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: "library",
      label: "Project Library",
      count: projectCount || 8,
      icon: <FolderGit2 className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Grid className="w-5 h-5" />,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200

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
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-20 space-y-4 p-4 bg-card/60 backdrop-blur-md border border-border/80 rounded-2xl shadow-sm">
        
        {/* Navigation Header */}
        <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Navigation
          </span>
          <button
            onClick={scrollToTop}
            className="text-[11px] font-medium text-accent hover:underline flex items-center gap-1 cursor-pointer"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Sidebar Nav List (Twitter / Modern App Sidebar Style) */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer text-left group ${
                  isActive
                    ? "bg-accent text-white shadow-xs font-bold"
                    : "text-foreground hover:bg-secondary/80 hover:text-accent"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-accent"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shrink-0 transition-all ${
                      isActive
                        ? "bg-white text-accent"
                        : "bg-secondary border border-border text-muted-foreground group-hover:border-accent/40 group-hover:text-accent"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

      </div>
    </aside>
  )
}
