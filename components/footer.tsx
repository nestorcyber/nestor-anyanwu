"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Linkedin, Github, Send, ArrowUp } from "lucide-react"

const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.228 15.011c.523 0 .977-.107 1.354-.316.38-.21.68-.5.903-.865.223-.366.333-.79.333-1.272 0-.44-.092-.816-.277-1.127a2.215 2.215 0 0 0-.742-.782c.4-.244.714-.582.946-1.01.23-.43.346-.948.346-1.554 0-.48-.096-.902-.288-1.264a2.41 2.41 0 0 0-.806-.884c-.4-.26-.879-.452-1.439-.57-.557-.123-1.173-.183-1.846-.183H2v13.682h5.728c.167 0 .5-.015 1-.044a7.35 7.35 0 0 0 1.5-.23zm-3.376-7.8h2.646c.71 0 1.25.132 1.62.39.37.26.55.66.55 1.2a1.37 1.37 0 0 1-.22.8c-.14.24-.35.43-.63.56a3.86 3.86 0 0 1-1.02.32c-.41.07-.88.11-1.42.11H4.852zm0 4.619h2.868c.83 0 1.45.16 1.84.48.39.32.58.78.58 1.39a1.64 1.64 0 0 1-.25.93c-.17.27-.42.48-.75.63a4.01 4.01 0 0 1-1.16.36c-.47.07-1 .1-1.58.1H4.852zm14.16-5.834c-1.39 0-2.48.43-3.25 1.29-.77.86-1.16 2.05-1.16 3.58 0 1.52.38 2.7 1.14 3.56.76.85 1.84 1.28 3.23 1.28 1.26 0 2.22-.32 2.87-.97a4.13 4.13 0 0 0 1.05-2.27h-2.12c-.11.41-.31.73-.6.96-.28.23-.69.34-1.22.34-.63 0-1.12-.22-1.46-.66-.34-.44-.52-1.1-.53-1.99h6.05c.02-.13.03-.35.03-.66 0-1.48-.36-2.61-1.07-3.4-.72-.78-1.7-1.18-2.95-1.18zm-1.45 3.819c.07-.63.26-1.11.57-1.43.32-.32.76-.48 1.33-.48.54 0 .97.16 1.27.47.3.31.47.79.52 1.44zM16.642 7.026h4.8v1.091h-4.8z" />
  </svg>
)

const TwitterXIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card text-foreground border-t border-border/60 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main 3-Column Spacious Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Statement (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase">
                NESTOR ANYANWU
              </h2>
              <p className="text-accent text-xs font-bold uppercase tracking-widest">
                TECH . LEADERSHIP . SERVICE
              </p>
            </div>

            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-md">
              Software Engineer, Tech Leader, and Community Advocate driving digital innovation, capacity building, and impactful tech ecosystems across Nigeria.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://linkedin.com/in/nestoranyanwu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors p-1"
                aria-label="Twitter X"
              >
                <TwitterXIcon className="w-5 h-5" />
              </a>
              <a
                href="https://behance.net/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors p-1"
                aria-label="Behance"
              >
                <BehanceIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 6-8) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3.5">
              <Link href="/" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/portfolio" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Portfolio
              </Link>
              <Link href="/community" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Community
              </Link>
              <Link href="/gallery" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Gallery
              </Link>
              <Link href="/journal" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Journal
              </Link>
              <Link href="/contact" className="text-sm md:text-base font-medium text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Subscribe Form (Col 9-12) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
              Newsletter
            </h3>

            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Subscribe to get technical case studies, essays, and community updates delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-4 rounded-none border border-emerald-500/30">
                Thank you! You're subscribed.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-background text-foreground text-sm px-4 py-3 rounded-none border border-border/80 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-none transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="border-t border-border/40 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nestor Anyanwu. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-foreground hover:text-accent font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  )
}
