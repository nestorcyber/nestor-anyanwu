import { NextResponse } from 'next/server'
import { buildSearchIndex, searchInIndex } from '@/lib/search-index'

export const revalidate = 3600

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const index = await buildSearchIndex()
  const results = !q ? index.slice(0, 12) : searchInIndex(index, q).slice(0, 24)

  return NextResponse.json(
    { results },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  )
}
