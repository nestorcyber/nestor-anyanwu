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
  const { day, monthYear, year } = parseDateBadge(date)

  // CSS Polygon Clip Path for Top-Right Folder Notch Geometry
  const folderClipPath =
    "polygon(0 0, calc(100% - 135px) 0, calc(100% - 105px) 32px, 100% 32px, 100% 100%, 0 100%)"

  return (
    <article className="group relative w-full flex flex-col h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
      <Link href={slug} className="flex flex-col justify-between h-full w-full" aria-label={`Read article: ${title}`}>
        
        {/* TOP-RIGHT FOLDER NOTCH OUTER CONTAINER */}
        <div className="relative w-full h-full flex flex-col justify-between">
          
          {/* Card Border Outer Shell (with Folder Clip Path) */}
          <div
            className="relative w-full h-full bg-slate-200 dark:bg-slate-800 p-[1px] rounded-2xl transition-colors duration-300 group-hover:bg-[#0075ff]"
            style={{ clipPath: folderClipPath }}
          >
            {/* Inner Content Box (clipped to folder shape) */}
            <div
              className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between"
              style={{ clipPath: folderClipPath }}
            >
              <div>
                {/* TOP HEADER: Category on Left & Tech/Topic Pills on Right Shelf */}
                <div className="px-5 pt-3.5 pb-2 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-900/70 border-b border-slate-100 dark:border-slate-800/80">
                  
                  {/* Left Category Badge */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0075ff] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60">
                    {category}
                  </span>

                  {/* Right Folder Shelf Pill Tags */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {(tags.length > 0 ? tags : [category]).slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CENTER IMAGE SHOWCASE WITH PRESERVED OVERLAID DATE BADGE */}
                <div className="relative w-full h-[240px] sm:h-[270px] bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2 overflow-hidden">
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

                  {/* PRESERVED OVERLAID DATE BADGE */}
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
                </div>

                {/* EXCEPT & TITLE CONTENT AREA */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2 leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                    {summary}
                  </p>
                </div>
              </div>

              {/* BOTTOM OVERLAY ACTION BAR WITH SQUARE ARROW BUTTON */}
              <div className="px-5 pb-5 pt-1 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase font-mono tracking-wider">
                  {category} • {year}
                </p>

                {/* Right Square Arrow Action Button */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-950 dark:bg-slate-800 group-hover:bg-[#0075ff] text-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:scale-105">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </Link>
    </article>
  )
}
