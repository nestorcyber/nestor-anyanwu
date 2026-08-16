import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Send } from "lucide-react"
import type { SiteSettings, PortfolioStat } from "@/lib/content"

export default function PortfolioHero({
  settings,
  stats,
}: {
  settings?: SiteSettings
  stats?: PortfolioStat[]
}) {
  const bio = "Tech Advocate, AI Enthusiast, Ingenious Designer, Virtual Assistant and IT Consultant. Crafting quality designs that align with brand goals and deliver exceptional user experience. Your story begins here."
  const author = settings?.authorName || "Nestor Anyanwu"

  return (
    <section className="w-full bg-background border-b border-border/70 relative">
      
      {/* Standard Sub Page Hero Cover Photo Banner */}
      <div className="h-36 sm:h-48 lg:h-56 w-full relative bg-slate-950 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg"
          alt={`${author} Cover Banner`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-6 relative space-y-5">
        
        {/* Title & Action Buttons on Same Line on Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-snug font-heading">
            {author}
          </h1>

          {/* Action Buttons: side-by-side on mobile & desktop */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-3 shrink-0">
            <Link href="/contact" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Send size={16} />
                <span>Contact</span>
              </button>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-secondary/80 hover:bg-secondary border border-border/80 text-foreground font-semibold text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={16} />
              <span>View resume</span>
            </a>
          </div>
        </div>

        {/* Tagline under Name */}
        <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-3xl">
          {bio}
        </p>

        {/* Top Follower-Count / Impact Metric Badges directly under hero bio */}
        {stats && stats.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-border/60">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="text-lg sm:text-2xl font-black text-foreground font-heading tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
