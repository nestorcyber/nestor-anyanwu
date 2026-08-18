import React from "react"
import type { CertificationItem } from "@/lib/content"
import { Award, ExternalLink, ShieldCheck } from "lucide-react"

export default function CertificationsGrid({ certificationsList }: { certificationsList: CertificationItem[] }) {
  return (
    <section id="certifications" className="w-full py-8 md:py-10 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 space-y-8">
        
        {/* Centered Image-Matching Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Licenses & Certifications
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Technical credentials and verified accreditations.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Licenses & Certifications List */}
        <div className="divide-y divide-border/60">
          {certificationsList.map((cert) => (
            <div key={cert.id} className="py-6 first:pt-0 last:pb-0 flex gap-5 items-start">
              
              {/* Certification Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>

              {/* Certification Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    Issued {cert.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-accent">
                  {cert.provider}
                </p>

                {cert.credentialUrl && (
                  <div className="pt-2">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-white border border-accent/40 bg-accent/10 px-4 py-2 rounded-xl transition-all shadow-xs"
                    >
                      <span>Show credential</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
