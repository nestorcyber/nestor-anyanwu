import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"

export interface FolderTheme {
  bg: string
  text: string
  arrowBorder: string
}

// Distinct office-folder color palette matching FeaturedProjectsShowcase
export const FOLDER_THEMES: FolderTheme[] = [
  {
    bg: "#16191D",
    text: "#FFFFFF",
    arrowBorder: "rgba(255, 255, 255, 0.45)",
  },
  {
    bg: "#D25537",
    text: "#FFFFFF",
    arrowBorder: "rgba(255, 255, 255, 0.55)",
  },
  {
    bg: "#0056D2",
    text: "#FFFFFF",
    arrowBorder: "rgba(255, 255, 255, 0.55)",
  },
  {
    bg: "#C4A986",
    text: "#14181F",
    arrowBorder: "rgba(20, 24, 31, 0.35)",
  },
  {
    bg: "#0F766E",
    text: "#FFFFFF",
    arrowBorder: "rgba(255, 255, 255, 0.55)",
  },
  {
    bg: "#4F46E5",
    text: "#FFFFFF",
    arrowBorder: "rgba(255, 255, 255, 0.55)",
  },
]

export function formatCategoryLabel(category?: string): string {
  if (!category) return "Project"
  switch (category.trim().toLowerCase()) {
    case "web":
      return "Web Development"
    case "software":
      return "Software Development"
    default:
      return category
  }
}

export function FolderTabSlope({
  side,
  color,
  height = 40,
}: {
  side: "left" | "right"
  color: string
  height?: number
}) {
  const width = Math.round((height / 40) * 28)
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 40"
      className="shrink-0 block"
      aria-hidden="true"
    >
      {side === "left" ? (
        <path d="M 0,40 C 12,40 16,0 28,0 L 28,40 Z" fill={color} />
      ) : (
        <path d="M 0,0 C 12,0 16,40 28,40 L 0,40 Z" fill={color} />
      )}
    </svg>
  )
}

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
  index?: number
}

export default function ProjectCard({
  title,
  category,
  link,
  image,
  index = 0,
}: ProjectCardProps) {
  const theme = FOLDER_THEMES[index % FOLDER_THEMES.length]
  const categoryLabel = formatCategoryLabel(category)

  const CardWrapper = link ? Link : "div"
  const wrapperProps = link
    ? { href: link, "aria-label": `View project details for ${title}` }
    : { "aria-label": title }

  return (
    <CardWrapper
      {...(wrapperProps as any)}
      className="group relative flex flex-col h-full cursor-pointer transform-gpu transition-all duration-300 ease-out hover:scale-[1.025] hover:z-10 focus-visible:outline-none"
    >
      {/* Top Row: Left-Aligned Office-Folder Category Tab */}
      <div className="relative h-[34px] w-full shrink-0">
        <div className="absolute left-0 -bottom-px h-[34px] flex items-end w-fit min-w-[44%] max-w-[78%]">
          <div
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
            }}
            className="relative flex-1 h-[34px] px-3 sm:px-4 rounded-tl-2xl flex items-center justify-center transition-opacity duration-200 group-hover:opacity-95"
          >
            <span className="font-heading text-xs font-bold tracking-tight truncate">
              {categoryLabel}
            </span>
          </div>

          <FolderTabSlope side="right" color={theme.bg} height={34} />
        </div>
      </div>

      {/* Folder Body: Title + Arrow Button Header, Followed by Framed 16:9 Project Image */}
      <article
        style={{ backgroundColor: theme.bg }}
        className="relative flex-1 flex flex-col justify-between rounded-2xl rounded-tl-none overflow-hidden"
      >
        <div
          style={{ color: theme.text }}
          className="px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 shrink-0"
        >
          <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-heading truncate min-w-0">
            {title}
          </h3>

          <span
            aria-hidden="true"
            style={{ borderColor: theme.arrowBorder }}
            className="w-8 h-8 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15 shrink-0"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="px-2.5 pb-2.5 sm:px-3 sm:pb-3">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <Sparkles className="w-8 h-8 text-slate-500" />
              </div>
            )}
          </div>
        </div>
      </article>
    </CardWrapper>
  )
}
