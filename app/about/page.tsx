import Footer from "@/components/footer"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Nestor",
  description: "Learn about Nestor Anyanwu - a passionate tech advocate, designer, and community builder.",
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-16 pb-20">
        <article className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Hero Image - No Gap */}
          <div className="mb-6 -mx-4 md:-mx-8 lg:-mx-0 md:rounded-lg overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img03-u4yAzuIZH5nUHSItev7fETJGcWee1u.jpeg"
                alt="Nestor Anyanwu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Main Content - Editorial Style */}
          <div className="space-y-4 text-foreground max-w-none">
            <p className="text-sm leading-relaxed">
              Nestor Anyanwu is a Nigerian technology professional, software and web developer, IT consultant, and tech advocate. Widely known as "Nestor Cyber," he is dedicated to technology-driven initiatives, community development, and volunteer service across Nigeria's digital ecosystem.
            </p>

            <p className="text-sm leading-relaxed">
              As Director of ICT for NACOS at the Federal University of Technology Owerri, Nestor leads digital strategy and innovation-focused initiatives. He is actively involved in professional communities including the Nigerian Computer Society, Internet Society, Fintech Association of Nigeria, and Google Developer Groups.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-6 mb-3 uppercase tracking-wide">Professional Background</h2>

            <p className="text-sm leading-relaxed">
              Nestor has worked with organizations including ALX Africa, McKinsey, Google, and Microsoft, strengthening his expertise in technology, problem-solving, and innovation. His practical experience spans software development, IT consulting, event management, and design.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-6 mb-3 uppercase tracking-wide">Community & Vision</h2>

            <p className="text-sm leading-relaxed">
              Through volunteering and community engagement, Nestor supports tech events, capacity-building programs, and initiatives that empower young people. His vision is building an accessible, inclusive, and collaborative tech ecosystem where technology empowers individuals and communities.
            </p>


          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
