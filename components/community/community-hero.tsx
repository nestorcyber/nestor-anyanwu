import React from "react"
import Image from "next/image"

export default function CommunityHero() {
  return (
    <section className="relative h-[62svh] min-h-[380px] sm:h-[75svh] md:h-[calc(100svh-4rem)] md:min-h-[640px] flex flex-col justify-end overflow-hidden bg-slate-950">
      {/* Background image - edge to edge */}
      <Image
        src="https://res.cloudinary.com/z3wgqisj/image/upload/v1787285712/nestor/gallery/IMG_0452_a2kkcl.jpg"
        alt="Nestor Anyanwu Community Volunteering & Impact"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-[50%_32%] sm:object-[50%_36%] md:object-[50%_38%] lg:object-[50%_36%]"
      />

      {/* Overlay gradient - clear subject visibility, strong contrast for bottom typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent sm:from-black/85 sm:via-black/35 sm:to-transparent" />

      {/* Content in Lower Third with Center-Left Alignment matching Home Hero */}
      <div className="relative z-10 w-full site-container pb-8 sm:pb-14 md:pb-20 lg:pb-24">
        <div className="max-w-3xl text-left">
          <h1 className="font-sans text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-0 leading-[1.1] tracking-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Building Impact Beyond the Screen
          </h1>
        </div>
      </div>
    </section>
  )
}
