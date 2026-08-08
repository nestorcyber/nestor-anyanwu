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
    <article className="group border-2 border-slate-900/30 dark:border-slate-800 bg-card rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0284c7] cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full p-5 space-y-4" aria-label={`Read article: ${title}`}>
        <div className="space-y-4">
          {/* Card Top Cover Image */}
          <div className="relative w-full h-[200px] overflow-hidden bg-slate-900 rounded-xl border-2 border-slate-900/20 dark:border-slate-800">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white/60" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase block">
              {date}
            </span>

            <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-[#0284c7] transition-colors font-heading line-clamp-2">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 pt-0.5">
              {summary}
            </p>
          </div>
        </div>

        {/* Xbox UI Style Button */}
        <div className="w-full py-2.5 px-4 rounded-xl border-2 border-slate-900 dark:border-slate-800 bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,0.9)] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all">
          <span>Read Article</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Link>
    </article>
  )
}
