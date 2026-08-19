import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Send, Users, FolderKanban, Building2, Sparkles } from "lucide-react"
import type { SiteSettings, PortfolioStat } from "@/lib/content"

function getStatIcon(label: string) {
  const l = label.toLowerCase()
  if (l.includes("people") || l.includes("reach") || l.includes("follower") || l.includes("user")) return Users
  if (l.includes("project") || l.includes("post") || l.includes("code")) return FolderKanban
  if (l.includes("org") || l.includes("community") || l.includes("partner") || l.includes("like")) return Building2
  return Sparkles
}

export default function PortfolioHero({
  settings,
  stats,
}: {
  settings?: SiteSettings
  stats?: PortfolioStat[]
}) {
  const bio = "Tech Advocate • Leadership • Ingenious Designer • AI Enthusiast • IT Consulting • Software Engineering • Community Building • Volunteering • Developer Relations • Product Management — dedicated to creating an impact and an inclusive and collaborative tech ecosystem where everyone and anyone can thrive."
  const author = settings?.authorName || "Nestor Anyanwu"

  return (
    <section className="w-full bg-background border-b border-border/70 relative">
      
      {/* Cover Photo Banner */}
      <div className="h-36 sm:h-48 lg:h-56 w-full relative bg-slate-950 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
          alt={`${author} Cover Banner`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container-webflow pb-8 pt-6 relative space-y-6">
        
        {/* Title & Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-snug font-heading">
            {author}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/contact" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Contact</span>
              </button>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-secondary/80 hover:bg-secondary border border-border/80 text-foreground font-semibold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>View resume</span>
            </a>
          </div>
        </div>

        {/* Desktop Row: Tagline on Left, Stats Card on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-t border-border/50 pt-5">
          
          {/* Tagline */}
          <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
            {bio}
          </p>

          {/* Stats Card inspired by minimalist icon-on-top layout */}
          {stats && stats.length > 0 && (
            <div className="w-full lg:w-auto shrink-0 bg-card border border-border/80 rounded-xl p-3.5 sm:p-5 shadow-2xs overflow-hidden">
              <div className="flex items-center justify-around sm:justify-between divide-x divide-border/60">
                {stats.map((stat, idx) => {
                  const Icon = getStatIcon(stat.label)
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center text-center flex-1 space-y-1 min-w-0 ${
                        idx === 0 ? "pr-2.5 sm:pr-6" : idx === stats.length - 1 ? "pl-2.5 sm:pl-6" : "px-2.5 sm:px-6"
                      }`}
                    >
                      {/* Icon */}
                      <div className="text-muted-foreground/80 mb-0.5">
                        <Icon size={18} strokeWidth={1.8} className="sm:w-5 sm:h-5" />
                      </div>
                      
                      {/* Count / Number */}
                      <span className="text-base sm:text-xl font-extrabold text-foreground tracking-tight font-heading truncate max-w-full">
                        {stat.value}
                      </span>
                      
                      {/* Label */}
                      <span className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight text-center max-w-[90px] sm:max-w-none">
                        {stat.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}

