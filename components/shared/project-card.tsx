import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"

export interface ProjectCardProps {
  title: string
  category: string
  description: string
  technologies?: string[]
  link?: string
  image?: string
  role?: string
  date?: string
}

function parseYear(dateStr?: string): string {
  if (!dateStr) return "2026"
  try {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) return d.getFullYear().toString()
  } catch {}
  return "2026"
}

export default function ProjectCard({
  title,
  category,
  description,
  technologies = [],
  link,
  image,
  role,
  date,
}: ProjectCardProps) {
  const year = parseYear(date)
  const CardWrapper = link ? Link : "div"
  const wrapperProps = link ? { href: link } : {}

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#0075ff]/80 cursor-pointer">
      <CardWrapper {...(wrapperProps as any)} className="flex flex-col justify-between h-full w-full">
        
        <div>
          {/* Project Cover Image (Edge-to-edge flush top with object-cover, matching ArticleCard) */}
          <div className="relative w-full h-[260px] sm:h-[290px] overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}
          </div>

          {/* Title & Short Description */}
          <div className="p-6 space-y-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors font-heading line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Standard Full-Width Action Button with ArrowUpRight Icon */}
        <div className="px-6 pb-6 pt-2">
          <div className="w-full py-3.5 px-5 rounded-xl bg-[#0075ff] text-white group-hover:bg-blue-600 font-extrabold text-xs tracking-wider flex items-center justify-between transition-all duration-300 shadow-md group-hover:shadow-lg">
            <span>View Project</span>
            <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
          </div>
        </div>

      </CardWrapper>
    </article>
  )
}
