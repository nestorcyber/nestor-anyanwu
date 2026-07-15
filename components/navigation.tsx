"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Journey", href: "/journey" },
    { label: "Community", href: "/community" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Header - Steady/Fixed Glassmorphic overlay */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 bg-[var(--nav-bg)] backdrop-blur-md backdrop-saturate-150 border-b border-border/50 transition-all duration-300 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity flex items-center h-8"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-YsxkUMGzk3nZcZJmumGcRLhbwVu9Fq.png"
              alt="Nestor Anyanwu Logo"
              width={60}
              height={20}
              className="h-5 md:h-6 w-auto brightness-0 dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Navigation on the right - desktop only */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-accent hover:scale-105 transition-all font-bold text-sm leading-tight cursor-pointer py-1"
              >
                {item.label}
              </Link>
            ))}

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground cursor-pointer ml-2 flex items-center justify-center border border-border/50"
                aria-label="Toggle Theme"
                style={{ width: "36px", height: "36px" }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Mobile Theme toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-foreground cursor-pointer flex items-center justify-center border border-border/50"
                aria-label="Toggle Theme"
                style={{ width: "36px", height: "36px" }}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay - behind drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Drawer - slides in from left */}
      <div
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-xs bg-card z-50 transition-transform duration-300 ease-in-out transform overflow-y-auto border-r border-border md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-foreground font-sans font-bold text-xl hover:text-accent transition-colors cursor-pointer"
          >
            Nestor
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-0 flex flex-col">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-3.5 text-foreground hover:bg-secondary transition-colors font-bold text-sm leading-tight cursor-pointer ${
                index < navItems.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
