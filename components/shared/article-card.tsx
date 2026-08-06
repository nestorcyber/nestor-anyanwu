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
    <article className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg p-6 flex flex-col justify-between h-full transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent hover:-translate-y-1 cursor-pointer">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded border border-accent/40 bg-accent/10">
            {category}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {date}
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors font-heading">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
          {summary}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
        <Link
          href={slug}
          className="w-full flex items-center justify-between text-xs font-bold text-foreground group-hover:text-accent uppercase tracking-wider transition-colors"
        >
          <span>Read Article</span>
          <div className="w-7 h-7 rounded-md border border-slate-900/20 dark:border-slate-800 bg-background flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-all">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </article>
  )
}
