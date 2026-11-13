import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"

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

export default function ArticleCard({
  title,
  category = "JOURNAL",
  summary,
  slug = "/journal",
  image,
  tags = [],
}: ArticleCardProps) {
  const categoryLabel = category || (tags && tags.length > 0 ? tags[0] : "JOURNAL")

  return (
    <article className="group relative max-w-[480px] sm:max-w-none w-full mx-auto bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl elevated-card-shadow hover:border-[#0056D2]/60 dark:hover:border-[#0056D2] hover:scale-[1.025] hover:z-10 transform-gpu transition-all duration-300 ease-out flex flex-col h-full cursor-pointer overflow-hidden">
      <Link href={slug} className="flex flex-col h-full w-full" aria-label={`Read full article: ${title}`}>
        {/* Card Top Cover Image Showcase */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-background shrink-0 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 dark:bg-background flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-slate-400/70 dark:text-muted-foreground/60" />
            </div>
          )}
        </div>

        {/* Lower Card Body: Category Label + Headline + Subtle Excerpt */}
        <div className="flex-1 px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-2">
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.06em] text-slate-500 dark:text-muted-foreground leading-none">
            {categoryLabel}
          </span>

          <h3 className="text-[15px] sm:text-base font-medium text-slate-900 dark:text-foreground tracking-[-0.01em] leading-[1.4] group-hover:text-[#0056D2] dark:group-hover:text-[#0056D2] transition-colors font-heading">
            {title}
          </h3>

          {summary && (
            <p className="text-[13px] sm:text-[13.5px] text-slate-600 dark:text-muted-foreground font-normal leading-relaxed line-clamp-2 pt-0.5">
              {summary}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
