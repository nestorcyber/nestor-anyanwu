import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { JourneyItem } from "@/lib/content"
import MembershipCard, { mapJourneyToMembership, type MembershipCardItem } from "@/components/shared/membership-card"

interface MembershipsSectionProps {
  membershipsList?: JourneyItem[]
}

export default function MembershipsSection({ membershipsList = [] }: MembershipsSectionProps) {
  // Show top 3 professional organization cards in this section
  const displayItems: MembershipCardItem[] = membershipsList.slice(0, 3).map(mapJourneyToMembership)

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
          {displayItems.map((item, idx) => (
            <MembershipCard key={item.id || idx} membership={item} index={idx} />
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl max-w-md mx-auto">
            No memberships added yet. Add them in the Admin Dashboard at /admin/memberships.
          </div>
        )}

        {/* Dedicated Page Link CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href="/memberships"
            className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-xl bg-[#0075ff] hover:bg-[#0062d6] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
          >
            <span>View All Memberships</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
