import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { requireAdmin } from '@/lib/supabase/admin'

const VALID_FOLDER_REGEX = /^[a-zA-Z0-9_-]{1,50}(\/[a-zA-Z0-9_-]{1,50})*$/
const VALID_PUBLIC_ID_REGEX = /^nestor\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*$/

function getCloudinaryCredentials() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  return { cloudName, apiKey, apiSecret }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin()
    if (!auth.ok) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 })
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials()

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
    const rawFolder = typeof body.folder === 'string' ? body.folder.trim().replace(/^\/+|\/+$/g, '') : ''
    if (rawFolder && (!VALID_FOLDER_REGEX.test(rawFolder) || rawFolder.includes('..'))) {
      return NextResponse.json({ error: 'Invalid upload folder path' }, { status: 400 })
    }

    const folder = `nestor/${rawFolder || 'uploads'}`
    const timestamp = Math.round(Date.now() / 1000)

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
    const auth = await requireAdmin()
    if (!auth.ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials()

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 500 })
    }

    const body = await request.json().catch(() => ({}))
    const publicId = typeof body.public_id === 'string' ? body.public_id.trim() : ''

    if (!publicId || !VALID_PUBLIC_ID_REGEX.test(publicId) || publicId.includes('..')) {
      return NextResponse.json({ error: 'A valid nestor/ public_id is required' }, { status: 400 })
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

    const data = await res.json().catch(() => null)
    if (!res.ok || (data?.result !== 'ok' && data?.result !== 'not found')) {
      return NextResponse.json(
        { error: 'Cloudinary asset deletion failed', result: data },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, result: data })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete asset' },
      { status: 500 }
    )
  }
}
