import type { MetadataRoute } from "next"
import { getJournalArticles, getPortfolioProjects, getCommunityEntries } from "@/lib/content"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nestor.name.ng"

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/journey`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  // Dynamic CMS Routes
  const articles = await getJournalArticles()
  const projects = await getPortfolioProjects()
  const communities = await getCommunityEntries()

  const journalRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(article.publishedDate || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const communityRoutes: MetadataRoute.Sitemap = communities.map((entry) => ({
    url: `${baseUrl}/community/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...journalRoutes, ...portfolioRoutes, ...communityRoutes]
}
