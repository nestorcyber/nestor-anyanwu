import { NextResponse } from 'next/server'
import { buildSearchIndex, searchInIndex } from '@/lib/search-index'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const index = await buildSearchIndex()
  if (!q) {
    return NextResponse.json({ results: index.slice(0, 12) })
  }
  return NextResponse.json({ results: searchInIndex(index, q).slice(0, 24) })
}
