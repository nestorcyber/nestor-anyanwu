import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"

export interface ArticleCardProps {
  title: string
  category?: string
  readTime?: string
  date?: string
  summary: string
  slug?: string
  image?: string
  variant?: "vertical" | "horizontal"
  tags?: string[]
}

function parseDateBadge(dateStr?: string) {
  if (!dateStr) {
    return { day: "19", monthYear: "JUN, 2026", year: "2026" }
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) {
    return { day: "19", monthYear: "JUN, 2026", year: "2026" }
  }
  const day = d.getDate().toString()
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const year = d.getFullYear().toString()
  return { day, monthYear: `${month}, ${year}`, year }
}

export default function ArticleCard({
  title,
  category = "JOURNAL",
  date,
  summary,
  slug = "/journal",
  image,
  tags = [],
}: ArticleCardProps) {
  const { day, monthYear } = parseDateBadge(date)

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#0075ff]/80 cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full w-full" aria-label={`Read article: ${title}`}>
        
        <div>
          {/* Card Top Cover Image Showcase with Overlaid Date Badge */}
          <div className="relative w-full h-[260px] sm:h-[290px] overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}

            {/* Overlaid Date Badge */}
            <div className="absolute top-3 left-3 z-10 flex flex-col shadow-md overflow-hidden rounded-xl">
              <div className="bg-[#0075ff] px-2.5 py-1 min-w-[44px] text-center flex items-center justify-center">
                <span className="text-lg font-black text-white leading-none tracking-tight font-mono">
                  {day}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-100 px-1.5 py-0.5 min-w-[44px] text-center border-t border-blue-400/20">
                <span className="text-[8.5px] font-bold text-slate-800 tracking-wider uppercase leading-tight block font-mono">
                  {monthYear}
                </span>
              </div>
            </div>

            {/* Category Tag Overlay on Image */}
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/20">
                {category}
              </span>
            </div>
          </div>

          {/* Content Area: Title & Summary Excerpt */}
          <div className="p-6 space-y-3">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
              {summary}
            </p>
          </div>
        </div>

        {/* Standard Full-Width Action Button with ArrowUpRight Icon */}
        <div className="px-6 pb-6 pt-2">
          <div className="w-full py-3 px-4 rounded-xl bg-[#0075ff] text-white hover:bg-blue-600 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 shadow-md group-hover:shadow-lg">
            <span>Read Article</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </Link>
    </article>
  )
}
