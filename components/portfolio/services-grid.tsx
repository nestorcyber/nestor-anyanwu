import React from "react"
import Link from "next/link"
import type { ServiceItem } from "@/lib/content"
import { Code, Globe, Layout, Palette, Briefcase, Zap, Shield, ArrowUpRight, Wrench } from "lucide-react"

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
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Services & Consulting Offering</h2>
                <p className="text-xs text-muted-foreground">Specialized services for tech startups, organizations, and enterprise teams.</p>
              </div>
            </div>
            
            <Link href="/contact" className="text-xs font-bold text-accent hover:underline">
              Inquire service →
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-5 bg-secondary/30 border border-border/70 rounded-xl flex flex-col justify-between space-y-4 hover:border-accent transition-all shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-card border border-border/80 rounded-lg w-fit shadow-2xs">
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
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
