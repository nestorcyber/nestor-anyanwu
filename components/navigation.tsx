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

  const isSearching = searchQuery.trim().length > 0

  return (
    <>
      {/* Fixed Primary Header Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 bg-background border-b-2 border-slate-900 dark:border-slate-800 transition-all duration-200 py-3 md:py-4"
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
          <div className="flex items-center gap-6 md:gap-10">
            {/* Desktop Quick Nav Links */}
            <div
              className={`hidden md:flex items-center gap-8 md:gap-10 transition-opacity duration-200 ${
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {desktopNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-accent font-extrabold text-xs uppercase tracking-wider leading-tight cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 bg-card text-foreground cursor-pointer flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
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
          <div className="max-w-7xl mx-auto relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages, projects, skills, services..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 text-sm md:text-base pl-9 pr-14 py-2 rounded-md outline-none transition-all font-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Drawer Content Area */}
        <div className="max-w-7xl w-full mx-auto flex-1 overflow-y-auto px-6 md:px-8 py-4 md:py-6 flex flex-col justify-center">
          {isSearching ? (
            /* ── Dynamic Live Search Results View ── */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Search Results for "{searchQuery}"
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      onClick={() => setIsOpen(false)}
                      className="group p-4 hover:bg-accent/5 transition-all flex items-start gap-3 border-b border-border/20"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded mt-0.5 ${
                          categoryColors[result.category] || "bg-muted"
                        }`}
                      >
                        {categoryIcons[result.category] || <FileText className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug truncate">
                            {result.title}
                          </h3>
                          <span
                            className={`flex-shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${
                              categoryColors[result.category] || "bg-muted text-muted-foreground"
                            }`}
                          >
                            {result.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed font-light">
                          {result.description}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <Search className="w-8 h-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-base font-semibold text-foreground">No matches found for "{searchQuery}"</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Try searching for terms like "Portfolio", "Next.js", "GDG", "Design", or "Contact".
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* ── Mobile Menu (Shows all 8 links on small screens) ── */}
              <nav className="flex md:hidden flex-col gap-1.5 my-auto">
                {mobileDrawerItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-accent transition-all font-light text-lg uppercase tracking-[0.18em] py-1.5 cursor-pointer block border-b border-border/15 focus-visible:outline-none focus-visible:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* ── Desktop Drawer Menu (Shows original 2 links: Gallery & Contact) ── */}
              <nav className="hidden md:flex flex-col gap-6 my-auto">
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
            </>
          )}
        </div>
      </div>
    </>
  )
}
