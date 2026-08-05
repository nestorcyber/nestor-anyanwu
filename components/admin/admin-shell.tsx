'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`px-3 py-2.5 text-sm transition-colors rounded-sm ${
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
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  if (isLogin) {
    return <>{children}</>
  }

  const currentLabel =
    NAV.find((item) =>
      item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
    )?.label || 'Admin'

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 md:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center border border-neutral-800 text-neutral-200"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">CMS Admin</p>
          <p className="truncate text-sm font-medium">{currentLabel}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="shrink-0 px-2 py-2 text-xs text-neutral-400 hover:text-white"
        >
          Sign out
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* Sidebar: drawer on mobile, static on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col gap-6 border-r border-neutral-800 bg-neutral-950 p-4 transition-transform duration-200 md:static md:z-0 md:w-60 md:shrink-0 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">CMS</p>
            <h1 className="mt-1 text-lg font-semibold">Admin</h1>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center border border-neutral-800 text-neutral-300 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>

        <div className="space-y-1 border-t border-neutral-800 pt-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 text-sm text-neutral-500 hover:text-white"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="hidden w-full text-left px-3 py-2.5 text-sm text-neutral-500 hover:text-white md:block"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 md:p-10">{children}</main>
    </div>
  )
}
