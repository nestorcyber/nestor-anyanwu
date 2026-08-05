'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/journal', label: 'Journal' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/community', label: 'Community' },
  { href: '/admin/journey', label: 'Journey' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/certifications', label: 'Certifications' },
  { href: '/admin/stats', label: 'Stats' },
  { href: '/admin/settings', label: 'Site Settings' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      <aside className="w-60 shrink-0 border-r border-neutral-800 p-4 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">CMS</p>
          <h1 className="text-lg font-semibold mt-1">Admin</h1>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto space-y-2">
          <Link href="/" className="block px-3 py-2 text-sm text-neutral-500 hover:text-white">
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm text-neutral-500 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">{children}</main>
    </div>
  )
}
