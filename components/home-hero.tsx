import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-screen flex flex-col items-end justify-end md:items-center md:justify-start overflow-hidden">
      {/* Background image - edge to edge, face centered on mobile */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-[70%_15%] md:object-center"
        priority
      />

      {/* Overlay gradient - strong contrast across all screen sizes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent md:bg-gradient-to-t md:from-black/80 md:via-black/45 md:to-transparent"></div>

      {/* Dark overlay panel for text readability on mobile and desktop */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 to-transparent md:from-black/50 md:to-transparent md:h-full"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-20 lg:px-32 pb-16 md:pb-0 md:pt-32 md:flex md:items-center md:justify-start md:h-full">
        <div className="max-w-3xl">
          <p className="text-white text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-2 uppercase [text-shadow:_0_1px_2px_rgba(0,0,0,0.6)]">
            THE CHRONICLES OF NESTOR ANYANWU
          </p>
          <h1 className="font-sans text-2xl md:text-6xl lg:text-7xl font-bold text-white mb-0 leading-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
            A Journey of Innovation & Purpose
          </h1>
        </div>
      </div>
    </section>
  )
}
