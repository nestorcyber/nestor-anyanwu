import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-screen flex flex-col items-end justify-end md:items-center md:justify-start overflow-hidden pt-16 md:pt-0 -mx-4 md:-mx-8">
      {/* Background image - edge to edge, face centered on mobile */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg"
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
      <div className="relative z-10 w-full px-6 md:px-20 lg:px-32 pb-16 md:pb-0 md:pt-32 md:flex md:items-center md:justify-start md:h-full">
        <div className="max-w-3xl">
          <p className="text-white text-xs md:text-sm font-bold tracking-widest mb-3 md:mb-2 uppercase">
            THE CHRONICLES OF NESTOR ANYANWU
          </p>
          <h1 className="font-sans text-2xl md:text-6xl lg:text-7xl font-bold text-white mb-0 leading-tight">
            A Journey of Innovation & Purpose
          </h1>
        </div>
      </div>
    </section>
  )
}
