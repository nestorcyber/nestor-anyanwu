import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-screen flex flex-col items-end justify-end md:items-center md:justify-start overflow-hidden pt-16 md:pt-0 -mx-4 md:-mx-8">
      {/* Background image - edge to edge */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-center md:object-center"
        priority
      />

      {/* Overlay gradient - darker on mobile for bottom text, subtle on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:bg-gradient-to-t md:from-black/50 md:via-black/20 md:to-transparent"></div>

      {/* Dark overlay panel for text readability on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent md:from-transparent md:to-transparent md:h-auto"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-16 lg:px-24 pb-16 md:pb-0 md:pt-32 md:flex md:items-center md:justify-start md:h-full">
        <div className="max-w-3xl">
          <p className="text-white text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-2 uppercase">
            Your journey begins here
          </p>
          <h1 className="font-sans text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-0 leading-tight">
            A Journey of Impact
          </h1>
        </div>
      </div>
    </section>
  )
}
