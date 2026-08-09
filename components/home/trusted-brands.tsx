"use client"

import React from "react"
import Image from "next/image"
import type { BrandPartner } from "@/lib/content"

export default function TrustedBrands({ brands = [] }: { brands: BrandPartner[] }) {
  if (!brands || brands.length === 0) return null

  // Duplicate list for infinite smooth marquee scroll effect if items are present
  const marqueeList = [...brands, ...brands, ...brands]

  return (
    <section className="w-full py-12 md:py-16 bg-background border-b border-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Trusted By
        </h2>
        <div className="h-1 w-12 bg-accent mx-auto mt-2" />
      </div>

      {/* Responsive Marquee / Logo Track */}
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        {/* Subtle Fade Gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-6xl mx-auto px-6">
          {brands.map((brand) => {
            const content = (
              <div
                key={brand.id}
                className="group relative flex items-center justify-center p-3 sm:p-4 transition-transform duration-300 hover:scale-105 cursor-pointer w-32 sm:w-44 h-16 sm:h-20"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 130px, 180px"
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">{brand.name}</span>
              </div>
            )

            if (brand.websiteUrl) {
              return (
                <a
                  key={brand.id}
                  href={brand.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${brand.name}`}
                >
                  {content}
                </a>
              )
            }

            return <div key={brand.id}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}
