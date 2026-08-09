'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Users,
  Milestone,
  Image as ImageIcon,
  Briefcase,
  Wrench,
  Award,
  BarChart3,
  Activity,
  Settings,
  ExternalLink,
  Search,
  Menu,
  Moon,
  Sun,
  X,
  LogOut,
  UserCheck,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { createClient } from '@/lib/supabase/client'

type NavGroup = {
  title: string
  items: { href: string; label: string; icon: any }[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'MAIN',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'CONTENT',
    items: [
      { href: '/admin/journal', label: 'Journal', icon: BookOpen },
      { href: '/admin/portfolio', label: 'Projects', icon: FolderKanban },
      { href: '/admin/community', label: 'Community', icon: Users },
      { href: '/admin/brands', label: 'Brand Partners', icon: Briefcase },
      { href: '/admin/journey', label: 'Milestones', icon: Milestone },
    ],
  },
  {
    title: 'MEDIA',
    items: [{ href: '/admin/gallery', label: 'Media Library', icon: ImageIcon }],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { href: '/admin/services', label: 'Services', icon: Briefcase },
      { href: '/admin/skills', label: 'Skills & Tech', icon: Wrench },
      { href: '/admin/certifications', label: 'Certifications', icon: Award },
      { href: '/admin/stats', label: 'Impact Stats', icon: BarChart3 },
      { href: '/admin/activity', label: 'Activity Logs', icon: Activity },
    ],
  },
  {
    title: 'SYSTEM',
    items: [{ href: '/admin/settings', label: 'Settings', icon: Settings }],
  },
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
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground"
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="space-y-1">
          <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/70">
            {group.title}
          </p>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon
              const active =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    active
                      ? 'bg-accent/10 text-accent font-semibold shadow-xs'
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      active ? 'text-accent' : 'text-muted-foreground/80 group-hover:text-foreground'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </div>
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mobile Top Drawer Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="truncate text-xs font-mono font-bold uppercase tracking-wider text-foreground">Nestor CMS</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Persistent Desktop App Shell */}
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar (Desktop 250px) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-border bg-card p-4 transition-transform duration-200 md:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Header Brand */}
          <div className="flex items-center justify-between px-2 py-1.5 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground font-extrabold text-sm flex items-center justify-center font-mono">
                N
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-foreground leading-none">Nestor Anyanwu</h1>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">CMS Admin Panel</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>

          {/* Sidebar Footer User Info */}
          <div className="pt-3 border-t border-border mt-auto">
            <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">Nestor Anyanwu</p>
                  <p className="text-[10px] text-muted-foreground truncate">Administrator</p>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors rounded-md"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Wrapper */}
        <div className="flex-1 md:ml-[250px] flex flex-col min-w-0">
          {/* Top Bar Header */}
          <header className="hidden md:flex sticky top-0 z-30 h-14 items-center justify-between border-b border-border bg-card/80 px-8 backdrop-blur">
            <div className="flex items-center gap-3 w-72">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search CMS content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                <span>Preview Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </header>

          {/* Main Dashboard Workspace */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
