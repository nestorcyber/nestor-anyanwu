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

  // CSS Polygon Clip Path for Top-Right Folder Notch Geometry
  const folderClipPath =
    "polygon(0 0, calc(100% - 135px) 0, calc(100% - 105px) 32px, 100% 32px, 100% 100%, 0 100%)"

  return (
    <div className="group relative w-full flex flex-col h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
      <CardWrapper {...(wrapperProps as any)} className="flex flex-col justify-between h-full w-full">
        
        {/* TOP-RIGHT FOLDER NOTCH PILL TAGS CONTAINER */}
        <div className="relative w-full">
          
          {/* Card Border & Background Outer Shell (with Folder Clip Path) */}
          <div
            className="relative w-full bg-slate-200 dark:bg-slate-800 p-[1px] rounded-2xl transition-colors duration-300 group-hover:bg-[#0075ff]"
            style={{ clipPath: folderClipPath }}
          >
            {/* Inner Content Box (clipped to folder shape) */}
            <div
              className="w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between"
              style={{ clipPath: folderClipPath }}
            >
              {/* TOP HEADER: Category on Left High Shoulder & Tech Pills on Right Shelf */}
              <div className="px-5 pt-3.5 pb-2 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-900/70 border-b border-slate-100 dark:border-slate-800/80">
                
                {/* Left Category Badge */}
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0075ff] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60">
                  {category}
                </span>

                {/* Right Folder Shelf Pill Tags (Image 1 Reference Style: Branding, Website, Marketing) */}
                <div className="flex items-center gap-1.5 pt-0.5">
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

              {/* CENTER IMAGE SHOWCASE (Clipped to Folder Silhouette) */}
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
              </div>

              {/* BOTTOM OVERLAY ACTION BAR (Image 2 Overlay Style) */}
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
