import React from "react"
import Image from "next/image"

interface QuoteSectionProps {
  quote?: string
  authorName?: string
  authorRole?: string
  authorOrg?: string
  authorImage?: string
}

export default function QuoteSection({
  quote = "Keep Rolling The Dice Even When The Odds Are Against You.",
  authorName = "Nestor Anyanwu",
  authorRole,
  authorOrg,
  authorImage = "https://res.cloudinary.com/z3wgqisj/image/upload/v1787007449/nestor/hero/DSC_5940_1_2_ee43kp.jpg",
}: QuoteSectionProps) {
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-background border-b border-border/60 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0075ff]/5 dark:bg-[#0075ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 max-w-5xl mx-auto text-center space-y-7 sm:space-y-9">
        
        {/* Large Centered Quotation Mark Icon */}
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center text-foreground/80 dark:text-foreground/90 select-none">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 fill-current text-slate-900 dark:text-white opacity-90"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </span>
        </div>

        {/* Big Bold Quote Text */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-foreground font-heading max-w-4xl mx-auto leading-[1.2] sm:leading-[1.18] text-balance">
          {quote}
        </blockquote>

        {/* Author Details */}
        <div className="pt-2 sm:pt-3 flex flex-col items-center justify-center space-y-2">
          {/* Avatar */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-900/10 dark:border-white/20 shadow-md">
            <Image
              src={authorImage}
              alt={authorName}
              fill
              sizes="56px"
              className="object-cover object-top"
            />
          </div>

          {/* Author Name */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-foreground font-heading">
              {authorName}
            </h4>
            {authorRole && (
              <p className="text-xs sm:text-[13px] text-muted-foreground font-medium mt-0.5">
                {authorRole}
              </p>
            )}
            {authorOrg && (
              <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-mono mt-0.5">
                {authorOrg}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
