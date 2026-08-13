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
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
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
      { href: '/admin/journal', label: 'Journal Posts', icon: BookOpen },
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
  collapsed,
  onNavigate,
}: {
  pathname: string
  collapsed: boolean
  onNavigate?: () => void
}) {
  return (
    <div className="space-y-5">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/70 transition-opacity duration-200">
              {group.title}
            </p>
          )}
          <nav className="flex flex-col gap-1">
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
                  title={item.label}
                  className={`group flex items-center ${
                    collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3.5 py-2.5'
                  } rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#0070f3] text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      active ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
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
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Detect if on an editor page (full page view)
  const isEditingPage = pathname.endsWith('/new') || (pathname.split('/').length >= 4 && pathname.startsWith('/admin/'))

  useEffect(() => {
    // Restore saved sidebar collapsed state
    try {
      const saved = localStorage.getItem('admin_sidebar_collapsed')
      if (saved !== null) {
        setCollapsed(saved === 'true')
      }
    } catch {
      // ignore
    }
  }, [])

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem('admin_sidebar_collapsed', String(next))
      } catch {
        // ignore
      }
      return next
    })
  }

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
      {/* Top Header Bar (Fixed / Sticky across Desktop & Mobile) */}
      <header className="sticky top-0 z-40 flex h-14 md:h-16 items-center justify-between border-b border-border bg-card/95 px-4 md:px-6 backdrop-blur transition-all">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle navigation drawer"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary md:hidden transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Collapse Sidebar Button */}
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={toggleCollapsed}
            className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>

          {/* Brand Logo & CMS Title */}
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0070f3] text-white font-extrabold text-sm flex items-center justify-center font-mono shadow-xs">
              N
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-extrabold tracking-tight text-foreground leading-none">Nestor CMS</h1>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Center Search Input (Blogger Style) */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim()) {
                router.push(`/admin/journal?q=${encodeURIComponent(searchQuery.trim())}`)
              }
            }}
            className="relative"
          >
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts, projects & content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-secondary/60 text-xs text-foreground placeholder:text-muted-foreground rounded-full border border-border/80 focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] transition-all"
            />
          </form>
        </div>

        {/* Right Action Icons & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>

          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center text-xs font-bold font-mono">
            NA
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Persistent Desktop App Layout */}
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar Container (Collapsible Desktop / Drawer Mobile) */}
        <aside
          className={`fixed bottom-0 top-14 md:top-16 left-0 z-50 flex flex-col border-r border-border bg-card p-3 transition-all duration-300 ${
            collapsed ? 'w-full sm:w-[250px] md:w-[68px]' : 'w-full sm:w-[250px] md:w-[250px]'
          } ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          {/* Grouped Navigation Links */}
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <SidebarNav pathname={pathname} collapsed={collapsed} onNavigate={() => setOpen(false)} />
          </div>

          {/* Sidebar Footer User Info */}
          <div className="pt-3 border-t border-border mt-auto">
            <div className={`flex items-center ${collapsed ? 'justify-center p-1.5' : 'justify-between p-2'} rounded-xl bg-secondary/50 border border-border/50`}>
              {!collapsed ? (
                <>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground truncate">Nestor Anyanwu</p>
                      <p className="text-[10px] text-muted-foreground truncate">Admin</p>
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
                </>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  title="Sign out"
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors rounded-md"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Dynamic Content Wrapper (Full Page Workspace) */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            collapsed ? 'md:ml-[68px]' : 'md:ml-[250px]'
          }`}
        >
          {/* Main Workspace Area: Full Page Mode on Editor Pages */}
          <main className={`flex-1 w-full ${isEditingPage ? 'max-w-none p-4 sm:p-6 md:p-8' : 'max-w-7xl mx-auto p-4 sm:p-6 md:p-8'}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
