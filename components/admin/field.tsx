import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

const inputClass =
  'w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40'

export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ''}`} />
}

export function TextTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaId = props.id || props.name || 'markdown-textarea'

  const applyFormat = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null
    if (!textarea) return

    const start = textarea.selectionStart || 0
    const end = textarea.selectionEnd || 0
    const text = textarea.value
    const selectedText = text.substring(start, end) || 'text'
    const replacement = `${prefix}${selectedText}${suffix}`

    const newValue = text.substring(0, start) + replacement + text.substring(end)

    // Trigger input change for React state updates
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set
    if (nativeSetter) {
      nativeSetter.call(textarea, newValue)
    } else {
      textarea.value = newValue
    }
    textarea.dispatchEvent(new Event('input', { bubbles: true }))

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length)
    }, 0)
  }

  return (
    <div className="space-y-1">
      {/* Markdown Formatter Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-muted/60 border border-border border-b-0 text-xs font-mono">
        <button
          type="button"
          onClick={() => applyFormat('**', '**')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-extrabold cursor-pointer"
          title="Bold (**text**)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => applyFormat('*', '*')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none italic font-bold cursor-pointer"
          title="Italic (*text*)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => applyFormat('# ')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-bold cursor-pointer"
          title="Heading 1 (# Heading)"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => applyFormat('## ')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-bold cursor-pointer"
          title="Heading 2 (## Heading)"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyFormat('### ')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-bold cursor-pointer"
          title="Heading 3 (### Heading)"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => applyFormat('> ')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Blockquote (> Quote)"
        >
          &quot;
        </button>
        <button
          type="button"
          onClick={() => applyFormat('`', '`')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Inline Code (`code`)"
        >
          `code`
        </button>
        <button
          type="button"
          onClick={() => applyFormat('\n```\n', '\n```\n')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Code Block (``` code ```)"
        >
          ``` ```
        </button>
        <button
          type="button"
          onClick={() => applyFormat('- ')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Bullet List (- item)"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => applyFormat('\n\n', '\n\n')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-bold cursor-pointer"
          title="Paragraph (<p>)"
        >
          P (Paragraph)
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<div align="left">\n', '\n</div>')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Align Left (<div align='left'>)"
        >
          Left ⇇
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<div align="center">\n', '\n</div>')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Align Center (<div align='center'>)"
        >
          Center ⇄
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<div align="right">\n', '\n</div>')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Align Right (<div align='right'>)"
        >
          Right ⇉
        </button>
        <button
          type="button"
          onClick={() => applyFormat('<div align="justify">\n', '\n</div>')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer"
          title="Justify Text (<div align='justify'>)"
        >
          Justify ≡
        </button>
        <button
          type="button"
          onClick={() => applyFormat('[', '](https://example.com)')}
          className="px-2 py-1 bg-background hover:bg-muted border border-border rounded-none font-mono cursor-pointer text-accent"
          title="Insert Link ([Text](URL))"
        >
          🔗 Link
        </button>
      </div>

      <textarea id={textareaId} {...props} className={`${inputClass} min-h-[140px] ${props.className || ''}`} />
    </div>
  )
}

export function TextSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className || ''}`} />
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-foreground/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-foreground"
      />
      {label}
    </label>
  )
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-60 ${props.className || ''}`}
    />
  )
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border border-red-500/50 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 disabled:opacity-60 ${props.className || ''}`}
    />
  )
}

export function PageHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
      {action ? <div className="w-full sm:w-auto [&>a]:block [&>a>button]:w-full sm:[&>a>button]:w-auto">{action}</div> : null}
    </div>
  )
}
