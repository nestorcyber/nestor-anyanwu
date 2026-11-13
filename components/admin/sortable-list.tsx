"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { GripVertical, ArrowUp, ArrowDown, Check, Loader2, Edit, ExternalLink } from "lucide-react"
import { updateItemsSortOrder } from "@/app/actions/reorder"

export interface SortableItem {
  id: string
  title: string
  subtitle?: string
  dateLabel?: string
  image?: string | null
  badge?: string
  tags?: string[]
  editUrl: string
  viewUrl?: string
  sortOrder?: number
}

interface SortableListProps {
  initialItems: SortableItem[]
  table: string
  emptyMessage?: string
}

export default function SortableList({
  initialItems,
  table,
  emptyMessage = "No items added yet.",
}: SortableListProps) {
  const [items, setItems] = useState<SortableItem[]>(initialItems)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Sync if initialItems change from server
  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  // Save new order to Supabase
  const persistOrder = async (newItems: SortableItem[]) => {
    setSaving(true)
    setJustSaved(false)
    setSaveError(null)

    const payload = newItems.map((item, idx) => ({
      id: item.id,
      sort_order: idx,
    }))

    const result = await updateItemsSortOrder(table, payload)

    setSaving(false)
    if (result.success) {
      setJustSaved(true)
      setTimeout(() => setJustSaved(false), 2500)
    } else {
      setSaveError(result.error || "Failed to save sort order.")
    }
  }

  // Handle Drag Start
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragOverIndex !== index) {
      setDragOverIndex(index)
    }
  }

  // Handle Drop
  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const updated = [...items]
    const [movedItem] = updated.splice(draggedIndex, 1)
    updated.splice(dropIndex, 0, movedItem)

    setItems(updated)
    setDraggedIndex(null)
    setDragOverIndex(null)
    persistOrder(updated)
  }

  // Handle Move Up
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return

    const updated = [...items]
    const [movedItem] = updated.splice(index, 1)
    updated.splice(targetIndex, 0, movedItem)

    setItems(updated)
    persistOrder(updated)
  }

  if (!items.length) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground bg-card border border-border/80 rounded-2xl">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Top Status Hint */}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium">
          <GripVertical className="w-3.5 h-3.5 text-[#0056D2]" />
          Drag items or use the arrows to reorder. Sort order numbers update dynamically.
        </span>

        {saving && (
          <span className="inline-flex items-center gap-1.5 text-[#0056D2] font-bold animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" /> Saving order…
          </span>
        )}

        {justSaved && (
          <span className="inline-flex items-center gap-1 text-emerald-500 font-bold">
            <Check className="w-3.5 h-3.5" /> Order saved!
          </span>
        )}

        {saveError && (
          <span className="inline-flex items-center gap-1 text-red-500 font-bold">
            {saveError}
          </span>
        )}
      </div>

      {/* Reorderable Items List */}
      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isDragging = draggedIndex === idx
          const isOver = dragOverIndex === idx
          const orderNumber = idx + 1

          return (
            <div
              key={item.id || idx}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={() => {
                setDraggedIndex(null)
                setDragOverIndex(null)
              }}
              onDrop={() => handleDrop(idx)}
              className={`group bg-card border rounded-2xl p-3.5 sm:p-4 shadow-2xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 select-none ${
                isDragging
                  ? "opacity-40 scale-[0.99] border-dashed border-[#0056D2]"
                  : isOver
                  ? "border-[#0056D2] bg-[#0056D2]/10 dark:bg-[#0056D2]/15 translate-y-0.5"
                  : "border-border/80 hover:border-border hover:shadow-xs"
              }`}
            >
              {/* Left Column: Drag Handle + Dynamic Sort Order Badge + Thumbnail + Details */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                
                {/* Drag Handle & Up/Down Arrows */}
                <div className="flex items-center gap-1 shrink-0">
                  <div
                    className="p-1.5 rounded-2xl text-muted-foreground hover:text-[#0056D2] hover:bg-secondary cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0 || saving}
                      onClick={() => moveItem(idx, "up")}
                      className="p-1 rounded-2xl text-muted-foreground hover:text-[#0056D2] hover:bg-secondary disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-muted-foreground cursor-pointer transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1 || saving}
                      onClick={() => moveItem(idx, "down")}
                      className="p-1 rounded-2xl text-muted-foreground hover:text-[#0056D2] hover:bg-secondary disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-muted-foreground cursor-pointer transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Dynamic Sort Order Badge (Prominently Visible) */}
                <div
                  className="px-2.5 py-1 rounded-2xl bg-secondary border border-border text-[11px] sm:text-xs font-mono font-bold text-foreground shrink-0 text-center min-w-[58px]"
                  title={`Current position: #${orderNumber} (sort_order: ${idx})`}
                >
                  <span className="text-[#0056D2] font-extrabold">#{orderNumber}</span>
                </div>

                {/* Thumbnail Image if Available */}
                {item.image && (
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-secondary shrink-0 border border-border shadow-2xs">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content & Metadata */}
                <div className="min-w-0 space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={item.editUrl}
                      className="text-sm sm:text-base font-bold text-foreground hover:text-[#0056D2] transition-colors truncate block font-heading"
                    >
                      {item.title}
                    </Link>

                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-2xl bg-[#0056D2]/10 text-[#0056D2] border border-[#0056D2]/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {item.subtitle && <span className="font-medium text-foreground/80">{item.subtitle}</span>}
                    {item.subtitle && item.dateLabel && <span className="text-border">•</span>}
                    {item.dateLabel && <span className="font-mono text-muted-foreground">{item.dateLabel}</span>}

                    {item.tags && item.tags.length > 0 && (
                      <div className="hidden sm:flex items-center gap-1.5 ml-1">
                        {item.tags.slice(0, 3).map((t, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded-2xl bg-secondary text-[10px] text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/80">
                {item.viewUrl && (
                  <Link
                    href={item.viewUrl}
                    target="_blank"
                    className="p-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href={item.editUrl}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-2xl bg-secondary text-foreground hover:bg-[#0056D2] hover:text-white transition-all shadow-2xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
