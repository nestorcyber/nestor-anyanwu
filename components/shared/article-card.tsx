import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

export interface ArticleCardProps {
  title: string
  category?: string
  readTime?: string
  date?: string
  summary: string
  slug?: string
  image?: string
}

function parseDateBadge(dateStr?: string) {
  if (!dateStr) {
    return { day: "19", monthYear: "JUN, 2026" }
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) {
    return { day: "19", monthYear: "JUN, 2026" }
  }
  const day = d.getDate().toString()
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const year = d.getFullYear()
  return { day, monthYear: `${month}, ${year}` }
}

export default function ArticleCard({
  title,
  date,
  summary,
  slug = "/journal",
  image,
}: ArticleCardProps) {
  const { day, monthYear } = parseDateBadge(date)

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full" aria-label={`Read article: ${title}`}>
        <div>
          {/* Card Top Cover Image / Placeholder Container */}
          <div className="relative w-full h-[220px] overflow-hidden bg-[#dcdcdc] dark:bg-slate-800">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-[#dcdcdc] dark:bg-slate-800 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}

            {/* Overlaid Date Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col shadow-md overflow-hidden rounded-none">
              <div className="bg-[#0070f3] dark:bg-sky-600 px-3.5 py-1.5 min-w-[56px] text-center flex items-center justify-center">
                <span className="text-2xl font-extrabold text-white leading-none tracking-tight font-mono">
                  {day}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-100 px-2 py-1 min-w-[56px] text-center border-t border-blue-400/20">
                <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase leading-tight block font-mono">
                  {monthYear}
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0070f3] dark:group-hover:text-sky-400 transition-colors font-heading line-clamp-3">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
              {summary}
            </p>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 pb-6 pt-2">
          <div className="w-full py-3 px-4 bg-[#f1f5f9] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-between group-hover:bg-[#0070f3] group-hover:text-white transition-colors duration-300">
            <span>View Post</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  )
}
