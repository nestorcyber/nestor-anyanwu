"use client"

import React, { useState } from "react"
import Image from "next/image"
import { getCertImage, type CertificationItem } from "@/lib/data"
import { ArrowUpRight, CheckCircle2, X, ExternalLink } from "lucide-react"

export { getCertImage }

// ─── 6 Distinct Generative Corner Illustrations ───

// 1. Guilloche Security Wave Arc
function GraphicGuillocheWaves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M160 20 Q110 50, 70 90 T0 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <path d="M160 40 Q115 65, 80 100 T15 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      <path d="M160 60 Q120 80, 90 110 T30 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M160 80 Q125 95, 100 120 T45 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <path d="M160 100 Q130 110, 110 130 T60 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <path d="M160 120 Q135 125, 120 140 T75 160" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  )
}

// 2. Tech Circuit Matrix
function GraphicCircuitMatrix({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M160 80 L120 80 L90 110 L50 110 L30 130 L0 130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M160 110 L130 110 L110 130 L70 130 L40 160" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M160 50 L130 50 L100 80 L70 80 L50 100 L0 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="120" cy="80" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="90" cy="110" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="110" r="3.5" fill="currentColor" opacity="0.85" />
      <circle cx="110" cy="130" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="70" cy="130" r="3.5" fill="currentColor" opacity="0.75" />
      <circle cx="100" cy="80" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// 3. Concentric Radiating Starburst
function GraphicConcentricRays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[15, 30, 45, 60, 75, 90, 105, 120, 135, 150].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x2 = 160 - Math.cos(rad) * 110
        const y2 = 160 - Math.sin(rad) * 110
        return (
          <line
            key={i}
            x1="160"
            y1="160"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={i % 2 === 0 ? "2.5" : "1.5"}
            strokeLinecap="round"
            opacity={0.85 - (i % 3) * 0.2}
          />
        )
      })}
    </svg>
  )
}

// 4. Diamond Grid Lattice
function GraphicDiamondLattice({ className }: { className?: string }) {
  const diamonds = [
    { x: 140, y: 140, s: 16 },
    { x: 110, y: 140, s: 12 },
    { x: 140, y: 110, s: 12 },
    { x: 80, y: 140, s: 9 },
    { x: 110, y: 110, s: 9 },
    { x: 140, y: 80, s: 9 },
    { x: 55, y: 140, s: 7 },
    { x: 80, y: 110, s: 7 },
    { x: 110, y: 80, s: 7 },
    { x: 140, y: 55, s: 7 },
    { x: 55, y: 110, s: 5 },
    { x: 80, y: 80, s: 5 },
    { x: 110, y: 55, s: 5 },
  ]
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {diamonds.map((d, i) => (
        <rect
          key={i}
          x={d.x}
          y={d.y}
          width={d.s}
          height={d.s}
          transform={`rotate(45 ${d.x} ${d.y})`}
          fill="currentColor"
          fillOpacity={0.8 - i * 0.045}
        />
      ))}
    </svg>
  )
}

// 5. Intertwined Ribbon Curves
function GraphicRibbonWaves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M160 40 C100 60, 80 120, 0 140 L0 160 C90 140, 110 70, 160 55 Z" fill="currentColor" opacity="0.6" />
      <path d="M160 75 C110 90, 95 135, 30 160 L60 160 C110 140, 125 100, 160 88 Z" fill="currentColor" opacity="0.4" />
      <path d="M160 110 C125 120, 115 145, 80 160 L105 160 C130 150, 140 130, 160 122 Z" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

// 6. Hexagonal Prism Clusters
function GraphicHexagonClusters({ className }: { className?: string }) {
  const hexes = [
    { cx: 140, cy: 140, r: 14 },
    { cx: 112, cy: 138, r: 10 },
    { cx: 138, cy: 112, r: 10 },
    { cx: 88, cy: 135, r: 8 },
    { cx: 112, cy: 112, r: 8 },
    { cx: 135, cy: 88, r: 8 },
    { cx: 68, cy: 132, r: 6 },
    { cx: 88, cy: 112, r: 6 },
    { cx: 112, cy: 88, r: 6 },
    { cx: 132, cy: 68, r: 6 },
  ]
  return (
    <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {hexes.map((h, i) => (
        <polygon
          key={i}
          points={`${h.cx},${h.cy - h.r} ${h.cx + h.r * 0.86},${h.cy - h.r * 0.5} ${h.cx + h.r * 0.86},${h.cy + h.r * 0.5} ${h.cx},${h.cy + h.r} ${h.cx - h.r * 0.86},${h.cy + h.r * 0.5} ${h.cx - h.r * 0.86},${h.cy - h.r * 0.5}`}
          fill="currentColor"
          fillOpacity={0.75 - i * 0.055}
        />
      ))}
    </svg>
  )
}

