"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { X, Sun, Moon, Search, Menu, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import type { SearchResult } from "@/lib/search-index"

/**
 * Bottom-to-top cubic-bezier rolling text hover animation.
 * Current text exits up (-100%), duplicate clone enters smoothly from below.
 */
function RollingText({
  text,
  duplicateClassName = "text-[#0056D2]",
}: {
  text: string
  duplicateClassName?: string
}) {
  return (
    <span className="relative inline-flex flex-col h-[1.3em] overflow-hidden select-none">
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        className={`inline-block absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full ${duplicateClassName}`}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  )
}

function AppearanceModeRow({
  isDark,
  onToggle,
  className = "",
}: {
  isDark: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <div className={`items-center justify-between ${className}`}>
      <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
        Appearance Mode
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="px-4 py-2 rounded-2xl border border-border/80 bg-card text-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-2xs hover:border-[#0056D2] transition-all cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <>
            <Sun size={15} className="text-amber-400" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={15} className="text-slate-700" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </div>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = (resolvedTheme || theme) === "dark"

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

  // Lock body scroll & handle Escape key when drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  // Reset search state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }, [isOpen])

  // Desktop header inline links
  const desktopNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Community", href: "/community" },
    { label: "Journal", href: "/journal" },
  ]

  // Desktop drawer links (Only Gallery & Contact)
  const desktopDrawerItems = [
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  // Mobile drawer links (All site links)
  const mobileDrawerItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Community", href: "/community" },
    { label: "Journal", href: "/journal" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const url = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    setIsOpen(false)
    setSearchQuery("")
    router.push(url)
  }

  return (
    <>
      {/* Dimmed Backdrop when Drawer is Open */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ─── FLOATING ISLAND CAPSULE HEADER + DYNAMIC DROPDOWN DRAWER ─── */}
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl transition-all duration-300">
        
        {/* Top Floating Bar (z-50 so drawer emerges smoothly from UNDER this bar) */}
        <div className="relative z-50 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border border-slate-200/90 dark:border-[#1E293B] shadow-xl rounded-2xl px-3.5 sm:px-5 py-2 flex items-center justify-between gap-3 sm:gap-5">
          
          {/* LEFT: Monogram (N) Logo Badge */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2] rounded-2xl"
            aria-label="Nestor Anyanwu - Home"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-black text-white dark:bg-[#F1F5F9] dark:text-[#020617] font-extrabold text-sm flex items-center justify-center tracking-tight shadow-sm transition-transform duration-200 group-hover:scale-105">
              (N)
            </span>
          </Link>

          {/* CENTER: Desktop Navigation Links (ALL CAPS and bold per AGENTS.md) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Primary navigation">
            {desktopNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative px-3 py-1.5 text-xs lg:text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 rounded-2xl ${
                    isActive
                      ? "text-[#0056D2]"
                      : "text-foreground hover:text-[#0056D2]"
                  }`}
                >
                  <RollingText
                    text={item.label}
                    duplicateClassName={isActive ? "text-[#0044a8]" : "text-[#0056D2]"}
                  />
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE: Clean Hamburger Menu / Close Toggle Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 sm:p-2.5 rounded-2xl text-foreground hover:text-[#0056D2] hover:bg-secondary/80 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2] flex items-center justify-center"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="main-drawer"
            >
              {isOpen ? (
                <X size={20} className="stroke-[2.2] transition-colors" />
              ) : (
                <Menu size={20} className="stroke-[2.2] transition-colors" />
              )}
            </button>
          </div>

        </div>

        {/* ─── DYNAMIC DROPDOWN DRAWER OPENING FROM UNDER THE BAR ─── */}
        <div
          id="main-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          aria-hidden={!isOpen}
          className={`absolute top-full left-0 right-0 mt-2.5 z-40 origin-top bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#1E293B] shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] max-h-[calc(100dvh-6.5rem)] overflow-y-auto ${
            isOpen
              ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
              : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
          }`}
        >
          {/* Search Bar Inside Drawer */}
          <div className="w-full bg-secondary/70 dark:bg-[#0F172A]/90 border-b border-border px-5 sm:px-6 md:px-8 py-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground shrink-0 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search and press Enter..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 text-sm md:text-base py-1.5 outline-none font-normal"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="px-4 py-1.5 bg-[#0056D2] hover:bg-[#0044a8] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-2xl disabled:opacity-40 cursor-pointer transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {/* Live Instant Search Matches (when typing) */}
            {searchResults.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/50 max-h-52 overflow-y-auto space-y-1">
                {searchResults.slice(0, 5).map((res) => (
                  <Link
                    key={res.id}
                    href={res.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-background/80 transition-colors group"
                  >
                    <div className="min-w-0 pr-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0056D2] block">
                        {res.category}
                      </span>
                      <span className="text-sm font-semibold text-foreground line-clamp-1">
                        {res.title}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:text-[#0056D2] group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Content Container */}
          <div className="px-5 sm:px-6 md:px-8 py-5 flex flex-col">
            
            {/* DESKTOP VIEW: Appearance Mode Switch AFTER search box, BEFORE Gallery & Contact */}
            {mounted && (
              <AppearanceModeRow
                isDark={isDark}
                onToggle={() => setTheme(isDark ? "light" : "dark")}
                className="hidden md:flex pb-4 mb-2 border-b border-border/40"
              />
            )}

            {/* DESKTOP DRAWER LINKS LIST: ONLY GALLERY & CONTACT */}
            <nav className="hidden md:flex flex-col divide-y divide-border/30" aria-label="Secondary desktop navigation">
              {desktopDrawerItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between py-3.5 font-bold uppercase text-xl lg:text-2xl tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#0056D2]"
                        : "text-foreground hover:text-[#0056D2]"
                    }`}
                  >
                    <RollingText
                      text={item.label}
                      duplicateClassName={isActive ? "text-[#0044a8]" : "text-[#0056D2]"}
                    />
                    <ArrowRight
                      size={20}
                      className={`transition-all ${
                        isActive
                          ? "text-[#0056D2]"
                          : "text-muted-foreground group-hover:text-[#0056D2] group-hover:translate-x-1"
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* MOBILE DRAWER LINKS LIST: ALL SITE LINKS */}
            <nav className="flex md:hidden flex-col divide-y divide-border/25" aria-label="Mobile navigation">
              {mobileDrawerItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname?.startsWith(`${item.href}/`)

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-2.5 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#0056D2]"
                        : "text-foreground hover:text-[#0056D2]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      size={16}
                      className={isActive ? "text-[#0056D2]" : "text-muted-foreground"}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* MOBILE VIEW: Appearance Mode Switch AFTER mobile nav links */}
            {mounted && (
              <AppearanceModeRow
                isDark={isDark}
                onToggle={() => setTheme(isDark ? "light" : "dark")}
                className="flex md:hidden pt-4 mt-2 border-t border-border/40"
              />
            )}

          </div>
        </div>

      </header>
    </>
  )
}
