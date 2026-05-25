"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Volunteering", href: "/volunteering" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* Header - Fixed at top, never hides */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 bg-primary border-b border-primary">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
          {/* Logo on the left */}
          <button
            onClick={() => router.push("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-YsxkUMGzk3nZcZJmumGcRLhbwVu9Fq.png"
              alt="Nestor Anyanwu Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </button>

          {/* Navigation on the right - desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false)
                  router.push(item.href)
                }}
                className="text-secondary hover:text-accent transition-colors font-bold text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-secondary" /> : <Menu size={24} className="text-secondary" />}
          </button>
        </div>
      </nav>

      {/* Overlay - behind drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Drawer - slides in from left */}
      <div
        className={`fixed top-0 left-0 h-screen w-4/5 max-w-xs bg-primary z-50 transition-transform duration-300 ease-in-out transform overflow-y-auto border-r border-primary md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-secondary/20">
          <button
            onClick={() => router.push("/")}
            className="text-secondary font-sans font-bold text-xl hover:text-accent transition-colors"
          >
            NA
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-secondary" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-0">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => {
                setIsOpen(false)
                router.push(item.href)
              }}
              className={`block w-full text-left px-4 py-3 text-secondary hover:bg-accent/10 transition-colors font-bold text-sm ${
                index < navItems.length - 1 ? "border-b border-secondary/20" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
