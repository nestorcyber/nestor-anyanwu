"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Sun, Moon, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// Dynamically import search modal to avoid SSR issues
const SearchModal = dynamic(() => import("@/components/search/search-modal"), { ssr: false })

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  // ⌘K / Ctrl+K keyboard shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setSearchOpen((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const desktopNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Community", href: "/community" },
    { label: "Journal", href: "/journal" },
  ]

  const drawerNavItems = [
    { label: "Gallery", href: "/gallery" },
    { label: "Journey", href: "/journey" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Fixed Primary Header Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 bg-background/95 backdrop-blur-md backdrop-saturate-150 border-b border-border/50 transition-all duration-300 py-3 md:py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
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

          {/* Right group */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop nav links */}
            <div
              className={`hidden md:flex items-center gap-6 transition-opacity duration-300 ${
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {desktopNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-accent hover:scale-105 transition-all font-bold text-sm uppercase tracking-wider leading-tight cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground border border-border/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open search (Ctrl+K)"
              style={{ height: "34px" }}
            >
              <Search size={15} />
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                <kbd className="bg-muted px-1 rounded text-[9px]">⌘K</kbd>
              </span>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground cursor-pointer flex items-center justify-center border border-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                style={{ width: "34px", height: "34px" }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center cursor-pointer group p-1 transition-colors min-w-[50px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="main-drawer"
            >
              {isOpen ? (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-accent transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[3px]">CLOSE</span>
                  <X size={19} className="stroke-[1.3] transition-colors" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-foreground/80 group-hover:text-accent transition-colors">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-light leading-none mb-[4px]">MENU</span>
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

      {/* Full-Screen Drawer Overlay */}
      <div
        id="main-drawer"
        role="dialog"
        aria-label="Navigation drawer"
        aria-hidden={!isOpen}
        className={`fixed inset-0 top-[57px] md:top-[65px] w-full h-[calc(100vh-57px)] md:h-[calc(100vh-65px)] bg-background text-foreground z-40 transition-transform duration-500 ease-in-out transform flex flex-col overflow-hidden ${
          isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* Drawer nav links */}
        <nav className="max-w-7xl w-full mx-auto flex-1 overflow-y-auto px-6 md:px-8 py-10 flex flex-col gap-6">
          {/* Show all nav items on mobile */}
          {[...desktopNavItems, ...drawerNavItems].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:text-accent transition-all font-light text-2xl md:text-4xl uppercase tracking-[0.2em] py-3 cursor-pointer block border-b border-border/20 focus-visible:outline-none focus-visible:text-accent"
            >
              {item.label}
            </Link>
          ))}

          {/* Search prompt inside drawer */}
          <button
            onClick={() => { setIsOpen(false); setTimeout(() => setSearchOpen(true), 300) }}
            className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-all text-base uppercase tracking-[0.2em] py-3 border-b border-border/20 text-left"
          >
            <Search size={18} />
            <span>Search Site</span>
            <kbd className="ml-auto text-[10px] border border-border/40 px-1.5 py-0.5 font-mono text-muted-foreground">⌘K</kbd>
          </button>
        </nav>
      </div>
    </>
  )
}
