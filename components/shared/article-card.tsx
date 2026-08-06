import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"

export interface ArticleCardProps {
  title: string
  category?: string
  readTime?: string
  date: string
  summary: string
  slug?: string
  image?: string
}

export default function ArticleCard({
  title,
  date,
  summary,
  slug = "/journal",
  image,
}: ArticleCardProps) {
  return (
    <article className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg overflow-hidden flex flex-col justify-between h-full transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent hover:-translate-y-1 cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          {/* Card Top Cover Image */}
          <div className="relative w-full h-[200px] overflow-hidden bg-slate-900 border-b-2 border-slate-900/20 dark:border-slate-800">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white/60" />
              </div>
            )}
          </div>

          <div className="p-5 space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">
              {date}
            </span>

            <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors font-heading line-clamp-2">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 pt-0.5">
              {summary}
            </p>
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-foreground group-hover:text-accent uppercase tracking-wider transition-colors">
          <span>Read Article</span>
          <div className="w-7 h-7 rounded-md border border-slate-900/20 dark:border-slate-800 bg-background flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-all">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </article>
  )
}
