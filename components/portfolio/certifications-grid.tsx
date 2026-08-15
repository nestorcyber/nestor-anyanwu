import React from "react"
import type { CertificationItem } from "@/lib/content"
import { Award, ExternalLink, ShieldCheck } from "lucide-react"

export default function CertificationsGrid({ certificationsList }: { certificationsList: CertificationItem[] }) {
  return (
    <section className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Licenses & Certifications</h2>
            <p className="text-xs text-muted-foreground">Formal credentials, industry recognitions, and technical advocacy accreditations.</p>
          </div>
        </div>

        {/* Licenses & Certifications List */}
        <div className="divide-y divide-border/60">
          {certificationsList.map((cert) => (
            <div key={cert.id} className="py-6 first:pt-0 last:pb-0 flex gap-5 items-start">
              
              {/* Certification Icon */}
              <div className="w-14 h-14 rounded-2xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent shadow-2xs">
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline border border-accent/30 bg-accent/10 px-4 py-1.5 rounded-full"
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
