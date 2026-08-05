import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import SkillsManager from '@/components/admin/skills-manager'

export default async function AdminSkillsPage() {
  const supabase = await createClient()
  const { data: groups } = await supabase.from('skill_groups').select('*').order('sort_order')
  const { data: skills } = await supabase.from('skills').select('*').order('sort_order')

  const initialGroups = (groups ?? []).map((g) => ({
    ...g,
    skills: (skills ?? []).filter((s) => s.group_id === g.id),
  }))

  return (
    <div>
      <PageHeader title="Skills" />
      <SkillsManager initialGroups={initialGroups} />
    </div>
  )
}
