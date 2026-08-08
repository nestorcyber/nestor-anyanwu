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
    <div className="group border-2 border-slate-900/30 dark:border-slate-800 bg-card rounded-2xl p-5 flex flex-col justify-between h-full transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.95)] hover:border-[#0284c7] cursor-pointer">
      <div className="space-y-4">
        {image && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border-2 border-slate-900/20 dark:border-slate-800">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#0284c7] px-2.5 py-0.5 rounded-md border border-[#0284c7]/40 bg-[#0284c7]/10">
            {category}
          </span>
          {role && (
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              {role}
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-[#0284c7] transition-colors font-heading">
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
                className="text-[10px] font-mono uppercase px-2 py-0.5 bg-secondary text-foreground rounded-md border border-border/60"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Xbox UI Style Action Button */}
      <div className="pt-4 mt-4 border-t border-border/40">
        {link ? (
          <Link
            href={link}
            aria-label={`Explore ${title} project`}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-slate-900 dark:border-slate-800 bg-white text-slate-950 dark:bg-slate-900 dark:text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-between shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,0.9)] group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all"
          >
            <span className="line-clamp-1 pr-2">Explore {title}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-xl border-2 border-slate-700 bg-slate-800 text-slate-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between opacity-80 cursor-not-allowed">
            <span>In Production</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )
}