const CERT_GRAPHICS = [
  GraphicGuillocheWaves,
  GraphicCircuitMatrix,
  GraphicConcentricRays,
  GraphicDiamondLattice,
  GraphicRibbonWaves,
  GraphicHexagonClusters,
]

// ─── Harmonious Brand Color Palettes Matching Professional Memberships ───
const CERT_PALETTES = [
  {
    graphicColor: "text-[#0075ff]",
    issuerColor: "text-[#0075ff] dark:text-[#38bdf8]",
    sealFill: "#0075ff",
    hoverBorder: "hover:border-[#0075ff]/80",
    glowColor: "bg-[#0075ff]/10",
  },
  {
    graphicColor: "text-[#8b5cf6]",
    issuerColor: "text-[#8b5cf6] dark:text-[#a78bfa]",
    sealFill: "#8b5cf6",
    hoverBorder: "hover:border-[#8b5cf6]/80",
    glowColor: "bg-[#8b5cf6]/10",
  },
  {
    graphicColor: "text-[#eab308]",
    issuerColor: "text-[#ca8a04] dark:text-[#facc15]",
    sealFill: "#eab308",
    hoverBorder: "hover:border-[#eab308]/80",
    glowColor: "bg-[#eab308]/10",
  },
  {
    graphicColor: "text-[#10b981]",
    issuerColor: "text-[#059669] dark:text-[#34d399]",
    sealFill: "#10b981",
    hoverBorder: "hover:border-[#10b981]/80",
    glowColor: "bg-[#10b981]/10",
  },
  {
    graphicColor: "text-[#f97316]",
    issuerColor: "text-[#ea580c] dark:text-[#fb923c]",
    sealFill: "#f97316",
    hoverBorder: "hover:border-[#f97316]/80",
    glowColor: "bg-[#f97316]/10",
  },
  {
    graphicColor: "text-[#ef4444]",
    issuerColor: "text-[#dc2626] dark:text-[#f87171]",
    sealFill: "#ef4444",
    hoverBorder: "hover:border-[#ef4444]/80",
    glowColor: "bg-[#ef4444]/10",
  },
]

function getCertVisuals(cert: CertificationItem, index: number) {
  const text = `${cert.id} ${cert.provider} ${cert.title}`.toLowerCase()
  let paletteIdx = index % CERT_PALETTES.length

  if (text.includes("aws") || text.includes("cloud")) {
    paletteIdx = 0 // Electric Blue
  } else if (text.includes("ieee") || text.includes("engineer")) {
    paletteIdx = 1 // Purple / Violet
  } else if (text.includes("privacy") || text.includes("ndpc")) {
    paletteIdx = 2 // Amber / Gold
  } else if (text.includes("gotni") || text.includes("lead")) {
    paletteIdx = 3 // Emerald Green
  } else if (text.includes("ai") || text.includes("innovation")) {
    paletteIdx = 4 // Warm Orange
  } else if (text.includes("security") || text.includes("cyber")) {
    paletteIdx = 5 // Crimson Red
  }

  const GraphicComp = CERT_GRAPHICS[index % CERT_GRAPHICS.length]
  const palette = CERT_PALETTES[paletteIdx]

  return { GraphicComp, palette }
}

export interface CertificationCardProps {
  cert: CertificationItem
  index?: number
}

