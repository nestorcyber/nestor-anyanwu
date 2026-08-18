import React from "react"
import Link from "next/link"
import Image from "next/image"
import { getJournalArticles } from "@/lib/content"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"

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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 space-y-10">
        
        {/* Centered Image-Matching Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0075ff] dark:text-sky-400 block">
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

        {/* 3-Column Webflow-Style Showcase Cards */}
        {displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {displayArticles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group relative bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#0075ff]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top: Text Content + Floating Mockup Image */}
                <div className="flex items-start justify-between gap-4">
                  
                  {/* Left Column: Title + Category Tag + Excerpt */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#0075ff] transition-colors font-heading line-clamp-1">
                        {article.title}
                      </h3>
                      {idx === 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-blue-50 text-[#0075ff] border border-blue-200 dark:bg-blue-950/60 dark:text-sky-400 dark:border-blue-800/60 shrink-0">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground font-normal leading-relaxed line-clamp-3">
                      {article.excerpt || "Exploring technical architecture, community leadership, and modern web systems."}
                    </p>
                  </div>

                  {/* Right Column: Framed Mockup Thumbnail */}
                  <div className="relative w-20 sm:w-24 h-16 sm:h-20 rounded-xl overflow-hidden border border-slate-200/70 dark:border-slate-800 shrink-0 shadow-xs bg-slate-100 dark:bg-slate-950 group-hover:scale-105 transition-transform duration-300">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Card Action Hint */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-[#0075ff] transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No published journal entries to display.
          </div>
        )}

        {/* Bottom Centered Link / CTA Matching Reference */}
        <div className="text-center pt-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore deep dives, leadership essays, and technical architecture.{" "}
            <Link
              href="/journal"
              className="font-bold text-foreground hover:text-[#0075ff] underline underline-offset-4 transition-colors inline-flex items-center gap-1 ml-1"
            >
              <span>Read all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>

      </div>
    </section>
  )
}
