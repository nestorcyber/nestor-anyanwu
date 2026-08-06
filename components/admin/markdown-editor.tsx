'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[280px] items-center justify-center border border-border bg-background text-sm text-muted-foreground">
      Loading editor…
    </div>
  ),
})

type Props = {
  value: string
  onChange: (value: string) => void
  height?: number
  placeholder?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  height = 360,
  placeholder = 'Write content…',
}: Props) {
  const { resolvedTheme } = useTheme()
  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <div data-color-mode={colorMode} className="overflow-hidden rounded-sm border border-border">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? '')}
        height={height}
        preview="live"
        visibleDragbar={false}
        textareaProps={{ placeholder }}
      />
    </div>
  )
}
