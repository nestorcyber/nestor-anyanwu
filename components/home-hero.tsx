import Image from "next/image"

export default function HomeHero() {
  return (
    <section className="relative h-[62svh] min-h-[380px] sm:h-[75svh] md:h-[calc(100svh-4rem)] md:min-h-[640px] flex flex-col justify-end overflow-hidden bg-slate-950">
      {/* Background image - edge to edge */}
      <Image
        src="https://res.cloudinary.com/z3wgqisj/image/upload/v1785966490/Hero_dnkxet.jpg"
        alt="Nestor Anyanwu"
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        className="object-cover object-[70%_20%] sm:object-[70%_20%] md:object-[68%_20%] lg:object-[65%_20%]"
      />

      {/* Overlay gradient - clear subject portrait, strong contrast for bottom typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent sm:from-black/85 sm:via-black/35 sm:to-transparent" />

      {/* Content in Lower Third with Center-Left Alignment */}
      <div className="relative z-10 w-full site-container pb-8 sm:pb-14 md:pb-20 lg:pb-24">
        <div className="max-w-3xl text-left">
          <h1 className="font-sans text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-0 leading-[1.1] tracking-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            A Journey of Innovation & Purpose
          </h1>
        </div>
      </div>
    </section>
  )
}
