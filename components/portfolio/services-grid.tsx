import React from "react"
import Link from "next/link"
import SectionHeader from "@/components/shared/section-header"
import { servicesList } from "@/lib/data"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield, ArrowUpRight } from "lucide-react"

export default function ServicesGrid() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="w-6 h-6 text-accent" />
      case "Globe":
        return <Globe className="w-6 h-6 text-accent" />
      case "Layout":
        return <Layout className="w-6 h-6 text-accent" />
      case "Palette":
        return <Palette className="w-6 h-6 text-accent" />
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-accent" />
      case "Zap":
        return <Zap className="w-6 h-6 text-accent" />
      case "Shield":
        return <Shield className="w-6 h-6 text-accent" />
      default:
        return <Code className="w-6 h-6 text-accent" />
    }
  }

  return (
    <section className="w-full py-16 md:py-24 border-b border-border/60 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="CAPABILITIES & SERVICES"
          title="What I Deliver"
          subtitle="Specialized services available for startups, organizations, enterprise clients, and community initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="p-8 bg-card border border-border/60 hover:border-accent rounded-none transition-all duration-300 grid-cell-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="p-3 bg-accent/10 border border-accent/20 w-fit">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-extrabold text-foreground tracking-tight uppercase">
                  {service.title}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <Link href={service.ctaHref}>
                  <button className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                    <span>{service.ctaText}</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
