import React from "react"
import SectionHeader from "@/components/shared/section-header"
import type { CertificationItem } from "@/lib/content"
import { Award, ExternalLink } from "lucide-react"

export default function CertificationsGrid({ certificationsList }: { certificationsList: CertificationItem[] }) {
  return (
    <section className="w-full py-16 md:py-24 border-b border-border/60 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="CONTINUOUS LEARNING"
          title="Certifications & Development"
          subtitle="Formal credentials, industry recognitions, and technical advocacy accreditations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsList.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-card border border-border/60 hover:border-accent rounded-none transition-all duration-300 grid-cell-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-accent/10 border border-accent/20">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-foreground tracking-tight">
                  {cert.title}
                </h3>

                <p className="text-xs text-muted-foreground font-mono">
                  {cert.provider}
                </p>
              </div>

              {cert.credentialUrl && (
                <div className="pt-3 border-t border-border/30">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
