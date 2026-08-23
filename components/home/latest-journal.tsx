import React from "react"
import Link from "next/link"
import ArticleCard from "@/components/shared/article-card"
import { getJournalArticles } from "@/lib/content"
import { ArrowRight } from "lucide-react"

export default async function LatestJournal() {
  const articles = await getJournalArticles()
  
  // Surface top 3 items (pinned/featured prioritized, then reverse chronological)
  const pinned = articles.filter((a) => a.pinned || a.featured)
  const regular = articles.filter((a) => !a.pinned && !a.featured)
  const displayArticles = [...pinned, ...regular].slice(0, 3)

  return (
    <section
      id="journal"
      className="w-full py-12 md:py-16 border-b border-border/70 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-background dark:from-slate-950 dark:via-blue-950/20 dark:to-background relative overflow-hidden font-sans"
    >
      {/* Soft Background Mesh Light Glow for Light and Dark Modes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-200/30 dark:bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0055cc] dark:text-sky-400 block">
            Latest Journal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
            Articles & Technical Essays
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Insights on software engineering, technology leadership, and design systems.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 3-Column Article Card Grid */}
        {displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {displayArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                image={article.coverImage}
                date={article.publishedDate}
                summary={article.excerpt}
                slug={`/journal/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No published journal entries to display.
          </div>
        )}

        {/* Bottom Centered Read All Articles Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-foreground border border-foreground/50 hover:border-[#0075ff] hover:text-[#0075ff] px-7 py-3 rounded-xl transition-all cursor-pointer"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
