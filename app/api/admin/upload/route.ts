import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/constants'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 })
    }

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      const missing: string[] = []
      if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME')
      if (!apiKey) missing.push('CLOUDINARY_API_KEY')
      if (!apiSecret) missing.push('CLOUDINARY_API_SECRET')
      return NextResponse.json(
        { error: `Cloudinary is not configured. Missing variables: ${missing.join(', ')}` },
        { status: 500 }
      )
    }

    const { v2: cloudinary } = await import('cloudinary')

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    })

    const body = await request.json().catch(() => ({}))
    const folder = typeof body.folder === 'string' ? `nestor/${body.folder}` : 'nestor/uploads'
    const timestamp = Math.round(Date.now() / 1000)
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, apiSecret)

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      signature,
      folder,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to generate upload signature' },
      { status: 500 }
    )
  }
}
