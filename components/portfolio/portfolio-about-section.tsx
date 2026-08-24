import React from "react"
import Link from "next/link"
import { ArrowRight, Code2, Users, Cpu, ShieldCheck } from "lucide-react"
import type { SiteSettings } from "@/lib/content"

export default function PortfolioAboutSection({ settings }: { settings?: SiteSettings }) {
  const pillars = [
    {
      icon: Code2,
      title: "Software Engineering & Web Development",
      description:
        "Architecting resilient, type-safe full-stack web applications, scalable backend APIs, and modern cloud systems engineered for enterprise performance and seamless user experience.",
    },
    {
      icon: Users,
      title: "DevRel, Community Building & Impact",
      description:
        "Championing developer ecosystems through technical advocacy, hands-on volunteering, workshop leadership, and impactful open programs that empower global tech talent.",
    },
    {
      icon: Cpu,
      title: "AI Workflows, Design & IT Consulting",
      description:
        "Delivering strategic IT advisory, AI-powered automation pipelines, and cohesive brand design systems that accelerate organizational velocity and solve mission-critical challenges.",
    },
  ]

  return (
    <section
      id="about"
      className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 sm:py-20 md:py-28 border-b border-border/70 bg-white dark:bg-background overflow-hidden relative flex flex-col justify-center"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Large Heading, Subtitle & Action Link                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-foreground tracking-tight font-heading leading-[1.08]">
                Bridging Technical{" "}
                <br className="hidden sm:inline" />
                Precision &amp;{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#0075ff]">Human Impact</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground font-normal leading-relaxed max-w-md">
                Operating at the nexus of full-stack software development, AI automation, developer relations, and strategic IT consulting to build solutions that scale.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0075ff] hover:text-[#005cd9] transition-colors group cursor-pointer"
              >
                <span>Explore Full Story &amp; Vision</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 3 Value Proposition / Core Pillars                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-8 sm:space-y-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div key={idx} className="flex items-start gap-4 sm:gap-5 group">
                  {/* Clean Electric Blue Outline Icon */}
                  <div className="mt-1 shrink-0 text-[#0075ff]">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Pillar Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-normal leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
