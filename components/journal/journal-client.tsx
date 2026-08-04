"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowUpRight, Calendar, User, Clock, Tag, Sparkles, Pin } from "lucide-react"

export interface JournalArticleItem {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  featured: boolean
  pinned: boolean
  publishedDate: string
  author: string
}

interface JournalClientProps {
  articles: JournalArticleItem[]
}

// Calculate reading time dynamically (approx. 200 words per min)
function calculateReadingTime(text: string): string {
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 180))
  return `${minutes} MIN READ`
}

export default function JournalClient({ articles }: JournalClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Extract unique categories from articles
  const categories = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => {
      if (a.category) set.add(a.category)
    })
    return ["All", ...Array.from(set)]
  }, [articles])

  // Featured / Pinned spotlight articles
  const featuredArticles = useMemo(() => {
    return articles.filter((a) => a.featured || a.pinned)
  }, [articles])

  const primaryFeatured = featuredArticles[0]
  const secondaryFeatured = featuredArticles.slice(1, 3)

  // Filtered latest articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category.toLowerCase() === selectedCategory.toLowerCase()

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query)) ||
        article.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [articles, selectedCategory, searchQuery])

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <div className="border-b border-border/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              INSIGHTS & ESSAYS
            </span>
            <span className="text-[10px] font-mono border border-border px-2 py-0.5 text-muted-foreground">
              {articles.length} {articles.length === 1 ? "ARTICLE" : "ARTICLES"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight uppercase leading-none">
            Journal & Notes
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            A collection of thoughts, lessons, case studies, and reflections on technology, leadership, software engineering, and community building.
          </p>
        </div>
      </div>

      {/* 2. FEATURED SPOTLIGHT SECTION (Only if featured articles exist & no active search/category filter) */}
      {featuredArticles.length > 0 && selectedCategory === "All" && !searchQuery && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Featured Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Featured Article (Large Card) */}
            {primaryFeatured && (
              <article className={`lg:col-span-${secondaryFeatured.length > 0 ? "7" : "12"} group border border-border/60 hover:border-accent bg-card/60 rounded overflow-hidden flex flex-col justify-between transition-all`}>
                <div className="space-y-4">
                  {primaryFeatured.coverImage && (
                    <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden border-b border-border/40">
                      <Image
                        src={primaryFeatured.coverImage}
                        alt={primaryFeatured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded">
                        {primaryFeatured.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Pin className="w-3 h-3 text-accent" /> FEATURED
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {primaryFeatured.title}
                    </h3>

                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed line-clamp-3">
                      {primaryFeatured.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0 flex items-center justify-between border-t border-border/30 mt-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    {new Date(primaryFeatured.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/journal/${primaryFeatured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            )}

            {/* Secondary Featured Articles */}
            {secondaryFeatured.length > 0 && (
              <div className="lg:col-span-5 flex flex-col gap-6">
                {secondaryFeatured.map((article) => (
                  <article
                    key={article.slug}
                    className="group p-6 border border-border/60 hover:border-accent bg-card/60 rounded flex flex-col justify-between flex-1 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {calculateReadingTime(article.excerpt)}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
                        {article.title}
                      </h4>

                      <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground text-[10px]">
                        {new Date(article.publishedDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/journal/${article.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-foreground group-hover:text-accent uppercase text-[11px]"
                      >
                        <span>Read</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. FILTER & SEARCH CONTROL BAR */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
          {/* Categories Pill Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journal..."
              className="w-full bg-card/60 border border-border/60 text-foreground text-xs pl-9 pr-8 py-2 rounded outline-none focus:border-accent transition-all placeholder:text-muted-foreground/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-xs text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* 4. LATEST ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="group border border-border/60 hover:border-accent bg-card/60 rounded overflow-hidden flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  {article.coverImage && (
                    <div className="relative w-full h-[180px] overflow-hidden border-b border-border/40">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-border/30 pb-2.5">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {calculateReadingTime(article.excerpt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug uppercase group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed font-light line-clamp-3">
                      {article.excerpt}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-muted-foreground/80 px-1.5 py-0.5 border border-border/40 bg-secondary/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-border/30 mt-4">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {new Date(article.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="py-20 border border-dashed border-border/60 text-center space-y-3">
            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No journal entries matched your search query or category filter. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All")
                setSearchQuery("")
              }}
              className="text-xs font-bold uppercase tracking-widest text-accent hover:underline pt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
