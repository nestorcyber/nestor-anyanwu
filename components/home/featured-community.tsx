import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import { Users, Award, ShieldCheck, Heart, Sparkles, Building, ArrowUpRight } from "lucide-react"

export default function FeaturedCommunity() {
  const communityWork = [
    {
      organization: "NACOS NATIONAL & NACOS FUTO",
      role: "DIRECTOR OF ICT",
      description: "Leading digital strategy and ICT infrastructure supporting thousands of computing students across Nigeria.",
      icon: <Users className="w-5 h-5 text-accent" />,
      tag: "COMPUTING ECOSYSTEM",
    },
    {
      organization: "GOOGLE DEVELOPER GROUP (GDG OWERRI)",
      role: "GRAPHIC DESIGNER & EVENT LOGISTICS",
      description: "Contributing major visual assets, brand identity, and logistics support for South-East Nigeria's largest developer conferences.",
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      tag: "DEVELOPER COMMUNITY",
    },
    {
      organization: "COWRYWISE",
      role: "CAMPUS AMBASSADOR",
      description: "Advocating for financial literacy, investment habit adoption, and fintech technology among university students.",
      icon: <Building className="w-5 h-5 text-accent" />,
      tag: "FINANCIAL LITERACY",
    },
    {
      organization: "FLE GLOBAL & EDENSPRIME SUMMIT",
      role: "EVENT LOGISTICS & SETUP",
      description: "Coordinating behind-the-scenes event setup and logistics for leadership, entrepreneurship, and hospitality summits.",
      icon: <Award className="w-5 h-5 text-accent" />,
      tag: "LEADERSHIP SUMMITS",
    },
  ]

  return (
    <SectionContainer id="community-work" className="bg-secondary/30">
      <SectionHeader
        badge="FEATURED COMMUNITY WORK"
        title="Organizations & Volunteer Impact"
        subtitle="Dedicated to serving developer chapters, national student bodies, and leadership conferences through active contribution and service."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-collapse">
        {communityWork.map((item, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 border border-border/60 hover:border-accent bg-card/80 rounded grid-cell-card space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <div className="p-2 bg-accent/10 rounded">{item.icon}</div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">
                {item.organization}
              </h3>
              <p className="text-xs font-mono text-muted-foreground uppercase font-semibold">
                {item.role}
              </p>

              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/community">
          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/50 hover:border-accent hover:text-accent px-8 py-3.5 rounded-none transition-all cursor-pointer">
            <span>EXPLORE COMMUNITY PAGE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}
