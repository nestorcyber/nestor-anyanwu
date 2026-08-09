"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import type { GalleryItem } from "@/lib/content"
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react"

export default function GalleryPageClient({
  initialImages = [],
}: {
  initialImages: GalleryItem[]
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Dynamically extract categories from images
  const categoriesList = Array.from(
    new Set(initialImages.map((img) => img.category).filter((c): c is string => Boolean(c)))
  )
  const categories = ["All", ...categoriesList]

  // Filtered images list
  const filteredImages = activeCategory === "All"
    ? initialImages
    : initialImages.filter((img) => img.category === activeCategory)

  // Lightbox handlers
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const navigatePrev = useCallback(() => {
    if (lightboxIndex === null || filteredImages.length === 0) return
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1))
  }, [lightboxIndex, filteredImages.length])

  const navigateNext = useCallback(() => {
    if (lightboxIndex === null || filteredImages.length === 0) return
    setLightboxIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0))
  }, [lightboxIndex, filteredImages.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigatePrev()
      if (e.key === "ArrowRight") navigateNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, navigatePrev, navigateNext])

  // Helper for bento grid column/row spans
  const getBentoSpanClass = (item: GalleryItem, index: number) => {
    if (item.featured) {
      return "sm:col-span-2 sm:row-span-2 min-h-[360px]"
    }
    const pattern = index % 6
    switch (pattern) {
      case 0:
        return "sm:col-span-2 sm:row-span-2 min-h-[360px]"
      case 1:
        return "sm:col-span-1 sm:row-span-1 min-h-[220px]"
      case 2:
        return "sm:col-span-1 sm:row-span-2 min-h-[360px]"
      case 3:
        return "sm:col-span-2 sm:row-span-1 min-h-[220px]"
      default:
        return "sm:col-span-1 sm:row-span-1 min-h-[220px]"
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pt-12 pb-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
            <div className="space-y-2">
              <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase">
                Visual Catalog
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Gallery
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl leading-relaxed">
                Moments, people, projects, and experiences from my journey.
              </p>
            </div>

            {/* Category Filter Bar */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                      activeCategory === cat
                        ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/70 rounded-2xl bg-card/40 max-w-md mx-auto p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Gallery coming soon</h3>
              <p className="text-xs text-muted-foreground font-light">
                No gallery moments uploaded under category &quot;{activeCategory}&quot; yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[240px]">
              {filteredImages.map((image, idx) => {
                const spanClass = getBentoSpanClass(image, idx)

                return (
                  <div
                    key={image.id || idx}
                    onClick={() => openLightbox(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View photo: ${image.title || "Gallery photo"}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openLightbox(idx)
                      }
                    }}
                    className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 hover:border-accent/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${spanClass}`}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.altText || image.title || "Gallery image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                    {/* Quick Expand Icon */}
                    <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Caption Bar */}
                    <div className="absolute bottom-0 inset-x-0 z-20 p-4 space-y-1 text-white">
                      {image.category && (
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/90 text-white inline-block">
                          {image.category}
                        </span>
                      )}
                      {image.title && (
                        <h3 className="font-semibold text-sm leading-snug line-clamp-1">
                          {image.title}
                        </h3>
                      )}
                      {image.caption && (
                        <p className="text-xs text-white/80 font-light leading-normal line-clamp-2">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between text-white z-50">
            <span className="text-xs font-mono text-white/70 tracking-widest uppercase">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Close viewer"
              title="Close viewer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Display Container */}
          <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center my-auto">
            <button
              onClick={navigatePrev}
              className="absolute left-2 sm:left-4 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous image"
              title="Previous image (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl">
              <Image
                src={filteredImages[lightboxIndex].imageUrl}
                alt={filteredImages[lightboxIndex].altText || filteredImages[lightboxIndex].title || "Gallery view"}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={navigateNext}
              className="absolute right-2 sm:right-4 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next image"
              title="Next image (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Caption Box */}
          <div className="max-w-3xl mx-auto w-full p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white space-y-1 z-50 text-center">
            {filteredImages[lightboxIndex].category && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent text-white inline-block mb-1">
                {filteredImages[lightboxIndex].category}
              </span>
            )}
            {filteredImages[lightboxIndex].title && (
              <h3 className="font-bold text-base sm:text-lg leading-snug">
                {filteredImages[lightboxIndex].title}
              </h3>
            )}
            {filteredImages[lightboxIndex].caption && (
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                {filteredImages[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
