import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_EMAIL } from '@/lib/constants'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLogin = pathname === '/admin/login'
  const isUploadApi = pathname.startsWith('/api/admin')

  if (!isAdminRoute && !isUploadApi) {
    return NextResponse.next()
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (isLogin) return NextResponse.next()
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const { supabaseResponse, user } = await updateSession(request)
  const email = user?.email?.toLowerCase()
  const isAllowed = !!user && email === ADMIN_EMAIL

  if (isLogin) {
    if (isAllowed) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return supabaseResponse
  }

  if (!isAllowed) {
    if (isUploadApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
