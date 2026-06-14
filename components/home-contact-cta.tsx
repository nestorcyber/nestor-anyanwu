import Image from "next/image"
import { MessageCircle } from "lucide-react"

export default function HomeContactCTA() {
  return (
    <section className="bg-background">
      {/* Desktop Layout: Side by side */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-12 md:items-center md:py-20 md:px-20 lg:px-32 max-w-7xl mx-auto">
        {/* Left side - Text content */}
        <div>
          <h2 className="font-sans text-5xl lg:text-6xl font-bold text-primary mb-6">Let's Connect</h2>
          <p className="text-base md:text-lg text-foreground mb-8 leading-relaxed">
            Interested in collaborating or discussing opportunities? Nestor is always open to connecting with like-minded professionals.
          </p>
          <a
            href="https://wa.me/message/GJIXLHQQPYDIE1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-secondary px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-bold text-base cursor-pointer"
          >
            <MessageCircle size={20} />
            Start a Conversation
          </a>
        </div>

        {/* Right side - Image */}
        <div className="relative h-96 lg:h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techadv1-KPuKECjWv91AIU1tvcclIgkWdXkpwC.jpg"
            alt="Tech community at event"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Mobile Layout: Text on top, image below edge-to-edge */}
      <div className="md:hidden">
        {/* Text content */}
        <div className="px-6 py-12">
          <h2 className="font-sans text-3xl font-bold text-primary mb-4">Let's Connect</h2>
          <p className="text-base text-foreground mb-6 leading-relaxed">
            Interested in collaborating or discussing opportunities? Nestor is always open to connecting with like-minded professionals.
          </p>
          <a
            href="https://wa.me/message/GJIXLHQQPYDIE1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-bold text-sm cursor-pointer"
          >
            <MessageCircle size={20} />
            Start a Conversation
          </a>
        </div>

        {/* Image - full width */}
        <div className="relative w-full h-64">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techadv2-fJNNNhoTlHZluQRApulqQdtBsdPtCL.jpg"
            alt="Tech community at event"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
