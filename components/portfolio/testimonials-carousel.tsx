import React from "react"
import SectionHeader from "@/components/shared/section-header"
import TestimonialCard from "@/components/shared/testimonial-card"

export default function TestimonialsCarousel() {
  const testimonials: Array<{ quote: string; author: string; role: string; organization: string; type: "Client" | "Community Leader" | "Peer" | "Partner" }> = [
    {
      quote: "Nestor's leadership as Director of ICT transformed our chapter's digital infrastructure. His attention to design systems and user experience sets a high benchmark for computing student initiatives across Nigeria.",
      author: "Comr. Precious Eke",
      role: "President",
      organization: "NACOS FUTO",
      type: "Community Leader",
    },
    {
      quote: "Working with Nestor on DevFest Owerri was flawless. He took complete ownership of major event graphic assets and technical branding, delivering world-class visuals under tight deadlines.",
      author: "Chisom Osuji",
      role: "Lead Organizer",
      organization: "GDG Owerri",
      type: "Partner",
    },
    {
      quote: "Nestor brings rare technical versatility—combining software engineering precision with deep visual design intuition. He delivered beyond expectations on our enterprise IT consultation.",
      author: "Dr. K. Nobel",
      role: "Principal Partner",
      organization: "Nobelton Consults",
      type: "Client",
    },
  ]

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <SectionHeader
          badge="TESTIMONIALS & ENDORSEMENTS"
          title="What Collaborators Say"
          subtitle="Feedback from community presidents, event organizers, enterprise clients, and technical partners."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard
              key={idx}
              quote={t.quote}
              author={t.author}
              role={t.role}
              organization={t.organization}
              type={t.type}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
