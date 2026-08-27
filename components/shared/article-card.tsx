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

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
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
  const formattedDate = formatDate(date)
  const displayTags = tags && tags.length > 0 ? tags : [category]

  return (
    <article className="group max-w-[480px] sm:max-w-none w-full mx-auto bg-transparent flex flex-col justify-between h-full cursor-pointer">
      <Link href={slug} className="flex flex-col justify-between h-full w-full" aria-label={`Read full article: ${title}`}>
        <div className="space-y-3.5">
          {/* Card Top Cover Image Showcase (Straight Sharp Edges) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-none overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 shadow-xs flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}
          </div>

          {/* Content Area (Clean Blog Post Format) */}
          <div className="space-y-2.5">
            {/* Tags & Date line: Tags on Left, Date on Right */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              {/* Left: Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {displayTags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0055cc] dark:text-sky-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Right: Published Date */}
              {formattedDate && (
                <time
                  dateTime={date}
                  className="text-[11px] sm:text-xs font-mono font-medium text-slate-500 dark:text-slate-400 shrink-0"
                >
                  {formattedDate}
                </time>
              )}
            </div>

            {/* Title & Upright Arrow Button */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2 flex-1">
                {title}
              </h3>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-white dark:bg-white dark:text-slate-900 group-hover:bg-[#0075ff] group-hover:border-[#0075ff] group-hover:text-white dark:group-hover:bg-[#0075ff] dark:group-hover:border-[#0075ff] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-md group-hover:scale-105 mt-0.5">
                <ArrowUpRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Excerpt Summary */}
            {summary && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                {summary}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
