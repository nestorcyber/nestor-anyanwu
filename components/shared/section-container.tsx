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
      className={`w-full py-8 md:py-10 border-b border-border/60 ${
        pattern ? "bg-grid-pattern" : ""
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">{children}</div>
    </section>
  )
}
