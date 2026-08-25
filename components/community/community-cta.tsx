import React from "react"
import Link from "next/link"
import { ArrowRight, HeartHandshake, Mail, MessageSquare } from "lucide-react"

export default function CommunityCTA() {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] py-16 md:py-24 bg-background flex flex-col justify-center">
      <div className="site-container">
        <div className="bg-[#0B1C2C] text-white border border-border/80 rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
          
          {/* Blueprint grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0075ff]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Top Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-[#0075ff] border border-white/15 mx-auto">
              <HeartHandshake className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading leading-tight text-white">
              Let&apos;s Build Something <br />
              <span className="text-[#0075ff]">That Matters.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Whether you are organizing a developer conference, spearheading a grassroots tech chapter, looking for a technical workshop speaker, or launching a community impact initiative — I am always open to meaningful collaborations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Collaborate With Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="mailto:nestoranyanwu@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#0075ff]" />
                <span>Get In Touch</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
