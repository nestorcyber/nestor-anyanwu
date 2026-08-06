"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowUpRight, Sparkles } from "lucide-react"

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
function calculateReadingTime(text?: string): string {
  if (!text) return "1 MIN READ"
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 180))
  return `${minutes} MIN READ`
}

// Safely format dates without throwing RangeErrors
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
  const [heroIndex, setHeroIndex] = useState<number>(0)

  // Extract unique categories from articles
  const categories = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => {
      if (a.category) set.add(a.category)
    })
    return ["All", ...Array.from(set)]
  }, [articles])

  // 1. Pinned Article (Top-Left Primary Hero Focus)
  const pinnedArticle = useMemo(() => {
    return articles.find((a) => a.pinned) || articles[0]
  }, [articles])

  // 2. Featured Articles (Guaranteed EXACTLY 3 Cards for Right Side of Hero Section)
  const featuredArticles = useMemo(() => {
    if (!pinnedArticle) return []
    const featured = articles.filter((a) => a.featured && a.slug !== pinnedArticle.slug)
    const remaining = articles.filter((a) => a.slug !== pinnedArticle.slug)
    
    const combined = [...featured, ...remaining.filter((a) => !featured.includes(a))]

    const defaultFallbacks: JournalArticleItem[] = [
      {
        slug: "technology-leadership-in-emerging-ecosystems",
        title: "Technology Leadership in Emerging Ecosystems",
        excerpt: "Lessons on building sustainable developer communities, fostering engineering talent, and driving digital inclusion.",
        coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
        category: "Leadership",
        tags: ["Leadership", "Community"],
        featured: true,
        pinned: false,
        publishedDate: "2026-01-10",
        author: "Nestor Anyanwu",
      },
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

  // Filtered latest articles for grid below hero
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
    <div className="w-full space-y-8 pt-14 sm:pt-16 pb-16">
      {/* 1. GUMROAD BLOG TOP HERO SECTION (FULL WIDTH SPLIT LAYOUT) */}
      {pinnedArticle && (
        <section className="w-full px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN (lg:col-span-8): Big Featured Hero Card */}
            <div className="lg:col-span-8">
              <Link
                href={`/journal/${pinnedArticle.slug}`}
                className="group block border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:border-accent transition-all cursor-pointer"
              >
                {/* Large Featured Top Image */}
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden bg-slate-900 border-b-2 border-slate-900/20 dark:border-slate-800">
                  {pinnedArticle.coverImage ? (
                    <Image
                      src={pinnedArticle.coverImage}
                      alt={pinnedArticle.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center p-8">
                      <Sparkles className="w-20 h-20 text-white/60" />
                    </div>
                  )}
                </div>

                {/* Bottom Card White/Dark Text Container */}
                <div className="p-6 sm:p-8 space-y-2 bg-card">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors font-heading">
                    {pinnedArticle.title}
                  </h1>
                  <div className="text-xs sm:text-sm font-mono text-muted-foreground pt-1">
                    {formatDate(pinnedArticle.publishedDate)}
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN (lg:col-span-4): 3 Side Featured Cards with Full-Card Cover Images & Text Overlay */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group relative w-full h-[175px] sm:h-[185px] rounded-lg overflow-hidden border-2 border-slate-900/20 dark:border-slate-800 bg-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent flex flex-col justify-end p-5 transition-all cursor-pointer"
                >
                  {/* Full Card Cover Image */}
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/60" />
                    </div>
                  )}

                  {/* Gradient Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-0" />

                  {/* Content Overlay */}
                  <div className="relative z-10 flex items-end justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                        {formatDate(article.publishedDate)}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-[#f472b6] transition-colors line-clamp-2 font-heading">
                        {article.title}
                      </h2>
                    </div>

                    {/* Pill Arrow Icon */}
                    <div className="w-7 h-7 rounded-md bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#f472b6] group-hover:text-slate-950 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 2. LATEST ARTICLES GRID (FULL WIDTH) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between border-t-2 border-slate-900/20 dark:border-slate-800 pt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-foreground font-heading">
              // All Articles
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? "ARTICLE" : "ARTICLES"}
          </span>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg overflow-hidden flex flex-col justify-between transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent hover:-translate-y-1 cursor-pointer"
              >
                <Link href={`/journal/${article.slug}`} className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Cover Image Container */}
                    <div className="relative w-full h-[220px] overflow-hidden bg-slate-900 border-b-2 border-slate-900/20 dark:border-slate-800">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-white/60" />
                        </div>
                      )}
                    </div>

                    {/* Article Content Under Cover Image */}
                    <div className="p-4 sm:p-5 space-y-1.5">
                      <div className="text-[11px] font-mono text-muted-foreground">
                        {formatDate(article.publishedDate)}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2 font-heading">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-normal font-light line-clamp-2 pt-0.5">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article Link Line */}
                  <div className="px-4 sm:px-5 pb-4 pt-0 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                    <span>Read Article</span>
                    <div className="w-7 h-7 rounded-md border border-slate-900/20 dark:border-slate-800 bg-background flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="py-20 border-2 border-dashed border-slate-900/20 dark:border-slate-800 text-center space-y-3 bg-card rounded-lg">
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
              className="text-xs font-bold uppercase tracking-widest text-accent hover:underline pt-2 cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
