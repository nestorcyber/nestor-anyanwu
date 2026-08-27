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

      <div className="site-container relative z-10 space-y-10">
        
        {/* Section Header: Left Heading + Top Right "View All" Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="text-left space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0055cc] dark:text-sky-400 block">
              Latest Journal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Articles & News
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
              Insights on software engineering, technology leadership, and design systems.
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-end">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:bg-[#0075ff] dark:hover:bg-[#0075ff] dark:hover:text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
                category={article.category}
                tags={article.tags}
                slug={`/journal/${article.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No published journal entries to display.
          </div>
        )}

      </div>
    </section>
  )
}
