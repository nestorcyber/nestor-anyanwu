/**
 * Cloudinary utilities for image optimization, public ID extraction, and validation.
 */

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
]

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Unsupported image format. Allowed formats: JPG, JPEG, PNG, WebP, AVIF',
    }
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit (Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB)`,
    }
  }

  return { valid: true }
}

export type CloudinaryOptimizeOptions = {
  width?: number
  height?: number
  quality?: string | number
  format?: string
  crop?: string
}

/**
 * Transforms Cloudinary image URLs to include automatic format, quality, and responsive width transformations.
 * Safely passes through non-Cloudinary image URLs, SVG data URLs, or local assets without alteration.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options: CloudinaryOptimizeOptions = {}
): string {
  if (!url) return ''

  // If not a Cloudinary upload URL or if it's an SVG, return as is
  if (!url.includes('res.cloudinary.com') || url.endsWith('.svg')) {
    return url
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = width && height ? 'fill' : 'limit',
  } = options

  const transformations: string[] = [`f_${format}`, `q_${quality}`]

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (width || height) transformations.push(`c_${crop}`)

  const transformString = transformations.join(',')

  // Replace /upload/ with /upload/{transformations}/
  // Handles versioned and unversioned Cloudinary URLs
  if (url.includes('/upload/')) {
    return url.replace(/\/upload\/(?:v\d+\/)?/, `/upload/${transformString}/`)
  }

  return url
}

/**
 * Extracts public ID from a Cloudinary URL (useful for deletion or asset reference tracking).
 */
export function extractPublicId(url: string | null | undefined): string | null {
  if (!url || !url.includes('res.cloudinary.com')) return null

  try {
    const splitUrl = url.split('/upload/')
    if (splitUrl.length < 2) return null

    const pathParts = splitUrl[1].split('/')
    // Remove version prefix if present (e.g. v123456789)
    if (pathParts[0].match(/^v\d+$/)) {
      pathParts.shift()
    }
    // Join remaining parts and strip extension
    const fullPath = pathParts.join('/')
    const lastDotIndex = fullPath.lastIndexOf('.')
    return lastDotIndex > -1 ? fullPath.substring(0, lastDotIndex) : fullPath
  } catch (err) {
    return null
  }
}
