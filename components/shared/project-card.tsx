import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

export interface ProjectCardProps {
  title: string
  category: string
  description: string
  technologies: string[]
  link?: string
  image?: string
  role?: string
  date?: string
}

function parseDateBadge(dateStr?: string) {
  if (!dateStr) {
    return { day: "12", monthYear: "MAY, 2026" }
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) {
    return { day: "12", monthYear: "MAY, 2026" }
  }
  const day = d.getDate().toString()
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const year = d.getFullYear()
  return { day, monthYear: `${month}, ${year}` }
}

export default function ProjectCard({
  title,
  category,
  description,
  technologies,
  link,
  image,
  role,
  date,
}: ProjectCardProps) {
  const { day, monthYear } = parseDateBadge(date)

  const CardWrapper = link ? Link : "div"
  const wrapperProps = link ? { href: link, ariaLabel: `Explore ${title} project` } : {}

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <CardWrapper {...(wrapperProps as any)} className="flex flex-col justify-between h-full">
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
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0075ff] px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40">
                {category}
              </span>
              {role && (
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {role}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#0075ff] dark:group-hover:text-sky-400 transition-colors font-heading line-clamp-2">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-2">
              {description}
            </p>

            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 pb-6 pt-2">
          <div className="w-full py-3 px-4 rounded-xl bg-[#f1f5f9] dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-between group-hover:bg-[#0075ff] group-hover:text-white transition-colors duration-300 shadow-2xs">
            <span>{link ? "Explore Project" : "In Production"}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}
