'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground"
      >
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground hover:bg-muted transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active =
          item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`px-3 py-2.5 text-sm transition-colors ${
              active
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          {/* <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">CMS Admin</p> */}
          <p className="truncate text-sm font-medium">{currentLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={logout}
            className="shrink-0 px-2 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* Fixed sidebar (drawer on mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col gap-6 border-r border-border bg-background p-4 transition-transform duration-200 md:w-60 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {/* <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">CMS</p> */}
            <h1 className="mt-1 text-lg font-semibold">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground md:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>

        <div className="space-y-1 border-t border-border pt-3">
          <div className="mb-2 flex items-center justify-between px-3 md:hidden">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="hidden w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground md:block"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Offset for fixed sidebar on desktop */}
      <main className="min-w-0 min-h-screen overflow-x-hidden p-4 sm:p-6 md:ml-60 md:p-10">
        {children}
      </main>
    </div>
  )
}
