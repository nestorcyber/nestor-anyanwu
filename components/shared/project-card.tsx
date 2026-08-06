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
  role?: string
}

export default function ProjectCard({
  title,
  category,
  description,
  technologies,
  link,
  image,
  role,
}: ProjectCardProps) {
  return (
    <div className="group border-2 border-slate-900/20 dark:border-slate-800 bg-card rounded-lg p-5 flex flex-col justify-between h-full transition-all shadow-[3px_3px_0px_0px_rgba(15,23,42,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:border-accent hover:-translate-y-1 cursor-pointer">
      <div className="space-y-4">
        {image && (
          <div className="relative aspect-video w-full rounded-md overflow-hidden bg-slate-950 border-2 border-slate-900/20 dark:border-slate-800">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent dark:text-accent px-2.5 py-0.5 rounded border border-accent/50 bg-accent/15 dark:bg-accent/20">
            {category}
          </span>
          {role && (
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              {role}
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors font-heading">
          {title}
        </h3>

        <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
          {description}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono uppercase px-2 py-0.5 bg-secondary text-foreground rounded border border-border/60"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
        {link ? (
          <Link
            href={link}
            aria-label={`Explore ${title} project`}
            className="w-full min-h-[48px] flex items-center justify-between text-xs font-bold text-foreground group-hover:text-accent uppercase tracking-wider transition-colors py-2.5"
          >
            <span className="line-clamp-1 pr-2">Explore {title}</span>
            <div className="w-8 h-8 rounded-md border border-slate-900/20 dark:border-slate-800 bg-background flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest min-h-[48px] flex items-center">
            IN PRODUCTION ↗
          </span>
        )}
      </div>
    </div>
  )
}
