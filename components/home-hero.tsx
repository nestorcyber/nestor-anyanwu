import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden pt-16 md:pt-0 -mx-4 md:-mx-8">
      {/* Background image - edge to edge */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-jwNXILOOhWA26ePzvza9GudcffKa9R.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-center md:object-center"
        priority
      />

      {/* Overlay gradient - darker on mobile, subtle on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:bg-gradient-to-t md:from-black/40 md:via-transparent md:to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-16 lg:px-24 pb-12 md:pb-20 md:flex md:items-center md:justify-start md:h-full">
        <div className="max-w-3xl">
          <p className="text-white text-xs md:text-sm font-bold tracking-widest mb-2">
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
