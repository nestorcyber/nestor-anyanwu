import { MessageCircle } from "lucide-react"

export default function HomeContactCTA() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-sans text-lg md:text-xl font-bold text-primary mb-3 tracking-wide">Let's Connect</h2>

        <p className="text-sm md:text-base text-foreground mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
          Interested in collaborating or discussing opportunities? Nestor is always open to connecting with like-minded professionals.
        </p>

        <a
          href="https://wa.me/message/GJIXLHQQPYDIE1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-secondary px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-bold text-sm"
        >
          <MessageCircle size={20} />
          Start a Conversation
        </a>
      </div>
    </section>
  )
}
