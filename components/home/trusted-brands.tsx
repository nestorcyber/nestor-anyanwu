"use client"

import React from "react"
import type { BrandPartner } from "@/lib/content"

export default function TrustedBrands({ brands = [] }: { brands: BrandPartner[] }) {
  if (!brands || brands.length === 0) return null

  // Duplicate brand items for a continuous, seamless infinite marquee animation loop
  const marqueeItems = [...brands, ...brands, ...brands, ...brands]

  return (
    <section className="w-full py-6 md:py-8 bg-background border-y border-border/60 overflow-hidden">
      {/* Infinite Animated Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft edge fade gradients for smooth in & out movement */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Scrolling Marquee Track with Visually Equal Logo Spacing */}
        <div className="flex items-center gap-12 sm:gap-16 md:gap-20 w-max animate-marquee-loop hover:[animation-play-state:paused] py-2 px-4">
          {marqueeItems.map((brand, idx) => {
            const itemKey = `${brand.id}-${idx}`
            const logoImage = (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            )

            if (brand.websiteUrl) {
              return (
                <a
                  key={itemKey}
                  href={brand.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${brand.name}`}
                  className="shrink-0 flex items-center justify-center"
                >
                  {logoImage}
                </a>
              )
            }

            return (
              <div key={itemKey} className="shrink-0 flex items-center justify-center">
                {logoImage}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
