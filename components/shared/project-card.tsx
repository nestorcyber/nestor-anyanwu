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
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer">
      <CardWrapper {...(wrapperProps as any)} className="flex flex-col justify-between h-full w-full">
        <div>
          {/* IMAGE 1 STYLE: Top Pill Tags & Category Notch Header Bar */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0075ff] px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50">
              {category}
            </span>

            {/* Top Right Pill Tags (Image 1 Style: Branding, Website, Marketing) */}
            <div className="flex items-center gap-1.5 overflow-hidden">
              {technologies.slice(0, 2).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Center Image Showcase Container */}
          <div className="relative w-full h-[260px] sm:h-[290px] overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2">
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
          </div>
        </div>

        {/* IMAGE 2 STYLE: Bottom Overlay Action Bar with Title, Subtitle, and Square Arrow Action Button */}
        <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 transition-all duration-300">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-[#0075ff] transition-colors font-heading truncate">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate uppercase font-mono tracking-wider">
              {category} • {year}
            </p>
          </div>

          {/* Image 2 Right Square Action Button with Arrow */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-950 dark:bg-slate-800 group-hover:bg-[#0075ff] text-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:scale-105">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}
