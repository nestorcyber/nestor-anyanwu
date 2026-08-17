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

  // Subtle, tight, elegant folder notch angle (short 18px span transition, 22px drop)
  const folderClipPath =
    "polygon(0 0, calc(100% - 120px) 0, calc(100% - 100px) 22px, 100% 22px, 100% 100%, 0 100%)"

  return (
    <div className="group relative w-full flex flex-col h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
      <CardWrapper {...(wrapperProps as any)} className="flex flex-col justify-between h-full w-full">
        
        <div className="relative w-full h-full flex flex-col justify-between">
          
          {/* Card Outer Shell Border (Clipped to subtle folder shape) */}
          <div
            className="relative w-full h-full bg-slate-200 dark:bg-slate-800 p-[1px] rounded-2xl transition-colors duration-300 group-hover:bg-[#0075ff]"
            style={{ clipPath: folderClipPath }}
          >
            {/* Inner Content Card (clipped to folder shape) */}
            <div
              className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between"
              style={{ clipPath: folderClipPath }}
            >
              <div>
                {/* TOP HEADER: Tech Pills on Left High Shoulder & Category Badge on Top-Right Shelf */}
                <div className="px-4 pt-2.5 pb-2 flex items-center justify-between gap-2 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800/80">
                  
                  {/* Left High Shoulder: Secondary Tech Pills */}
                  <div className="flex items-center gap-1.5 overflow-hidden max-w-[60%]">
                    {technologies.slice(0, 2).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 truncate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Top-Right Shelf: Main Category Badge (DESIGN / WEB / SOFTWARE) */}
                  <span className="text-[9.5px] font-mono font-extrabold uppercase tracking-wider text-[#0075ff] px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/70 shadow-2xs">
                    {category}
                  </span>
                </div>

                {/* COVER IMAGE SHOWCASE (Fills upper part of card) */}
                <div className="relative w-full h-[250px] sm:h-[280px] bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
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

              {/* BOTTOM ACTION BAR: Title, Metadata & Right Square Action Button */}
              <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 transition-all duration-300">
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-[#0075ff] transition-colors font-heading truncate">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate uppercase font-mono tracking-wider">
                    {category} • {year}
                  </p>
                </div>

                {/* Right Square Arrow Action Button */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-950 dark:bg-slate-800 group-hover:bg-[#0075ff] text-white rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:scale-105">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </CardWrapper>
    </div>
  )
}
