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
          {/* Project Cover Image Showcase (Padded & Wrapped to Preserve Aspect Ratio) */}
          <div className="relative w-full h-[250px] sm:h-[290px] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden border-b border-slate-100 dark:border-slate-800/60">
            {image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-slate-400/60 dark:text-slate-600" />
              </div>
            )}
          </div>

          {/* Title & Short Description */}
          <div className="p-6 space-y-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-[#0075ff] transition-colors font-heading truncate">
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Action Bar: Metadata on Left & Square ArrowUpRight Button on Right */}
        <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase font-mono tracking-wider">
            {category} • {year}
          </p>

          {/* Right Square Arrow Action Button (Matching Reference Image) */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-950 dark:bg-slate-800 group-hover:bg-[#0075ff] text-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:scale-105">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </CardWrapper>
    </article>
  )
}
