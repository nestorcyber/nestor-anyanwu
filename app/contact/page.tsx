import type { Metadata } from "next"
import ContactPage from "./contact-client"
import { getBrandPartners } from "@/lib/content"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
  description: "Get in touch with Nestor Anyanwu for software engineering projects, web development, UI/UX design, speaking engagements, and tech collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
    description: "Get in touch with Nestor Anyanwu for software engineering projects, web development, UI/UX design, speaking engagements, and tech collaborations.",
    url: "/contact",
  },
  twitter: {
    title: "Contact & Collaboration | Nestor Anyanwu (Nestor Cyber)",
    description: "Get in touch with Nestor Anyanwu for software engineering projects, web development, UI/UX design, speaking engagements, and tech collaborations.",
  },
}

export default async function Page() {
  const brands = await getBrandPartners()
  return <ContactPage brands={brands} />
}
