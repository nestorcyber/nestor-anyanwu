import NewsCard from "@/components/news-card"

export default function HomeVolunteeringPreview() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary mb-12 uppercase tracking-wide">COMMUNITY & IMPACT</h2>
        
        <NewsCard
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vol-ehxuFInSlnE81JZZijj6Bgoz9s2kcW.jpeg"
          title="BUILDING TOGETHER"
          description="Nestor actively contributes to community-driven initiatives and tech events across Nigeria. Through leadership, mentorship, and hands-on participation, he supports capacity-building programs and strengthens local tech ecosystems."
          href="/volunteering"
        />
      </div>
    </section>
  )
}
