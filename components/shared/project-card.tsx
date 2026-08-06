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
    <div className="group border border-slate-200 dark:border-slate-800/80 bg-card rounded-md p-5 flex flex-col justify-between h-full transition-all shadow-xs hover:shadow-sm hover:border-slate-400 dark:hover:border-slate-700 hover:-translate-y-0.5">
      <div className="space-y-4">
        {image && (
          <div className="relative aspect-video w-full rounded-md overflow-hidden bg-slate-950 border border-slate-200/60 dark:border-slate-800">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent px-2 py-0.5 border border-accent/40 bg-accent/10">
            {category}
          </span>
          {role && (
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              {role}
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-accent transition-colors">
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
                className="text-[10px] font-mono uppercase px-2 py-0.5 bg-secondary text-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-border/40">
        {link ? (
          <Link
            href={link}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-accent uppercase tracking-wider transition-colors"
          >
            <span>Explore Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            IN PRODUCTION ↗
          </span>
        )}
      </div>
    </div>
  )
}
