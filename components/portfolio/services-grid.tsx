import React from "react"
import type { ServiceItem } from "@/lib/content"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield } from "lucide-react"

export default function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="w-5 h-5 text-accent" />
      case "Globe":
        return <Globe className="w-5 h-5 text-accent" />
      case "Layout":
        return <Layout className="w-5 h-5 text-accent" />
      case "Palette":
        return <Palette className="w-5 h-5 text-accent" />
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-accent" />
      case "Zap":
        return <Zap className="w-5 h-5 text-accent" />
      case "Shield":
        return <Shield className="w-5 h-5 text-accent" />
      default:
        return <Code className="w-5 h-5 text-accent" />
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

        {/* Services Grid (5 Square Cards, 3 on a row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedServices.map((service) => (
            <div
              key={service.id}
              className="aspect-square p-6 sm:p-7 bg-card border border-border/70 rounded-xl flex flex-col justify-between hover:border-accent transition-all shadow-xs group"
            >
              <div className="space-y-4">
                <div className="p-3 bg-secondary/80 border border-border/80 rounded-xl w-fit shadow-2xs group-hover:bg-accent/10 transition-colors">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-foreground font-heading">
                  {service.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
