"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToExperiences = () => {
    const element = document.getElementById("experiences")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />

      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8">
          A Journey of Impact — <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 relative">
            One Step at a Time
            <span className="absolute -top-2 -right-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
          </span>
        </h1>

        <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
          Hi, I'm <span className="font-bold text-slate-900">Nestor Anyanwu</span>. Every volunteering experience I've
          had tells a story of collaboration, creativity, and community impact. Here's a look at the moments that shaped
          my journey.
        </p>

        <p className="text-lg text-slate-500 font-medium mb-10">
          I'm passionate about Design, Technology, Self-Development, Community, and Volunteering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToExperiences}
            size="lg"
            className="h-12 px-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            Explore My Volunteering Moments
          </Button>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="h-12 px-8 rounded-full border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all bg-transparent cursor-pointer"
          >
            Let's Collaborate
          </Button>
        </div>
      </div>
    </section>
  )
}
