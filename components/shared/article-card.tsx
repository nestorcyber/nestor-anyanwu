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
    return { day: "19", month: "JUN", year: "2026" }
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) {
    return { day: "19", month: "JUN", year: "2026" }
  }
  const day = d.getDate().toString()
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const year = d.getFullYear().toString()
  return { day, month, year }
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
  const { day, month, year } = parseDateBadge(date)

  return (
    <article className="group max-w-[480px] sm:max-w-none w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#0075ff]/80 cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full w-full" aria-label={`Read full article: ${title}`}>
        
        <div>
          {/* Card Top Cover Image Showcase (4:3 Aspect Ratio) */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}

            {/* Overlaid Date Badge (Day, Month & Year) */}
            <div className="absolute top-3 left-3 z-10 flex flex-col shadow-md overflow-hidden rounded-xl w-10 text-center">
              <div className="bg-[#0075ff] py-1 text-center flex items-center justify-center">
                <span className="text-base sm:text-lg font-black text-white leading-none tracking-tight font-mono">
                  {day}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-100 py-1 text-center border-t border-blue-400/20 flex flex-col items-center justify-center gap-0.5">
                <span className="text-[8.5px] font-extrabold text-slate-900 tracking-wider uppercase leading-none block font-mono">
                  {month}
                </span>
                <span className="text-[7.5px] font-bold text-slate-500 tracking-tight leading-none block font-mono">
                  {year}
                </span>
              </div>
            </div>
          </div>

          {/* Content Area: Category + Title & Rounded Square Arrow Button + Excerpt */}
          <div className="p-5 sm:p-6 space-y-3">
            {/* Category tag */}
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
              {category}
            </p>

            {/* Title & Rounded Square Upright Action Button */}
            <div className="flex items-start justify-between gap-3.5">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2 flex-1">
                {title}
              </h3>

              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 group-hover:bg-[#005fe6] dark:group-hover:bg-[#0075ff] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105 mt-0.5">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {summary && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2 pt-0.5">
                {summary}
              </p>
            )}
          </div>
        </div>

      </Link>
    </article>
  )
}
