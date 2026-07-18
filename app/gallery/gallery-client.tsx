"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import { journeyTimeline } from "@/lib/data"
import DribbbleCarousel, { CarouselItem } from "@/components/dribbble-carousel"
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

export default function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState<"all" | "work" | "volunteer">("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Map timeline data to extract all associated photos
  const allImages = journeyTimeline.flatMap((item) =>
    (item.images || []).map((img) => ({
      src: img,
      title: item.title,
      date: item.date,
      type: item.type,
      organization: item.organization,
    }))
  )

  // Filtered moments
  const filteredImages = allImages.filter(
    (img) => activeFilter === "all" || img.type === activeFilter
  )

  // Lightbox handlers
  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    document.body.style.overflow = "hidden" // Disable page scrolling
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = "unset"
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

  // Carousel slider deck items
  const carouselItems: CarouselItem[] = [
    {
      id: "devfest",
      title: "DevFest Owerri 2025",
      subtitle: "Major design contributions and event logistics for the largest developer festival in South-East Nigeria.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dev-nnewBVnGcwatonVCQKc9zTtMdshDoM.jpg",
      accentColor: "#4f46e5",
      badge: "Tech Community"
    },
    {
      id: "edensprime",
      title: "Edensprime Hospitality Summit",
      subtitle: "Event setup, welfare team coordination, and design work for the hospitality leadership conference.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg",
      accentColor: "#d97706",
      badge: "Hospitality"
    },
    {
      id: "fle",
      title: "FLE National Conference",
      subtitle: "Behind-the-scenes event setup management and tech infrastructure at the Faith Life, Leadership & Entrepreneurship Conference.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
      accentColor: "#059669",
      badge: "Leadership"
    },
    {
      id: "homecoming",
      title: "FUTO Alumni Homecoming",
      subtitle: "Media coverage, welfare management, and event photography capturing alumni connections.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
      accentColor: "#0284c7",
      badge: "Alumni Media"
    }
  ]

  return (
    <>
      <main className="min-h-screen bg-background pt-12 pb-24">
        {/* Header - Centered Layout */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-10 text-center md:text-left">
          <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
            Captured Milestones
          </p>
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold text-primary mb-5 uppercase tracking-wide">
            Gallery & Moments
          </h1>
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl leading-relaxed font-medium">
            A visual roadmap of volunteering activities, student leadership engagements, and tech community events that define Nestor's contribution on the ground.
          </p>
        </div>

        {/* Edge-to-Edge Highlight Carousel (Completely bypasses side margins) */}
        <div className="w-full mb-20">
          <DribbbleCarousel items={carouselItems} />
        </div>

        {/* Gallery Grid Section with margins restored */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-border pb-6">
            <h2 className="text-lg md:text-2xl font-bold font-sans text-primary uppercase tracking-wider">
              All Moments
            </h2>
            
            {/* Elegant Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "all"
                    ? "bg-primary text-secondary shadow-md"
                    : "bg-secondary text-muted hover:bg-border/50"
                }`}
              >
                All Moments ({allImages.length})
              </button>
              <button
                onClick={() => setActiveFilter("work")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "work"
                    ? "bg-primary text-secondary shadow-md"
                    : "bg-secondary text-muted hover:bg-border/50"
                }`}
              >
                Leadership & Work
              </button>
              <button
                onClick={() => setActiveFilter("volunteer")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "volunteer"
                    ? "bg-primary text-secondary shadow-md"
                    : "bg-secondary text-muted hover:bg-border/50"
                }`}
              >
                Volunteering & Summits
              </button>
            </div>
          </div>

          {/* Modern Asymmetric / Masonry Staggered Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-3xl">
              <p className="text-muted font-medium">No moments captured in this category yet.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((image, idx) => {
                // Generate varied heights based on grid index for an authentic masonry wall layout
                const heightClass =
                  idx % 3 === 0
                    ? "h-[360px]"
                    : idx % 3 === 1
                    ? "h-[250px]"
                    : "h-[310px]"

                return (
                  <div
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className={`break-inside-avoid relative overflow-hidden rounded-[1.75rem] border border-border/30 bg-muted shadow-md group cursor-pointer pointer-events-auto ${heightClass}`}
                  >
                    {/* Picture Card */}
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none"
                    />

                    {/* Dark gradient base overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                    {/* Quick view button (top right, visible on hover) */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Premium Glassmorphic details panel (slides up on hover) */}
                    <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/10 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-accent text-white mb-2 inline-block">
                        {image.type === "work" ? "Leadership" : "Volunteering"}
                      </span>
                      <h3 className="font-bold text-sm leading-snug line-clamp-1 mb-1">
                        {image.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] text-white/70 font-medium mt-1">
                        <span>{image.organization}</span>
                        <span>{image.date}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Modern Lightbox Modal Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Slide Control */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
            title="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Active Image Box */}
          <div className="relative max-w-[90vw] max-h-[75vh] aspect-video w-full h-full flex items-center justify-center">
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>

          {/* Next Slide Control */}
          <button
            onClick={navigateNext}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105"
            title="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Details metadata bar */}
          <div className="absolute bottom-6 inset-x-6 max-w-2xl mx-auto p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-accent text-white mb-2 inline-block">
                {filteredImages[lightboxIndex].type === "work" ? "Leadership" : "Volunteering"}
              </span>
              <h4 className="font-bold text-base leading-snug">{filteredImages[lightboxIndex].title}</h4>
              <p className="text-xs text-white/70 font-semibold mt-1">
                {filteredImages[lightboxIndex].organization} • {filteredImages[lightboxIndex].date}
              </p>
            </div>
            <div className="text-right flex-none">
              <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
                Image {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
