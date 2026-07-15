"use client"
import { Mail, Linkedin, Instagram, Facebook, Twitter } from "lucide-react"
import { WhatsAppIcon } from "./whatsapp-icon"
import { BehanceIcon } from "./behance-icon"
import { Button } from "./ui/button"

export default function ContactSection() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <p className="text-accent text-xs md:text-sm font-bold tracking-widest mb-3 uppercase">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-foreground mb-6">Let's Connect</h2>
          <p className="text-sm md:text-lg text-foreground/80 font-medium max-w-2xl">
            Do you want to Collaborate or Have an event or project I can support? Let's make it happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Direct Contact</h3>
            <p className="text-sm text-foreground/70 mb-6 font-medium">
              Feel free to reach out through any of these channels. I'd love to hear from you!
            </p>
            <div className="space-y-4">
              <a
                href="mailto:nestoranyanwu@gmail.com"
                className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors font-semibold text-sm"
              >
                <Mail className="w-5 h-5 text-accent" />
                <span>nestoranyanwu@gmail.com</span>
              </a>
              <a
                href="https://wa.me/2349060900245"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors font-semibold text-sm"
              >
                <WhatsAppIcon size={20} className="text-accent" />
                <span>+234 906 090 0245</span>
              </a>
              <a
                href="https://behance.net/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mt-4"
              >
                <Button className="w-full bg-primary hover:bg-accent text-secondary hover:text-primary gap-2 font-bold transition-all">
                  <BehanceIcon className="w-5 h-5" />
                  View Behance Portfolio
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-secondary border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Follow My Journey</h3>
            <p className="text-sm text-foreground/70 mb-6 font-medium">
              Stay updated with my latest activities, publications, events, and community initiatives.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://facebook.com/neorxpro"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-accent hover:text-white text-foreground rounded-lg transition-colors border border-border shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/nestoranyanwu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-accent hover:text-white text-foreground rounded-lg transition-colors border border-border shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-accent hover:text-white text-foreground rounded-lg transition-colors border border-border shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/nestorcyber"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card hover:bg-accent hover:text-white text-foreground rounded-lg transition-colors border border-border shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