export default function CertificationCard({ cert, index = 0 }: CertificationCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const certImg = getCertImage(cert)
  
  // Clean credential link check
  const rawUrl = cert.credentialUrl?.trim()
  const hasValidLink = Boolean(
    rawUrl &&
    rawUrl !== "#" &&
    (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("/"))
  )
  const targetUrl = hasValidLink ? rawUrl : null

  // Pick unique illustration & palette
  const { GraphicComp, palette } = getCertVisuals(cert, index)

  return (
    <>
      {/* ── Main Square Certificate Card ── */}
      <article
        onClick={() => setModalOpen(true)}
        className={`group relative flex flex-col justify-between aspect-square w-full bg-white dark:bg-[#0E1724] text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-800/90 ${palette.hoverBorder} rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none cursor-pointer`}
      >
        {/* ─── Bottom-Right Decorative Corner Illustration in Palette Color ─── */}
        <div className={`absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none transition-transform duration-500 group-hover:scale-105 overflow-hidden ${palette.graphicColor} opacity-75 dark:opacity-85`}>
          <GraphicComp className="w-full h-full" />
        </div>

        {/* ─── Top-Right Flush 4:3 Landscape Certificate Compartment ─── */}
        <div className="absolute top-0 right-0 w-[46%] sm:w-[48%] max-w-[200px] z-10">
          <div className="relative w-full rounded-bl-3xl bg-slate-900 dark:bg-slate-950 p-1.5 pb-2 pl-2 shadow-md border-b border-l border-border/60 overflow-hidden">
            {/* 4:3 Landscape Ratio Certificate Container */}
            <div className="relative w-full aspect-[4/3] rounded-bl-2xl rounded-tr-2xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-xs group-hover:brightness-105 transition-all">
              <Image
                src={certImg}
                alt={cert.title}
                fill
                sizes="180px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* ─── Card Inner Content (Exact Left Alignment with Text Baseline) ─── */}
        <div className="p-6 sm:p-8 flex flex-col justify-between h-full w-full relative z-10">
          
          {/* ─── Top-Left: Rosette Star Seal Overlay ─── */}
          <div className="flex items-start">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center drop-shadow-md">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ fill: palette.sealFill }}
              >
                <path d="M50 0 L58 14 L74 8 L76 25 L93 25 L88 41 L100 50 L88 59 L93 75 L76 75 L74 92 L58 86 L50 100 L42 86 L26 92 L24 75 L7 75 L12 59 L0 50 L12 41 L7 25 L24 25 L26 8 L42 14 Z" />
              </svg>
              {/* Centered White Star */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-black pointer-events-none">
                ★
              </span>
            </div>
          </div>

          {/* ─── Middle Section: Certificate Name First, Followed by Issuer in Title Case ─── */}
          <div className="space-y-1.5 my-auto w-full max-w-[82%] pt-2">
            {/* 1. Certificate Title */}
            <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-slate-900 dark:text-white tracking-tight font-heading leading-tight group-hover:text-[#0075ff] dark:group-hover:text-sky-400 transition-colors line-clamp-3">
              {cert.title}
            </h3>

            {/* 2. Issuer / Company Name (Title Case) */}
            <p className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${palette.issuerColor}`}>
              {cert.provider}
            </p>
          </div>

          {/* ─── Bottom Row: Recipient & Direct Open-in-New-Tab Button Overlay ─── */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
              Nestor Anyanwu
            </p>

            {/* Journal-Style Button Overlay */}
            {targetUrl ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Verify ${cert.title} at ${cert.provider}`}
                aria-label={`Verify ${cert.title} at ${cert.provider}`}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-white dark:bg-white dark:text-slate-900 group-hover:bg-[#0075ff] group-hover:border-[#0075ff] group-hover:text-white dark:group-hover:bg-[#0075ff] dark:group-hover:border-[#0075ff] dark:group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                aria-hidden="true"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 flex items-center justify-center shrink-0 transition-all duration-300 opacity-40 cursor-default select-none pointer-events-none"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2]" />
              </div>
            )}
          </div>

        </div>

      </article>

      {/* ── Interactive Full-Resolution Certificate Lightbox Modal ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-card/80">
              <div className="space-y-0.5 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0075ff]/10 text-[#0075ff] text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#0075ff] text-white" />
                    Verified Credential
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {cert.provider}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-foreground font-heading truncate pt-1">
                  {cert.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-muted/80 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative w-full flex-1 min-h-[320px] sm:min-h-[440px] bg-slate-950 flex items-center justify-center p-3 sm:p-5 overflow-auto">
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[440px] aspect-[4/3]">
                <Image
                  src={certImg}
                  alt={`${cert.title} Certificate`}
                  fill
                  sizes="100vw"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 sm:p-5 border-t border-border bg-card flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Issued by <span className="font-bold text-foreground">{cert.provider}</span>
              </p>

              <div className="flex items-center gap-3">
                {targetUrl && (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0075ff] hover:bg-[#0060df] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <span>Verify at Issuer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-border hover:bg-muted text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
