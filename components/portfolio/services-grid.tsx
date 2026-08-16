import React from "react"
import Link from "next/link"
import type { ServiceItem } from "@/lib/content"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield, ArrowUpRight } from "lucide-react"

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
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Services & Consulting Offering</h2>
              <p className="text-xs text-muted-foreground">Specialized services for tech startups, organizations, and enterprise teams.</p>
            </div>
          </div>
          
          <Link href="/contact" className="text-xs font-bold text-accent hover:underline">
            Inquire service →
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-card border border-border/70 rounded-2xl flex flex-col justify-between space-y-5 hover:border-accent transition-all shadow-xs"
            >
              <div className="space-y-3.5">
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

              <div className="pt-3 border-t border-border/40">
                <Link href={service.ctaHref} className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1">
                  <span>{service.ctaText}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
