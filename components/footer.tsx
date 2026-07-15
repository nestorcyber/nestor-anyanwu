"use client"

import Link from "next/link"
import { Linkedin, Twitter, Github, MessageCircle, Mail, Globe, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground border-t border-border py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-primary">
              Nestor Anyanwu
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Tech Professional, Software Developer, and Community Leader driving digital innovation, capacity building, and impactful tech ecosystems.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 group">
                About
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/journey" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 group">
                Journey
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/projects" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 group">
                Projects
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/gallery" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 group">
                Gallery
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Direct Channels Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Direct Channels
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:nestoranyanwu@gmail.com"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-accent" />
                Email
              </a>
              <a
                href="https://wa.me/2349060900245"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-accent" />
                WhatsApp
              </a>
              <a
                href="https://behance.net/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-accent" />
                Behance
              </a>
            </div>
          </div>

          {/* Socials Connection Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-2">
              <a
                href="https://linkedin.com/in/nestoranyanwu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-card hover:bg-accent hover:text-white border border-border text-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-card hover:bg-accent hover:text-white border border-border text-foreground transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-card hover:bg-accent hover:text-white border border-border text-foreground transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nestor Anyanwu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
