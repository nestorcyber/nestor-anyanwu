import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import ArticleCard from "@/components/shared/article-card"
import { getJournalArticles } from "@/lib/content"
import { ArrowUpRight } from "lucide-react"

export default async function LatestJournal() {
  const articles = await getJournalArticles()
  
  // Surface top 3 items (pinned/featured prioritized, then reverse chronological)
  const pinned = articles.filter((a) => a.pinned || a.featured)
  const regular = articles.filter((a) => !a.pinned && !a.featured)
  const displayArticles = [...pinned, ...regular].slice(0, 3)

  return (
    <SectionContainer id="journal">
      <SectionHeader
        badge="LATEST JOURNAL"
        title="Articles & Technical Essays"
        subtitle="Exploring thoughts on technology leadership, community advocacy, software development, and digital inclusion."
      />

      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              image={article.coverImage}
              date={new Date(article.publishedDate || Date.now()).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
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

      <div className="flex justify-center mt-10">
        <Link href="/journal">
          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/50 hover:border-accent hover:text-accent px-8 py-3.5 rounded-none transition-all cursor-pointer">
            <span>READ ALL ARTICLES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}
