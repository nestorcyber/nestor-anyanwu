'use client'

import RichTextEditor from '@/components/admin/rich-text-editor'

type Props = {
  value: string
  onChange: (value: string) => void
  height?: number
  placeholder?: string
  folder?: string
}

export default function MarkdownEditor(props: Props) {
  return <RichTextEditor {...props} />
}

