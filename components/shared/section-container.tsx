import React from "react"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  pattern?: boolean
}

export default function SectionContainer({
  children,
  className = "",
  id,
  pattern = true,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`w-full py-16 sm:py-20 md:py-24 border-b border-border/60 ${
        pattern ? "bg-grid-pattern" : ""
      } ${className}`}
    >
      <div className="container-webflow">{children}</div>
    </section>
  )
}
