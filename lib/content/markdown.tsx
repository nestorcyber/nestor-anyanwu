import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ content }: { content: string }) {
  if (!content) return null
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-accent">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
