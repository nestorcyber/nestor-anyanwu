import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Nestor",
  description: "Learn about Nestor Anyanwu - a passionate tech advocate, designer, and community builder.",
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-primary mb-6 leading-tight uppercase tracking-wide">
              About Nestor Anyanwu
            </h1>
            <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
              Nestor Anyanwu is a Nigerian technology professional, software developer, and community leader driven by a vision of building accessible, inclusive, and collaborative tech ecosystems.
            </p>
          </div>

          {/* Main Content - Editorial Style */}
          <div className="space-y-6 text-foreground max-w-none">
            <p className="text-sm leading-relaxed mb-6">
              Nestor Anyanwu is a Nigerian technology professional, software and web developer, IT consultant, tech advocate, and active volunteer with a growing footprint in student leadership and Africa's digital ecosystem. Widely known within academic and developer communities as "Nestor Cyber," this name is associated with consistent engagement in technology-driven initiatives, community development, and volunteer service across Nigeria's tech landscape.
            </p>

            <p className="text-sm leading-relaxed mb-6">
              Currently serving as the Director of ICT for the National Association of Computing Students (NACOS) at the Federal University of Technology, Owerri, Nestor leads digital strategy, technical operations, and innovation-focused initiatives for the 2025/2026 tenure. In this role, he focuses on improving digital infrastructure, strengthening tech community engagement, and supporting student-led innovation across one of Nigeria's premier technology institutions.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-10 mb-4 uppercase tracking-wide">Professional Engagement & Leadership</h2>

            <p className="text-sm leading-relaxed mb-6">
              Beyond campus leadership, Nestor is actively involved in several professional and industry communities, including the Nigerian Computer Society (NCS), Nigeria Internet Registration Association (NIRA), Internet Society, Fintech Association of Nigeria (FintechNGR), and Google Developer Groups (GDG) Owerri. His involvement reflects consistent commitment to collaboration, knowledge sharing, and advancing technology adoption within Nigeria's growing digital economy.
            </p>

            <p className="text-sm leading-relaxed mb-6">
              Nestor has participated in learning and professional development programs associated with organizations such as ALX Africa, McKinsey, Google, and Microsoft, further strengthening his exposure to global standards in technology, problem-solving, and innovation. These experiences complement his practical work in software development, IT consulting, support, and design.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-10 mb-4 uppercase tracking-wide">Community Impact & Volunteering</h2>

            <p className="text-sm leading-relaxed mb-6">
              Nestor is actively engaged in volunteering, contributing his skills to community-driven initiatives, tech events, and capacity-building programs aimed at empowering young people and strengthening local tech ecosystems. His work demonstrates commitment to solving real-world problems through technology, building scalable digital solutions, and contributing to the growth of tech ecosystems within and beyond his academic environment.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-10 mb-4 uppercase tracking-wide">Vision & Long-term Goals</h2>

            <p className="text-sm leading-relaxed mb-6">
              Part of Nestor's long-term vision is to build a tech ecosystem that is accessible, inclusive, and collaborative, where everyone has the opportunity to grow. This vision continues to guide his work, as he intentionally pursues and nurtures it through leadership, community engagement, and technology-driven impact. He believes that technology should empower individuals, organizations, and communities, and that design and innovation should serve humanity.
            </p>


          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
