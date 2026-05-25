import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative w-full h-screen flex items-end overflow-hidden pt-16 md:pt-20">
      {/* Background image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OG%20quote-BHHcl2O0kvGuuo2DaGtrRhPArOE0Ph.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-center md:object-right-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pb-16 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-secondary text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
            Your journey begins here
          </p>
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-0 leading-tight">
            A Journey of Impact
          </h1>
        </div>
      </div>
    </section>
  )
}
