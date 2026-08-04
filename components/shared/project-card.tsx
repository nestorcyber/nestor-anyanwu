import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export interface ProjectCardProps {
  title: string
  category: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

export default function ProjectCard({
  title,
  category,
  description,
  technologies,
  link,
  image,
}: ProjectCardProps) {
  return (
    <div className="p-8 md:p-10 bg-card/60 hover:bg-card/90 grid-cell-card flex flex-col justify-between group transition-all duration-300 relative border-b md:border-b-0 border-border/50">
      <div className="space-y-4">
        {image && (
          <div className="relative aspect-video w-full rounded overflow-hidden mb-4 border border-border/40">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            FEATURED
          </span>
          <span className="text-xs font-mono text-muted-foreground/80 tracking-wide">
            {category}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
          {description}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-medium uppercase px-2.5 py-1 bg-secondary text-foreground rounded border border-border/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-8 mt-6">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent/80 uppercase tracking-widest transition-colors font-bold"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            IN DEVELOPMENT ↗
          </span>
        )}
      </div>
    </div>
  )
}
