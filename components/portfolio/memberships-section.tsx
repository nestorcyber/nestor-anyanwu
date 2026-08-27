import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { JourneyItem } from "@/lib/content"
import MembershipCard, { mapJourneyToMembership, type MembershipCardItem } from "@/components/shared/membership-card"
import { ShieldCheck, Globe, Cpu, Award, Network, Building2 } from "lucide-react"

const DEFAULT_MEMBERSHIPS: MembershipCardItem[] = [
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

interface MembershipsSectionProps {
  membershipsList?: JourneyItem[]
}

export default function MembershipsSection({ membershipsList }: MembershipsSectionProps) {
  const displayItems: MembershipCardItem[] =
    membershipsList && membershipsList.length > 0
      ? membershipsList.map(mapJourneyToMembership)
      : DEFAULT_MEMBERSHIPS

  return (
    <section
      id="memberships"
      className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/70 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-10">
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

        {/* Memberships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {displayItems.map((item) => (
            <MembershipCard key={item.id} membership={item} />
          ))}
        </div>

        {/* Dedicated Page Link CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href="/memberships"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/80 text-foreground hover:border-[#0075ff] hover:text-[#0075ff] font-bold text-xs tracking-wider transition-all shadow-2xs hover:shadow-sm group"
          >
            <span>View Dedicated Memberships Page</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
