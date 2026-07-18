"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

export interface CarouselItem {
  id: string | number
  title: string
  subtitle?: string
  image: string
  link?: string
  accentColor?: string
  badge?: string
}

interface DribbbleCarouselProps {
  items: CarouselItem[]
  autoplaySpeed?: number // Constant scrolling speed
}

export default function DribbbleCarousel({
  items,
  autoplaySpeed = 0.0028, // Normal, readable marquee velocity
}: DribbbleCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)
  const targetPosition = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const dragDistance = useRef(0)

  // SSR-safe client viewport detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate current active index based on closest distance to center
  const activeIndex = Math.round(scrollPosition + items.length * 4) % items.length
  const activeItem = items[activeIndex]

  // Glide to next slide
  const handleNext = useCallback(() => {
    const currentTarget = targetPosition.current !== null ? targetPosition.current : scrollPosition
    targetPosition.current = Math.round(currentTarget + 1)
  }, [scrollPosition])

  // Glide to previous slide
  const handlePrev = useCallback(() => {
    const currentTarget = targetPosition.current !== null ? targetPosition.current : scrollPosition
    targetPosition.current = Math.round(currentTarget - 1)
  }, [scrollPosition])

  // Click handler for peeking slides
  const handleCardClick = (index: number, dist: number, e: React.MouseEvent) => {
    if (isDragging.current || dragDistance.current > 5) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    if (Math.abs(dist) < 0.2) return // Allow link navigation on center active card

    e.preventDefault()
    e.stopPropagation()

    // Smooth glide center on clicked card
    targetPosition.current = scrollPosition + dist
  }

  // Animation frame loop to manage continuous scrolling & snapping physics
  useEffect(() => {
    const updatePhysics = () => {
      if (isDragging.current) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics)
        return
      }

      if (targetPosition.current !== null) {
        // Smoothly glide/lerp to target index when clicked/buttoned
        const diff = targetPosition.current - scrollPosition
        if (Math.abs(diff) < 0.005) {
          setScrollPosition((targetPosition.current + items.length * 4) % items.length)
          targetPosition.current = null
        } else {
          setScrollPosition((prev) => (prev + diff * 0.08 + items.length * 4) % items.length)
        }
      } else if (!isHovered) {
        // Continuous, smooth marquee scroll when idle
        setScrollPosition((prev) => (prev + autoplaySpeed + items.length * 4) % items.length)
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics)
    }

    animationFrameRef.current = requestAnimationFrame(updatePhysics)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [scrollPosition, isHovered, items.length, autoplaySpeed])

  // Pointer dragging gesture handlers
  const handleDragStart = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return

    isDragging.current = true
    startX.current = e.clientX
    startScroll.current = scrollPosition
    dragDistance.current = 0
    targetPosition.current = null

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
  }

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return

    const dx = e.clientX - startX.current
    dragDistance.current = Math.abs(dx)

    const containerWidth = containerRef.current?.offsetWidth || 1000
    const dragFactor = isMobile ? 0.65 : isTablet ? 0.55 : 0.45
    // Spacing reference for dragging
    const dragSpacing = isMobile ? 260 : isTablet ? 320 : 410
    const dragOffset = -dx / dragSpacing

    let newScroll = (startScroll.current + dragOffset + items.length * 4) % items.length
    setScrollPosition(newScroll)
  }

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false

    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }

    // Snapping adjustment to align back to clean integers after releasing swipe
    const nearestIndex = Math.round(scrollPosition)
    let target = nearestIndex
    let diff = target - scrollPosition
    if (diff > items.length / 2) target -= items.length
    if (diff < -items.length / 2) target += items.length

    targetPosition.current = target

    setTimeout(() => {
      dragDistance.current = 0
    }, 50)
  }

  if (!items || items.length === 0) return null

  // Layout parameters for spacing
  const minWidth = isMobile ? 180 : isTablet ? 240 : 280
  const maxWidth = isMobile ? 260 : isTablet ? 360 : 440
  const gap = isMobile ? 16 : isTablet ? 20 : 24

  // Sort visible items by their relative distance (left to right)
  const visibleItems = items
    .map((item, index) => {
      let dist = index - scrollPosition
      const half = items.length / 2
      if (dist > half) dist -= items.length
      if (dist < -half) dist += items.length
      return { item, index, dist, absDist: Math.abs(dist) }
    })
    .filter((d) => d.absDist < 2.0)
    .sort((a, b) => a.dist - b.dist)

  // Find the active item (closest to center)
  let activeSortedIndex = 0
  let minAbsDist = Infinity
  visibleItems.forEach((d, idx) => {
    if (d.absDist < minAbsDist) {
      minAbsDist = d.absDist
      activeSortedIndex = idx
    }
  })

  // Calculate dynamic widths for each visible item
  const widths = visibleItems.map((d) => {
    return maxWidth - Math.min(d.absDist, 1.0) * (maxWidth - minWidth)
  })

  // Propagate offsets from active item outward to prevent stacking
  const offsets = new Array(visibleItems.length).fill(0)
  if (visibleItems.length > 0) {
    const activeItemData = visibleItems[activeSortedIndex]
    const activeWidth = widths[activeSortedIndex]

    // Base offset of active item (moves with fractional scrollPosition)
    offsets[activeSortedIndex] = activeItemData.dist * (activeWidth + gap)

    // Propagate right
    for (let j = activeSortedIndex + 1; j < visibleItems.length; j++) {
      offsets[j] = offsets[j - 1] + widths[j - 1] / 2 + gap + widths[j] / 2
    }

    // Propagate left
    for (let j = activeSortedIndex - 1; j >= 0; j--) {
      offsets[j] = offsets[j + 1] - widths[j] / 2 - gap - widths[j + 1] / 2
    }
  }

  return (
    <div className="relative py-8 px-4 overflow-hidden w-full flex flex-col items-center bg-transparent select-none">
      {/* Scroll track stage */}
      <div
        ref={containerRef}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        className="relative flex justify-center items-center w-full h-[260px] sm:h-[340px] md:h-[450px] cursor-grab active:cursor-grabbing touch-pan-y overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {visibleItems.map((data, idx) => {
          const { item, dist, absDist } = data
          const cardWidth = widths[idx]
          const offsetX = offsets[idx]

          // Continuous styling interpolation:
          // Full opacity at center, fades out to 45% on borders
          const opacity = 1.0 - Math.min(absDist, 1.2) * 0.55
          // Crisp sharpness in center, blurs out to 0.8px on edges (very subtle blur)
          const blurVal = Math.min(absDist, 1.2) * 0.8

          const isActive = absDist < 0.5

          return (
            <div
              key={item.id}
              onClick={(e) => handleCardClick(data.index, dist, e)}
              style={{
                width: `${cardWidth}px`,
                transform: `translate3d(calc(-50% + ${offsetX}px), -50%, 0)`,
                opacity: opacity,
                filter: `blur(${blurVal}px)`,
                zIndex: isActive ? 30 : 20,
              }}
              className="absolute left-1/2 top-1/2 h-[220px] sm:h-[300px] md:h-[380px] rounded-[1.625rem] overflow-hidden border border-border bg-card shadow-2xl transition-shadow duration-[600ms] group pointer-events-auto"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Badge Overlay (only when active) */}
              {item.badge && isActive && (
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white backdrop-blur-md shadow-sm border border-white/10"
                    style={{ backgroundColor: `${item.accentColor || "#3b82f6"}cc` }}
                  >
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Bottom Details */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col justify-end transition-all duration-[600ms] ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="space-y-2 max-w-sm text-left">
                  <h3 className="text-lg md:text-3xl font-bold font-sans text-white tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-white/65 text-[11px] md:text-sm font-medium leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                  {item.link && isActive && (
                    <div className="pt-2">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-accent transition-colors"
                        style={{ "--accent-hover": item.accentColor } as React.CSSProperties}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Explore More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Slide Indicators / Bottom Navigation Dots */}
      <div className="flex gap-2.5 mt-8 z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              let target = i
              let diff = target - scrollPosition
              if (diff > items.length / 2) target -= items.length
              if (diff < -items.length / 2) target += items.length
              targetPosition.current = target
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            style={{ backgroundColor: i === activeIndex ? activeItem?.accentColor : undefined }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
