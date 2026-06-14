import Footer from "@/components/footer"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Nestor - Tech Advocate, Designer & Community Leader",
  description: "Meet Nestor Anyanwu, a Nigerian tech professional and community leader. Director of ICT at NACOS FUTO, Data Privacy Ambassador, IEEE member, and tech advocate driving innovation and digital transformation.",
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-0 pb-20">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-start overflow-hidden pt-16 md:pt-0">
          {/* Background image - edge to edge, face centered on mobile */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-ItCmRGacGKzMpQbnPfGLfUfLEwWn3i.jpg"
            alt="Nestor Anyanwu"
            fill
            className="object-cover object-center md:object-left"
            priority
          />

          {/* Overlay gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-20 lg:px-32 flex items-center h-full">
            <div className="max-w-2xl">
              <h1 className="font-sans text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                Who is Nestor
              </h1>
              <p className="text-lg md:text-2xl text-white font-medium">
                Techie, Designer, Volunteer, Leader
              </p>
            </div>
          </div>
        </section>

        <article className="w-full bg-background">
          {/* Main Content - Editorial Style with better spacing */}
          <div className="max-w-6xl mx-auto px-6 md:px-20 lg:px-32 py-12 md:py-20">
            <div className="space-y-6 text-foreground max-w-none">
              <p className="text-base leading-relaxed text-gray-700">
              Nestor Anyanwu is a Nigerian technology professional, digital innovator, community builder, and emerging leader whose work spans software development, artificial intelligence advocacy, design, digital transformation, and technology education. Widely recognized by his professional brand, "Nestor Cyber," he has built a reputation for combining technical expertise with community impact, helping individuals and organizations leverage technology to solve real-world problems.
            </p>

            <p className="text-sm leading-relaxed">
              Driven by a passion for innovation and lifelong learning, Nestor represents a new generation of African technologists who are not only consuming technology but actively creating solutions, building communities, and shaping conversations around the future of digital transformation on the continent.
            </p>

            <p className="text-sm leading-relaxed">
              His journey reflects the intersection of technology, leadership, creativity, and service, positioning him as a multifaceted professional committed to advancing technological growth and digital inclusion.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Tech Advocate</h2>

            <p className="text-sm leading-relaxed">
              Nestor Anyanwu is a strong advocate for technology adoption, digital literacy, and innovation-driven development. He believes that technology should not be reserved for a select few but should be accessible, understandable, and impactful for everyone.
            </p>

            <p className="text-sm leading-relaxed">
              Through his engagements, online presence, educational initiatives, and community activities, he consistently promotes awareness about emerging technologies, cybersecurity, software development, digital opportunities, and technology careers.
            </p>

            <p className="text-sm leading-relaxed">
              His advocacy focuses on helping young people understand how technology can be leveraged to create opportunities, solve societal challenges, and drive economic growth. He frequently encourages students and aspiring professionals to build practical skills, embrace innovation, and remain adaptable in a rapidly evolving digital landscape.
            </p>

            <p className="text-sm leading-relaxed">
              Beyond technical discussions, he advocates for responsible technology use, digital ethics, privacy awareness, and the importance of continuous learning in the age of technological disruption.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Artificial Intelligence Enthusiast</h2>

            <p className="text-sm leading-relaxed">
              Nestor has demonstrated a growing commitment to the field of Artificial Intelligence, recognizing its transformative role across industries and societies.
            </p>

            <p className="text-sm leading-relaxed">
              As an AI enthusiast, he actively explores the applications of machine learning, generative AI, automation, and intelligent systems. His interest extends beyond simply understanding AI technologies; he is passionate about helping others discover how these tools can improve productivity, accelerate innovation, and unlock new possibilities.
            </p>

            <p className="text-sm leading-relaxed">
              He views Artificial Intelligence as one of the defining technologies of the modern era and advocates for responsible adoption that empowers people rather than replaces them.
            </p>

            <p className="text-sm leading-relaxed">
              His engagements often emphasize practical AI usage, encouraging individuals, students, and professionals to embrace AI as a collaborative tool that enhances creativity, problem-solving, and efficiency.
            </p>

            <p className="text-sm leading-relaxed">
              By staying informed about emerging AI trends and developments, Nestor continues to position himself at the forefront of conversations shaping the future of technology in Africa and beyond.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Ingenious Designer</h2>

            <p className="text-sm leading-relaxed">
              Creativity remains a defining aspect of Nestor's professional identity.
            </p>

            <p className="text-sm leading-relaxed">
              As a designer, he combines visual storytelling, user experience principles, and strategic thinking to create engaging digital experiences. His design philosophy is centered on functionality, clarity, and meaningful communication.
            </p>

            <p className="text-sm leading-relaxed">
              Whether working on branding materials, promotional campaigns, user interfaces, social media content, or digital products, he approaches design as both an art and a problem-solving discipline.
            </p>

            <p className="text-sm leading-relaxed">
              His ability to bridge technical implementation with creative execution allows him to develop solutions that are not only visually appealing but also effective in achieving organizational and user goals.
            </p>

            <p className="text-sm leading-relaxed">
              Through his design work, Nestor demonstrates an understanding that great design extends beyond aesthetics. It involves creating experiences that resonate with audiences, communicate ideas effectively, and deliver measurable value.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Volunteer</h2>

            <p className="text-sm leading-relaxed">
              Service and contribution have consistently played an important role in Nestor's professional journey.
            </p>

            <p className="text-sm leading-relaxed">
              He actively participates in volunteer-driven initiatives that promote technology education, knowledge sharing, mentorship, and community development.
            </p>

            <p className="text-sm leading-relaxed">
              Through volunteering, he contributes his time, skills, and expertise toward initiatives aimed at empowering students, supporting emerging professionals, and strengthening technology ecosystems.
            </p>

            <p className="text-sm leading-relaxed">
              His willingness to contribute beyond personal gain reflects a belief that true growth occurs when individuals invest in the success of others.
            </p>

            <p className="text-sm leading-relaxed">
              Whether supporting educational programs, technology communities, events, workshops, or awareness campaigns, Nestor approaches volunteering as an opportunity to create lasting impact and inspire positive change.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Community Builder</h2>

            <p className="text-sm leading-relaxed">
              Nestor understands that innovation thrives within strong communities.
            </p>

            <p className="text-sm leading-relaxed">
              Throughout his journey, he has engaged with various technology ecosystems, student organizations, and professional networks where collaboration, learning, and shared growth are prioritized.
            </p>

            <p className="text-sm leading-relaxed">
              His involvement within technology communities demonstrates his commitment to fostering environments where individuals can connect, exchange ideas, develop skills, and discover opportunities.
            </p>

            <p className="text-sm leading-relaxed">
              He recognizes the importance of collective progress and actively supports initiatives that bring people together around technology, entrepreneurship, digital transformation, and professional development.
            </p>

            <p className="text-sm leading-relaxed">
              Through networking, mentorship, collaboration, and community engagement, he contributes to strengthening the technology ecosystem while encouraging others to participate and grow alongside their peers.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">Leader</h2>

            <p className="text-sm leading-relaxed">
              Leadership is one of the defining characteristics of Nestor Anyanwu's professional journey.
            </p>

            <p className="text-sm leading-relaxed">
              His leadership approach is rooted in service, vision, accountability, and empowerment. Rather than focusing solely on authority, he emphasizes creating opportunities, enabling collaboration, and helping others reach their potential.
            </p>

            <p className="text-sm leading-relaxed">
              His involvement in student and professional leadership roles has provided opportunities to coordinate initiatives, manage teams, support strategic objectives, and drive meaningful outcomes.
            </p>

            <p className="text-sm leading-relaxed">
              As a leader, he values innovation, continuous improvement, and collective success. He believes that effective leadership involves listening, learning, adapting, and creating environments where people can thrive.
            </p>

            <p className="text-sm leading-relaxed">
              His ability to balance technical expertise with people-centered leadership continues to position him as an emerging voice within the technology ecosystem.
            </p>

            <h2 className="text-base font-sans font-bold text-primary mt-8 mb-3 tracking-wide">The Future</h2>

            <p className="text-sm leading-relaxed">
              Nestor Anyanwu represents a generation of African innovators committed to leveraging technology for impact.
            </p>

            <p className="text-sm leading-relaxed">
              As technology continues to redefine industries, economies, and societies, he remains focused on learning, building, leading, and contributing to meaningful transformation.
            </p>

            <p className="text-sm leading-relaxed">
              His interests in software development, artificial intelligence, digital innovation, design, community building, and leadership suggest a future filled with opportunities to influence technological advancement and inspire the next generation of innovators.
            </p>

            <p className="text-sm leading-relaxed">
              Through dedication, curiosity, and a commitment to service, Nestor continues to establish himself as a professional whose work extends beyond technology and into the broader mission of empowering people through innovation.
            </p>

            <p className="text-sm leading-relaxed">
              For Nestor, technology is not merely a profession. It is a platform for impact, a catalyst for growth, and a tool for shaping a better future.
            </p>

            <p className="text-sm leading-relaxed">
              His core goal steers toward creating an inclusive and collaborative tech ecosystem where everyone has the opportunity to thrive.
            </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
