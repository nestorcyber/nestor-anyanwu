import React from "react"
import SectionContainer from "@/components/shared/section-container"
import SectionHeader from "@/components/shared/section-header"
import TestimonialCard, { TestimonialCardProps } from "@/components/shared/testimonial-card"

export default function TestimonialsSection() {
  const testimonials: TestimonialCardProps[] = [
    {
      quote: "Nestor's leadership in directing ICT operations for NACOS FUTO has been pivotal in advancing student technical capacity and community participation.",
      author: "NACOS FUTO Executive Council",
      role: "Student Executive Board",
      organization: "NACOS FUTO Chapter",
      type: "Community Leader",
    },
    {
      quote: "His visual design contributions and event logistics execution during DevFest Owerri set a high standard for visual communication and community experience.",
      author: "Google Developer Groups Team",
      role: "Lead Organizers",
      organization: "GDG Owerri",
      type: "Partner",
    },
    {
      quote: "Nestor brings strong technical advisory, dedication, and precision to IT consulting engagements at Nobelton Consults.",
      author: "Nobelton Consults Management",
      role: "Senior Advisory",
      organization: "Nobelton Consults",
      type: "Client",
    },
  ]

  return (
    <SectionContainer id="testimonials" className="bg-secondary/30">
      <SectionHeader
        badge="TESTIMONIALS & RECOGNITION"
        title="Social Proof & Endorsements"
        subtitle="Feedback from leaders and clients."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <TestimonialCard
            key={idx}
            quote={item.quote}
            author={item.author}
            role={item.role}
            organization={item.organization}
            type={item.type}
          />
        ))}
      </div>
    </SectionContainer>
  )
}
