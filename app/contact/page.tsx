import type { Metadata } from "next"
import ContactPage from "./contact-client"
import { getBrandPartners } from "@/lib/content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
  description: "Get in touch with Nestor Anyanwu for full-stack software engineering, web development, UI/UX design, IT consulting, AI workflows, DevRel, speaking engagements, and community initiatives.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
    description: "Get in touch with Nestor Anyanwu for full-stack software engineering, web development, UI/UX design, IT consulting, AI workflows, DevRel, speaking engagements, and community initiatives.",
    url: "/contact",
  },
  twitter: {
    title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
    description: "Get in touch with Nestor Anyanwu for full-stack software engineering, web development, UI/UX design, IT consulting, AI workflows, DevRel, speaking engagements, and community initiatives.",
  },
}

export default async function Page() {
  const brands = await getBrandPartners()
  return <ContactPage brands={brands} />
}
