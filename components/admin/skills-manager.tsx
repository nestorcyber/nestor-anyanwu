'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DangerButton, Field, PrimaryButton, TextInput } from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'

type Skill = Tables<'skills'>
type Group = Tables<'skill_groups'> & { skills: Skill[] }

export default function SkillsManager({ initialGroups }: { initialGroups: Group[] }) {
  const router = useRouter()
  const [groups, setGroups] = useState(initialGroups)
  const [category, setCategory] = useState('')
  const [skillName, setSkillName] = useState('')
  const [skillGroupId, setSkillGroupId] = useState(initialGroups[0]?.id ?? '')
  const [level, setLevel] = useState('')
  const [years, setYears] = useState('')
  const [error, setError] = useState('')

  async function addGroup(e: FormEvent) {
    e.preventDefault()
    const supabase = createClient()
    const { data, error: err } = await supabase
      .from('skill_groups')
      .insert({ category, sort_order: groups.length })
      .select('*')
      .single()
    if (err || !data) {
      setError(err?.message || 'Failed')
      return
    }
    setGroups((g) => [...g, { ...data, skills: [] }])
    setCategory('')
    setSkillGroupId(data.id)
    router.refresh()
  }

  async function addSkill(e: FormEvent) {
    e.preventDefault()
    if (!skillGroupId) return
    const supabase = createClient()
    const group = groups.find((g) => g.id === skillGroupId)
    const { data, error: err } = await supabase
      .from('skills')
      .insert({
        group_id: skillGroupId,
        name: skillName,
        experience_level: level || null,
        years: years || null,
        sort_order: group?.skills.length ?? 0,
      })
      .select('*')
      .single()
    if (err || !data) {
      setError(err?.message || 'Failed')
      return
    }
    setGroups((prev) =>
      prev.map((g) => (g.id === skillGroupId ? { ...g, skills: [...g.skills, data] } : g))
    )
    setSkillName('')
    setLevel('')
    setYears('')
    router.refresh()
  }

  async function deleteGroup(id: string) {
    if (!confirm('Delete group and its skills?')) return
    const supabase = createClient()
    await supabase.from('skill_groups').delete().eq('id', id)
    setGroups((g) => g.filter((x) => x.id !== id))
    router.refresh()
  }

  async function deleteSkill(id: string, groupId: string) {
    const supabase = createClient()
    await supabase.from('skills').delete().eq('id', id)
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, skills: g.skills.filter((s) => s.id !== id) } : g))
    )
    router.refresh()
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="border border-border p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
              <h2 className="font-medium break-words">{group.category}</h2>
              <DangerButton type="button" onClick={() => deleteGroup(group.id)} className="w-full sm:w-auto">
                Delete group
              </DangerButton>
            </div>
            <ul className="space-y-2">
              {group.skills.map((skill) => (
                <li key={skill.id} className="flex items-center justify-between text-sm text-foreground/80">
                  <span>
                    {skill.name}
                    {skill.experience_level ? ` · ${skill.experience_level}` : ''}
                    {skill.years ? ` · ${skill.years}` : ''}
                  </span>
                  <button
                    type="button"
                    className="text-red-400 text-xs"
                    onClick={() => deleteSkill(skill.id, group.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
              {!group.skills.length ? <li className="text-sm text-muted-foreground">No skills</li> : null}
            </ul>
          </div>
        ))}
      </div>

      <form onSubmit={addGroup} className="max-w-xl space-y-3 border border-border p-4">
        <h3 className="font-medium">Add skill group</h3>
        <Field label="Category">
          <TextInput required value={category} onChange={(e) => setCategory(e.target.value)} />
        </Field>
        <PrimaryButton type="submit">Add group</PrimaryButton>
      </form>

      <form onSubmit={addSkill} className="max-w-xl space-y-3 border border-border p-4">
        <h3 className="font-medium">Add skill</h3>
        <Field label="Group">
          <select
            className="w-full border border-border bg-background px-3 py-2 text-sm"
            value={skillGroupId}
            onChange={(e) => setSkillGroupId(e.target.value)}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.category}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Skill name">
          <TextInput required value={skillName} onChange={(e) => setSkillName(e.target.value)} />
        </Field>
        <Field label="Experience level">
          <TextInput value={level} onChange={(e) => setLevel(e.target.value)} />
        </Field>
        <Field label="Years">
          <TextInput value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <PrimaryButton type="submit" disabled={!groups.length}>
          Add skill
        </PrimaryButton>
      </form>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
