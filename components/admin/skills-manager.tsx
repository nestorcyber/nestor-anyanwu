'use client'

import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DangerButton, Field, PrimaryButton, TextInput } from '@/components/admin/field'
import type { Tables } from '@/lib/supabase/types'
import { Edit2, Check, X, Search, Loader2 } from 'lucide-react'
import { searchIcons, SkillIcon, IconOption, getCanonicalTechLogoUrl } from '@/components/admin/icon-picker'

type Skill = Tables<'skills'>
type Group = Tables<'skill_groups'> & { skills: Skill[] }

export default function SkillsManager({ initialGroups }: { initialGroups: Group[] }) {
  const router = useRouter()
  const [groups, setGroups] = useState(initialGroups)
  const [category, setCategory] = useState('')
  
  // Add Skill Form state
  const [skillName, setSkillName] = useState('')
  const [skillGroupId, setSkillGroupId] = useState(initialGroups[0]?.id ?? '')
  const [level, setLevel] = useState('')
  const [years, setYears] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(null)
  
  // Icon Search Popover state for Add Form
  const [iconQuery, setIconQuery] = useState('')
  const [searchResults, setSearchResults] = useState<IconOption[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  // Editing Group state
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)
  const [editCategoryName, setEditCategoryName] = useState('')

  // Editing Skill state
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
  const [editSkillName, setEditSkillName] = useState('')
  const [editSkillLevel, setEditSkillLevel] = useState('')
  const [editSkillYears, setEditSkillYears] = useState('')
  const [editSelectedIcon, setEditSelectedIcon] = useState<IconOption | null>(null)
  const [editIconQuery, setEditIconQuery] = useState('')
  const [editSearchResults, setEditSearchResults] = useState<IconOption[]>([])
  const [editIsSearching, setEditIsSearching] = useState(false)
  const [savingSkillId, setSavingSkillId] = useState<string | null>(null)

  const [error, setError] = useState('')

  // Debounced icon search for Add Skill
  useEffect(() => {
    const query = iconQuery.trim() || skillName.trim()
    if (!query) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      setSearchError('')
      try {
        const results = await searchIcons(query)
        setSearchResults(results)
      } catch (err) {
        setSearchError('Unable to load icons. Try another search.')
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [iconQuery, skillName])

  // Debounced icon search for Edit Skill
  useEffect(() => {
    const query = editIconQuery.trim() || editSkillName.trim()
    if (!query) {
      setEditSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setEditIsSearching(true)
      try {
        const results = await searchIcons(query)
        setEditSearchResults(results)
      } catch (err) {
        // silent fallback
      } finally {
        setEditIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [editIconQuery, editSkillName])

  async function addGroup(e: FormEvent) {
    e.preventDefault()
    const supabase = createClient()
    const { data, error: err } = await supabase
      .from('skill_groups')
      .insert({ category, sort_order: groups.length })
      .select('*')
      .single()
    if (err || !data) {
      setError(err?.message || 'Failed to add group')
      return
    }
    setGroups((g) => [...g, { ...data, skills: [] }])
    setCategory('')
    setSkillGroupId(data.id)
    router.refresh()
  }

  async function startEditGroup(group: Group) {
    setEditingGroupId(group.id)
    setEditCategoryName(group.category)
  }

  async function saveEditGroup(groupId: string) {
    if (!editCategoryName.trim()) return
    const supabase = createClient()
    const { error: err } = await supabase
      .from('skill_groups')
      .update({ category: editCategoryName.trim() })
      .eq('id', groupId)

    if (err) {
      setError(err.message || 'Failed to update category')
      return
    }

    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, category: editCategoryName.trim() } : g))
    )
    setEditingGroupId(null)
    router.refresh()
  }

  async function addSkill(e: FormEvent) {
    e.preventDefault()
    if (!skillGroupId) return
    setError('')
    const supabase = createClient()
    const group = groups.find((g) => g.id === skillGroupId)

    const chosenProvider = selectedIcon?.provider || 'simple'
    const chosenName = selectedIcon?.name || skillName.trim()
    const chosenUrl = selectedIcon?.svgUrl || getCanonicalTechLogoUrl(skillName.trim()) || null

    const payload: any = {
      group_id: skillGroupId,
      name: skillName.trim(),
      experience_level: level.trim() || null,
      years: years.trim() || null,
      sort_order: group?.skills.length ?? 0,
      icon_provider: chosenProvider,
      icon_name: chosenName,
      icon: chosenUrl,
    }

    const { data, error: err } = await supabase
      .from('skills')
      .insert(payload)
      .select('*')
      .single()

    if (err || !data) {
      setError(err?.message || 'Failed to add skill')
      return
    }

    setGroups((prev) =>
      prev.map((g) => (g.id === skillGroupId ? { ...g, skills: [...g.skills, data] } : g))
    )
    setSkillName('')
    setLevel('')
    setYears('')
    setSelectedIcon(null)
    setIconQuery('')
    router.refresh()
  }

  function startEditSkill(skill: Skill) {
    setEditingSkillId(skill.id)
    setEditSkillName(skill.name)
    setEditSkillLevel(skill.experience_level || '')
    setEditSkillYears(skill.years || '')
    
    // Check if skill has icon info or resolve via canonical tech logo helper
    const provider = skill.icon_provider || (getCanonicalTechLogoUrl(skill.name) ? 'simple' : 'lucide')
    const iconName = skill.icon_name || skill.name
    const iconUrl = skill.icon || getCanonicalTechLogoUrl(skill.name) || undefined

    setEditSelectedIcon({
      provider,
      name: iconName,
      title: skill.name,
      svgUrl: iconUrl,
    })
    setEditIconQuery('')
  }

  async function saveEditSkill(skillId: string, groupId: string) {
    if (!editSkillName.trim()) return
    setError('')
    setSavingSkillId(skillId)
    const supabase = createClient()

    // Determine icon fields: use editSelectedIcon if picked, or resolve via canonical tech logo helper
    const chosenProvider = editSelectedIcon?.provider || 'simple'
    const chosenName = editSelectedIcon?.name || editSkillName.trim()
    const chosenUrl = editSelectedIcon?.svgUrl || getCanonicalTechLogoUrl(editSkillName.trim()) || null

    const payload: any = {
      name: editSkillName.trim(),
      experience_level: editSkillLevel.trim() || null,
      years: editSkillYears.trim() || null,
      icon_provider: chosenProvider,
      icon_name: chosenName,
      icon: chosenUrl,
    }

    const { data, error: err } = await supabase
      .from('skills')
      .update(payload)
      .eq('id', skillId)
      .select('*')

    if (err) {
      setError(`Failed to update skill: ${err.message}`)
      setSavingSkillId(null)
      return
    }

    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              skills: g.skills.map((s) =>
                s.id === skillId
                  ? {
                      ...s,
                      name: editSkillName.trim(),
                      experience_level: editSkillLevel.trim() || null,
                      years: editSkillYears.trim() || null,
                      icon_provider: chosenProvider,
                      icon_name: chosenName,
                      icon: chosenUrl,
                    }
                  : s
              ),
            }
          : g
      )
    )
    setSavingSkillId(null)
    setEditingSkillId(null)
    setEditSelectedIcon(null)
    setEditIconQuery('')
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
      
      {/* Skill Groups & Skills List */}
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-card border border-border/80 rounded-xl p-5 shadow-2xs space-y-4">
            
            {/* Group Category Header with Inline Editing */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              {editingGroupId === group.id ? (
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <TextInput
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    placeholder="Group category name"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveEditGroup(group.id)}
                    className="p-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingGroupId(null)}
                    className="p-2 bg-secondary text-muted-foreground border border-border rounded-lg hover:text-foreground"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-bold text-foreground">{group.category}</h2>
                  <button
                    type="button"
                    onClick={() => startEditGroup(group)}
                    className="p-1.5 text-muted-foreground hover:text-accent rounded-md hover:bg-secondary transition-colors"
                    title="Edit group category name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <DangerButton type="button" onClick={() => deleteGroup(group.id)} className="w-full sm:w-auto text-xs py-1.5 px-3">
                Delete group
              </DangerButton>
            </div>

            {/* Skills List under Group */}
            <ul className="space-y-2.5">
              {group.skills.map((skill) => (
                <li key={skill.id} className="p-3 bg-secondary/40 border border-border/60 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {editingSkillId === skill.id ? (
                    <div className="space-y-3 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                        <TextInput
                          value={editSkillName}
                          onChange={(e) => setEditSkillName(e.target.value)}
                          placeholder="Skill Name"
                          autoFocus
                        />
                        <TextInput
                          value={editSkillLevel}
                          onChange={(e) => setEditSkillLevel(e.target.value)}
                          placeholder="Level (e.g. Advanced)"
                        />
                        <TextInput
                          value={editSkillYears}
                          onChange={(e) => setEditSkillYears(e.target.value)}
                          placeholder="Years (e.g. 3+ yrs)"
                        />
                      </div>

                      {/* Icon Selector in Edit Mode */}
                      <div className="p-3 bg-card border border-border/60 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground">Skill Icon</span>
                          {editSelectedIcon ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 p-1 bg-secondary rounded border border-border flex items-center justify-center">
                                <SkillIcon provider={editSelectedIcon.provider} name={editSelectedIcon.name} rawUrl={editSelectedIcon.svgUrl} className="w-4 h-4 object-contain" />
                              </div>
                              <span className="text-xs font-mono font-bold text-accent">{editSelectedIcon.title}</span>
                              <button
                                type="button"
                                onClick={() => setEditSelectedIcon(null)}
                                className="text-[10px] text-muted-foreground hover:text-red-400 underline ml-1"
                              >
                                Change
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">No icon selected</span>
                          )}
                        </div>

                        {/* Search Input & Results for Edit */}
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                          <input
                            type="text"
                            value={editIconQuery}
                            onChange={(e) => setEditIconQuery(e.target.value)}
                            placeholder="🔍 Search icons (e.g. React, Next.js)..."
                            className="w-full pl-8 pr-3 py-1.5 bg-background border border-border/80 rounded-md text-xs text-foreground focus:outline-none focus:border-accent"
                          />
                        </div>

                        {editIsSearching ? (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                            <Loader2 className="w-3 h-3 animate-spin text-accent" />
                            <span>Searching icons...</span>
                          </div>
                        ) : editSearchResults.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                            {editSearchResults.map((iconOption, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setEditSelectedIcon(iconOption)}
                                className={`p-2 rounded-lg border text-left flex items-center gap-2 text-xs transition-all cursor-pointer ${
                                  editSelectedIcon?.name === iconOption.name
                                    ? 'bg-accent/10 border-accent text-accent font-bold'
                                    : 'bg-secondary/40 border-border/60 hover:bg-secondary hover:border-accent/50'
                                }`}
                              >
                                <div className="w-5 h-5 p-0.5 bg-secondary/80 rounded border border-border/50 flex items-center justify-center shrink-0">
                                  <SkillIcon provider={iconOption.provider} name={iconOption.name} rawUrl={iconOption.svgUrl} className="w-3.5 h-3.5 object-contain" />
                                </div>
                                <span className="truncate text-[11px]">{iconOption.title}</span>
                              </button>
                            ))}
                          </div>
                        ) : null}
                        {/* Clean Primary Save Skill & Cancel Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => saveEditSkill(skill.id, group.id)}
                              disabled={savingSkillId === skill.id}
                              className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs px-5 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                            >
                              {savingSkillId === skill.id ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Saving...</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Save Skill</span>
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSkillId(null)}
                              disabled={savingSkillId === skill.id}
                              className="bg-secondary hover:bg-secondary/80 text-muted-foreground border border-border text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                          {error ? <p className="text-xs text-red-400 font-semibold">{error}</p> : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-foreground flex items-center gap-3">
                      {/* Icon Preview Badge */}
                      <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center p-1.5 shrink-0">
                        <SkillIcon
                          provider={skill.icon_provider || undefined}
                          name={skill.icon_name || undefined}
                          rawUrl={skill.icon || undefined}
                          fallbackText={skill.name.charAt(0)}
                          className="w-5 h-5 object-contain"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{skill.name}</span>
                        {skill.experience_level && (
                          <span className="text-[10px] text-muted-foreground font-normal px-2 py-0.5 bg-secondary rounded border border-border/50">
                            {skill.experience_level}
                          </span>
                        )}
                        {skill.years && (
                          <span className="text-[10px] font-mono text-accent font-bold px-2 py-0.5 bg-accent/10 rounded border border-accent/20">
                            {skill.years}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions for Skill in normal view mode */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    {editingSkillId === skill.id ? null : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEditSkill(skill)}
                          className="text-xs text-accent font-medium hover:underline px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-400 text-xs font-medium hover:underline px-2 py-1"
                          onClick={() => deleteSkill(skill.id, group.id)}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
              {!group.skills.length ? <li className="text-xs text-muted-foreground italic py-2">No skills in this group yet.</li> : null}
            </ul>

          </div>
        ))}
      </div>

      {/* Forms for Add Group & Add Skill */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Add Group Form */}
        <form onSubmit={addGroup} className="bg-card border border-border/80 rounded-xl p-5 space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">Add Skill Group</h3>
          <Field label="Group Category Name">
            <TextInput required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Software Engineering & Web" />
          </Field>
          <PrimaryButton type="submit">Add Group</PrimaryButton>
        </form>

        {/* Add Skill Form with Dynamic Icon Picker */}
        <form onSubmit={addSkill} className="bg-card border border-border/80 rounded-xl p-5 space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">Add Skill to Group</h3>
          
          <Field label="Target Skill Group">
            <select
              className="w-full border border-border bg-secondary/50 text-foreground px-3 py-2 text-xs rounded-lg font-medium focus:outline-none focus:border-accent"
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

          <Field label="Skill Name">
            <TextInput required value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="e.g. React, Next.js, Figma..." />
          </Field>

          {/* Icon Picker Section */}
          <div className="p-3 bg-secondary/30 border border-border/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Select Skill Icon</span>
              {selectedIcon ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 p-1 bg-card rounded border border-border flex items-center justify-center">
                    <SkillIcon provider={selectedIcon.provider} name={selectedIcon.name} rawUrl={selectedIcon.svgUrl} className="w-4 h-4 object-contain" />
                  </div>
                  <span className="text-xs font-mono font-bold text-accent">{selectedIcon.title}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedIcon(null)}
                    className="text-[10px] text-muted-foreground hover:text-red-400 underline ml-1"
                  >
                    Change Icon
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic">No icon selected (auto-searched)</span>
              )}
            </div>

            {/* Icon Search Field */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={iconQuery}
                onChange={(e) => setIconQuery(e.target.value)}
                placeholder="🔍 Search icons (e.g. React, Next.js, Docker)..."
                className="w-full pl-9 pr-3 py-1.5 bg-background border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:border-accent"
              />
            </div>

            {/* Search Feedback & Results Grid */}
            {isSearching ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                <span>Searching icons...</span>
              </div>
            ) : searchError ? (
              <p className="text-xs text-red-400 py-1">{searchError}</p>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">Suggested icons</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {searchResults.map((iconOption, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIcon(iconOption)}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 text-xs transition-all cursor-pointer ${
                        selectedIcon?.name === iconOption.name
                          ? 'bg-accent/10 border-accent text-accent font-bold'
                          : 'bg-card border-border/60 hover:bg-secondary hover:border-accent/50'
                      }`}
                    >
                      <div className="w-6 h-6 p-1 bg-secondary/80 rounded border border-border/50 flex items-center justify-center shrink-0">
                        <SkillIcon provider={iconOption.provider} name={iconOption.name} rawUrl={iconOption.svgUrl} className="w-4 h-4 object-contain" />
                      </div>
                      <span className="truncate text-xs">{iconOption.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (iconQuery || skillName) ? (
              <p className="text-xs text-muted-foreground italic py-1">No matching icons found. Try another term or choose a generic icon.</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Experience Level">
              <TextInput value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g. Advanced" />
            </Field>
            <Field label="Years">
              <TextInput value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 3+ yrs" />
            </Field>
          </div>

          <PrimaryButton type="submit" disabled={!groups.length}>
            Add Skill
          </PrimaryButton>
        </form>

      </div>

      {error ? <p className="text-xs text-red-400 font-semibold">{error}</p> : null}
    </div>
  )
}
