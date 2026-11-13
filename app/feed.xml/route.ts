import { NextResponse } from 'next/server'
import { getJournalArticles } from '@/lib/content'
import { escapeCdata, escapeXml } from '@/lib/security'

export const revalidate = 60

function safeUtcDate(dateInput?: string | null): string {
  const parsed = dateInput ? new Date(dateInput) : new Date()
  return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString()
}

export async function GET() {
  const articles = await getJournalArticles()
  const baseUrl = 'https://nestor.name.ng'

  const rssItemsXml = articles
    .map((article) => {
      const safeSlug = encodeURIComponent(article.slug)
      const itemUrl = `${baseUrl}/journal/${safeSlug}`
      return `
    <item>
      <title><![CDATA[${escapeCdata(article.title)}]]></title>
      <link>${escapeXml(itemUrl)}</link>
      <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>
      <pubDate>${safeUtcDate(article.publishedDate)}</pubDate>
      <description><![CDATA[${escapeCdata(article.excerpt)}]]></description>
      <author>${escapeXml(article.author || 'Nestor Anyanwu')}</author>
      <category>${escapeXml(article.category || 'Journal')}</category>
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nestor Anyanwu (Nestor Cyber) | Journal &amp; Writing</title>
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
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
