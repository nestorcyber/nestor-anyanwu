import React from "react"
import Link from "next/link"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import { getCommunityEntries } from "@/lib/keystatic"
import { Users, ArrowUpRight } from "lucide-react"

export default async function FeaturedCommunity() {
  const entries = await getCommunityEntries()

  const featured = entries.filter((e) => e.featured)
  const displayEntries = featured.length > 0 ? featured.slice(0, 4) : entries.slice(0, 4)

  return (
    <SectionContainer id="community-work" className="bg-secondary/30">
      <SectionHeader
        badge="FEATURED COMMUNITY WORK"
        title="Organizations & Volunteer Impact"
        subtitle="Dedicated to serving developer chapters, national student bodies, and leadership conferences through active contribution and service."
      />

      {displayEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-collapse">
          {displayEntries.map((item) => (
            <div
              key={item.slug}
              className="p-6 md:p-8 border border-border/60 hover:border-accent bg-card/80 rounded space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground uppercase tracking-tight group-hover:text-accent transition-colors">
                  {item.organization}
                </h3>
                <p className="text-xs font-mono text-muted-foreground uppercase font-semibold">
                  {item.role}
                </p>

                {item.achievements.length > 0 && (
                  <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                    {item.achievements.join(" • ")}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-border/30 flex justify-end">
                <Link
                  href={`/community/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No featured community initiatives available.
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link href="/community">
          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground border border-foreground/50 hover:border-accent hover:text-accent px-8 py-3.5 rounded-none transition-all cursor-pointer">
            <span>EXPLORE COMMUNITY PAGE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}
