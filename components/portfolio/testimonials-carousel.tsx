import React from "react"
import TestimonialCard from "@/components/shared/testimonial-card"

export default function TestimonialsCarousel() {
  const testimonials: Array<{ quote: string; author: string; role: string; organization: string; type: "Client" | "Community Leader" | "Peer" | "Partner" }> = [
    {
      quote: "Nestor's leadership as Director of ICT transformed our digital infrastructure. His attention to design systems, scalability, and user experience sets a high benchmark for technical execution.",
      author: "Comr. Precious Eke",
      role: "Ecosystem Lead",
      organization: "Institutional Tech Board",
      type: "Partner",
    },
    {
      quote: "Working with Nestor on major tech events was exceptional. He took complete ownership of brand identity systems, stage visuals, and digital architecture, delivering world-class results under demanding timelines.",
      author: "Chisom Osuji",
      role: "Lead Organizer",
      organization: "Developer Community Global",
      type: "Partner",
    },
    {
      quote: "Nestor brings rare versatility, combining rigorous software engineering precision with strategic visual design intuition. He delivered beyond expectations on our enterprise IT consulting engagement.",
      author: "Dr. K. Nobel",
      role: "Principal Partner",
      organization: "Nobelton Consults",
      type: "Client",
    },
  ]

  return (
    <section id="testimonials" className="w-full min-h-[calc(100svh-4rem)] md:min-h-[640px] h-auto py-16 md:py-24 border-b border-border/60 bg-slate-50/60 dark:bg-slate-900/30 flex flex-col justify-center">
      <div className="container-webflow space-y-12">
        {/* Centered Section Header */}
        <div className="text-center flex flex-col items-center justify-center space-y-3 mx-auto max-w-3xl pb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            What Collaborators Say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed text-center max-w-2xl">
            Verified feedback from enterprise clients, partners, and community leaders.
          </p>
          <div className="w-14 h-1 bg-[#0075ff] rounded-full mt-2" />
        </div>

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
