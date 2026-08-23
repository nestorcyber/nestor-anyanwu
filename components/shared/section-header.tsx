import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  align?: "left" | "center"
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  ctaText,
  ctaHref,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 border-b border-border/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 ${
        align === "center" ? "text-center md:text-center items-center mx-auto" : ""
      }`}
    >
      <div className={`space-y-3 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-16 bg-accent mt-3 ${align === "center" ? "mx-auto" : ""}`} />
      </div>

      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-foreground hover:text-accent border-b border-foreground/40 hover:border-accent pb-1 transition-all shrink-0 cursor-pointer"
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  )
}
