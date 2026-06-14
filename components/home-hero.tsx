import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative w-screen h-screen flex items-center overflow-hidden -mx-[calc((100vw-100%)/2)]">
      {/* Background image - full width edge to edge */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-OAX4U3qOniz92vTfXvJTrGXD168ibf.jpg"
        alt="Nestor speaking at event"
        fill
        className="object-cover object-center md:object-left"
        priority
      />

      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-secondary text-xs md:text-sm font-bold tracking-widest mb-2">
            Your journey begins here
          </p>
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-0 leading-tight">
            A Journey of Impact
          </h1>
        </div>
      </div>
    </section>
  )
}
