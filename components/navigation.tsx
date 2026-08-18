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

  // Desktop drawer items (ONLY Gallery and Contact)
  const desktopDrawerItems = [
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  // Mobile drawer items (All site links)
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
        <div className="container-webflow flex items-center justify-between h-14 md:h-16">
          
          {/* LEFT SIDE: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:opacity-90 transition-opacity flex items-center h-8"
              aria-label="Nestor Anyanwu — Home"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-YsxkUMGzk3nZcZJmumGcRLhbwVu9Fq.png"
                alt="Nestor Anyanwu Logo"
                width={140}
                height={32}
                className="h-5 md:h-6 w-auto brightness-0 dark:brightness-0 dark:invert"
              />
            </Link>
          </div>

          {/* RIGHT SIDE: Desktop Nav Links + Dynamic MENU / CLOSE Drawer Toggle Button */}
          <div className="flex items-center gap-5 md:gap-7">
            
            {/* Desktop Header Links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs md:text-sm font-semibold">
              {desktopNavItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/")

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`transition-all uppercase tracking-wider ${
                      isActive
                        ? "px-3.5 py-1 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-xs"
                        : "px-2.5 py-1 text-slate-700 dark:text-slate-200 hover:text-[#0075ff] dark:hover:text-[#0075ff]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Dynamic MENU / CLOSE Drawer Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center cursor-pointer group p-1 transition-colors min-w-[50px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075ff] rounded-sm"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="main-drawer"
            >
              {isOpen ? (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-[#0075ff] transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[3px]">
                    CLOSE
                  </span>
                  <X size={19} className="stroke-[1.3] transition-colors" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-[#0075ff] transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[4px]">
                    MENU
                  </span>
                  <div className="flex flex-col gap-[4px] w-9 items-center">
                    <span className="w-full h-[1.2px] bg-foreground/80 group-hover:bg-[#0075ff] transition-colors" />
                    <span className="w-full h-[1.2px] bg-foreground/80 group-hover:bg-[#0075ff] transition-colors" />
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
              className="absolute right-3 px-3 py-1 bg-[#0075ff] text-white text-xs font-mono font-bold uppercase tracking-wider rounded disabled:opacity-40 cursor-pointer transition-opacity"
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
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  setIsOpen(false)
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border/80 bg-card text-foreground font-bold text-xs tracking-wider flex items-center gap-2 shadow-2xs hover:border-[#0075ff] transition-all cursor-pointer"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
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
          <nav className="hidden md:flex flex-col gap-6 pt-4">
            {desktopDrawerItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-all font-light text-4xl lg:text-5xl tracking-[0.15em] py-3 cursor-pointer block border-b border-border/20 ${
                    isActive ? "text-[#0075ff] font-bold" : "text-foreground hover:text-[#0075ff]"
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
                  className={`transition-all font-light text-xl tracking-[0.12em] py-2.5 cursor-pointer block border-b border-border/15 ${
                    isActive ? "text-[#0075ff] font-bold" : "text-foreground hover:text-[#0075ff]"
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
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  setIsOpen(false)
                }}
                className="px-3.5 py-1.5 rounded-xl border border-border/80 bg-card text-foreground font-bold text-xs tracking-wider flex items-center gap-2 shadow-2xs hover:border-[#0075ff] transition-all cursor-pointer"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
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
