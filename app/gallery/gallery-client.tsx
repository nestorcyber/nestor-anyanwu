"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import type { JourneyItem } from "@/lib/content"
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react"

type GalleryImage = {
  src: string
  title: string
  date: string
  type: string
  organization: string
  quote?: string
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

  // Keyboard navigation for Lightbox
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

  // Custom Bento Quotes matching screenshot style
  const quoteItems = [
    { title: "Don't take risks.\nThat's scary!", sub: "Instead of waiting for perfection..." },
    { title: "Place small bets.\nThat's exciting!", sub: "...start by building impact today!" },
    { title: "Lead with empathy.\nBuild with purpose!", sub: "Empowering developers across West Africa." },
    { title: "Consistency beats speed.\nEvery single time!", sub: "On-the-ground execution matters most." },
  ]

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
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight uppercase">
                Gallery & Visuals
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

        {/* Bento Grid Section (Matches attached screenshot style) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-border rounded-3xl bg-card">
              <p className="text-muted-foreground font-medium">No moments captured in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Grid Layout Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                
                {/* 1. TOP LEFT STATEMENT CARD (Gumroad Bento Card) */}
                <div className="bg-[#18181b] dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-center min-h-[200px] shadow-lg">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight whitespace-pre-line font-heading">
                    {quoteItems[0].title}
                  </h2>
                </div>

                {/* 2. TOP RIGHT VISUAL CIRCLE CARD (Tall Circle Frame) */}
                {filteredImages[0] && (
                  <div
                    onClick={() => openLightbox(0)}
                    className="group bg-[#18181b] dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] shadow-lg cursor-pointer transition-all hover:border-[#0284c7]"
                  >
                    {/* Floating Bubble Badge */}
                    <div className="absolute top-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl">
                      {filteredImages[0].title || quoteItems[0].sub}
                    </div>

                    {/* Circular Frame Graphic */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-amber-400/90 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={filteredImages[0].src}
                        alt={filteredImages[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* 3. BOTTOM LEFT VISUAL CIRCLE CARD */}
                {filteredImages[1] && (
                  <div
                    onClick={() => openLightbox(1)}
                    className="group bg-[#18181b] dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] shadow-lg cursor-pointer transition-all hover:border-[#0284c7]"
                  >
                    {/* Floating Bubble Badge */}
                    <div className="absolute top-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl">
                      Instead of waiting for opportunities...
                    </div>

                    {/* Circular Frame Graphic */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-sky-400/90 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={filteredImages[1].src}
                        alt={filteredImages[1].title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Bottom Floating Speech Bubble Badge */}
                    <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl">
                      ...start by creating value today!
                    </div>
                  </div>
                )}

                {/* 4. BOTTOM RIGHT STATEMENT CARD (Gumroad Bento Card) */}
                <div className="bg-[#18181b] dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-center min-h-[200px] shadow-lg">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight whitespace-pre-line font-heading">
                    {quoteItems[1].title}
                  </h2>
                </div>

              </div>

              {/* REMAINING GALLERY ITEMS IN BENTO & CARD GRID */}
              {filteredImages.length > 2 && (
                <div className="pt-8 border-t border-slate-800">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-6">
                    // More Moments ({filteredImages.length - 2})
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.slice(2).map((image, idx) => (
                      <div
                        key={idx + 2}
                        onClick={() => openLightbox(idx + 2)}
                        className="group relative h-[320px] rounded-3xl overflow-hidden border border-slate-800 bg-[#18181b] shadow-lg cursor-pointer transition-all hover:border-[#0284c7]"
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                        
                        <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-700/60 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0284c7] text-white mb-1.5 inline-block">
                            {image.type === "work" ? "Leadership" : "Volunteering"}
                          </span>
                          <h4 className="font-bold text-sm leading-snug line-clamp-1">{image.title}</h4>
                          {image.organization && (
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{image.organization}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
