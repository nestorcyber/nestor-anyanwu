"use client"

import React from "react"
import Image from "next/image"
import type { SkillGroup } from "@/lib/content"
import { Wrench, Layers } from "lucide-react"
import { SkillIcon } from "@/components/admin/icon-picker"

// Helper function to resolve logo SVG/image URLs from Simple Icons & Devicon CDNs
function getTechLogoUrl(skillName: string, customIcon?: string): string | null {
  if (customIcon && (customIcon.startsWith("http://") || customIcon.startsWith("https://") || customIcon.startsWith("/"))) {
    return customIcon
  }

  const name = (customIcon || skillName).toLowerCase().trim()

  // 1. Direct custom icon slug mappings to SimpleIcons / Devicon CDN
  const logoMap: Record<string, string> = {
    // Frameworks & Dev Languages
    "react & next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "react": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "typescript & javascript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "javascript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "tailwind css & web ui": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "git & github": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "github": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",

    // Design & Apps
    "figma & coreldraw": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    "figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    "photoshop & illustrator": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    "photoshop": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    "illustrator": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg",

    // AI & Cloud Platforms
    "google ai studio": "https://cdn.simpleicons.org/google",
    "google workspace & office 365": "https://cdn.simpleicons.org/googleworkspace",
    "google workspace": "https://cdn.simpleicons.org/googleworkspace",
    "hubspot": "https://cdn.simpleicons.org/hubspot",
    "replit": "https://cdn.simpleicons.org/replit",
    "intellij idea": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    "gamma": "https://cdn.simpleicons.org/gamma",
    "supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    "cloudinary": "https://cdn.simpleicons.org/cloudinary",
    "vercel": "https://cdn.simpleicons.org/vercel",
    "vscode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  }

  if (logoMap[name]) return logoMap[name]

  // Dynamic fallback attempt with SimpleIcons CDN slug format
  const simpleSlug = name.replace(/[^a-z0-9]/g, "")
  if (simpleSlug.length > 2) {
    return `https://cdn.simpleicons.org/${simpleSlug}`
  }

  return null
}

export default function SkillsMatrix({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <section className="w-full py-12 md:py-16 border-b border-border/70 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Skills and Technologies</h2>
              <p className="text-xs text-muted-foreground">Software products, frameworks, design applications, and developer tools used across projects.</p>
            </div>
          </div>
        </div>

        {/* LinkedIn "Connected Apps" Card Grid Styling */}
        <div className="space-y-8">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>{group.category}</span>
              </h3>

              {/* Connected Apps Horizontal Card Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {group.skills.map((skill, i) => {
                  return (
                    <div
                      key={i}
                      className="p-3.5 bg-card border border-border/80 hover:border-accent rounded-xl flex items-center gap-3 shadow-2xs hover:shadow-sm transition-all duration-200 group"
                    >
                      {/* Logo Icon Container */}
                      <div className="w-10 h-10 rounded-lg bg-secondary/80 border border-border/60 shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                        <SkillIcon
                          provider={skill.iconProvider}
                          name={skill.iconName || skill.name}
                          rawUrl={skill.icon}
                          fallbackText={skill.name.charAt(0)}
                          className="w-full h-full object-contain dark:invert-[0.1]"
                        />
                      </div>

                      {/* Tech Name & Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate group-hover:text-accent transition-colors">
                          {skill.name}
                        </p>
                        {skill.years ? (
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            {skill.years}
                          </p>
                        ) : skill.experienceLevel ? (
                          <p className="text-[10px] text-muted-foreground font-mono truncate">
                            {skill.experienceLevel}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
