'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateJournal(slug?: string) {
  try {
    revalidatePath('/')
    revalidatePath('/journal')
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
    if (slug) {
      revalidatePath(`/portfolio/${slug}`)
    }
  } catch (err) {
    console.error('Error revalidating portfolio cache:', err)
  }
}
