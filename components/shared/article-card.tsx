import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export interface ArticleCardProps {
  title: string
  category: string
  readTime: string
  date: string
  summary: string
  slug?: string
}

export default function ArticleCard({
  title,
  category,
  readTime,
  date,
  summary,
  slug = "/journal",
}: ArticleCardProps) {
  return (
    <article className="p-8 md:p-10 bg-card/60 hover:bg-card/90 grid-cell-card flex flex-col justify-between group transition-all duration-300 relative border-b md:border-b-0 border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {date} // {readTime}
          </span>
          <span className="text-xs font-mono text-muted-foreground/80 tracking-wide">
            {category}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="pt-8 mt-6">
        <Link
          href={slug}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent/80 uppercase tracking-widest transition-colors font-bold"
        >
          <span>READ ARTICLE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}
