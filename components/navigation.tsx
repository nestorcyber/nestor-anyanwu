"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { X, Sun, Moon, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import type { SearchResult } from "@/lib/search-index"

export default function Navigation() {
  const pathname = usePathname()
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

  // Lock body scroll when mobile/full drawer menu is open
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

  // Desktop header quick links
  const desktopNavItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PORTFOLIO", href: "/portfolio" },
    { label: "COMMUNITY", href: "/community" },
    { label: "JOURNAL", href: "/journal" },
  ]

  // Desktop drawer items
  const desktopDrawerItems = [
    { label: "GALLERY", href: "/gallery" },
    { label: "CONTACT", href: "/contact" },
  ]

  // Mobile drawer items (All site links)
  const mobileDrawerItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PORTFOLIO", href: "/portfolio" },
    { label: "COMMUNITY", href: "/community" },
    { label: "JOURNAL", href: "/journal" },
    { label: "GALLERY", href: "/gallery" },
    { label: "CONTACT", href: "/contact" },
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
      {/* Top Header Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-slate-900 dark:border-slate-800 text-foreground font-sans transition-colors duration-200"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="site-container flex items-center justify-between h-14 md:h-16">
          
          {/* LEFT SIDE: Brand Logo Image */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:opacity-90 transition-opacity flex items-center h-8 group"
              aria-label="Nestor Anyanwu Home"
            >
              <Image
                src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787870276/nestor/branding/logo.png"
                alt="Nestor Anyanwu Logo"
                width={160}
                height={36}
                priority
                className="h-6 sm:h-7 w-auto object-contain brightness-0 dark:brightness-0 dark:invert transition-all duration-200"
              />
            </Link>
          </div>

          {/* RIGHT SIDE: Desktop Nav Links + Dynamic MENU / CLOSE Drawer Toggle Button */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
            
            {/* Desktop Header Links - Upskill Hub Style Formatting (Caps & Bold) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {desktopNavItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/")

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 text-sm lg:text-[15px] font-bold uppercase tracking-wider transition-all duration-200 rounded-[5px] ${
                      isActive
                        ? "text-[#0056D2] dark:text-[#38bdf8]"
                        : "text-foreground/90 hover:text-[#0056D2] dark:hover:text-[#38bdf8] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#0056D2] dark:bg-[#38bdf8] rounded-full shadow-xs" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Dynamic MENU / CLOSE Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center cursor-pointer group p-1.5 transition-colors min-w-[50px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2] rounded-[5px] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="main-drawer"
            >
              {isOpen ? (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-[#0056D2] transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-bold leading-none mb-[3px]">
                    CLOSE
                  </span>
                  <X size={18} className="stroke-[2] transition-colors" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-[#0056D2] transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-bold leading-none mb-[4px]">
                    MENU
                  </span>
                  <div className="flex flex-col gap-[3.5px] w-7 items-center">
                    <span className="w-full h-[1.6px] bg-foreground/80 group-hover:bg-[#0056D2] transition-colors rounded-full" />
                    <span className="w-full h-[1.6px] bg-foreground/80 group-hover:bg-[#0056D2] transition-colors rounded-full" />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Top Sliding Curtain Overlay Drawer */}
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
        <div className="w-full bg-secondary/80 dark:bg-neutral-900/90 border-b border-border/30 px-6 sm:px-8 md:px-12 lg:px-16 py-4">
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
              className="absolute right-3 px-3 py-1 bg-[#0056D2] text-white text-xs font-mono font-bold uppercase tracking-wider rounded disabled:opacity-40 cursor-pointer transition-opacity"
            >
              Search
            </button>
          </form>
        </div>

        {/* Drawer Content Area */}
        <div className="max-w-7xl w-full mx-auto flex-1 overflow-y-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-4 pb-12 flex flex-col justify-start">
          
          {/* DESKTOP VIEW: Dark mode toggle AFTER search box BEFORE listing menu components */}
          {mounted && (
            <div className="hidden md:flex items-center justify-between py-4 border-b border-border/30 mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground">
                Appearance Mode
              </span>
              <button
                type="button"
                onClick={() => {
                  setTheme(isDark ? "light" : "dark")
                  setIsOpen(false)
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border/80 bg-card text-foreground font-bold text-xs tracking-wider flex items-center gap-2 shadow-2xs hover:border-[#0056D2] transition-all cursor-pointer"
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
          )}

          {/* DESKTOP DRAWER LINKS LIST (ONLY GALLERY & CONTACT) */}
          <nav className="hidden md:flex flex-col gap-5 pt-4">
            {desktopDrawerItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-all font-bold uppercase text-3xl lg:text-4xl tracking-[0.12em] py-3 cursor-pointer block border-b border-border/20 ${
                    isActive ? "text-[#0056D2]" : "text-foreground hover:text-[#0056D2]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* MOBILE DRAWER LINKS LIST (ALL SITE LINKS) */}
          <nav className="flex md:hidden flex-col gap-1 pt-2">
            {mobileDrawerItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-all font-bold uppercase text-lg tracking-[0.08em] py-3 cursor-pointer block border-b border-border/15 ${
                    isActive ? "text-[#0056D2]" : "text-foreground hover:text-[#0056D2]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* MOBILE VIEW: Dark mode toggle IMMEDIATELY AFTER mobile nav listing */}
          {mounted && (
            <div className="flex md:hidden items-center justify-between pt-6 border-t border-border/30 mt-4">
              <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground">
                Appearance Mode
              </span>
              <button
                type="button"
                onClick={() => {
                  setTheme(isDark ? "light" : "dark")
                  setIsOpen(false)
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border/80 bg-card text-foreground font-bold text-xs tracking-wider flex items-center gap-2 shadow-2xs hover:border-[#0056D2] transition-all cursor-pointer"
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
          )}

        </div>
      </div>
    </>
  )
}
