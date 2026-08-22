import React from "react"
import Link from "next/link"
import type { CertificationItem } from "@/lib/content"
import { ArrowRight } from "lucide-react"
import CertificationCard from "@/components/shared/certification-card"

export default function CertificationsGrid({
  certificationsList,
  limit = 2,
}: {
  certificationsList: CertificationItem[]
  limit?: number
}) {
  const displayList = limit && limit > 0 ? certificationsList.slice(0, limit) : certificationsList

  return (
    <section id="certifications" className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="container-webflow">
        
        {/* Desktop Split Layout: Text on Left (col-span-5) & 2 Cards on Right (col-span-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Cohesive Text & Action Button Unit following web standards */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 lg:sticky lg:top-28">
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-[1.12]">
                Licenses & Certifications
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
                Verified credentials, professional accreditations, and engineering qualifications that validate technical competence, industry compliance, and executive leadership standards.
              </p>

              {/* Accent Line Under the Sub-Heading */}
              <div className="w-14 h-1 bg-accent rounded-full" />
            </div>

            {/* Standard CTA Button Placement: Directly below the text & line */}
            <div className="pt-2">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-extrabold text-xs tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>Explore All Certifications</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>

          </div>

          {/* Right Column: 2 Cards Side-by-Side in equal height */}
          <div className="lg:col-span-7 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full items-stretch">
              {displayList.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
