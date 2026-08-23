import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdminShell from '@/components/admin/admin-shell'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Nestor Anyanwu',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  )
}
