import { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/footer"
import PortfolioCTA from "@/components/portfolio/portfolio-cta"
import MembershipCard, { mapJourneyToMembership, type MembershipCardItem } from "@/components/shared/membership-card"
import { getMemberships } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
  description:
    "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
  alternates: {
    canonical: "/memberships",
  },
  openGraph: {
    title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
    url: "/memberships",
  },
  twitter: {
    title: "Professional Memberships & Affiliations | Nestor Anyanwu (Nestor Cyber)",
    description:
      "Explore accredited memberships, industry councils, and professional associations contributing to national technology policy, AI research, and digital governance.",
  },
}

export default async function MembershipsPage() {
  const dbMemberships = await getMemberships()
  const membershipsList: MembershipCardItem[] = (dbMemberships || []).map(mapJourneyToMembership)

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">
      {/* Main Full-Width Content Column */}
      <main className="flex-1 w-full min-w-0 flex flex-col justify-between overflow-x-hidden">
        <div>
          {/* Top Hero Section */}
          <div className="w-full bg-card/40 border-b border-border/70 py-10 md:py-16">
            <div className="site-container space-y-4">
              {/* Left-Aligned Heading with Verified Checkmark Beside Text */}
              <div className="space-y-3">
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
              {membershipsList.map((membership, idx) => (
                <MembershipCard key={membership.id || idx} membership={membership} index={idx} />
              ))}
            </div>

            {membershipsList.length === 0 && (
              <div className="p-12 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl max-w-md mx-auto">
                No memberships added yet. Add them in the Admin Dashboard at /admin/memberships.
              </div>
            )}
          </div>

          <PortfolioCTA
            title="Collaborate on Technology Policy & Governance"
            description="Connecting institutional councils, industry standards, and community initiatives to foster sustainable, ethical technological advancement."
            buttonText="Connect For Collaboration"
            buttonHref="/contact"
          />
        </div>

        {/* Global Footer */}
        <Footer />
      </main>
    </div>
  )
}
