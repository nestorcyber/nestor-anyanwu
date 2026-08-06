"use client"

import { useState, useEffect } from "react"
import { X, Sun, Moon, Search, Layers, Briefcase, Zap, Star, BookOpen, Users, FileText, ArrowUpRight, Award, History } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import type { SearchResult } from "@/lib/search-index"

const categoryIcons: Record<string, React.ReactNode> = {
  Page: <Layers className="w-3.5 h-3.5" />,
  Project: <Briefcase className="w-3.5 h-3.5" />,
  Service: <Zap className="w-3.5 h-3.5" />,
  Skill: <Star className="w-3.5 h-3.5" />,
  Journal: <BookOpen className="w-3.5 h-3.5" />,
  Community: <Users className="w-3.5 h-3.5" />,
  Experience: <History className="w-3.5 h-3.5" />,
  Certification: <Award className="w-3.5 h-3.5" />,
}

const categoryColors: Record<string, string> = {
  Page: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Project: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  Service: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Skill: "bg-green-500/15 text-green-600 dark:text-green-400",
  Journal: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  Community: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  Experience: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  Certification: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        const data = await res.json()
        setSearchResults(data.results || [])
      } catch {
        setSearchResults([])
      }
    }, 200)
    return () => clearTimeout(handle)
  }, [searchQuery])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Reset search state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
    }
  }, [isOpen])

  // Desktop quick nav bar links
  const desktopNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Community", href: "/community" },
    { label: "Journal", href: "/journal" },
  ]

  // Desktop drawer items (Original 2 items: Gallery & Contact)
  const desktopDrawerItems = [
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  // Mobile drawer items (All site links fit on mobile screen)
  const mobileDrawerItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Community", href: "/community" },
    { label: "Journal", href: "/journal" },
    { label: "Journey", href: "/journey" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const url = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    window.open(url, "_blank")
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <>
      {/* Fixed Primary Header Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 bg-background border-b-2 border-slate-900 dark:border-slate-800 transition-all duration-200 py-3 md:py-3.5"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:opacity-80 transition-opacity flex items-center h-8"
            aria-label="Nestor Anyanwu — Home"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-YsxkUMGzk3nZcZJmumGcRLhbwVu9Fq.png"
              alt="Nestor Anyanwu Logo"
              width={60}
              height={20}
              className="h-5 md:h-6 w-auto brightness-0 dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Right Navigation & Control Group */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Desktop Quick Nav Links */}
            <div
              className={`hidden md:flex items-center gap-6 md:gap-8 transition-opacity duration-200 ${
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {desktopNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider leading-tight cursor-pointer py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 bg-card text-foreground cursor-pointer flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-md hover:bg-secondary transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                style={{ width: "34px", height: "34px" }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Dynamic MENU / CLOSE Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center cursor-pointer group p-1 transition-colors min-w-[50px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="main-drawer"
            >
              {isOpen ? (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-accent transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[3px]">
                    CLOSE
                  </span>
                  <X size={19} className="stroke-[1.3] transition-colors" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-accent transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[4px]">
                    MENU
                  </span>
                  <div className="flex flex-col gap-[4px] w-9 items-center">
                    <span className="w-full h-[1.2px] bg-foreground/80 group-hover:bg-accent transition-colors" />
                    <span className="w-full h-[1.2px] bg-foreground/80 group-hover:bg-accent transition-colors" />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Top Sliding Curtain Overlay */}
      <div
        id="main-drawer"
        role="dialog"
        aria-label="Navigation drawer"
        aria-hidden={!isOpen}
        className={`fixed inset-0 top-[57px] md:top-[65px] w-full h-[calc(100vh-57px)] md:h-[calc(100vh-65px)] bg-background text-foreground z-40 transition-transform duration-500 ease-in-out transform flex flex-col overflow-hidden ${
          isOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* Seamless Search Bar inside Drawer */}
        <div className="w-full bg-secondary/80 dark:bg-neutral-900/90 border-b border-border/30 px-5 md:px-8 py-4">
          <form onSubmit={handleSearchSubmit} className="max-w-7xl mx-auto relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search and press Enter..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 text-sm md:text-base pl-10 pr-24 py-2 rounded-md outline-none transition-all font-light"
            />
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="absolute right-3 px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded disabled:opacity-40 cursor-pointer transition-opacity"
            >
              Search
            </button>
          </form>
        </div>

        {/* Drawer Content Area */}
        <div className="max-w-7xl w-full mx-auto flex-1 overflow-y-auto px-6 md:px-8 pt-6 pb-12 flex flex-col justify-start">
          {/* ── Mobile Menu (Shows all 8 links nicely aligned from the top) ── */}
          <nav className="flex md:hidden flex-col gap-2 pt-2">
            {mobileDrawerItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-all font-light text-xl uppercase tracking-[0.18em] py-2.5 cursor-pointer block border-b border-border/15 focus-visible:outline-none focus-visible:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Drawer Menu (Shows Gallery & Contact) ── */}
          <nav className="hidden md:flex flex-col gap-6 pt-8">
            {desktopDrawerItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-accent transition-all font-light text-4xl uppercase tracking-[0.2em] py-3 cursor-pointer block border-b border-border/20 focus-visible:outline-none focus-visible:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
