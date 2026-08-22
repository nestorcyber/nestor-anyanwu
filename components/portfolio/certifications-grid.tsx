import React from "react"
import Image from "next/image"
import type { CertificationItem } from "@/lib/content"
import { ExternalLink, ShieldCheck, Award, CheckCircle2, Sparkles } from "lucide-react"

/**
 * Simple Red Ribbon Overlay:
 * Clean, modern red ribbon shape starting from the top edge with the iconic
 * swallowtail (inverted-V) notch at the bottom, matching the user's reference.
 */
function SimpleRedRibbonOverlay() {
  return (
    <div className="absolute -top-0.5 left-3 sm:left-4 z-20 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none">
      <svg
        width="34"
        height="52"
        viewBox="0 0 34 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-11 sm:w-8 sm:h-12"
      >
        <defs>
          <linearGradient id="simpleRedRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="redFoldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {/* Top Fold / Angled Tab starting flush from the edge */}
        <path
          d="M 3 0 L 31 0 L 34 6 L 0 6 Z"
          fill="url(#redFoldDark)"
        />

        {/* Main Ribbon Body with Swallowtail (Inverted V) Notch */}
        <path
          d="M 1 5 L 33 5 L 33 46 L 17 36 L 1 46 Z"
          fill="url(#simpleRedRibbon)"
        />

        {/* Left inner shadow for 3D ribbon effect */}
        <path
          d="M 1 5 L 6 5 L 6 43 L 1 46 Z"
          fill="#7f1d1d"
          opacity="0.35"
        />

        {/* Right edge highlight */}
        <path
          d="M 28 5 L 33 5 L 33 46 L 28 43 Z"
          fill="#fca5a5"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}

function getCertImage(cert: CertificationItem): string {
  if (cert.image) return cert.image
  const idOrTitle = (cert.id + " " + cert.title).toLowerCase()
  if (idOrTitle.includes("privacy") || idOrTitle.includes("ndpc")) return "/certificates/ndpc-cert.jpg"
  if (idOrTitle.includes("aws") || idOrTitle.includes("cloud")) return "/certificates/aws-cert.jpg"
  if (idOrTitle.includes("ieee") || idOrTitle.includes("engineer")) return "/certificates/ieee-cert.jpg"
  if (idOrTitle.includes("gotni") || idOrTitle.includes("lead")) return "/certificates/gotni-cert.jpg"
  return "/certificates/ndpc-cert.jpg"
}

export default function CertificationsGrid({ certificationsList }: { certificationsList: CertificationItem[] }) {
  return (
    <section id="certifications" className="w-full py-10 md:py-14 border-b border-border/70 bg-background">
      <div className="container-webflow space-y-10">
        
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Accreditations & Badges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Licenses & Certifications
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Verified engineering accreditations, technical credentials, and professional leadership licenses.
          </p>
          <div className="w-14 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* Landscape Cards: 2 in a Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {certificationsList.map((cert) => {
            const certImg = getCertImage(cert)
            return (
              <article
                key={cert.id}
                className="group relative flex flex-col sm:flex-row items-stretch bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-accent/60 transition-all duration-300"
              >
                {/* Left Column: Certificate Thumbnail with Nested Image & Simple Red Ribbon Shape Overlay */}
                <div className="relative w-full sm:w-[220px] md:w-[250px] shrink-0 p-3 sm:p-3.5 bg-slate-100 dark:bg-slate-950/70 border-b sm:border-b-0 sm:border-r border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center">
                  
                  {/* Certificate Frame Container */}
                  <div className="relative w-full h-[180px] sm:h-full min-h-[175px] rounded-xl overflow-hidden border border-slate-300/80 dark:border-slate-800 bg-slate-900 shadow-inner flex items-center justify-center">
                    
                    {/* Simple Red Ribbon Overlay starting from the top edge */}
                    <SimpleRedRibbonOverlay />

                    {/* Nested Certificate Image */}
                    <Image
                      src={certImg}
                      alt={`${cert.title} Certificate`}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle inner gradient shadow for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                  </div>

                </div>

              {/* Right Column: Credential Information & Actions */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                
                <div className="space-y-2.5">
                  {/* Top Meta: Issuer & Issue Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{cert.provider}</span>
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-md">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-foreground group-hover:text-accent transition-colors font-heading leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  {cert.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 font-normal">
                      {cert.description}
                    </p>
                  )}

                  {/* Skill Badges */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action Button */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {cert.credentialId || "Verified Record"}
                  </div>

                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-accent hover:bg-accent/90 px-3.5 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <span>Show credential</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span>Accredited</span>
                    </div>
                  )}
                </div>

              </div>

            </article>
          )})}
        </div>

      </div>
    </section>
  )
}
