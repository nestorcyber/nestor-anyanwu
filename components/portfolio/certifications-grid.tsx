import React from "react"
import type { CertificationItem } from "@/lib/content"
import CertificationSpotlight from "@/components/shared/certification-spotlight"

export default function CertificationsGrid({
  certificationsList,
}: {
  certificationsList: CertificationItem[]
  limit?: number
}) {
  const featuredCert = certificationsList.length > 0 ? certificationsList[0] : undefined

  return (
    <CertificationSpotlight
      headlinePrefix="Licenses &"
      headlineHighlight="Certifications"
      headlineSuffix=""
      description="Explore verified credentials, professional engineering accreditations, industry licenses, and leadership qualifications earned across national and global institutions — validating technical rigor and compliance."
      primaryButtonText="View all certifications"
      primaryButtonLink="/certifications"
      featuredCert={featuredCert}
    />
  )
}
