import React from "react"
import Image from "next/image"
import type { CertificationItem } from "@/lib/content"
import { ExternalLink } from "lucide-react"

/**
 * Simple Red Ribbon Overlay:
 * Clean, modern red ribbon shape starting from the top edge with the iconic
 * swallowtail (inverted-V) notch at the bottom.
 */
export function SimpleRedRibbonOverlay() {
  return (
    <div className="absolute top-0 left-7 sm:left-8 z-20 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none">
      <svg
        width="32"
        height="48"
        viewBox="0 0 32 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-7.5 sm:w-6 sm:h-9"
      >
        <defs>
          <linearGradient id="certSimpleRedRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="certRedFoldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {/* Top Fold / Angled Tab starting flush from the edge */}
        <path
          d="M 3 0 L 29 0 L 32 5 L 0 5 Z"
          fill="url(#certRedFoldDark)"
        />

        {/* Main Ribbon Body with Swallowtail (Inverted V) Notch */}
        <path
          d="M 1 4 L 31 4 L 31 42 L 16 33 L 1 42 Z"
          fill="url(#certSimpleRedRibbon)"
        />

        {/* Left inner shadow for 3D ribbon effect */}
        <path
          d="M 1 4 L 5 4 L 5 39 L 1 42 Z"
          fill="#7f1d1d"
          opacity="0.35"
        />

        {/* Right edge highlight */}
        <path
          d="M 27 4 L 31 4 L 31 42 L 27 39 Z"
          fill="#fca5a5"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}

export function getCertImage(cert: CertificationItem): string {
  if (cert.image) return cert.image
  const idOrTitle = (cert.id + " " + cert.title).toLowerCase()
  if (idOrTitle.includes("google") || idOrTitle.includes("gcp")) return "/certificates/google-cert.jpg"
  if (idOrTitle.includes("privacy") || idOrTitle.includes("ndpc")) return "/certificates/ndpc-cert.jpg"
  if (idOrTitle.includes("aws") || idOrTitle.includes("cloud")) return "/certificates/aws-cert.jpg"
  if (idOrTitle.includes("ieee") || idOrTitle.includes("engineer")) return "/certificates/ieee-cert.jpg"
  if (idOrTitle.includes("gotni") || idOrTitle.includes("lead")) return "/certificates/gotni-cert.jpg"
  return "/certificates/google-cert.jpg"
}

export interface CertificationCardProps {
  cert: CertificationItem
}

export default function CertificationCard({ cert }: CertificationCardProps) {
  const certImg = getCertImage(cert)
  const targetUrl = cert.credentialUrl || "#"

  // Concave Inner Curves Path Definition (Certificate Silhouette)
  const certInnerCurvePath =
    "M 0.055 0 L 0.945 0 A 0.055 0.038 0 0 0 1 0.038 L 1 0.962 A 0.055 0.038 0 0 0 0.945 1 L 0.055 1 A 0.055 0.038 0 0 0 0 0.962 L 0 0.038 A 0.055 0.038 0 0 0 0.055 0 Z"

  return (
    <div className="group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1">
      
      {/* Hidden SVG Definitions for Global Card Inner Curves Clipping */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="cert-inner-curve-clip" clipPathUnits="objectBoundingBox">
            <path d={certInnerCurvePath} />
          </clipPath>
        </defs>
      </svg>

      {/* Main Card Shell clipped with Inner Certificate Curves */}
      <article
        style={{ clipPath: "url(#cert-inner-curve-clip)" }}
        className="relative flex flex-col justify-between h-full bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-2xl transition-all duration-300 z-10"
      >
        
        {/* Top Section: Full Nested Certificate Image filling top compartment */}
        <div className="relative w-full h-[145px] sm:h-[165px] shrink-0 overflow-hidden bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Simple Red Ribbon Overlay starting flush from top edge */}
          <SimpleRedRibbonOverlay />

          {/* Nested Certificate Image filling entire top area */}
          <Image
            src={certImg}
            alt={`${cert.title} Certificate`}
            fill
            unoptimized={certImg.startsWith("http") && !certImg.includes("res.cloudinary.com") && !certImg.includes("blob.vercel-storage.com")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Subtle bottom gradient shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom Section: Title, Issuer, Description, Action Button */}
        <div className="p-4 sm:p-4.5 flex flex-col justify-between flex-1 space-y-3">
          
          <div className="space-y-1.5">
            {/* 1. Certificate Name / Title */}
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors font-heading tracking-tight leading-snug line-clamp-1">
              {cert.title}
            </h3>

            {/* 2. Issuer Name */}
            <p className="text-xs sm:text-sm font-semibold text-accent leading-normal line-clamp-1">
              {cert.provider}
            </p>

            {/* 3. Description (3-line maximum) */}
            {cert.description && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 font-normal pt-0.5">
                {cert.description}
              </p>
            )}
          </div>

          {/* 4. Standard Card Action Button Linking to URL */}
          <div className="pt-2.5 border-t border-border/50">
            <a
              href={targetUrl}
              target={targetUrl !== "#" ? "_blank" : undefined}
              rel={targetUrl !== "#" ? "noopener noreferrer" : undefined}
              className="w-full py-2.5 px-3.5 rounded-lg bg-accent hover:bg-accent/90 text-white font-bold text-xs tracking-wider flex items-center justify-between transition-all duration-300 shadow-2xs hover:shadow-sm cursor-pointer"
            >
              <span>Show Credential</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>
          </div>

        </div>

      </article>

      {/* SVG Vector Outer Border with Matching Inner Curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 5.5 0 L 94.5 0 A 5.5 3.8 0 0 0 100 3.8 L 100 96.2 A 5.5 3.8 0 0 0 94.5 100 L 5.5 100 A 5.5 3.8 0 0 0 0 96.2 L 0 3.8 A 5.5 3.8 0 0 0 5.5 0 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="text-slate-200 dark:text-slate-800 group-hover:text-accent/70 transition-colors duration-300"
        />
      </svg>

    </div>
  )
}
