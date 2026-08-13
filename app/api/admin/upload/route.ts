import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ADMIN_EMAIL } from '@/lib/constants'
import crypto from 'crypto'

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

    const body = await request.json().catch(() => ({}))
    const folder = typeof body.folder === 'string' ? `nestor/${body.folder}` : 'nestor/uploads'
    const timestamp = Math.round(Date.now() / 1000)

    // Generate SHA-1 Cloudinary signature using Node.js built-in crypto module
    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex')

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

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    const publicId = body.public_id

    if (!publicId || typeof publicId !== 'string') {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 })
    }

    const timestamp = Math.round(Date.now() / 1000)
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex')

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', apiKey)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    return NextResponse.json({ success: true, result: data })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete asset' },
      { status: 500 }
    )
  }
}

