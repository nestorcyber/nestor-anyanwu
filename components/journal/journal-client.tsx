"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Sparkles } from "lucide-react"
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
    <div className="w-full space-y-12 pt-0 pb-20 md:pb-28">
      {/* 1. TOP HERO SECTION */}
      {pinnedArticle && (
        <section className="w-full pt-4 md:pt-6">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT COLUMN: Standard Hero Page Banner (Flush to left screen edge) */}
              <div className="lg:col-span-7 xl:col-span-8 bg-slate-950 text-white p-6 sm:p-10 md:p-14 pl-4 sm:pl-8 lg:pl-12 xl:pl-16 flex flex-col justify-between relative overflow-hidden rounded-r-2xl lg:rounded-r-3xl border-r-2 border-y-2 border-slate-900 shadow-2xl min-h-[440px] md:min-h-[520px]">
                {/* Background Cover Image with Dark Mask */}
                {pinnedArticle.coverImage ? (
                  <Image
                    src={pinnedArticle.coverImage}
                    alt={pinnedArticle.title}
                    fill
                    className="object-cover opacity-30 filter brightness-90 contrast-110"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 opacity-90" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-0" />

                {/* Hero Overlay Content */}
                <div className="relative z-10 space-y-6 max-w-2xl my-auto pt-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-[#0070f3] text-white rounded-none shadow-sm">
                      FEATURED ESSAY
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      {formatDate(pinnedArticle.publishedDate)}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                    {pinnedArticle.title}
                  </h1>

                  <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed line-clamp-3 max-w-xl">
                    {pinnedArticle.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link href={`/journal/${pinnedArticle.slug}`}>
                      <div className="py-3.5 px-6 bg-[#0070f3] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md">
                        <span>Read Featured Essay</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 3 Side Featured Cards styled with our new card layout */}
              <div className="lg:col-span-5 xl:col-span-4 px-4 sm:px-6 lg:px-0 lg:pr-8 flex flex-col justify-between gap-6">
                {featuredArticles.map((article) => (
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
              className="text-xs font-bold uppercase tracking-widest text-[#0070f3] hover:underline pt-2 cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
