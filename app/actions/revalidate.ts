'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateJournal(slug?: string) {
  try {
    revalidatePath('/')
    revalidatePath('/journal')
    revalidateTag('search-index')
    if (slug) {
      revalidatePath(`/journal/${slug}`)
    }
  } catch (err) {
    console.error('Error revalidating journal cache:', err)
  }
}

export async function revalidatePortfolio(slug?: string) {
  try {
    revalidatePath('/')
    revalidatePath('/portfolio')
    revalidatePath('/certifications')
    revalidatePath('/experience')
    revalidatePath('/admin/certifications')
    revalidateTag('search-index')
    if (slug) {
      revalidatePath(`/portfolio/${slug}`)
    }
  } catch (err) {
    console.error('Error revalidating portfolio cache:', err)
  }
}

export async function revalidateGallery() {
  try {
    revalidatePath('/')
    revalidatePath('/gallery')
    revalidatePath('/community')
    revalidatePath('/admin/gallery')
  } catch (err) {
    console.error('Error revalidating gallery cache:', err)
  }
}

