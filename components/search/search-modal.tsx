"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { Search, X, Clock, Zap, ChevronRight, FileText, Briefcase, Users, BookOpen, Layers, Star } from "lucide-react"
import { searchContent, popularPages, groupResults, type SearchResult } from "@/lib/search-index"
import { trackSearch, trackSearchOpen } from "@/lib/analytics"

const RECENT_KEY = "nestor_recent_searches"
const MAX_RECENT = 5

const categoryIcons: Record<string, React.ReactNode> = {
  Page: <Layers className="w-3.5 h-3.5" />,
  Project: <Briefcase className="w-3.5 h-3.5" />,
  Service: <Zap className="w-3.5 h-3.5" />,
  Skill: <Star className="w-3.5 h-3.5" />,
  Journal: <BookOpen className="w-3.5 h-3.5" />,
  Community: <Users className="w-3.5 h-3.5" />,
}

const categoryColors: Record<string, string> = {
  Page: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Project: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  Service: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Skill: "bg-green-500/15 text-green-600 dark:text-green-400",
  Journal: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  Community: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-accent/30 text-foreground rounded-sm px-0.5 not-italic font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

function ResultItem({
  result,
  isActive,
  query,
  onSelect,
}: {
  result: SearchResult
  isActive: boolean
  query: string
  onSelect: (result: SearchResult) => void
}) {
  return (
    <Link href={result.href} onClick={() => onSelect(result)}>
      <div
        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors rounded-none ${
          isActive ? "bg-accent/10 border-l-2 border-accent" : "border-l-2 border-transparent hover:bg-secondary/50"
        }`}
      >
        <div
          className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded mt-0.5 ${
            categoryColors[result.category] || "bg-muted"
          }`}
        >
          {categoryIcons[result.category] || <FileText className="w-3.5 h-3.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground leading-tight">
            <HighlightedText text={result.title} query={query} />
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            <HighlightedText text={result.description} query={query} />
          </div>
        </div>
        <span
          className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mt-1 ${
            categoryColors[result.category] || "bg-muted text-muted-foreground"
          }`}
        >
          {result.category}
        </span>
      </div>
    </Link>
  )
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY)
      if (stored) setRecentSearches(JSON.parse(stored))
    } catch {}
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      trackSearchOpen()
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setActiveIndex(0)
    }
  }, [isOpen])

  // Run search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setActiveIndex(0)
      return
    }
    const found = searchContent(query)
    setResults(found)
    setActiveIndex(0)
    if (query.length > 2) trackSearch(query, found.length)
  }, [query])

  // Save to recent searches
  const saveRecent = useCallback(
    (term: string) => {
      if (!term.trim() || term.length < 2) return
      const updated = [term, ...recentSearches.filter((r) => r !== term)].slice(0, MAX_RECENT)
      setRecentSearches(updated)
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
      } catch {}
    },
    [recentSearches]
  )

  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (query) saveRecent(query)
      onClose()
    },
    [query, saveRecent, onClose]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      const allResults = results.length > 0 ? results : popularPages
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % allResults.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + allResults.length) % allResults.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        const active = allResults[activeIndex]
        if (active) {
          if (query) saveRecent(query)
          window.location.href = active.href
          onClose()
        }
      }
    },
    [results, activeIndex, onClose, query, saveRecent]
  )

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  const grouped = groupResults(results)
  const hasResults = results.length > 0
  const showEmpty = query.length > 1 && !hasResults

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
    >
      <div
        className="w-full max-w-xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "75vh" }}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, skills, services…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            aria-label="Search"
            aria-autocomplete="list"
            aria-expanded={hasResults}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div ref={listRef} className="overflow-y-auto flex-1" role="listbox">
          {/* Recent searches */}
          {!query && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Searches</span>
              </div>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary/50 flex items-center gap-3 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  {term}
                </button>
              ))}
              <div className="border-t border-border/40 mt-2" />
            </div>
          )}

          {/* Popular pages (when no query) */}
          {!query && (
            <div className="py-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Zap className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Navigation</span>
              </div>
              {popularPages.map((page, i) => (
                <ResultItem
                  key={page.id}
                  result={page}
                  isActive={activeIndex === i}
                  query=""
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}

          {/* Search results grouped by category */}
          {hasResults &&
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="py-1">
                <div className="px-4 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{category}</span>
                </div>
                {items.map((result) => {
                  const flatIndex = results.indexOf(result)
                  return (
                    <ResultItem
                      key={result.id}
                      result={result}
                      isActive={activeIndex === flatIndex}
                      query={query}
                      onSelect={handleSelect}
                    />
                  )
                })}
              </div>
            ))}

          {/* No results */}
          {showEmpty && (
            <div className="px-4 py-10 text-center">
              <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground mb-1">No results for "{query}"</p>
              <p className="text-xs text-muted-foreground mb-4">Try searching for a page, skill, service, or project</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Portfolio", "Community", "Contact", "Journal"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s.toLowerCase())}
                    className="text-xs text-accent border border-accent/30 px-3 py-1 hover:bg-accent/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="border border-border px-1 font-mono">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="border border-border px-1 font-mono">↵</kbd> open</span>
          </div>
          <span>{results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "Type to search"}</span>
        </div>
      </div>
    </div>
  )
}
