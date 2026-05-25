import NewsCard from "@/components/news-card"

export default function HomeExperiencePreview() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary mb-12 uppercase tracking-wide">EXPERIENCE & EXPERTISE</h2>
        
        <NewsCard
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden3%280%29-Md3eT61Brp60MhmfTcGcfxvEaFIHqs.jpg"
          title="CREATING IMPACT AT SCALE"
          description="Nestor brings diverse experience in software development, IT consulting, event management, and design. His work spans leadership roles, community engagement, and technical expertise, contributing to initiatives that reached thousands."
          href="/experience"
        />
      </div>
    </section>
  )
}
