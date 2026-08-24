import React from "react"
import Link from "next/link"
import Image from "next/image"
import type { CertificationItem } from "@/lib/content"
import { getCertImage } from "@/components/shared/certification-card"

interface CertificationSpotlightProps {
  headlinePrefix?: string
  headlineHighlight?: string
  headlineSuffix?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  featuredCert?: CertificationItem
  className?: string
}

export default function CertificationSpotlight({
  headlinePrefix = "Licenses &",
  headlineHighlight = "Certifications",
  headlineSuffix = "",
  description = "Explore verified credentials, professional engineering accreditations, industry licenses, and leadership qualifications earned across national and global institutions — validating technical rigor and compliance.",
  primaryButtonText = "View all certifications",
  primaryButtonLink = "/certifications",
  featuredCert,
  className = "",
}: CertificationSpotlightProps) {
  const cert: CertificationItem = featuredCert || {
    id: "ndpc-privacy",
    title: "Data Privacy Ambassador",
    provider: "Nigeria Data Protection Commission (NDPC)",
    date: "April 2025",
    credentialUrl: "https://ndpc.gov.ng",
    credentialId: "NDPC-AMB-2025-084",
    description:
      "Certified competence in data protection governance, NDPA compliance, user privacy frameworks, and institutional data security protocols.",
    skills: ["Data Privacy", "NDPA Compliance", "Risk Governance", "Security Protocols"],
    image: "/certificates/ndpc-cert.jpg",
  }

  const certImg = getCertImage(cert)

  return (
    <section className={`w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] py-16 sm:py-20 md:py-24 border-b border-border/70 bg-white dark:bg-background overflow-hidden relative flex flex-col justify-center ${className}`}>
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Large Heading, Subtitle & Primary Action Button              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left pb-10 lg:pb-24">
            
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-foreground tracking-tight font-heading leading-[1.06]">
                {headlinePrefix}{" "}
                <br className="hidden sm:inline" />
                <span className="text-[#0075ff] inline-block">
                  {headlineHighlight}
                </span>{" "}
                {headlineSuffix}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-muted-foreground font-normal leading-relaxed max-w-md">
                {description}
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Link
                href={primaryButtonLink}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#0075ff] hover:bg-[#0062d6] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-[0_4px_14px_rgba(0,117,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,117,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{primaryButtonText}</span>
              </Link>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Simple, Clean Image Placement Bleeding Right & Underlapping */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 relative w-full flex justify-end">
            
            {/* Simple Certificate Frame Container */}
            <div className="relative w-full lg:w-[115%] xl:w-[120%] lg:-mr-12 xl:-mr-20 translate-y-4 sm:translate-y-6 lg:translate-y-8 select-none">
              
              <div className="relative rounded-tl-2xl rounded-tr-2xl lg:rounded-tr-none bg-slate-900 border-t border-l border-r lg:border-r-0 border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
                
                {/* Window Top Minimal Bar */}
                <div className="flex items-center justify-between bg-slate-950/90 border-b border-slate-800 px-4 py-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-semibold text-slate-300 pl-2 border-l border-slate-800">
                      {cert.title}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    VERIFIED
                  </span>
                </div>

                {/* Certificate Image Canvas */}
                <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[480px] bg-slate-950 overflow-hidden group">
                  <Image
                    src={certImg}
                    alt={`${cert.title} Certificate`}
                    fill
                    priority
                    unoptimized={
                      certImg.startsWith("http") &&
                      !certImg.includes("res.cloudinary.com") &&
                      !certImg.includes("blob.vercel-storage.com")
                    }
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-top sm:object-center brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Faded bottom gradient for smooth underlapping edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
