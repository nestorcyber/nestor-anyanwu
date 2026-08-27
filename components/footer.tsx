"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, Linkedin, Github, Send } from "lucide-react"

const TwitterXIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.228 15.011c.523 0 .977-.107 1.354-.316.38-.21.68-.5.903-.865.223-.366.333-.79.333-1.272 0-.44-.092-.816-.277-1.127a2.215 2.215 0 0 0-.742-.782c.4-.244.714-.582.946-1.01.23-.43.346-.948.346-1.554 0-.48-.096-.902-.288-1.264a2.41 2.41 0 0 0-.806-.884c-.4-.26-.879-.452-1.439-.57-.557-.123-1.173-.183-1.846-.183H2v13.682h5.728c.167 0 .5-.015 1-.044a7.35 7.35 0 0 0 1.5-.23zm-3.376-7.8h2.646c.71 0 1.25.132 1.62.39.37.26.55.66.55 1.2a1.37 1.37 0 0 1-.22.8c-.14.24-.35.43-.63.56a3.86 3.86 0 0 1-1.02.32c-.41.07-.88.11-1.42.11H4.852zm0 4.619h2.868c.83 0 1.45.16 1.84.48.39.32.58.78.58 1.39a1.64 1.64 0 0 1-.25.93c-.17.27-.42.48-.75.63a4.01 4.01 0 0 1-1.16.36c-.47.07-1 .1-1.58.1H4.852zm14.16-5.834c-1.39 0-2.48.43-3.25 1.29-.77.86-1.16 2.05-1.16 3.58 0 1.52.38 2.7 1.14 3.56.76.85 1.84 1.28 3.23 1.28 1.26 0 2.22-.32 2.87-.97a4.13 4.13 0 0 0 1.05-2.27h-2.12c-.11.41-.31.73-.6.96-.28.23-.69.34-1.22.34-.63 0-1.12-.22-1.46-.66-.34-.44-.52-1.1-.53-1.99h6.05c.02-.13.03-.35.03-.66 0-1.48-.36-2.61-1.07-3.4-.72-.78-1.7-1.18-2.95-1.18zm-1.45 3.819c.07-.63.26-1.11.57-1.43.32-.32.76-.48 1.33-.48.54 0 .97.16 1.27.47.3.31.47.79.52 1.44zM16.642 7.026h4.8v1.091h-4.8z" />
  </svg>
)

const WhatsappIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83 0-2.623-1.01-5.09-2.846-6.93C16.655 1.993 14.202 1.01 11.66 1.01c-5.442 0-9.866 4.415-9.87 9.83-.001 1.702.463 3.361 1.34 4.8l-.996 3.633 3.725-.976z" />
  </svg>
)

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="w-full bg-slate-950 text-white border-t-2 border-slate-900 py-16 sm:py-20 font-sans">
      <div className="site-container space-y-16">

        {/* Top Section: Gumroad-style Headline & Form (Left) + Nav Links (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Col 1-7): Large Headline & Pink Accent Form */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl font-heading">
              Subscribe to get tips and tactics to grow the way you want.
            </h2>

            {subscribed ? (
              <div className="p-4 bg-emerald-950/60 border-2 border-emerald-500 text-emerald-300 font-bold text-xs uppercase tracking-wider rounded-none">
                ✓ You're subscribed! Thank you for joining.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-slate-900/90 text-white border-2 border-slate-800 px-4 py-3.5 text-sm placeholder:text-slate-500 rounded-none focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#0075ff] hover:bg-blue-600 text-white font-extrabold px-5 py-3.5 border-2 border-slate-950 rounded-none transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.9)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>
              </form>
            )}
          </div>

          {/* Right Columns (Col 8-12): 2 Column Nav Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-sm pt-2">
            
            {/* Nav Column 1 */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                Discover
              </h3>
              <ul className="space-y-2.5 font-medium text-slate-200">
                <li>
                  <Link href="/portfolio" className="hover:text-[#0075ff] transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/certifications" className="hover:text-[#0075ff] transition-colors">
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link href="/memberships" className="hover:text-[#0075ff] transition-colors">
                    Memberships
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-[#0075ff] transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-[#0075ff] transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#0075ff] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-[#0075ff] transition-colors">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Column 2 */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                Connect
              </h3>
              <ul className="space-y-2.5 font-medium text-slate-200">
                <li>
                  <Link href="/contact" className="hover:text-[#0075ff] transition-colors">
                    Contact Me
                  </Link>
                </li>
                <li>
                  <a href="https://linkedin.com/in/nestoranyanwu" target="_blank" rel="noopener noreferrer" className="hover:text-[#0075ff] transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/nestorcyber" target="_blank" rel="noopener noreferrer" className="hover:text-[#0075ff] transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/nestorcyber" target="_blank" rel="noopener noreferrer" className="hover:text-[#0075ff] transition-colors">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/message/GJIXLHQQPYDIE1" target="_blank" rel="noopener noreferrer" className="hover:text-[#0075ff] transition-colors">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Brand Pill + Copyright (Left) & Social Icons (Right) */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          {/* Left: Brand Badge & Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#f472b6] text-slate-950 font-black text-xs flex items-center justify-center select-none font-mono">
              N
            </span>
            <span className="font-medium text-slate-300">
              © {new Date().getFullYear()} Nestor Anyanwu (Nestor Cyber), Inc.
            </span>
          </div>

          {/* Right: Gumroad-style Minimalist Social Icons Row */}
          <div className="flex items-center gap-6 text-slate-300">
            <a
              href="https://twitter.com/nestorcyber"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f472b6] transition-colors"
              aria-label="Twitter X"
            >
              <TwitterXIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/nestoranyanwu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f472b6] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/nestorcyber"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f472b6] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://behance.net/nestorcyber"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f472b6] transition-colors"
              aria-label="Behance"
            >
              <BehanceIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/message/GJIXLHQQPYDIE1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f472b6] transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}
