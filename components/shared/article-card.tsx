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
  variant?: "vertical" | "horizontal"
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
  variant = "vertical",
}: ArticleCardProps) {
  const { day, monthYear } = parseDateBadge(date)

  if (variant === "horizontal") {
    return (
      <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-row justify-between h-[162px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
        <Link href={slug} className="flex flex-row w-full h-full" aria-label={`Read article: ${title}`}>
          {/* Left Cover Image Container */}
          <div className="relative w-[38%] h-full overflow-hidden bg-[#dcdcdc] dark:bg-slate-800 shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-[#dcdcdc] dark:bg-slate-800 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}

            {/* Overlaid Date Badge */}
            <div className="absolute top-2 left-2 z-10 flex flex-col shadow-sm overflow-hidden rounded-xl">
              <div className="bg-[#0075ff] px-2 py-0.5 min-w-[36px] text-center flex items-center justify-center">
                <span className="text-sm font-black text-white leading-none tracking-tight font-mono">
                  {day}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-100 px-1 py-0.5 min-w-[36px] text-center border-t border-blue-400/20">
                <span className="text-[7.5px] font-bold text-slate-800 tracking-wider uppercase leading-tight block font-mono">
                  {monthYear}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-[62%] p-3.5 flex flex-col justify-between h-full space-y-1">
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2">
                {title}
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                {summary}
              </p>
            </div>

            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white bg-[#0075ff] hover:bg-blue-600 px-2.5 py-1 rounded-xl transition-colors shadow-2xs">
              <span>View Post</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full" aria-label={`Read article: ${title}`}>
        <div>
          {/* Card Top Cover Image / Placeholder Container */}
          <div className="relative w-full h-[340px] overflow-hidden bg-[#dcdcdc] dark:bg-slate-800">
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
            <div className="absolute top-3 left-3 z-10 flex flex-col shadow-sm overflow-hidden rounded-xl">
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
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-3">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
              {summary}
            </p>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 pb-6 pt-2">
          <div className="w-full py-3 px-4 rounded-xl bg-[#0075ff] text-white hover:bg-blue-600 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg">
            <span>View Post</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  )
}
