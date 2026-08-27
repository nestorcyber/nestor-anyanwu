import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
})

async function main() {
  console.log('Testing connection to Supabase table brand_partners...')

  const sampleBrands = [
    {
      name: 'NACOS FUTO',
      logo_url: 'https://res.cloudinary.com/z3wgqisj/image/upload/v1787837125/nestor/gallery/futo-1.jpg',
      website_url: 'https://nacos.org.ng',
      sort_order: 0,
    },
    {
      name: 'GDG Owerri',
      logo_url: 'https://res.cloudinary.com/z3wgqisj/image/upload/v1787837107/nestor/gallery/devfest25-1.jpg',
      website_url: 'https://gdg.community.dev',
      sort_order: 1,
    },
    {
      name: 'IEEE FUTO SB',
      logo_url: 'https://res.cloudinary.com/z3wgqisj/image/upload/v1785966488/nestor/about/about_fm7rwu.jpg',
      website_url: 'https://ieee.org',
      sort_order: 2,
    },
    {
      name: 'Build With AI',
      logo_url: 'https://res.cloudinary.com/z3wgqisj/image/upload/v1785966488/nestor/about/about_fm7rwu.jpg',
      sort_order: 3,
    },
    {
      name: 'DevFest Owerri',
      logo_url: 'https://res.cloudinary.com/z3wgqisj/image/upload/v1787837107/nestor/gallery/devfest25-1.jpg',
      sort_order: 4,
    },
  ]

  const { error: insertErr } = await supabase.from('brand_partners').insert(sampleBrands)
  if (insertErr) {
    console.log('Result:', insertErr.message)
  } else {
    console.log('✓ Successfully created and inserted sample brand_partners into Supabase!')
  }
}

main().catch(console.error)
