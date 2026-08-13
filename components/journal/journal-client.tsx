"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowUpRight, Sparkles } from "lucide-react"
import ArticleCard from "@/components/shared/article-card"

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

function formatDate(dateStr?: string): string {
  if (!dateStr) return "2026"
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return String(dateStr)
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return String(dateStr)
  }
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

  // Pinned Article
  const pinnedArticle = useMemo(() => {
    return articles.find((a) => a.pinned) || articles[0]
  }, [articles])

  // Featured Articles
  const featuredArticles = useMemo(() => {
    if (!pinnedArticle) return []
    const featured = articles.filter((a) => a.featured && a.slug !== pinnedArticle.slug)
    const remaining = articles.filter((a) => a.slug !== pinnedArticle.slug)
    
    const combined = [...featured, ...remaining.filter((a) => !featured.includes(a))]

    const defaultFallbacks: JournalArticleItem[] = [
      {
        slug: "building-scalable-web-architecture",
        title: "Building Scalable Web Systems for Impact",
        excerpt: "Best practices for architecting modern high-performance Next.js applications and cloud infrastructures.",
        coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
        category: "Software",
        tags: ["Next.js", "Architecture"],
        featured: true,
        pinned: false,
        publishedDate: "2025-12-20",
        author: "Nestor Anyanwu",
      },
      {
        slug: "design-systems-for-growing-brands",
        title: "Crafting Cohesive Enterprise Design Systems",
        excerpt: "How brand identity, typography, and component modularity align to create memorable digital product experiences.",
        coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg",
        category: "Design",
        tags: ["Design", "Branding"],
        featured: true,
        pinned: false,
        publishedDate: "2025-11-15",
        author: "Nestor Anyanwu",
      },
    ]

    const result = [...combined]
    for (const fb of defaultFallbacks) {
      if (result.length >= 3) break
      if (!result.some((a) => a.slug === fb.slug) && fb.slug !== pinnedArticle.slug) {
        result.push(fb)
      }
    }

    return result.slice(0, 3)
  }, [articles, pinnedArticle])

  // Filtered articles
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
    <div className="w-full space-y-12 pt-12 sm:pt-14 pb-20 md:pb-28">
      {/* 1. TOP HERO SECTION */}
      {pinnedArticle && (
        <section className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: Big Featured Hero Card */}
            <div className="lg:col-span-8">
              <Link
                href={`/journal/${pinnedArticle.slug}`}
                className="group block border-2 border-slate-900/30 dark:border-slate-800 bg-card rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0284c7] transition-all cursor-pointer"
              >
                <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden bg-slate-900 border-b-2 border-slate-900/20 dark:border-slate-800">
                  {pinnedArticle.coverImage ? (
                    <Image
                      src={pinnedArticle.coverImage}
                      alt={pinnedArticle.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 flex items-center justify-center p-8">
                      <Sparkles className="w-20 h-20 text-white/60" />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-3 bg-card">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-[#0284c7] transition-colors font-heading">
                    {pinnedArticle.title}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed line-clamp-2">
                    {pinnedArticle.excerpt}
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDate(pinnedArticle.publishedDate)}
                    </span>
                    <div className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl border-2 border-slate-900 dark:border-slate-800 bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN: 3 Side Featured Cards */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group relative w-full h-[175px] sm:h-[185px] rounded-2xl overflow-hidden border-2 border-slate-900/30 dark:border-slate-800 bg-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0284c7] flex flex-col justify-end p-5 transition-all cursor-pointer"
                >
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/60" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-0" />

                  <div className="relative z-10 flex items-end justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                        {formatDate(article.publishedDate)}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-2 font-heading">
                        {article.title}
                      </h2>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white group-hover:bg-[#0284c7] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 2. LATEST ARTICLES GRID */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between border-t-2 border-slate-900/20 dark:border-slate-800 pt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-foreground font-heading">
              Journal Articles
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? "Article" : "Articles"}
          </span>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
          <div className="py-20 border-2 border-dashed border-slate-900/20 dark:border-slate-800 text-center space-y-3 bg-card rounded-2xl">
            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No journal entries matched your search query. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All")
                setSearchQuery("")
              }}
              className="text-xs font-bold uppercase tracking-widest text-[#0284c7] hover:underline pt-2 cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
