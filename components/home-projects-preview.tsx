import NewsCard from "@/components/news-card"

export default function HomeProjectsPreview() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <NewsCard
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fle2-vxhPppzWjtjP9M63pBTb8yALMDUPmb.jpg"
          title="INNOVATION IN ACTION"
          description="A selection of projects showcasing design, strategy, and digital leadership. From major conferences to community initiatives, these represent Nestor's commitment to creating impactful experiences."
          href="/projects"
        />
      </div>
    </section>
  )
}
