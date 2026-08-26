"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Images,
  ArrowRight,
} from "lucide-react"

export interface GalleryPhoto {
  id: string
  imageUrl: string
  title: string
  caption?: string
  category?: string
  location?: string
  date?: string
  aspectRatio?: "video" | "square" | "portrait" | "wide"
}

const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: "gal-1",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg",
    title: "NACOS FUTO Student Leadership Delegation",
    caption: "Director of ICT leading digital strategy and tech mentorship for computing students.",
    category: "Leadership",
    location: "FUTO ICT Complex",
    date: "Dec 2025",
  },
  {
    id: "gal-2",
    imageUrl: "/gida-large-group.jpg",
    title: "Grassroots Community Gathering & Innovators Meet",
    caption: "Uniting tech innovators, open-source contributors, and community advocates.",
    category: "Community",
    location: "Innovation Hub",
    date: "Aug 2025",
  },
  {
    id: "gal-3",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4%280%29-e7Yahcsw3qQbcQLNweaiCS5rzoAVvv.jpg",
    title: "FUTO Alumni Homecoming Operations Team",
    caption: "Capturing networking roundtables and legacy awards with the media team.",
    category: "Media",
    location: "FUTO Campus",
    date: "Aug 2025",
  },
  {
    id: "gal-4",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle3%280%29-CFKUWQDj8dfMZ5zkDTF9IEEXC6zDID.jpg",
    title: "FLE Global Leadership Conference Setup Team",
    caption: "Managing multi-track staging and guest hospitality operations.",
    category: "Events",
    location: "FLE Global Summit",
    date: "Nov 2025",
  },
]

export default function VolunteeringGallery({ photos = DEFAULT_GALLERY }: { photos?: GalleryPhoto[] }) {
  // Use curated few community group pictures for the community page preview
  const allPhotos = photos && photos.length > 0 ? photos : DEFAULT_GALLERY
  const displayPhotos = allPhotos.slice(0, 4)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activePhoto = lightboxIndex !== null ? displayPhotos[lightboxIndex] : null

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : displayPhotos.length - 1))
  }, [lightboxIndex, displayPhotos.length])

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! < displayPhotos.length - 1 ? prev! + 1 : 0))
  }, [lightboxIndex, displayPhotos.length])

  const handleClose = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxIndex, handleClose, handlePrev, handleNext])

  return (
    <section id="gallery" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center">
      <div className="site-container space-y-10 sm:space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Volunteering <span className="text-[#0075ff]">Gallery</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Selected community group moments from developer conferences, student leadership summits, and on-ground volunteer operations.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* Responsive Grid with Fixed Aspect Ratio Containers (Zero Layout Shift) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayPhotos.map((photo, index) => {
            return (
              <div
                key={photo.id || index}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-border/80 hover:border-[#0075ff] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
                  
                  {/* Top Category Badge & Maximize Icon */}
                  <div className="flex items-center justify-between">
                    {photo.category ? (
                      <span className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold bg-[#0075ff] text-white">
                        {photo.category}
                      </span>
                    ) : <span />}

                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-heading leading-snug line-clamp-2">
                      {photo.title}
                    </h4>
                    {photo.location && (
                      <p className="text-[10px] sm:text-[11px] font-mono text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0075ff]" />
                        {photo.location}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Action Button: View All Volunteer Pictures */}
        <div className="flex items-center justify-center pt-2">
          <Link
            href="/community/gallery"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0075ff] hover:bg-blue-600 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg duration-200 cursor-pointer group"
          >
            <Images className="w-4 h-4" />
            <span>View All Volunteer Pictures</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center bg-slate-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>

            {/* Caption Bar */}
            <div className="w-full p-5 bg-slate-900 border-t border-white/10 text-white space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#0075ff]">
                <span className="font-bold">{activePhoto.title}</span>
                {activePhoto.date && <span>{activePhoto.date}</span>}
              </div>
              {activePhoto.caption && (
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
