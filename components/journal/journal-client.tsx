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
    <div className="w-full space-y-12 pt-24 pb-16">
      {/* 1. GUMROAD BLOG TOP HERO SECTION (FULL WIDTH SPLIT LAYOUT) */}
      {pinnedArticle && selectedCategory === "All" && !searchQuery && (
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

            {/* RIGHT COLUMN (lg:col-span-4): 3 Side Story Rows with Arrow Buttons */}
            <div className="lg:col-span-4 flex flex-col justify-between divide-y divide-border/80 border-t border-b lg:border-t-0 lg:border-b-0 border-border/80">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group py-6 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                    <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2 font-heading">
                      {article.title}
                    </h2>
                    <span className="text-xs font-mono text-muted-foreground block">
                      {formatDate(article.publishedDate)}
                    </span>
                  </div>

                  {/* Gumroad Pill Arrow Button */}
                  <div className="w-9 h-9 rounded-md border-2 border-slate-900/20 dark:border-slate-800 bg-background flex items-center justify-center text-foreground group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 2. CATEGORY FILTER & SEARCH BAR (FULL WIDTH) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t-2 border-b-2 border-slate-900/20 dark:border-slate-800 py-4">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 transition-all cursor-pointer rounded-full border-2 ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(244,114,182,1)]"
                      : "bg-card text-foreground border-slate-900/20 dark:border-slate-800 hover:border-slate-900 dark:hover:border-slate-400"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-card text-foreground text-xs pl-10 pr-4 py-2.5 border-2 border-slate-900/20 dark:border-slate-800 rounded-full focus:outline-none focus:border-accent transition-colors"
            />
          </div>

        </div>
      </section>

      {/* 3. LATEST ARTICLES GRID (FULL WIDTH) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-foreground font-heading">
              // All Articles
            </h2>
            {searchQuery && (
              <span className="text-xs text-muted-foreground">
                matching &quot;<span className="text-accent font-medium">{searchQuery}</span>&quot;
              </span>
            )}
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
                    <div className="p-6 space-y-2">
                      <div className="text-xs font-mono text-muted-foreground">
                        {formatDate(article.publishedDate)}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2 font-heading">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 pt-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article Link Line */}
                  <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
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
