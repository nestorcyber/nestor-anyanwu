import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/admin/field'
import SkillsManager from '@/components/admin/skills-manager'
import { getSkillGroups } from '@/lib/content'

export default async function AdminSkillsPage() {
  const supabase = await createClient()
  const { data: groups } = await supabase.from('skill_groups').select('*').order('sort_order')
  const { data: skills } = await supabase.from('skills').select('*').order('sort_order')

  let initialGroups = (groups ?? []).map((g) => ({
    ...g,
    skills: (skills ?? []).filter((s) => s.group_id === g.id),
  }))

  if (initialGroups.length === 0) {
    const fallback = await getSkillGroups()
    initialGroups = fallback.map((g, i) => ({
      id: `group-${i}`,
      category: g.category,
      sort_order: i,
      created_at: new Date().toISOString(),
      skills: g.skills.map((s, j) => ({
        id: `skill-${i}-${j}`,
        group_id: `group-${i}`,
        name: s.name,
        experience_level: s.experienceLevel || null,
        years: s.years || null,
        sort_order: j,
        created_at: new Date().toISOString(),
      })),
    })) as any
  }

  return (
    <div>
      <PageHeader title="Skills" />
      <SkillsManager initialGroups={initialGroups} />
    </div>
  )
}
