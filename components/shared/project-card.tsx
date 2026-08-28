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
  variant?: "default" | "folder-tab"
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
  variant = "folder-tab",
}: ProjectCardProps) {
  const year = parseYear(date)
  const CardWrapper = link ? Link : "div"
  const wrapperProps = link ? { href: link } : {}
  const isFolderTab = variant === "folder-tab"

  return (
    <div className="group relative flex flex-col h-full transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer">
      {/* SVG ClipPath Definition for Folder-Tab silhouette */}
      {isFolderTab && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="folder-tab-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.093 C 0,0.072 0.022,0.055 0.05,0.055 L 0.55,0.055 C 0.62,0.055 0.62,0 0.69,0 L 0.95,0 C 0.978,0 1,0.017 1,0.038 L 1,0.962 C 1,0.983 0.978,1 0.95,1 L 0.05,1 C 0.022,1 0,0.983 0,0.962 Z" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Outer Card Shell with clip-path or standard rounded-2xl */}
      <article
        style={isFolderTab ? { clipPath: "url(#folder-tab-clip)" } : undefined}
        className={`relative flex flex-col justify-between h-full w-full bg-white dark:bg-slate-900 transition-all duration-300 ${
          isFolderTab
            ? "shadow-sm group-hover:shadow-2xl"
            : "border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#0075ff]/80"
        }`}
      >
        {/* Crisp vector border for folder-tab silhouette */}
        {isFolderTab && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M 0,9.3 C 0,7.2 2.2,5.5 5,5.5 L 55,5.5 C 62,5.5 62,0 69,0 L 95,0 C 97.8,0 100,1.7 100,3.8 L 100,96.2 C 100,98.3 97.8,100 95,100 L 5,100 C 2.2,100 0,98.3 0,96.2 Z"
              fill="none"
              vectorEffect="non-scaling-stroke"
              className="stroke-slate-200 dark:stroke-slate-800 group-hover:stroke-[#0075ff] transition-colors duration-300 stroke-[1.5]"
            />
          </svg>
        )}

        <CardWrapper {...(wrapperProps as any)} aria-label={`View project details for ${title}`} className="flex flex-col justify-between h-full w-full">
          <div>
            {/* Project Cover Image (Edge-to-edge flush top with object-cover) */}
            <div className="relative w-full h-[260px] sm:h-[290px] overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-500"
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
            <div className="w-full h-11 sm:h-12 px-5 rounded-xl bg-[#005fe6] text-white group-hover:bg-[#0052cc] font-extrabold text-xs tracking-wider flex items-center justify-between transition-all duration-300 shadow-md group-hover:shadow-lg">
              <span>View Project</span>
              <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
            </div>
          </div>

        </CardWrapper>
      </article>
    </div>
  )
}
