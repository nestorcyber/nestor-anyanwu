"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import Footer from "@/components/footer"
import type { GalleryItem } from "@/lib/content"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Search,
  ArrowUpDown,
  Play,
  MapPin,
  Calendar,
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react"

type SortOption = "newest" | "oldest" | "featured"

export default function GalleryPageClient({
  initialImages = [],
}: {
  initialImages: GalleryItem[]
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const lightboxRef = useRef<HTMLDivElement>(null)

  // Touch swipe handling for mobile lightbox
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // 1. Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    initialImages.forEach((img) => {
      if (img.category) set.add(img.category)
    })
    return ["All", ...Array.from(set)]
  }, [initialImages])

  // 2. Filter & Sort images
  const processedImages = useMemo(() => {
    let list = [...initialImages]

    // Category filter
    if (activeCategory !== "All") {
      list = list.filter((img) => img.category === activeCategory)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (img) =>
          img.title?.toLowerCase().includes(q) ||
          img.caption?.toLowerCase().includes(q) ||
          img.location?.toLowerCase().includes(q) ||
          img.category?.toLowerCase().includes(q)
      )
    }

    // Sort order
    if (sortBy === "newest") {
      list.sort((a, b) => {
        if (a.eventDate && b.eventDate) {
          return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        }
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime() ||
          a.sortOrder - b.sortOrder
        )
      })
    } else if (sortBy === "oldest") {
      list.sort((a, b) => {
        if (a.eventDate && b.eventDate) {
          return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        }
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime() ||
          a.sortOrder - b.sortOrder
        )
      })
    } else if (sortBy === "featured") {
      list.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return a.sortOrder - b.sortOrder
      })
    }

    return list
  }, [initialImages, activeCategory, searchQuery, sortBy])

  // 3. Lightbox Controls
  const openLightbox = (item: GalleryItem) => {
    const index = processedImages.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      setLightboxIndex(index)
      document.body.style.overflow = "hidden"
    }
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  const navigatePrev = useCallback(() => {
    if (lightboxIndex === null || processedImages.length === 0) return
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : processedImages.length - 1
    )
  }, [lightboxIndex, processedImages.length])

  const navigateNext = useCallback(() => {
    if (lightboxIndex === null || processedImages.length === 0) return
    setLightboxIndex((prev) =>
      prev !== null && prev < processedImages.length - 1 ? prev + 1 : 0
    )
  }, [lightboxIndex, processedImages.length])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && lightboxRef.current) {
      lightboxRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigatePrev()
      if (e.key === "ArrowRight") navigateNext()
      if (e.key === "f" || e.key === "F") toggleFullscreen()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, navigatePrev, navigateNext])

  // Touch swipe events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diffX = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50
    if (diffX > minSwipeDistance) {
      navigateNext() // Swiped left -> next
    } else if (diffX < -minSwipeDistance) {
      navigatePrev() // Swiped right -> prev
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const currentItem = lightboxIndex !== null ? processedImages[lightboxIndex] : null

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pt-8 sm:pt-12 pb-24 font-sans">
        {/* Header Bar */}
        <div className="site-container mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-6 sm:pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                Visual Archive
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground font-heading">
                Gallery
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
                Moments, people, projects, and experiences from speaking engagements, conferences, and tech leadership milestones.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-muted-foreground bg-card border border-border/80 px-4 py-2 rounded-xl shrink-0">
              <span className="font-bold text-foreground">{processedImages.length}</span> Moments
              <span className="text-border">•</span>
              <span className="font-bold text-foreground">Stable Grid</span>
              <span className="text-border">•</span>
              <span className="text-emerald-500 font-semibold">Zero Distortion</span>
            </div>
          </div>

          {/* Filtering & Sorting Controls Bar */}
          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-accent text-white border-accent shadow-xs"
                      : "bg-card text-muted-foreground border-border/70 hover:text-foreground hover:border-border hover:bg-secondary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search moments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-border/80 bg-card focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all text-foreground placeholder:text-muted-foreground/70"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center">
                <div className="flex items-center gap-1.5 bg-card border border-border/80 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                  <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort gallery items"
                    className="bg-transparent text-foreground text-xs font-medium focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stable 1:1 Square Grid Gallery Container */}
        <div className="site-container w-full">
          {processedImages.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/70 rounded-2xl bg-card/40 max-w-md mx-auto p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center mx-auto text-muted-foreground">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No photos found</h3>
              <p className="text-xs text-muted-foreground font-light">
                {searchQuery
                  ? `No moments match "${searchQuery}".`
                  : `No gallery moments in "${activeCategory}" category.`}
              </p>
              {(searchQuery || activeCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("All")
                  }}
                  className="mt-2 text-xs font-semibold text-accent hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          ) : (
            /* Responsive Square Grid: 2 cols Mobile, 3 cols Tablet, 4 cols Desktop */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {processedImages.map((item) => {
                const hasVideo = Boolean(item.videoDuration || item.videoUrl)

                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View photo: ${item.title || "Gallery moment"}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openLightbox(item)
                      }
                    }}
                    className="group relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-900 border border-border/40 hover:border-accent/50 transition-all duration-300 cursor-pointer select-none flex items-center justify-center shadow-xs"
                  >
                    {/* The Image inside the square: object-cover dynamically fills the square container while maintaining aspect ratio */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title || "Gallery moment"}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Top-Left Video Duration Badge */}
                    {hasVideo && (
                      <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono text-white font-semibold flex items-center gap-1 shadow-sm pointer-events-none">
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>{item.videoDuration || "Video"}</span>
                      </div>
                    )}

                    {/* Top-Right Featured Badge */}
                    {item.featured && !hasVideo && (
                      <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-amber-500/90 backdrop-blur-md flex items-center justify-center text-white shadow-xs pointer-events-none">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}

                    {/* Hover Quick Expand Button */}
                    <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Hover Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-white pointer-events-none">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                        {item.category && (
                          <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/90 text-white inline-block">
                            {item.category}
                          </span>
                        )}
                        {item.title && (
                          <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1 leading-snug">
                            {item.title}
                          </h4>
                        )}
                        {item.location && (
                          <p className="text-[9px] sm:text-[10px] text-white/80 font-light flex items-center gap-1 line-clamp-1">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox / High-Res Fullscreen Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between text-white z-50 w-full max-w-7xl mx-auto pb-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/80 tracking-widest uppercase">
                {lightboxIndex + 1} / {processedImages.length}
              </span>
              {currentItem.category && (
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent text-white">
                  {currentItem.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="hidden sm:flex w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 items-center justify-center text-white transition-all cursor-pointer"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer hover:rotate-90 duration-200"
                aria-label="Close viewer"
                title="Close viewer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Viewer Display (Original Ratio Preserved, Zero Cropping) */}
          <div className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={navigatePrev}
              className="absolute left-2 sm:left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Previous image"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Media Display Container */}
            <div className="relative max-h-[70vh] sm:max-h-[76vh] max-w-[92vw] sm:max-w-5xl w-full h-full flex items-center justify-center">
              {currentItem.videoUrl ? (
                <video
                  src={currentItem.videoUrl}
                  controls
                  autoPlay
                  className="max-h-[70vh] sm:max-h-[76vh] max-w-full rounded-lg object-contain shadow-2xl"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.altText || currentItem.title || "Gallery view"}
                  className="max-h-[70vh] sm:max-h-[76vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                />
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={navigateNext}
              className="absolute right-2 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Next image"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Caption & Details Bar */}
          <div className="max-w-4xl mx-auto w-full p-3 sm:p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-white z-50 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                {currentItem.title && (
                  <h3 className="font-bold text-sm sm:text-base leading-snug">
                    {currentItem.title}
                  </h3>
                )}
                {currentItem.caption && (
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                    {currentItem.caption}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-neutral-400 font-mono shrink-0 pt-1 sm:pt-0">
                {currentItem.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" />
                    {currentItem.location}
                  </span>
                )}
                {currentItem.eventDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {currentItem.eventDate}
                  </span>
                )}
                {currentItem.externalLink && (
                  <a
                    href={currentItem.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:underline"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
