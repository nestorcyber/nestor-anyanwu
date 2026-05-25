import NewsCard from "@/components/news-card"

export default function HomeAboutPreview() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary mb-12 uppercase tracking-wide">ABOUT NESTOR</h2>
        
        <NewsCard
          image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eden2-sUzI0wvGmZMjB5UUP911IAB6WvBM5c.jpg"
          title="DRIVEN BY PURPOSE"
          description="Nestor Anyanwu is a tech professional and community leader dedicated to driving digital innovation and building inclusive tech ecosystems. Known as Nestor Cyber, he combines software development, design, and strategic community engagement to create meaningful impact across Nigeria's digital landscape."
          href="/about"
        />
      </div>
    </section>
  )
}
