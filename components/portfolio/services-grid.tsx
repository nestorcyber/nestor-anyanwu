import React from "react"
import type { ServiceItem } from "@/lib/content"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield, Users, Sparkles } from "lucide-react"

export default function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const getIcon = (iconName?: string) => {
    const iconClass = "w-7 h-7 text-white transition-transform group-hover:scale-110"
    switch (iconName) {
      case "Code":
        return <Code className={iconClass} />
      case "Globe":
        return <Globe className={iconClass} />
      case "Layout":
        return <Layout className={iconClass} />
      case "Palette":
        return <Palette className={iconClass} />
      case "Briefcase":
        return <Briefcase className={iconClass} />
      case "Zap":
        return <Zap className={iconClass} />
      case "Shield":
        return <Shield className={iconClass} />
      case "Users":
        return <Users className={iconClass} />
      default:
        return <Sparkles className={iconClass} />
    }
  }

  // 6 Core Pillars integrating Technology, Design, Community Building, Volunteering, Impact, AI, IT Consulting, DevRel, Software Engineering, Web Development
  const CORE_SERVICES: ServiceItem[] = [
    {
      id: "software-engineering",
      title: "Software Engineering",
      description:
        "Building production-grade web applications, robust APIs, and custom software architectures tailored for performance, high throughput, and long-term enterprise maintainability.",
      iconName: "Code",
    },
    {
      id: "web-development",
      title: "Web Development",
      description:
        "Crafting responsive, high-performance web platforms and digital interfaces using Next.js, React, and modern TypeScript. Fast, secure, accessible, and optimized for conversion.",
      iconName: "Globe",
    },
    {
      id: "ai-workflows",
      title: "AI Workflows & Automation",
      description:
        "Designing intelligent AI-assisted workflows, data integration pipelines, and custom digital tools that eliminate operational bottlenecks and dramatically accelerate business velocity.",
      iconName: "Zap",
    },
    {
      id: "brand-design",
      title: "Brand Systems & Design",
      description:
        "Engineering cohesive visual design systems, UI/UX frameworks, digital assets, and marketing collateral with precise typography and visual hierarchy that command brand authority.",
      iconName: "Palette",
    },
    {
      id: "it-consulting",
      title: "IT Advisory & Consulting",
      description:
        "Providing strategic technology audits, system architecture advisory, and infrastructure consulting to guide startups and enterprise organizations toward optimal stack decisions.",
      iconName: "Shield",
    },
    {
      id: "devrel-community",
      title: "DevRel & Community Impact",
      description:
        "Driving developer advocacy, technical workshops, hands-on volunteering, and high-impact ecosystem programs that mentor talent and foster thriving engineering communities.",
      iconName: "Users",
    },
  ]

  const getSublabel = (id: string) => {
    switch (id) {
      case "software-engineering":
        return "Scalable Systems & APIs"
      case "web-development":
        return "Modern Full-Stack Platforms"
      case "ai-workflows":
        return "Machine Intelligence & Automation"
      case "brand-design":
        return "Visual Hierarchy & Identity"
      case "it-consulting":
        return "Strategic Tech Architecture"
      case "devrel-community":
        return "Ecosystems & Tech Leadership"
      default:
        return "Technology Solutions"
    }
  }

  return (
    <section id="services" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center">
      <div className="container-webflow space-y-10">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Services &amp; <span className="text-[#0075ff]">Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Comprehensive full-stack engineering, AI automation, visual design systems, IT consulting, and developer ecosystem leadership engineered for measurable impact.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-1" />
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_SERVICES.map((service) => {
            const sublabel = getSublabel(service.id || "")
            return (
              <div
                key={service.id}
                className="p-7 sm:p-8 bg-card border border-border/70 rounded-3xl flex flex-col justify-between hover:border-[#0075ff] hover:shadow-xl transition-all duration-300 group shadow-xs min-h-[340px] sm:min-h-[360px]"
              >
                <div>
                  {/* Dark Rounded Squircle Icon Badge */}
                  <div className="w-14 h-14 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center p-3.5 shadow-md border border-slate-800/80 mb-6 group-hover:scale-105 group-hover:bg-[#0075ff] transition-all duration-300">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Main Card Heading */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-heading tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors mb-1.5">
                    {service.title}
                  </h3>

                  {/* Sub-label Tagline */}
                  <p className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 tracking-wider mb-4">
                    {sublabel}
                  </p>

                  {/* Body Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
