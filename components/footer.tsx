"use client"

import Link from "next/link"
import { Linkedin, Twitter, Github, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary border-t border-border py-12 md:py-16 px-4 md:px-8 lg:px-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
          {/* Links Section */}
          <div>
            <h3 className="font-sans text-sm font-bold mb-4 md:mb-6 text-secondary tracking-wide">Navigation</h3>
            <nav className="space-y-2 md:space-y-3">
              <Link href="/about" className="block text-secondary/80 hover:text-accent transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/volunteering" className="block text-secondary/80 hover:text-accent transition-colors text-sm font-medium">
                Volunteering
              </Link>
              <Link href="/experience" className="block text-secondary/80 hover:text-accent transition-colors text-sm font-medium">
                Experience
              </Link>
              <Link href="/projects" className="block text-secondary/80 hover:text-accent transition-colors text-sm font-medium">
                Projects
              </Link>
              <Link href="/gallery" className="block text-secondary/80 hover:text-accent transition-colors text-sm font-medium">
                Gallery
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-sans text-sm font-bold mb-4 md:mb-6 text-secondary tracking-wide">Connect</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/message/GJIXLHQQPYDIE1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary/80 hover:text-accent transition-colors text-sm font-medium"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/nestoranyanwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-accent/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-secondary hover:text-accent" />
                </a>
                <a
                  href="https://twitter.com/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-accent/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} className="text-secondary hover:text-accent" />
                </a>
                <a
                  href="https://github.com/nestorcyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-accent/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} className="text-secondary hover:text-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/20 pt-6 md:pt-8 text-center">
          <p className="text-secondary/60 text-xs md:text-sm">
            © {new Date().getFullYear()} Nestor Anyanwu. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}
