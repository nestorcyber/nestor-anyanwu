"use client"

import React from "react"
import Image from "next/image"
import type { BrandPartner } from "@/lib/content"

export default function TrustedBrands({ brands = [] }: { brands: BrandPartner[] }) {
  if (!brands || brands.length === 0) return null

  // Duplicate brand items for a continuous, seamless 360 infinite marquee animation loop
  const marqueeItems = [...brands, ...brands, ...brands, ...brands]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border/60 overflow-hidden">
      {/* Title Header */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Trusted By
        </h2>
        <div className="h-1 w-12 bg-accent mx-auto mt-2" />
      </div>

      {/* Infinite Animated Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft edge fade gradients for smooth in & out movement */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Scrolling Marquee Track */}
        <div className="flex items-center gap-12 sm:gap-16 md:gap-20 w-max animate-marquee-loop hover:[animation-play-state:paused] py-4">
          {marqueeItems.map((brand, idx) => {
            const itemKey = `${brand.id}-${idx}`
            const logoContent = (
              <div className="group relative flex items-center justify-center shrink-0 w-44 sm:w-56 md:w-64 h-24 sm:h-28 md:h-32 transition-transform duration-300 hover:scale-110 cursor-pointer">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 260px"
                    className="object-contain transition-all duration-300 filter drop-shadow-sm"
                  />
                </div>
                <span className="sr-only">{brand.name}</span>
              </div>
            )

            if (brand.websiteUrl) {
              return (
                <a
                  key={itemKey}
                  href={brand.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${brand.name}`}
                  className="shrink-0"
                >
                  {logoContent}
                </a>
              )
            }

            return (
              <div key={itemKey} className="shrink-0">
                {logoContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
