import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-[62svh] min-h-[380px] sm:h-[75svh] md:h-[calc(100svh-4rem)] md:min-h-[640px] flex flex-col justify-end overflow-hidden bg-slate-950">
      {/* Background image - edge to edge, subject nicely framed on mobile */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg"
        alt="Nestor speaking at event"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-[50%_22%] sm:object-[60%_15%] md:object-center"
      />

      {/* Overlay gradient - clear subject portrait, strong contrast for bottom typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent sm:from-black/85 sm:via-black/35 sm:to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full site-container pb-6 sm:pb-12 md:pb-20">
        <div className="max-w-3xl text-left">
          <h1 className="font-sans text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-0 leading-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
            A Journey of Innovation & Purpose
          </h1>
        </div>
      </div>
    </section>
  )
}
