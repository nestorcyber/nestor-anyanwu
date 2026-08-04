import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import ArticleCard from "@/components/shared/article-card"
import { sampleArticles } from "@/app/journal/page"
import { ArrowUpRight } from "lucide-react"

export default function LatestJournal() {
  return (
    <SectionContainer id="journal">
      <SectionHeader
        badge="LATEST JOURNAL"
        title="Articles & Technical Essays"
        subtitle="Exploring thoughts on technology leadership, community advocacy, software development, and digital inclusion."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card/40 rounded overflow-hidden">
        {sampleArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            category={article.category}
            readTime={article.readTime}
            date={article.date}
            summary={article.summary}
            slug="/journal"
          />
        ))}
      </div>

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
