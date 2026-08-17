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

  return (
    <section id="services" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Services & Offerings
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Specialized services for tech startups, student developer communities, and enterprise teams.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-card border border-border/70 rounded-xl flex flex-col space-y-3.5 hover:border-accent transition-all shadow-xs"
            >
              <div className="p-3 bg-secondary/80 border border-border/80 rounded-xl w-fit shadow-2xs">
                {getIcon(service.iconName)}
              </div>

              <h3 className="text-base font-bold text-foreground">
                {service.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
