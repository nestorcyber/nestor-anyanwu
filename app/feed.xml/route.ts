import { NextResponse } from 'next/server'
import { getJournalArticles } from '@/lib/keystatic'

export async function GET() {
  const articles = await getJournalArticles()
  const baseUrl = 'https://nestor.name.ng'

  const rssItemsXml = articles
    .map((article) => {
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/journal/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/journal/${article.slug}</guid>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt}]]></description>
      <author>${article.author}</author>
      <category>${article.category}</category>
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nestor Anyanwu (Nestor Cyber) — Journal & Writing</title>
    <link>${baseUrl}/journal</link>
    <description>Technical essays, thought leadership, AI ethics, and insights on technology and community advocacy.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
