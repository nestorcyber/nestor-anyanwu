import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

const inputClass =
  'w-full border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-neutral-400'

export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-wide text-neutral-400">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ''}`} />
}

export function TextTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[120px] ${props.className || ''}`} />
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
    <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-white"
      />
      {label}
    </label>
  )
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 disabled:opacity-60 ${props.className || ''}`}
    />
  )
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border border-red-500/50 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-60 ${props.className || ''}`}
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
