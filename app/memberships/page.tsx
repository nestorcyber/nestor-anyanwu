import { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import MembershipCard, { mapJourneyToMembership, type MembershipCardItem } from "@/components/shared/membership-card"
import { getMemberships } from "@/lib/content"
import { ShieldCheck, Award, Building2, Cpu, Globe, Network } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
  description: "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
  alternates: {
    canonical: "/memberships",
  },
  openGraph: {
    title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
    url: "/memberships",
  },
  twitter: {
    title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
    description: "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
  },
}

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

export default async function MembershipsPage() {
  const dbMemberships = await getMemberships()

  const membershipsList: MembershipCardItem[] =
    dbMemberships && dbMemberships.length > 0
      ? dbMemberships.map(mapJourneyToMembership)
      : DEFAULT_MEMBERSHIPS

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          {/* Top Hero Section */}
          <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-16 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="site-container space-y-4 relative z-10">
              {/* Left-Aligned Heading with Verified Checkmark Beside Text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-1 bg-[#0075ff] rounded-full inline-block" />
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0075ff]">
                    Institutional Governance
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight font-heading leading-[1.18]">
                  Professional <span className="text-[#0075ff]">Memberships</span>{" "}
                  <span className="inline-flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    &amp; Affiliations
                    <span className="inline-flex items-center justify-center text-[#0075ff] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 drop-shadow-[0_4px_12px_rgba(0,117,255,0.3)] align-middle">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.28 4.22l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
                      </svg>
                    </span>
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-3xl">
                  Accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, digital rights advocacy, and sovereign digital governance.
                </p>
              </div>
            </div>
          </div>

          {/* Memberships 3-in-a-Row Grid Container */}
          <div className="site-container py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {membershipsList.map((membership) => (
                <MembershipCard key={membership.id} membership={membership} />
              ))}
            </div>

            {membershipsList.length === 0 && (
              <div className="p-12 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl">
                No memberships found.
              </div>
            )}
          </div>

          <PortfolioCTA />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
