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
    <div className="w-full space-y-12 pt-0 pb-20 md:pb-28 font-sans">
      
      {/* ─── WEBFLOW-INSPIRED HERO SECTION ─── */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-background dark:from-[#060D17] dark:via-[#081525] dark:to-[#0A1D33] text-foreground dark:text-white py-12 sm:py-16 md:py-20 border-b border-border/70 dark:border-white/[0.08] shadow-xs dark:shadow-2xl">
        
        {/* Radial Light Glow Illuminating from Center / Bottom (3x Boosted Intensity) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_bottom_center,_rgba(0,117,255,0.45)_0%,_rgba(0,117,255,0.15)_45%,_transparent_80%)] dark:bg-[radial-gradient(ellipse_at_bottom_center,_rgba(0,117,255,0.85)_0%,_rgba(0,117,255,0.35)_45%,_transparent_80%)] pointer-events-none z-0 blur-2xl opacity-90" />

        {/* Soft Ambient Glow in Lower Center (3x Boosted Intensity) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-sky-400/60 dark:bg-[#0075ff]/60 blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 container-webflow space-y-8 sm:space-y-10">
          
          {/* Centered Large Display Title & Subtitle */}
          <div className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground dark:text-white tracking-tight font-heading leading-[1.08]">
              Ideas, Insights & Technical Writing
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-muted-foreground dark:text-slate-300 font-normal leading-relaxed text-center max-w-2xl mx-auto">
              Explore software engineering case studies, design system notes, tech advocacy, and community leadership journals by Nestor Anyanwu.
            </p>
          </div>

          {/* Featured Spotlight Cards (3 Card Row in Webflow Showcase Style) */}
          {featuredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
              {featuredArticles.map((article, idx) => {
                const badgeLabel = idx === 0 ? "FEATURED" : idx === 1 ? "NEW" : "2.0"
                return (
                  <Link
                    key={article.slug || idx}
                    href={`/journal/${article.slug}`}
                    className="bg-white/90 dark:bg-[#0B1A2A]/85 hover:bg-white dark:hover:bg-[#0E2238]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] hover:border-[#0075ff]/80 dark:hover:border-[#0075ff]/80 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 group shadow-sm hover:shadow-xl dark:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,117,255,0.2)] hover:-translate-y-1 cursor-pointer overflow-hidden min-h-[120px] sm:min-h-[135px]"
                  >
                    {/* Left Text Info */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-foreground dark:text-white group-hover:text-[#0055cc] dark:group-hover:text-[#0075ff] transition-colors truncate font-heading">
                          {article.title}
                        </h3>
                        {badgeLabel && (
                          <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-[#0055cc] border border-blue-200 dark:bg-[#0075ff]/20 dark:text-[#0075ff] dark:border-[#0075ff]/40 shrink-0">
                            {badgeLabel}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground dark:text-slate-300 font-normal line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Right Side Preview Image Thumbnail */}
                    {article.coverImage && (
                      <div className="relative w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-20 rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 shrink-0 bg-slate-100 dark:bg-slate-900 shadow-xs">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="112px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Sub-text Link */}
          <div className="text-center pt-1 sm:pt-2">
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 font-medium">
              <span>Looking for specific technical articles? </span>
              {pinnedArticle && (
                <Link
                  href={`/journal/${pinnedArticle.slug}`}
                  className="font-bold text-foreground dark:text-white hover:text-[#0055cc] dark:hover:text-[#0075ff] underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read latest post</span>
                  <ArrowRight className="w-3.5 h-3.5 inline" />
                </Link>
              )}
            </p>
          </div>

        </div>
      </section>

      {/* ─── ALL JOURNAL ARTICLES SECTION WITH FILTERS & SEARCH ─── */}
      <div className="w-full container-webflow space-y-8">
        
        {/* Category Filters & Search Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#0075ff] text-white border-[#0075ff] shadow-xs font-bold"
                    : "bg-secondary/70 text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border/80 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0075ff] focus:ring-1 focus:ring-[#0075ff] transition-all"
            />
          </div>
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
                category={article.category}
                tags={article.tags}
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
              className="text-xs font-bold uppercase tracking-widest text-[#0055cc] dark:text-sky-400 hover:underline pt-2 cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
