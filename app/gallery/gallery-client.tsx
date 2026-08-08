"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import type { JourneyItem } from "@/lib/content"
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Quote } from "lucide-react"

type GalleryImage = {
  src: string
  title: string
  date: string
  type: string
  organization: string
}

export default function GalleryPageClient({
  journeyTimeline,
  extraImages = [],
}: {
  journeyTimeline: JourneyItem[]
  extraImages?: { url: string; title?: string; alt?: string }[]
}) {
  const [activeFilter, setActiveFilter] = useState<"all" | "work" | "volunteer">("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allImages: GalleryImage[] = [
    ...journeyTimeline.flatMap((item) =>
      (item.images || []).map((img) => ({
        src: img,
        title: item.title,
        date: item.date,
        type: item.type,
        organization: item.organization,
      }))
    ),
    ...extraImages.map((img) => ({
      src: img.url,
      title: img.title || "Gallery Moment",
      date: "2025/2026",
      type: "volunteer" as const,
      organization: "Nestor Cyber",
    })),
  ]

  // Filtered moments
  const filteredImages = allImages.filter(
    (img) => activeFilter === "all" || img.type === activeFilter
  )

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
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1))
  }, [lightboxIndex, filteredImages.length])

  const navigateNext = useCallback(() => {
    if (lightboxIndex === null) return
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

  // Custom Bento Quotes
  const quotesList = [
    { title: "Don't take risks. That's scary!", subtitle: "Instead of waiting for perfection, start small today." },
    { title: "Place small bets. That's exciting!", subtitle: "Consistency and small steps compound into massive impact." },
    { title: "Lead with empathy. Build with purpose!", subtitle: "Empowering engineering talent across ecosystems." },
  ]

  // Dynamic Bento Spans helper function
  const getBentoSpanClass = (index: number) => {
    const pattern = index % 7
    switch (pattern) {
      case 0:
        return "md:col-span-2 md:row-span-2 min-h-[380px]" // Featured Big Hero Bento
      case 1:
        return "md:col-span-1 md:row-span-1 min-h-[220px]" // Standard Square Bento
      case 2:
        return "md:col-span-1 md:row-span-2 min-h-[380px]" // Tall Vertical Bento
      case 3:
        return "md:col-span-2 md:row-span-1 min-h-[220px]" // Wide Horizontal Bento
      case 4:
        return "md:col-span-1 md:row-span-1 min-h-[220px]" // Standard Bento
      case 5:
        return "md:col-span-2 md:row-span-2 min-h-[380px]" // Featured Big Hero Bento
      default:
        return "md:col-span-1 md:row-span-1 min-h-[220px]"
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pt-12 pb-24">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
            <div>
              <p className="text-[#0284c7] text-xs font-mono font-bold tracking-widest mb-2 uppercase">
                Captured Moments & Impact
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Gallery & Visual Moments
              </h1>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#0284c7] text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                All Moments ({allImages.length})
              </button>
              <button
                onClick={() => setActiveFilter("work")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "work"
                    ? "bg-[#0284c7] text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                Leadership & Work
              </button>
              <button
                onClick={() => setActiveFilter("volunteer")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "volunteer"
                    ? "bg-[#0284c7] text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                Volunteering & Summits
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Bento Grid Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-border rounded-3xl bg-card">
              <p className="text-muted-foreground font-medium">No moments captured in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
              
              {/* Quote Statement Bento Card 1 */}
              <div className="md:col-span-2 md:row-span-1 bg-[#18181b] dark:bg-slate-900 border-2 border-slate-900/30 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)]">
                <Quote className="w-6 h-6 text-[#0284c7] mb-3" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug font-heading">
                  {quotesList[0].title}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 font-light mt-1">
                  {quotesList[0].subtitle}
                </p>
              </div>

              {/* Dynamic Image Bento Cards */}
              {filteredImages.map((image, idx) => {
                const isCircleVignette = idx === 0 || idx === 3
                const spanClass = getBentoSpanClass(idx)

                return (
                  <div
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className={`group relative overflow-hidden rounded-3xl border-2 border-slate-900/30 dark:border-slate-800 bg-[#18181b] shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0284c7] transition-all cursor-pointer flex flex-col items-center justify-center p-4 ${spanClass}`}
                  >
                    {isCircleVignette ? (
                      /* Circle Graphic Frame Bento Item */
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="absolute top-3 left-3 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl shadow-lg line-clamp-1">
                          {image.title}
                        </div>
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-400/90 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Standard Full Bleed Photo Bento Card */
                      <>
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                        
                        {/* Hover Quick View Button */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Glassmorphic Caption Bar */}
                        <div className="absolute bottom-4 inset-x-4 z-20 p-3.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-white">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0284c7] text-white mb-1 inline-block">
                            {image.type === "work" ? "Leadership" : "Volunteering"}
                          </span>
                          <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-1">{image.title}</h3>
                          {image.organization && (
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{image.organization}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}

              {/* Quote Statement Bento Card 2 */}
              <div className="md:col-span-2 md:row-span-1 bg-[#18181b] dark:bg-slate-900 border-2 border-slate-900/30 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)]">
                <Quote className="w-6 h-6 text-[#0284c7] mb-3" />
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug font-heading">
                  {quotesList[1].title}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 font-light mt-1">
                  {quotesList[1].subtitle}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer z-50"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={navigatePrev}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer z-50"
            title="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative max-w-[90vw] max-h-[75vh] aspect-video w-full h-full flex items-center justify-center">
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={navigateNext}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer z-50"
            title="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 inset-x-6 max-w-2xl mx-auto p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#0284c7] text-white mb-2 inline-block">
                {filteredImages[lightboxIndex].type === "work" ? "Leadership" : "Volunteering"}
              </span>
              <h4 className="font-bold text-base leading-snug">{filteredImages[lightboxIndex].title}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {filteredImages[lightboxIndex].organization} {filteredImages[lightboxIndex].date && `• ${filteredImages[lightboxIndex].date}`}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                {lightboxIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
