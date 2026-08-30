import React from "react"
import { getPortfolioProjects } from "@/lib/content"
import FeaturedPortfolioShowcase from "@/components/home/featured-portfolio-showcase"

export default async function FeaturedPortfolio() {
  const projects = await getPortfolioProjects()

  return <FeaturedPortfolioShowcase projects={projects} />
}
