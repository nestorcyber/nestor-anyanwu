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
          {/* Card Top Header: Category Pill on Left & Tech Pills on Right */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0075ff] px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60">
              {category}
            </span>

            <div className="flex items-center gap-1.5 overflow-hidden">
              {technologies.slice(0, 2).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[9.5px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Cover Image Showcase (Padded & Wrapped to Preserve Aspect Ratio Perfectly) */}
          <div className="relative w-full h-[250px] sm:h-[290px] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
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
          <div className="p-5 space-y-2">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-[#0075ff] transition-colors font-heading truncate">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase font-mono tracking-wider">
              {category} • {year}
            </p>
          </div>
        </div>

        {/* Action Bar with ArrowUpRight Button */}
        <div className="px-5 pb-5 pt-1">
          <div className="w-full py-3 px-4 rounded-xl bg-[#0075ff] text-white hover:bg-blue-600 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 shadow-md group-hover:shadow-lg">
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </CardWrapper>
    </article>
  )
}
