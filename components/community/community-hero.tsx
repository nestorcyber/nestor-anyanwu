import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"

export default function CommunityHero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 sm:py-20 md:py-24 border-b border-border/70 bg-slate-950 text-white overflow-hidden flex flex-col justify-center">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Eyebrow, Main Heading, Narrative Pitch & CTAs                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading leading-[1.08] text-white">
              Building Impact <br />
              <span className="text-[#0075ff]">Beyond the Screen.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Documenting my journey in service, grassroots technical leadership, developer relations, event operations, and community ecosystem building. From staging international developer conferences to mentoring the next wave of engineers.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#experiences"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Experiences</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                <span>Let&apos;s Collaborate</span>
              </Link>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Asymmetrical Visual Event Collage Showcase                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl group bg-slate-900">
              <Image
                src="/devfest24-solo.jpg"
                alt="Nestor Anyanwu volunteering at DevFest"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#0075ff]">
                  <span className="font-bold">DEVFEST &bull; GDG OWERRI</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3" /> Owerri, NG
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  Lead Designer &amp; Technical Branding for 1,500+ attendees.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
