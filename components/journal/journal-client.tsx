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
    <div className="space-y-10">
      {/* 1. JOURNAL HERO SECTION: PINNED CARD (LEFT) + 3 FEATURED CARDS (RIGHT) */}
      {pinnedArticle && selectedCategory === "All" && !searchQuery && (
        <section className="w-full pt-0 pb-6 md:pb-8">
          <div className="w-full pl-0 pr-4 sm:pr-6 lg:pr-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
              {/* TOP-LEFT: Primary Pinned Card (lg:col-span-8) - Touches Left Edge & Flush Below Navbar */}
              <div className="lg:col-span-8 relative rounded-none overflow-hidden border-2 border-slate-900/20 dark:border-slate-800 bg-card shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-slate-800 dark:hover:border-slate-400 transition-all min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-end group">
                {/* Hero Cover Image Background */}
                {pinnedArticle.coverImage ? (
                  <Image
                    src={pinnedArticle.coverImage}
                    alt={pinnedArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 via-primary/40 to-background flex items-center justify-center p-8">
                    <Sparkles className="w-20 h-20 text-accent/40" />
                  </div>
                )}

                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                {/* Bottom Content Area Over Image Gradient */}
                <div className="relative z-10 p-6 sm:p-8 space-y-2.5">
                  {/* Date Line (No Category Tags) */}
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                    {formatDate(pinnedArticle.publishedDate)}
                  </div>

                  {/* Title */}
                  <Link href={`/journal/${pinnedArticle.slug}`} className="block group/title">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug group-hover/title:text-accent transition-colors font-heading">
                      {pinnedArticle.title}
                    </h1>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-2 max-w-3xl">
                    {pinnedArticle.excerpt}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: 3 Featured Cards Stack (lg:col-span-4) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/journal/${article.slug}`}
                    className="group flex items-center gap-4 bg-card hover:bg-card/90 border-2 border-slate-900/20 dark:border-slate-800 rounded-none p-3.5 transition-all shadow-xs hover:shadow-sm hover:border-slate-800 dark:hover:border-slate-400 cursor-pointer"
                  >
                    {/* Left Thumbnail Image */}
                    <div className="relative w-24 sm:w-28 h-20 sm:h-24 rounded-none overflow-hidden bg-secondary/50 border border-border/50 shrink-0">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-background flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-accent/40" />
                        </div>
                      )}
                    </div>

                    {/* Right Text Block (No Category Tags) */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                        {formatDate(article.publishedDate)}
                      </span>
                      <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. LATEST ARTICLES SECTION */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground font-heading">
              Latest Articles
            </h2>
            {searchQuery && (
              <span className="text-xs text-muted-foreground">
                matching &quot;<span className="text-accent font-medium">{searchQuery}</span>&quot;
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? "RESULT" : "RESULTS"}
          </span>
        </div>

        {/* 4. LATEST ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-none p-4 flex flex-col justify-between transition-all shadow-xs hover:shadow-sm hover:border-slate-800 dark:hover:border-slate-400 cursor-pointer"
              >
                <Link href={`/journal/${article.slug}`} className="flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    {/* Cover Image Container */}
                    <div className="relative w-full h-[180px] sm:h-[200px] rounded-none overflow-hidden bg-secondary/50 border border-border/40">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-background flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-accent/40" />
                        </div>
                      )}
                    </div>

                    {/* Article Content Under Cover Image (No Category Tags) */}
                    <div className="space-y-1.5 px-1">
                      <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        {formatDate(article.publishedDate)}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-muted-foreground leading-relaxed font-light line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article Link Line */}
                  <div className="pt-3 px-1 border-t border-border/30 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="py-20 border border-dashed border-border/60 text-center space-y-3">
            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No journal entries matched your search query. Try clearing filters.
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
