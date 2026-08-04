import React from "react"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import { Layers, Radio, Sparkles, Trophy } from "lucide-react"

export interface FocusItem {
  category: string
  title: string
  organization: string
  description: string
  status: string
}

export default function CurrentlyBuilding() {
  const currentFocusList: FocusItem[] = [
    {
      category: "LEADERSHIP & DIGITAL STRATEGY",
      title: "NACOS National ICT Strategy",
      organization: "NACOS National",
      description: "Directing technology infrastructure and community digital initiatives for computing students nationwide.",
      status: "ACTIVE DIRECTION",
    },
    {
      category: "STUDENT ENGAGEMENT",
      title: "NACOS FUTO Tech Operations",
      organization: "NACOS FUTO Chapter",
      description: "Overseeing digital infrastructure, workshops, and developer capacity building at FUTO.",
      status: "ONGOING LEADERSHIP",
    },
    {
      category: "FINTECH ADVOCACY",
      title: "Financial Literacy & Campus Outreach",
      organization: "Cowrywise Campus Ambassador",
      description: "Helping young professionals build financial habits and adopt modern wealth management technology.",
      status: "ACTIVE AMBASSADOR",
    },
    {
      category: "TECHNICAL CONSULTING",
      title: "Enterprise IT Advisory",
      organization: "Nobelton Consults",
      description: "Providing strategic IT consulting, system architecture guidance, and web platform solutions.",
      status: "ACTIVE CONSULTANT",
    },
  ]

  return (
    <SectionContainer id="current-focus" className="bg-secondary/30">
      <SectionHeader
        badge="CURRENT FOCUS"
        title="Currently Building & Leading"
        subtitle="A snapshot of active products, leadership responsibilities, and ongoing initiatives across tech and community ecosystems."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-collapse">
        {currentFocusList.map((item, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 border border-border/60 hover:border-accent bg-card/80 rounded grid-cell-card space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded border border-border/40">
                  {item.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-accent/90 uppercase font-semibold">
                {item.organization}
              </p>

              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
