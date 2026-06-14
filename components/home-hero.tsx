import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-0 -mx-4 md:-mx-8">
      {/* Background image - edge to edge, face centered on mobile */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay gradient - darker on mobile for bottom text, subtle on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent md:from-black/40 md:via-transparent to-transparent"></div>

      {/* Dark overlay panel for text readability on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black/90 via-black/70 to-transparent md:from-transparent md:via-transparent md:to-transparent md:h-auto"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-20 lg:px-32 flex items-center justify-center md:justify-start md:h-full md:pt-32">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-white md:text-black text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-2 uppercase">
            Your journey begins here
          </p>
          <h1 className="font-sans text-2xl md:text-6xl lg:text-7xl font-bold text-white md:text-black mb-0 leading-tight">
            A Journey of Impact
          </h1>
        </div>
      </div>
    </section>
  )
}
