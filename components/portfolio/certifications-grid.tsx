import React from "react"
import type { CertificationItem } from "@/lib/content"
import { Award, ExternalLink, ShieldCheck } from "lucide-react"

export default function CertificationsGrid({ certificationsList }: { certificationsList: CertificationItem[] }) {
  return (
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Section Title Header */}
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Licenses & Certifications</h2>
              <p className="text-xs text-muted-foreground">Formal credentials, industry recognitions, and technical advocacy accreditations.</p>
            </div>
          </div>

          {/* Licenses & Certifications List */}
          <div className="divide-y divide-border/60">
            {certificationsList.map((cert) => (
              <div key={cert.id} className="py-5 first:pt-2 last:pb-2 flex gap-4 items-start">
                
                {/* Certification Icon */}
                <div className="w-12 h-12 rounded-xl bg-secondary border border-border shrink-0 flex items-center justify-center text-accent">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                {/* Certification Details */}
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {cert.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      Issued {cert.date}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-accent">
                    {cert.provider}
                  </p>

                  {cert.credentialUrl && (
                    <div className="pt-1.5">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline border border-accent/30 bg-accent/10 px-3 py-1 rounded-full"
                      >
                        <span>Show credential</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

