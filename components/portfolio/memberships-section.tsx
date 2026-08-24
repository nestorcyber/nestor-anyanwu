import React from "react"
import { ShieldCheck, Globe, Cpu, Award, Network, Building2 } from "lucide-react"

interface MembershipItem {
  id: string
  organization: string
  acronym: string
  role: string
  date: string
  description: string
  focus: string[]
  icon: React.ElementType
}

const MEMBERSHIPS: MembershipItem[] = [
  {
    id: "ncs",
    organization: "Nigeria Computer Society",
    acronym: "NCS",
    role: "Professional Member",
    date: "2025 - Present",
    description:
      "Active member of Nigeria's premier ICT professional authority, contributing to technology policy advocacy, computing ethics, and industry development.",
    focus: ["ICT Professionalism", "Technology Policy", "Computing Standards"],
    icon: Building2,
  },
  {
    id: "aaai",
    organization: "Association for the Advancement of Artificial Intelligence",
    acronym: "AAAI",
    role: "Member",
    date: "2024 - Present",
    description:
      "Engaged with Africa's AI advocacy chapter, participating in machine intelligence research, technical symposiums, and ethical AI development frameworks.",
    focus: ["AI Research", "Machine Intelligence", "Ethics in AI"],
    icon: Cpu,
  },
  {
    id: "isoc",
    organization: "Internet Society, Nigeria Chapter",
    acronym: "ISOC",
    role: "Member",
    date: "2025 - Present",
    description:
      "Advocating for open internet accessibility, digital rights, global network governance, and technological infrastructure resilience.",
    focus: ["Internet Governance", "Digital Rights", "Infrastructure"],
    icon: Globe,
  },
  {
    id: "fintech-ngr",
    organization: "Fintech Association of Nigeria",
    acronym: "FintechNGR",
    role: "Member",
    date: "2024 - Present",
    description:
      "Contributing to financial technology innovation, digital asset infrastructure, payments regulation, and ecosystem collaboration.",
    focus: ["Digital Finance", "Fintech Innovation", "Payments Architecture"],
    icon: Network,
  },
  {
    id: "nira",
    organization: "Nigeria Internet Registration Association",
    acronym: "NiRA",
    role: "Member",
    date: "2025 - Present",
    description:
      "Participating in top-level domain governance, national DNS architecture, and sovereign digital namespace development.",
    focus: ["DNS Architecture", "Namespace Policy", "Cyber Governance"],
    icon: ShieldCheck,
  },
  {
    id: "ndpc",
    organization: "Nigeria Data Protection Commission",
    acronym: "NDPC",
    role: "Data Privacy Ambassador",
    date: "2025 - Present",
    description:
      "Appointed advocate promoting NDPA compliance, user data governance frameworks, security best practices, and institutional privacy awareness.",
    focus: ["NDPA Compliance", "Data Privacy", "Risk Governance"],
    icon: Award,
  },
]

export default function MembershipsSection() {
  return (
    <section
      id="memberships"
      className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Professional <span className="text-[#0075ff]">Memberships</span> &amp; Affiliations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

        {/* 6 Memberships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MEMBERSHIPS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 bg-white dark:bg-card border border-slate-200/90 dark:border-slate-800 rounded-3xl flex flex-col justify-between hover:border-[#0075ff] hover:shadow-xl transition-all duration-300 group shadow-xs min-h-[320px]"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon badge & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1C2C] text-[#0075ff] flex items-center justify-center shadow-md border border-[#0075ff]/30 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#0075ff]">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-[#0075ff]/10 text-[#0075ff] border border-[#0075ff]/20">
                      {item.role}
                    </span>
                  </div>

                  {/* Organization & Details */}
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-foreground font-heading tracking-tight leading-snug group-hover:text-[#0075ff] transition-colors">
                      {item.organization}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {item.acronym} • {item.date}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Focus Skill Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {item.focus.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
