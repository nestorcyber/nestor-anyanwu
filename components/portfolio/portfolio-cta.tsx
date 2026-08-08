import React from "react"
import Link from "next/link"
import { ArrowUpRight, Calendar, Mail } from "lucide-react"

export default function PortfolioCTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1C2C] text-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 p-8 sm:p-12 md:p-16 text-center space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-accent block">
            // COLLABORATION & INQUIRIES
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase max-w-3xl mx-auto font-heading leading-snug">
            Let's Build Something Impactful
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Ready to kick off a software build, enterprise brand system, technical advisory, or community tech initiative? Get in touch today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <button className="bg-accent hover:bg-accent/90 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer">
                <span>Start A Project</span>
                <ArrowUpRight size={15} />
              </button>
            </Link>

            <Link href="/contact">
              <button className="bg-card text-foreground border-2 border-slate-900 font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer">
                <Calendar size={15} />
                <span>Book Consultation</span>
              </button>
            </Link>

            <a
              href="mailto:nestoranyanwu@gmail.com"
              className="bg-card text-foreground border-2 border-slate-900 font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail size={15} />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
