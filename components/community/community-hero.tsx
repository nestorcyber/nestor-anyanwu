import React from "react"
import Image from "next/image"
import { Users } from "lucide-react"

interface CommunityHeroProps {
  photos?: { imageUrl: string; title?: string }[]
  entries?: { coverImage?: string; organization?: string }[]
}

const CARD_CONFIGS = [
  {
    rotation: "-rotate-6 sm:-rotate-8",
    zIndex: "z-10",
    marginTop: "mt-6 sm:mt-10 md:mt-12",
    hideOnMobile: "hidden sm:block",
  },
  {
    rotation: "-rotate-3 sm:-rotate-4",
    zIndex: "z-15",
    marginTop: "mt-3 sm:mt-5 md:mt-6",
    hideOnMobile: "",
  },
  {
    rotation: "rotate-0",
    zIndex: "z-20",
    marginTop: "mt-0",
    hideOnMobile: "",
  },
  {
    rotation: "rotate-3 sm:rotate-4",
    zIndex: "z-15",
    marginTop: "mt-3 sm:mt-5 md:mt-6",
    hideOnMobile: "",
  },
  {
    rotation: "rotate-6 sm:rotate-8",
    zIndex: "z-10",
    marginTop: "mt-6 sm:mt-10 md:mt-12",
    hideOnMobile: "hidden sm:block",
  },
]

export default function CommunityHero({ photos = [], entries = [] }: CommunityHeroProps) {
  // Collect unique valid images from dashboard volunteering photos and community entries
  const dynamicItems: { src: string; alt: string }[] = []

  photos.forEach((p) => {
    if (p.imageUrl && !p.imageUrl.includes("placeholder") && !dynamicItems.some((d) => d.src === p.imageUrl)) {
      dynamicItems.push({ src: p.imageUrl, alt: p.title || "Community Event" })
    }
  })

  entries.forEach((e) => {
    if (e.coverImage && !e.coverImage.includes("placeholder") && !dynamicItems.some((d) => d.src === e.coverImage)) {
      dynamicItems.push({ src: e.coverImage, alt: e.organization || "Community Leadership" })
    }
  })

  const fallbackDefaults = [
    { src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837102/nestor/gallery/devfest24-group.jpg", alt: "Community Gathering" },
    { src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837078/nestor/gallery/aws-team.jpg", alt: "Tech Community Team" },
    { src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837146/nestor/gallery/gida-team-moment.jpg", alt: "Developer Community Moment" },
    { src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837144/nestor/gallery/gida-large-group.jpg", alt: "Community Summit" },
    { src: "https://res.cloudinary.com/z3wgqisj/image/upload/v1787837090/nestor/gallery/conference-crowd.jpg", alt: "Tech Conference Crowd" },
  ]

  const pool = dynamicItems.length > 0 ? dynamicItems : fallbackDefaults

  const showcaseCards = CARD_CONFIGS.map((config, idx) => {
    const item = pool[idx % pool.length]
    return {
      ...config,
      src: item.src,
      alt: item.alt,
    }
  })

  const heroBgImage = pool[0]?.src || "https://res.cloudinary.com/z3wgqisj/image/upload/v1787285712/nestor/gallery/IMG_0452_a2kkcl.jpg"

  return (
    <section className="relative w-full h-[70svh] min-h-[480px] sm:h-[78svh] md:h-[calc(100svh-4rem)] md:min-h-[620px] md:max-h-[740px] flex flex-col justify-between overflow-hidden bg-slate-950 text-white pt-14 sm:pt-16 md:pt-20 pb-0 border-b border-border/40">
      
      {/* 1. Full Hero Background Image (Edge-to-Edge) */}
      <Image
        src={heroBgImage}
        alt="Nestor Anyanwu Community Volunteering & Impact"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-[50%_28%] scale-105"
      />

      {/* Background Overlays & Ambience Gradients */}
      <div className="absolute inset-0 bg-slate-950/70 via-slate-950/50 to-slate-950/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Top / Center Hero Headline & Content */}
      <div className="site-container relative z-20 text-center space-y-3 sm:space-y-5 max-w-4xl mx-auto pt-2 sm:pt-4">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.12] text-white [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]">
          Building Impact <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0075ff] via-sky-400 to-indigo-300">
            Beyond the Screen
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
          Empowering builder ecosystems, facilitating developer summits, and championing grassroots technology education across Nigeria.
        </p>

      </div>

      {/* 3. Bottom Polaroid Fanned Image Array (Nested directly into the bottom so the lower half is submerged) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-20 mt-auto translate-y-5 sm:translate-y-7 md:translate-y-9">
        
        {/* Fanned Card Row */}
        <div className="flex items-end justify-center -space-x-4 sm:-space-x-8 md:-space-x-12 lg:-space-x-14">
          {showcaseCards.map((card, idx) => (
            <div
              key={idx}
              className={`relative ${card.zIndex} ${card.rotation} ${card.marginTop} ${card.hideOnMobile} transition-all duration-500 ease-out hover:z-40 hover:scale-105 hover:-translate-y-4 cursor-pointer group`}
            >
              {/* Taller Portrait Card with Sharp Edges and Thin Crisp Stroke */}
              <div className="w-[155px] xs:w-[185px] sm:w-[215px] md:w-[250px] lg:w-[280px] aspect-[9/13.5] bg-white p-1 sm:p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/90 transition-all duration-300">
                <div className="relative w-full h-full overflow-hidden bg-slate-900">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle inner card vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-10 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Seamless Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-30" />

      </div>

    </section>
  )
}
