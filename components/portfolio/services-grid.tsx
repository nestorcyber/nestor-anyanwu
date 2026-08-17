import React from "react"
import type { ServiceItem } from "@/lib/content"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield } from "lucide-react"

export default function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const getIcon = (iconName: string) => {
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
      default:
        return <Code className={iconClass} />
    }
  }

  // Filter out business registration card completely
  const filtered = services.filter(
    (s) =>
      !s.id?.toLowerCase().includes("business-reg") &&
      !s.title?.toLowerCase().includes("business registration")
  )

  // Enforce requested order: 1. Design, 2. Website, 3. Software, 4. Consultation, 5. Automation
  const getOrderRank = (item: ServiceItem) => {
    const t = item.title.toLowerCase()
    const id = (item.id || "").toLowerCase()
    if (t.includes("design") || id.includes("graphic")) return 1
    if (t.includes("website") || id.includes("web-dev")) return 2
    if (t.includes("software") || id.includes("software")) return 3
    if (t.includes("consult") || t.includes("advisory") || id.includes("consulting")) return 4
    if (t.includes("auto") || id.includes("automation")) return 5
    return 6
  }

  const getServiceMeta = (item: ServiceItem) => {
    const t = item.title.toLowerCase()
    const id = (item.id || "").toLowerCase()
    
    if (t.includes("design") || id.includes("graphic")) {
      return {
        sublabel: "Visual Systems & Brand Identity",
        fullDescription:
          "I craft cohesive visual identity systems, event graphics, marketing collateral, and brand assets. By combining strategic typography with modern visual hierarchy, I deliver brand identity designs that command credibility and audience trust.",
      }
    }
    if (t.includes("website") || id.includes("web-dev")) {
      return {
        sublabel: "Frontend & Backend Platforms",
        fullDescription:
          "I build responsive, high-performance web applications using modern frameworks like Next.js, React, and Tailwind CSS. From pixel-perfect frontends to scalable backend architectures, I deliver full-stack solutions that are fast, secure, and user-friendly.",
      }
    }
    if (t.includes("software") || id.includes("software")) {
      return {
        sublabel: "Production Software & APIs",
        fullDescription:
          "Building production-grade web applications, robust APIs, and custom software systems tailored for performance and scale. I write clean, maintainable code engineered to handle complex business logic and real-world traffic.",
      }
    }
    if (t.includes("consult") || t.includes("advisory") || id.includes("consulting")) {
      return {
        sublabel: "IT Advisory & Architecture",
        fullDescription:
          "Providing strategic IT advisory, technology audits, system automation, and digital infrastructure consulting. I guide startups, developer chapters, and enterprise clients through tech stack selection and architecture decisions.",
      }
    }
    if (t.includes("auto") || id.includes("automation")) {
      return {
        sublabel: "Workflows & Digital Systems",
        fullDescription:
          "Designing automated workflows, data integration pipelines, and custom digital operational tools. I streamline repetitive organizational tasks to boost efficiency, eliminate manual bottlenecks, and accelerate growth.",
      }
    }
    return {
      sublabel: "Technical Solutions & Engineering",
      fullDescription: item.description,
    }
  }

  const orderedServices = [...filtered].sort((a, b) => getOrderRank(a) - getOrderRank(b))

  return (
    <section id="services" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Services
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Specialized technical services for clients.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Services Grid (Matching 2nd Reference Screenshot: Dark Squircle Badges, Bigger Main Heading, Sub-labels & Rich Filled Card Body) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedServices.map((service) => {
            const { sublabel, fullDescription } = getServiceMeta(service)
            return (
              <div
                key={service.id}
                className="p-7 sm:p-8 bg-card border border-border/70 rounded-3xl flex flex-col justify-between hover:border-accent hover:shadow-xl transition-all duration-300 group shadow-xs min-h-[380px] sm:min-h-[400px]"
              >
                <div>
                  {/* Dark Rounded Squircle Icon Badge (Matching 2nd Reference Screenshot) */}
                  <div className="w-14 h-14 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center p-3.5 shadow-md border border-slate-800/80 mb-6 group-hover:scale-105 group-hover:bg-[#0075ff] transition-all duration-300">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Bigger Main Card Heading (Matching 2nd Reference Screenshot) */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground font-heading tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors mb-1.5">
                    {service.title}
                  </h3>

                  {/* Sub-label Tagline (Matching 2nd Reference Screenshot) */}
                  <p className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">
                    {sublabel}
                  </p>

                  {/* Rich Filled Card Body Description (Matching 2nd Reference Screenshot) */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                    {fullDescription}
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
