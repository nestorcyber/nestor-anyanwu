import React from "react"
import { Quote } from "lucide-react"

export interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  organization: string
  type: "Client" | "Community Leader" | "Peer" | "Partner"
}

export default function TestimonialCard({
  quote,
  author,
  role,
  organization,
  type,
}: TestimonialCardProps) {
  return (
    <div className="p-6 md:p-8 border border-border/60 hover:border-accent bg-card/60 rounded grid-cell-card flex flex-col justify-between relative overflow-hidden space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/30 pb-3">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            {type}
          </span>
          <Quote className="w-4 h-4 text-muted-foreground/50" />
        </div>

        <p className="text-xs md:text-sm text-foreground/90 font-light leading-relaxed italic">
          "{quote}"
        </p>
      </div>

      <div className="pt-4 border-t border-border/30">
        <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
          {author}
        </h3>
        <p className="text-xs text-muted-foreground font-mono">
          {role} • {organization}
        </p>
      </div>
    </div>
  )
}
